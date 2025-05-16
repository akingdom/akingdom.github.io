// File: RTFReader.js
// Author: Andrew Kingdom
// Purpose: A pure JavaScript RTF Reader.
// Reference: Based on Microsoft RTF parser structure and in part on the related C language example code.
// Nov 2024
window.versions={...(window.versions||{}), RTFReader:'1.2.1'};


class RTFReader {
    constructor() {
		this.debug = false;  // default: false
        this.stateStack = [];
        this.currentState = this.initializeState();
        this.output = "";  // Store the parsed output
        this.fieldInstructionText = "";
		this.fieldResultText = "";
		this.fieldText = "";
        
        // Initialize tables for fonts and colors
        this.fontTable = [];
        this.colorTable = [];
    }

    initializeState() {
        return {
            bold: false,
            italic: false,
            underline: false,
            alignment: 'left',
            destination: 'body',  // Define initial parsing destination
			font: null,
            color: null,
        };
    }

	encodingNameTable(codepage) { return {
		'437': 'IBM437',                    // IBM PC (original MS-DOS character set)
		'850': 'IBM850',                    // IBM 850 (Multilingual Latin 1)
		'858': 'IBM858',                    // IBM 858 (Multilingual Latin 1 with Euro symbol)
		'874': 'windows-874',               // Windows Thai
		'932': 'shift_jis',                 // Shift-JIS (Japanese)
		'936': 'gb2312',                    // GB2312 (Simplified Chinese)
		'949': 'ks_c_5601-1987',            // KS X 1001 (Korean)
		'950': 'big5',                      // Big5 (Traditional Chinese)
		'1200': 'utf-16',                   // UTF-16
		'1201': 'utf-16be',                 // UTF-16 Big Endian
		'1250': 'windows-1250',             // Windows Central European
		'1251': 'windows-1251',             // Windows Cyrillic
		'1252': 'windows-1252',             // Windows Western European (Latin-1)
		'1253': 'windows-1253',             // Windows Greek
		'1254': 'windows-1254',             // Windows Turkish
		'1255': 'windows-1255',             // Windows Hebrew
		'1256': 'windows-1256',             // Windows Arabic
		'1257': 'windows-1257',             // Windows Baltic
		'1258': 'windows-1258',             // Windows Vietnamese
		'1361': 'johab',                    // Johab (Korean)
		'10000': 'macintosh',               // Macintosh (Mac OS Roman)
		'10001': 'x-mac-japanese',          // Mac Japanese
		'10003': 'x-mac-chinesetrad',       // Mac Traditional Chinese
		'10004': 'x-mac-korean',            // Mac Korean
		'10005': 'x-mac-arabic',            // Mac Arabic
		'10006': 'x-mac-hebrew',            // Mac Hebrew
		'10007': 'x-mac-greek',             // Mac Greek
		'10008': 'x-mac-cyrillic',          // Mac Cyrillic
		'10029': 'x-mac-turkish',           // Mac Turkish
		'10081': 'x-mac-chinesesimp',       // Mac Simplified Chinese
		'20127': 'us-ascii',                // US ASCII
		'20833': 'gbk',                     // GBK (Extended Simplified Chinese)
		'20866': 'koi8-r',                  // KOI8-R (Russian)
		'21866': 'koi8-u',                  // KOI8-U (Ukrainian)
		'28591': 'iso-8859-1',              // ISO 8859-1 Latin-1 (Western European)
		'28592': 'iso-8859-2',              // ISO 8859-2 Latin-2 (Central European)
		'28593': 'iso-8859-3',              // ISO 8859-3 Latin-3 (South European)
		'28594': 'iso-8859-4',              // ISO 8859-4 Latin-4 (North European)
		'28595': 'iso-8859-5',              // ISO 8859-5 Cyrillic
		'28596': 'iso-8859-6',              // ISO 8859-6 Arabic
		'28597': 'iso-8859-7',              // ISO 8859-7 Greek
		'28598': 'iso-8859-8',              // ISO 8859-8 Hebrew
		'28599': 'iso-8859-9',              // ISO 8859-9 Turkish
		'28603': 'iso-8859-10',             // ISO 8859-10 Nordic
		'28604': 'iso-8859-11',             // ISO 8859-11 Thai
		'28605': 'iso-8859-12',             // ISO 8859-12 Armenian
		'28606': 'iso-8859-13',             // ISO 8859-13 Baltic Rim
		'28607': 'iso-8859-14',             // ISO 8859-14 Celtic
		'28608': 'iso-8859-15',             // ISO 8859-15 Latin-9 (Western European)
		'28609': 'iso-8859-16',             // ISO 8859-16 Romanian
		'65000': 'utf-7',                   // UTF-7
		'65001': 'utf-8',                   // UTF-8
		}[codepage];
	}

