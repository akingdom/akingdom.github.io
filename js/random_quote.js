/**
 * QuoteManager Namespace
 * Detects structural clusters of sequential blockquotes and transfers a random selection.
 * 
 * =========================================================================================
 * PARAMETERS (JavaScript Options Object)
 * =========================================================================================
 * @param {Object} flags           - Configuration object properties.
 * @param {string|null} [flags.source=null] - The ID of a wrapper container to scan. 
 *                                              If null/omitted, scans the entire document.
 * @param {string} flags.target    - The required ID of the destination container element.
 * @param {boolean} [flags.silent=false] - Toggles console logging and warning messages.
 * 
 * =========================================================================================
 * HTML ATTRIBUTES (Target Container Configuration)
 * =========================================================================================
 * @attribute {string} [data-quote-action="clone"] - Placed on the target element to define behavior.
 *                                                   Accepted values: 'clone' | 'move'.
 *                                                   Defaults to 'clone' if omitted.
 * 
 * @example
 * <!-- HTML Markup Configuration -->
 * <div id="quote-container" data-quote-action="move"></div>
 */const QuoteManager = (function () {
    
    // --- Parameter Defaults ---
    const DEFAULT_FLAGS = {
        source: null,       
        target: '',         
        silent: false       
    };

    // --- Private Implementation Details ---

    /**
     * Finds the first valid chain of sequential blockquotes within a specific context.
     * @param {HTMLElement|Document} searchContext - The DOM node or document root to query.
     */
    function findSequentialBlockquotes(searchContext) {
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

        if (actionFlag === 'move') {
            destinationContainer.appendChild(selectedQuote); // Moves the original HTML element
        } else {
            const deepCloneOfQuote = selectedQuote.cloneNode(true);
            destinationContainer.appendChild(deepCloneOfQuote); // Clones the element (Default)
        }
    }

    // --- Public API ---
    return {
        /**
         * Executes the manager using command-line style options override.
         * @param {Object} flags - Named parameters detailing targets and logs.
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

            // GRABS ATTRIBUTE: Reads data-quote-action from HTML. Defaults to 'clone' if empty or missing.
            const finalAction = targetContainer.dataset.quoteAction || 'clone';

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
    
    // Scans the entire document globally, tracking configuration parameters purely via HTML
    QuoteManager.run({
        target: 'quote-container'
    });
});
