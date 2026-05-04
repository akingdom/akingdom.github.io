// filename: html_to_markdown_converter-simple.js

function convertToMarkdown() {
    const htmlInput = document.getElementById('htmlInput').value;
    let markdownOutput = '';
    let tagStack = [];
    let semanticStack = [];
    let ignoreStack = [];
    let lastIndex = 0;

    const unprocessedTally = {};
    let tableHeaderDone = false;
    let listStack = [];
    let blockquoteDepth = 0;
    let cssMap = {};
    let startOfLine = true;

    // ---- new: blockquote‑fresh flag & pending‑space state ----
    let blockquoteFresh = false;   // true until any content enters a blockquote
    let pendingSpace = false;      // true if the last emitted character was a space

    const ignoredTags = [
        'head','script','style','noscript','iframe','meta','link',
        'header','footer','canvas','title',
        'thead','tbody','tfoot'
    ];
    const handledTags = [
        'h1','h2','h3','h4','h5','h6','blockquote','hr','img',
        'strong','b','em','i','p','br','a','table','tr','th','td',
        'ul','ol','li','del','span'
    ];

    const tagRegex = /(<!--[\s\S]*?-->|<[^>]+>)/g;

    // --- CSS PARSER (unchanged) ---
    const parseStyles = (input) => {
        const styleBlockRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
        let block;
        while ((block = styleBlockRegex.exec(input)) !== null) {
            const css = block[1];
            const classRegex = /\.([\w-]+)\s*\{([^}]+)\}/g;
            let rule;
            while ((rule = classRegex.exec(css)) !== null) {
                const className = rule[1];
                const props = rule[2].toLowerCase();
                let trait = '';
                if (/font-weight\s*:\s*(bold|[6-9]00)/.test(props)) trait += 'b';
                if (/font-style\s*:\s*italic/.test(props)) trait += 'i';
                if (trait) cssMap[className] = trait;
            }
        }
    };

    const getAttributes = (tagString) => {
        const attrs = {};
        const attrRegex = /(\w+)=["']([^"']*)["']/g;
        let match;
        while ((match = attrRegex.exec(tagString)) !== null) {
            attrs[match[1]] = match[2];
        }
        return attrs;
    };

    const getTagName = (tagString) => {
        const match = tagString.match(/[a-zA-Z1-6]+/);
        return match ? match[0].toLowerCase() : '';
    };

    // ---------- OUTPUT HELPERS ----------
    const emitText = (str) => {
        if (!str) return;

        // If we're inside a fresh blockquote, any content ends the freshness
        if (blockquoteDepth > 0) blockquoteFresh = false;

        // Blockquote prefix, applied once at line start
        if (blockquoteDepth > 0 && startOfLine) {
            markdownOutput += '> '.repeat(blockquoteDepth);
        }

        markdownOutput += str;
        startOfLine = false;
        // Track trailing space for pending‑space logic
        pendingSpace = str.endsWith(' ');
    };

    const addNewline = () => {
        markdownOutput += '\n';
        startOfLine = true;
        pendingSpace = false;       // newline never carries trailing space
    };

    const addBlankLine = () => {
        if (blockquoteDepth > 0) {
            // inside a blockquote, blank line = empty quoted line
            markdownOutput += '\n> \n';
        } else {
            markdownOutput += '\n\n';
        }
        startOfLine = true;
        pendingSpace = false;
    };

    const insideListItem = () =>
        semanticStack.lastIndexOf('li') > semanticStack.lastIndexOf('ul') ||
        semanticStack.lastIndexOf('li') > semanticStack.lastIndexOf('ol');

    // ---------- NORMALISE TEXT CHUNKS (whitespace‑aware) ----------
    const normalizeTextChunk = (raw) => {
        // collapse any whitespace sequence to a single space (do NOT trim)
        let cleaned = raw.replace(/\s+/g, ' ');
        // if we already have a pending space, discard one leading space
        if (pendingSpace && cleaned.startsWith(' ')) {
            cleaned = cleaned.slice(1);
        }
        if (cleaned) {
            emitText(cleaned);
        }
    };

    // ---------- MAIN PARSING ----------
    parseStyles(htmlInput);

    let match;
    while ((match = tagRegex.exec(htmlInput)) !== null) {
        const tagMatch = match[0];
        const charAfterBracket = tagMatch[1];

        if (ignoreStack.length === 0) {
            const textBefore = htmlInput.slice(lastIndex, match.index);
            if (textBefore.trim()) {   // still check for non‑empty after collapse
                normalizeTextChunk(textBefore);
            }
        }

        // skip HTML comments
        if (charAfterBracket === '!') {
            lastIndex = tagRegex.lastIndex;
            continue;
        }

        const tagName = getTagName(tagMatch);
        const isClosing = charAfterBracket === '/';
        const isSelfClosing = tagMatch.endsWith('/>') || ['img','hr','br','meta','link'].includes(tagName);

        if (!isClosing && !handledTags.includes(tagName) && !ignoredTags.includes(tagName)) {
            unprocessedTally[tagName] = (unprocessedTally[tagName] || 0) + 1;
        }

        if (ignoredTags.includes(tagName)) {
            if (isClosing) ignoreStack.pop();
            else if (!isSelfClosing) ignoreStack.push(tagName);
            lastIndex = tagRegex.lastIndex;
            continue;
        }

        if (ignoreStack.length === 0) {
            if (isClosing) handleClosingTag(tagName);
            else {
                handleOpeningTag(tagName, tagMatch);
                if (isSelfClosing) handleClosingTag(tagName);
            }
        }

        lastIndex = tagRegex.lastIndex;
    }

    if (ignoreStack.length === 0) {
        const trailing = htmlInput.slice(lastIndex);
        if (trailing.trim()) {
            normalizeTextChunk(trailing);
        }
    }

    if (Object.keys(unprocessedTally).length > 0) {
        console.warn('Unprocessed Tags Tally:');
        console.table(unprocessedTally);
    }

    // ---------- TAG HANDLERS ----------
    function handleOpeningTag(tag, fullTag) {
        const attrs = getAttributes(fullTag);

        switch (tag) {
            case 'p':
                if (blockquoteDepth > 0) {
                    // Inside a blockquote: blank line *unless* this is the very first paragraph
                    if (blockquoteFresh) {
                        // first paragraph – just start content directly (no blank line)
                    } else {
                        addBlankLine();   // separates paragraphs inside quote
                    }
                } else {
                    // Outside blockquote, normal paragraph spacing
                    if (insideListItem()) addNewline();
                    else addBlankLine();
                }
                semanticStack.push('p');
                break;

            case 'br':
                addNewline();
                break;

            case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
                addBlankLine();
                emitText('#'.repeat(parseInt(tag.charAt(1))) + ' ');
                tagStack.push(tag);
                semanticStack.push(tag);
                break;

            case 'blockquote':
                blockquoteDepth++;
                blockquoteFresh = true;      // nothing emitted yet inside this quote
                // No newline added here – we want the first line to be a quote with content
                semanticStack.push('blockquote');
                break;

            case 'hr':
                addBlankLine();
                emitText('---');
                addNewline();
                addNewline();
                break;

            case 'strong': case 'b':
                emitText('**');
                tagStack.push('**');
                break;

            case 'em': case 'i':
                emitText('*');
                tagStack.push('*');
                break;

            case 'del':
                emitText('~~');
                tagStack.push('~~');
                break;

            case 'a':
                emitText('[');
                tagStack.push(`](${attrs.href || '#'})`);
                break;

            case 'img':
                emitText(`![${attrs.alt || 'IMAGE'}](${attrs.src || ''})`);
                break;

            case 'ul':
                listStack.push('* ');
                semanticStack.push('ul');
                break;

            case 'ol':
                listStack.push('1. ');
                semanticStack.push('ol');
                break;

            case 'li':
                const indent = '  '.repeat(listStack.length - 1);
                const prefix = listStack[listStack.length - 1] || '* ';
                addNewline();
                emitText(indent + prefix);
                semanticStack.push('li');
                break;

            case 'table':
                addNewline();
                tableHeaderDone = false;
                break;

            case 'tr':
                addNewline();
                emitText('| ');
                break;

            case 'th': case 'td':
                break;

            case 'span':
                const classes = (attrs.class || '').split(' ');
                const tokens = [];
                classes.forEach(c => {
                    if (cssMap[c]?.includes('b')) tokens.push('**');
                    if (cssMap[c]?.includes('i')) tokens.push('*');
                });
                const inlineMarkup = tokens.join('');
                if (inlineMarkup) emitText(inlineMarkup);
                tagStack.push(tokens.reverse().join(''));
                break;
        }
    }

    function handleClosingTag(tag) {
        switch (tag) {
            case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
                addNewline();
                tagStack.pop();
                semanticStack.pop();
                break;

            case 'blockquote':
                if (blockquoteDepth > 0) blockquoteDepth--;
                semanticStack.pop();
                addNewline();       // finish the quote line
                blockquoteFresh = false;  // safety
                break;

            case 'p':
                semanticStack.pop();
                break;

            case 'strong': case 'b': case 'em': case 'i': case 'del': case 'a': case 'span':
                const endToken = tagStack.pop() || '';
                if (endToken) emitText(endToken);
                break;

            case 'ul': case 'ol':
                listStack.pop();
                semanticStack.pop();
                addNewline();
                break;

            case 'li':
                semanticStack.pop();
                break;

            case 'tr':
                if (!tableHeaderDone) {
                    const lines = markdownOutput.split('\n');
                    const currentLine = lines[lines.length - 1];
                    const colCount = (currentLine.match(/\|/g) || []).length - 1;
                    if (colCount > 0) {
                        emitText(`\n|${' --- |'.repeat(colCount)}`);
                        tableHeaderDone = true;
                    }
                }
                break;

            case 'th': case 'td':
                emitText(' | ');
                break;
        }
    }

    document.getElementById('markdownOutput').textContent = markdownOutput.trim();
}