	// decodes text if possible, and remembers the encoding name.
	convertEncoding(rtfStringEncoded) {
		const ansiRegex = /\\ansicpg(\d{3,5})/;
		const match = rtfStringEncoded.match(ansiRegex);
		
		if (match) {
			this.encodingName = this.encodingNameTable(match[1]);
			if (this.encodingName) {
				const encoder = new TextEncoder();
				const rtfContentBuffer = encoder.encode(rtfStringEncoded);
				const textDecoder = new TextDecoder(this.encodingName);
				const decodedText = textDecoder.decode(rtfContentBuffer);
				return decodedText;
			}
		}
		// Fallback if encoding conversion fails
		this.encodingName = this.encodingNameTable(65001);
		return rtfStringEncoded;
	}
	
	// Usage in `parse`:
	parse(rtfStringEncoded) {
		let rtfString = this.convertEncoding(rtfStringEncoded);
		
		// Begin parsing...
		let i = 0;
		while (i < rtfString.length) {
			const char = rtfString[i];
			if(this.debug) console.log(`CHAR '${char}'`);
			// Handle specific non-alphabetic characters
			switch (char) {
				case '{':
					// Save the current state and prepare for a new group
					this.pushState();
					i++;
					continue;
				case '}':
					// Restore the previous state as we exit the current group
					this.popState();
					i++;
					continue;
				case '\\':
					// Process an RTF control keyword
					i = this.handleKeyword(rtfString, i + 1);
					continue;
				case '\'':
					// Handle hexadecimal character encoding with the `'` keyword
					i = this.handleKeyword(rtfString, i + 1);
					continue;
				default:
					// For regular text characters, fall through to destination keyword handling
					break;
			}
			// handle destinations
			switch (this.currentState.destination) {
				case "field": // Field start 
					this.handleFieldStart(char);
					break;
				case 'fldinst':
					// Handle text specific to field instructions
					this.handleFieldInstructions(char);
					break;
				case 'fldrslt':
					// Handle text specific to field results
					this.handleFieldResult(char);
					break;
                case 'fonttbl':
                    this.handleFontTable(char);
                    break;
                case 'colortbl':
                    this.handleColorTable(char);
                    break;
                case 'expandedcolortbl':
                	this.handleExpandedColorTable(char);
                	break;
				default:
					// Handle all other text normally
					this.handleText(char);
			}
			i++;
		}
		return this.output;
	}

	priorState() {
		return this.stateStack[this.stateStack.length - 1];
	}
	
    pushState() {
		if(this.debug) console.log(`PUSHSTATE+ ${objectAsString(this.currentState)}`);
        this.stateStack.push({ ...this.currentState });
    }

    popState() {
        if (this.stateStack.length > 0) {
            const priorCurrent = this.currentState;
			this.currentState = this.stateStack.pop();
			if(this.debug) console.log(`POPSTATE- WAS ${objectAsString(priorCurrent)}`);
			if(this.debug) console.log(`POPSTATE- NOW ${objectAsString(this.currentState)}`);
			if(this.currentState.destination != priorCurrent.destination) {
				this.handleFieldTransition(priorCurrent.destination);
			}
        } else {
            console.error("Unmatched closing brace in RTF.");
        }
    }

