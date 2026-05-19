/**
 * QuoteManager Namespace
 * Processes document quotes using an isolated, input-agnostic pipeline.
 */
const QuoteManager = (function () {
    
    // --- CLI Parameter Defaults ---
    const DEFAULT_FLAGS = {
        source: null,       // Specific container ID, or null to query the whole document
        target: '',         // ID of the destination container (--target)
        action: 'move',     // Operation mode: 'move' or 'clone' (--action)
        silent: false       // Suppress environment logs (--silent)
    };

    // --- Private Implementation Details ---

    /**
     * Finds the first valid chain of sequential blockquotes within a specific context.
     * @param {HTMLElement|Document} searchContext - The DOM node or document root to query.
     */
    function findSequentialBlockquotes(searchContext) {
        // Queries only within the passed context (e.g. a specific DIV or the whole document)
        const allBlockquotes = searchContext.querySelectorAll('blockquote');
        const blockquoteChains = [];
        let currentChain = [];

        // Traverse all blockquotes using your original sequential logic
        allBlockquotes.forEach((blockquote, index) => {
            if (index === 0 || (blockquote.previousElementSibling && blockquote.previousElementSibling.tagName === 'BLOCKQUOTE')) {
                currentChain.push(blockquote);
            } else {
                if (currentChain.length >= 2) {
                    blockquoteChains.push([...currentChain]);
                }
                currentChain = [blockquote];
            }
        });

        if (currentChain.length >= 2) {
            blockquoteChains.push([...currentChain]);
        }

        // Return the first valid chain (with 2 or more blockquotes)
        return blockquoteChains.length > 0 ? blockquoteChains[0] : [];
    }

    function transferRandomQuote(blockquoteCollection, destinationContainer, actionFlag) {
        const randomIndex = Math.floor(Math.random() * blockquoteCollection.length);
        const selectedQuote = blockquoteCollection[randomIndex];

        if (actionFlag === 'clone') {
            const deepCloneOfQuote = selectedQuote.cloneNode(true);
            destinationContainer.appendChild(deepCloneOfQuote);
        } else {
            destinationContainer.appendChild(selectedQuote);
        }
    }

    // --- Public API ---
    return {
        /**
         * Executes the manager using command-line style options override.
         * @param {Object} flags - Named parameters detailing targets and operational modes.
         */
        run: function (flags = {}) {
            const args = { ...DEFAULT_FLAGS, ...flags };

            // Determine search context: use the element if a source ID exists, otherwise default to document
            const searchContext = args.source ? document.getElementById(args.source) : document;
            const targetContainer = document.getElementById(args.target);

            // Validation step
            if (!searchContext || !targetContainer) {
                if (!args.silent) {
                    console.warn(`[QuoteManager] Execution aborted. Target (#${args.target}) missing or invalid Context.`);
                }
                return;
            }

            // HTML attribute on target container takes highest operational priority
            const finalAction = targetContainer.dataset.quoteAction || args.action;

            // Extract the chain using the dynamically selected context
            const firstValidChain = findSequentialBlockquotes(searchContext);
            
            if (firstValidChain.length === 0) {
                if (!args.silent) console.log('[QuoteManager] No valid blockquote sequences found.');
                return;
            }

            transferRandomQuote(firstValidChain, targetContainer, finalAction);

            if (!args.silent) {
                const contextName = args.source ? `#${args.source}` : 'entire document';
                console.log(`[QuoteManager] Success: ${finalAction}d quote from ${contextName} into '#${args.target}'`);
            }
        }
    };
})();

// --- Auto-Execution via DOM Event Wrapper ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Example 1: Scanning a targeted area (e.g., your Markdown output block)
    /*
    QuoteManager.run({
        source: 'markdown-content-area', 
        target: 'quote-container',       
        action: 'clone'
    });
    */

    // Example 2: Scanning the entire document globally (by omitting 'source')
    QuoteManager.run({
        target: 'quote-container',       
        action: 'move'
    });
});
