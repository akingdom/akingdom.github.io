// pykelet.js 
// by Andrew Kingdom
// include this file as early as possible in an HTML document, ideally as first item in header..

function initPykeletFromComment() {
	document.pykelet = {
		comment: getPykeletFromComment()  // grab details from Pykelet Resume immediately.
	};
}
function fillDocumentFromPykeletComments() {
	const comments = document.pykelet.comment;
	for (let key in comments) {
		if (comments.hasOwnProperty(key)) {
			const element = document.getElementById(key);
			if (element) {
				element.textContent = comments[key];
			}
		}
	}
}

// Example usage:
const data = { DESCRIPTION: "my description", TITLE: "my title", ANOTHER: "another value" };
updateContent(data);

// Returns an object of key:value pairs from the first '<!--PYKELET' comment found in the root level of this file.
// Normally this result should be saved in document.window.pykelet.metadata
// Normally the pykeleComment parameter is unused (call with empty parenthesis).
//
// Example
// <!--PYKELET
// 
// DESCRIPTION: This tool helps identify the most important parts in a text.
// 
// TITLE:		Identify key phrases in a text.
// FILENAME:    text_tool.html
// AUTHOR:      Andrew Kingdom
// 
// -->

function getPykeletFromComment(pykeletComment = undefined) {
	function getComments(elem) {
	  return Array.from(elem.childNodes).filter(node => node.nodeType === Node.COMMENT_NODE);
	}
	
	if(pykeletComment === undefined) {
		// Unspecified, so get the first PYKELET comment found
		// Retrieve comments from the root element
		const githubBody = document.getElementsByClassName('markdown-body')[0];  // use github target if present
		const comments = getComments(githubBody ? githubBody : document);
		
		// Find the PYKELET comment
		pykeletComment = comments.find(comment => comment.nodeValue.trim().startsWith('PYKELET'));
	}
    if (pykeletComment) {
        const metadata = {};
        const lines = pykeletComment.nodeValue
                        .trim()  // if Cannot read properties error, you're probably supplying an invalid comment (and probably shouldn't supply anything).
                        .replace(/<!--\s*PYKELET\s*/g, '')
                        .replace(/\s*-->/g, '')
                        .split('\n');
        
        lines.forEach(line => {
            const [key, ...valueParts] = line.trim().split(':');
            const fullKey = `${key.trim()}`.toUpperCase();
            if (fullKey) {
                metadata[fullKey] = valueParts.join(':').trim();
            }
        });

        return metadata;
    }
    return null;  // No PYKELET comment found
}

// Returns an array of all pykelet comments within this file.
// This is a special case intended for index files only. 
// This allows easily copy and paste of the comments from other files. 
// For all other files there is normally only one such comment present.
// Normally elem would be the DOM document, or a <data> element.
function getPykeletsFromComments(elem) {
	function getComments(elem) {
	  return Array.from(elem.childNodes).filter(node => node.nodeType === Node.COMMENT_NODE);
	}
    
	// Retrieve comments from the root element and extract the PYKELET comments
    const comments = getComments(elem)?.filter(comment => comment.nodeValue.trim().startsWith('PYKELET'));

	return comments
}


initPykeletFromComment();
fillDocumentFromPykeletComments();