	handleNewLine(index, rtfString) {
		if (rtfString[index] === '\r' && rtfString[index + 1] === '\n') {
			this.applyKeyword('\n');
			return index + 2;
		} else if (rtfString[index] === '\n') {
			this.applyKeyword('\n');
			return index + 1;
		}
		return null; // No match
	}
	
	handleControlSequence(index, rtfString) {
		if(index >= rtfString.length) return index;
		const control = rtfString[index];
		const data = rtfString.slice(index+1,index+9);  // maximum lookahead data needed for all encodings

		// Handle single quote or unicode
		if (control === '\'') {
			const match = data.match(/^([a-fA-F0-9]{2})/);
			if(match) this.applyKeyword('hexchar', match[1]);
			return index+3;
		}
		if (control === 'u') {
			const match = data.match(/^([a-fA-F0-9]{4})/);
			if(match) this.applyKeyword('hexchar', match[1]);
			return index+5;
		}
		if (control === 'U') {
			const match = data.match(/^([a-fA-F0-9]{8})/);
			if(match) this.applyKeyword('hexchar', match[1]);
			return index+9;
		}
		return null;  // no match
	}

	handleKeyword(rtfString, index) {

		// Handle new line
        let newIndex = this.handleNewLine(index, rtfString);
		if (newIndex !== null) return newIndex;

		// Handle encoded characters
		newIndex = this.handleControlSequence(index, rtfString);
		if (newIndex !== null) return newIndex;

        let keyword = "";
        let param = null;

        // Capture the keyword characters
        while (index < rtfString.length && /[a-zA-Z]/.test(rtfString[index])) {
            keyword += rtfString[index++];
        }

        // Capture optional parameter (e.g., \fs24, \b0, etc.)
        if (index < rtfString.length && /[0-9-]/.test(rtfString[index])) {
            let paramStr = "";
            while (index < rtfString.length && /[0-9-]/.test(rtfString[index])) {
                paramStr += rtfString[index++];
            }
            param = parseInt(paramStr, 10);
        }

        // Consume any whitespace following the keyword or parameter
        if (index < rtfString.length && rtfString[index] === ' ') {
            index++;
        }

        // Apply formatting or handle special keywords
        this.applyKeyword(keyword, param);

        return index;
    }

	// Method to add characters to the output
	appendCharacter(char) {
		this.output += char;
	}

	applyKeyword_hexcode(param) {
		if (!param) return;
		
		// Check if we need to decode from a specified encoding
		if (this.encodingName) {
			const encoder = new TextEncoder();
			const decoder = new TextDecoder(this.encodingName); // Uses the encoding name to decode
			let byteArray = [];
			// Convert param (hex string) to byte array
			for (let i = 0; i < param.length; i += 2) {
				let byte = parseInt(param.substr(i, 2), 16);
				byteArray.push(byte);
			}
			// Decode the byte array using the encoding specified in `this.encodingName`
			try {
				const decodedString = decoder.decode(new Uint8Array(byteArray));
				this.appendCharacter(decodedString);
			} catch (e) {
				console.error('Error decoding character:', e);
			}
		} else {
			// Fallback if encoding is not set
			if (param.length === 2) {
				// 2-digit hexadecimal (8-bit character, basic extended ASCII type character)
				const charCode = parseInt(param, 16);
				this.appendCharacter(String.fromCharCode(charCode));                    
			} else if (param.length === 4) {
				// 4-digit hexadecimal (16-bit character, basic Unicode plane)
				const charCode = parseInt(param, 16);
				this.appendCharacter(String.fromCharCode(charCode));
			} else if (param.length === 8) {
				// 8-digit hexadecimal (32-bit character, potentially out of BMP)
				const codePoint = parseInt(param, 16);
				this.appendCharacter(String.fromCodePoint(codePoint)); // Use String.fromCodePoint for full Unicode range
			} else {
				console.error(`unsupported hex character length (${param.length})`);
			}
		}
	}

