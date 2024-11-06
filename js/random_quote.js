// Function to find two or more sequential blockquotes at the same depth
function findSequentialBlockquotes() {
    const allBlockquotes = document.querySelectorAll('blockquote');
    const blockquoteChains = [];
    let currentChain = [];

    // Traverse all blockquotes
    allBlockquotes.forEach((blockquote, index) => {
	if (index === 0 || blockquote.previousElementSibling.tagName === 'BLOCKQUOTE') {
	    // Add to current chain if it's the first blockquote or previous is also a blockquote
	    currentChain.push(blockquote);
	} else {
	    // Push current chain and reset if a break occurs
	    if (currentChain.length >= 2) {
		blockquoteChains.push([...currentChain]);
	    }
	    currentChain = [blockquote];
	}
    });

    // Check final chain
    if (currentChain.length >= 2) {
	blockquoteChains.push([...currentChain]);
    }

    // Return the first valid chain (with 2 or more blockquotes)
    return blockquoteChains.length > 0 ? blockquoteChains[0] : [];
}

// Function to clone a random blockquote from the array to a div
function cloneRandomBlockquote(chain,parent) {
    if (chain.length > 0) {
	const randomIndex = Math.floor(Math.random() * chain.length);
	const randomBlockquote = chain[randomIndex].cloneNode(true);
	parent.appendChild(randomBlockquote);
    }
}

// Find the first chain of sequential blockquotes
const firstChain = findSequentialBlockquotes();
console.log('First chain of blockquotes:', firstChain);

// Clone a random blockquote from the chain into the div
cloneRandomBlockquote(firstChain, document.getElementById('quote-container'));