    applyKeyword(keyword, param) {
		if(this.debug) console.log(`KEYWORD: ${keyword}  (${param})`);
        switch (keyword) {
            case "b":   // Bold
                this.currentState.bold = (param !== 0);
                break;
            case "i":   // Italics
                this.currentState.italic = (param !== 0);
                break;
            case "ul":  // Underline
                this.currentState.underline = (param !== 0);
                break;
            case "fonttbl":
                this.currentState.destination = 'fonttbl';
                break;
            case "f": // Font selection by index
                this.currentState.font = this.fontTable[param];
                break;
            case "fs":  // Font size in half-points
                if (param) this.currentState.fontSize = param / 2;
                break;
            case "colortbl":
                this.currentState.destination = 'colortbl';
                break;
            case "cf": // Text color selection by index
                this.currentState.color = this.colorTable[param];
                break;
            case "qc":  // Centered text
                this.currentState.alignment = 'center';
                break;
            case "ql":  // Left-aligned text
                this.currentState.alignment = 'left';
                break;
            case "qr":  // Right-aligned text
                this.currentState.alignment = 'right';
                break;
            case "qj":  // Justified text
                this.currentState.alignment = 'justify';
                break;
			case "field": // Field start 
                this.currentState.destination = keyword; 
                break; 
			case "fldinst": // Field instruction 
                this.currentState.destination = keyword; 
                break; 
			case "fldrslt": // Field result 
                this.currentState.destination = keyword; 
                break;
			case "hexchar": // Handle hexadecimal character encoding with the `'` keyword
				this.applyKeyword_hexcode(param);
				break;
            case "\n":
				this.output += "<br>";
				break;
            case "par": // Paragraph break -- TODO -- shift this to 'paragraph' state for a <p>..</p> ??
				this.output += "<br><br>";
                break;
            case "expandedcolortbl":  // unofficial keyword
				this.currentState.destination = 'expandedcolortbl';
				break;
           default:
                // Ignore unsupported or unknown keywords
                console.warn(`Unknown RTF keyword: ${keyword}`);
        }
    }

    handleFontTable(char) {
		if (!this.currentFont) this.currentFont = ""; // Initialize only if undefined
		if (char === ';') {
			// Finalize the current font entry and push to the fontTable
			this.fontTable.push(this.currentFont.trim());
			this.currentFont = ""; // Reset for the next entry
		} else {
			this.currentFont += char; // Accumulate characters for current font
		}
	}

	handleColorTable(char) {
		if (!this.currentColor) this.currentColor = ""; // Initialize only if undefined
	
		if (char === ';') {
			// Finalize the current color entry and push to the colorTable
			this.colorTable.push(this.currentColor.trim());
			this.currentColor = ""; // Reset for the next entry
		} else if (char === '\\') {
			// Accumulate escape characters or any color code specifics
			this.currentColor += char;
		} else {
			this.currentColor += char; // Accumulate characters for current color
		}
	}

	handleExpandedColorTable(char) {
		if (char === ';') {
			this.colorTable.push(this.currentColor);  // Push completed color definition
			this.currentColor = "";                   // Reset for next color
		} else {
			this.currentColor = (this.currentColor || "") + char;
		}
	}

	handleFieldTransition(destination) {
		if(this.debug) console.log(`TRANSITION ${destination}`)
		switch (destination) {
			case "field": // Field start 
				break;
			case 'fldinst':
				break;
			case 'fldrslt':
				// Process the field result
				// Extract the URL from the field instruction
				const urlMatch = this.fieldInstructionText.match(/HYPERLINK\s+"([^"]+)"/);
				// Extract the display text from the field result
				const displayText = this.fieldResultText.replace('\"','\'').trim();
				
				if (urlMatch && displayText) {
					const url = urlMatch[1];
					// Append the hyperlink to the output
					this.output += `<a href="${url}">${displayText}</a>`;
				}
	
				// Reset field text buffers and state
				this.fieldInstructionText = "";
				this.fieldResultText = "";
				this.fieldText = "";
				this.currentState.destination = 'body';
				break;
			default:
				// No specific action needed for other destinations
				break;
		}
	}

	handleText(char) {
		if(this.debug) console.log(`HANDLE ${char}`);
		const prior = this.priorState();

        // Apply formatting based on the current state. Ensure styles are applied without stacking. To achieve this we compare prior state and current state, and reset prior state if we do apply the style.

        let formattedChar = char;

		if (prior.bold && !this.currentState.bold) {
            formattedChar = `</b>${formattedChar}`;
            // Update the state transition for next time (if any)
			prior.bold = this.currentState.bold;  
		}        
        if (prior.italic && !this.currentState.italic) {
            formattedChar = `</i>${formattedChar}`;
            prior.italic = this.currentState.italic;
		}        
        if (prior.underline && !this.currentState.underline) {
            formattedChar = `</u>${formattedChar}`;
            prior.underline = this.currentState.underline;
		}        
        
        if (!prior.bold && this.currentState.bold) {
            formattedChar = `<b>${formattedChar}`;
            prior.bold = this.currentState.bold;
		}        
        if (!prior.italic && this.currentState.italic) {
            formattedChar = `<i>${formattedChar}`;
            prior.italic = this.currentState.italic;
		}        
        if (!prior.underline && this.currentState.underline) {
            formattedChar = `<u>${formattedChar}`;
            prior.underline = this.currentState.underline;
		}        
		if (this.currentState.font) formattedChar = `<span style="font-family: ${this.currentState.font};">${formattedChar}</span>`;
        if (this.currentState.color) formattedChar = `<span style="color: ${this.currentState.color};">${formattedChar}</span>`;

        // Append the formatted character to output
        this.output += formattedChar;
    }

	handleFieldStart(char) {
		this.fieldText = this.fieldText || "";
		this.fieldText += char;
		if(this.debug) console.log(`FIELDSTART ${this.fieldText}`);
		return;
	}
	
    handleFieldInstructions(char) {
		// A buffer to accumulate field instruction text
		this.fieldInstructionText = this.fieldInstructionText || "";
		this.fieldInstructionText += char;
		if(this.debug) console.log(`FIELDINSTRUCTION ${this.fieldInstructionText}`);
	}
	
	handleFieldResult(char) {
		// A buffer to accumulate field instruction text
		this.fieldResultText = this.fieldResultText || "";
		this.fieldResultText += char;
		if(this.debug) console.log(`FIELDRESULT ${this.fieldResultText}`);
	}

    parseFile(file, callback) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = this.parse(event.target.result);
            callback(result);
        };
        reader.readAsText(file);
    }

    parseFromFilePath(filePath, callback) {
        // This method is designed for Node.js environments
        const fs = require('fs');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
            const result = this.parse(data);
            callback(result);
        });
    }
}


function objectAsString(obj) {
  var output = '';
  for (var property in obj) {
    if(obj.hasOwnProperty(property) && typeof obj[property] !== 'function') {
      var value = obj[property];
      if(typeof value === 'object' && !Array.isArray(value) && value !== null) {
        value = '{' + objectAsString(value) + '}';
      }
      output += property + ': ' + value +'; ';
    }
  }
  return output;
}

// Example:
// const order = {Apple: 12, Banana: 4, Watermelon: 1, Orange:8, Grape: {Muscat: 20}, Summary: [12,4,1,8,20], Pack: false, Null: null};
// console.log(objectAsString(order));
