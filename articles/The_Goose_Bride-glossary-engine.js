// filename: glossary-engine.js
document.addEventListener('DOMContentLoaded', () => {
  (function() {

    // --- CONFIGURATION ---
    const START_SUFFIX = "STARTGLOSSARY";
    const END_SUFFIX = "ENDGLOSSARY";

    const STRIP_ORIGINAL_TAGS = false;          // TRUE = remove glossary entirely
    const STRIP_UNUSED_FROM_GLOSSARY = true;   // only applies if above is FALSE
    const DUMP_DIAGNOSTICS = true;
    const IGNORE_KEYWORD = "SKIP_LINK";

    const glossaryLookup = {};
    const foundInText = new Set();

    const normalizeKey = (str) =>
      str
        .toLowerCase()
        .replace(/[–—]/g, '-')        // normalize dashes FIRST
        .replace(/[^\w\s-]/g, '')     // strip punctuation
        .replace(/\s+/g, ' ')
        .trim();

    // --- 1. Locate Markers ---
    const startNode = document.querySelector(`[id$="${START_SUFFIX}" i]`);
    const endNode = document.querySelector(`[id$="${END_SUFFIX}" i]`);
    if (!startNode || !endNode) return;

    // --- 2. Extract Glossary ---
    const range = document.createRange();
    range.setStartAfter(startNode);
    range.setEndBefore(endNode);
    const fragment = range.extractContents();

    // --- 3. Parse Glossary ---
    const parseLine = (text) => {
      let raw = text.trim();

      const skipLink = raw.includes(IGNORE_KEYWORD);
      raw = raw.replace(IGNORE_KEYWORD, '').trim();

      const termMatch = raw.match(/^(.+?)(?:\s*\(|\s*–|$)/);
      if (!termMatch) return;

      const term = termMatch[1].trim();

      let defMatch = raw.match(/\((.*?)\)/);
      let definition = defMatch ? defMatch[1].trim() : '';

      if (!definition) {
        const dashSplit = raw.split('–');
        if (dashSplit.length > 1) {
          definition = dashSplit.slice(1).join('–').trim();
        }
      }

      const key = normalizeKey(term);

      if (!glossaryLookup[key]) {
        glossaryLookup[key] = {
          original: term,
          def: definition,
          skipLink
        };
      }
    };

    fragment.querySelectorAll('li').forEach(li => parseLine(li.textContent));

    // --- 4. Scan & Link Terms ---
    const termKeys = Object.keys(glossaryLookup).sort((a, b) => b.length - a.length);
    const linkableKeys = termKeys.filter(k => !glossaryLookup[k].skipLink);

    if (linkableKeys.length > 0) {

      const pattern = new RegExp(
        `(?<!\\w)(${linkableKeys
          .map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
          .join('|')})(?!\\w)`,
        'gi'
      );

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const p = node.parentElement;
          if (!p || p.closest('.term, h1, h2, h3, h4, h5, h6, a, button, script, style, code')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      const nodes = [];
      let curr;
      while ((curr = walker.nextNode())) nodes.push(curr);

      const alreadyLinked = new Set();

      nodes.forEach(node => {
        const text = node.nodeValue;

        pattern.lastIndex = 0;
        if (!pattern.exec(text)) return;
        pattern.lastIndex = 0;

        const newFrag = document.createDocumentFragment();
        let lastIdx = 0;
        let match;

        while ((match = pattern.exec(text)) !== null) {

          newFrag.appendChild(
            document.createTextNode(text.substring(lastIdx, match.index))
          );

          const matchedWord = match[0];
          const key = normalizeKey(matchedWord);
          const data = glossaryLookup[key];

          if (!data) {
            newFrag.appendChild(document.createTextNode(matchedWord));
            lastIdx = pattern.lastIndex;
            continue;
          }

          if (alreadyLinked.has(key)) {
            newFrag.appendChild(document.createTextNode(matchedWord));
          } else {
            const span = document.createElement('span');
            span.className = 'term';
            span.textContent = matchedWord;

            span.onclick = (e) => {
              e.stopPropagation();
              showDefinition(data.original, data.def, span);
            };

            newFrag.appendChild(span);
            alreadyLinked.add(key);
            foundInText.add(key);
          }

          lastIdx = pattern.lastIndex;
        }

        newFrag.appendChild(
          document.createTextNode(text.substring(lastIdx))
        );

        node.parentNode.replaceChild(newFrag, node);
      });
    }

    // --- 5. DOM RE-ENTRY (FINAL LOGIC) ---

    // MODE A: Remove glossary entirely
    if (STRIP_ORIGINAL_TAGS) {
      if (startNode && startNode.parentNode) startNode.remove();
      if (endNode && endNode.parentNode) endNode.remove();
    }

    // MODE B: Keep + clean glossary
    else {
      const resultWrapper = document.createElement('div');
      resultWrapper.className = 'glossary-source-area';

      if (STRIP_UNUSED_FROM_GLOSSARY) {
        fragment.querySelectorAll('li').forEach(li => {
          const liText = normalizeKey(li.textContent);

          const isUsed = Array.from(foundInText).some(term => liText.includes(term));
          const isSkipped = Object.keys(glossaryLookup).some(k =>
            glossaryLookup[k].skipLink && liText.includes(k)
          );

          if (!isUsed && !isSkipped) li.remove();
        });

        fragment.querySelectorAll('ul, ol').forEach(list => {
          if (list.children.length === 0) list.remove();
        });
      }

      resultWrapper.appendChild(fragment);

      const parentP = startNode.closest('p');

      if (parentP && parentP.parentNode) {
        parentP.parentNode.insertBefore(resultWrapper, parentP.nextSibling);
      } else if (startNode.parentNode) {
        startNode.parentNode.insertBefore(resultWrapper, startNode.nextSibling);
      }

      if (startNode && startNode.parentNode) startNode.remove();
      if (endNode && endNode.parentNode) endNode.remove();
    }

    // --- 6. Diagnostics ---
    if (DUMP_DIAGNOSTICS) {
      console.group("Glossary Diagnostic Report");
      console.log("✅ Linked:", Array.from(foundInText).sort());
      console.log("❌ Unused:", termKeys.filter(t => !foundInText.has(t)).sort());
      
      // Generate the formatted list from found terms
      const formattedOutput = Array.from(foundInText)
        .sort()
        .map(key => {
          const item = glossaryLookup[key];
          return `- **${item.original}** (${item.def})`;
        })
        .join('\n');

      console.log("📝 Formatted Linked Items:\n" + (formattedOutput || "None"));
      console.groupEnd();
    }

    // --- Tooltip ---
    let tooltip = document.querySelector('.definition-tooltip') || document.createElement('div');

    if (!tooltip.parentElement) {
      tooltip.className = 'definition-tooltip';
      document.body.appendChild(tooltip);
    }

    function showDefinition(term, def, target) {
      tooltip.innerHTML = `<strong>${term}</strong><br>${def}`;
      tooltip.classList.add('show');

      const rect = target.getBoundingClientRect();
      const scrollY = window.pageYOffset;

      if (window.innerWidth >= 640) {
        tooltip.style.position = 'absolute';
        tooltip.style.top = `${rect.bottom + scrollY + 8}px`;
        tooltip.style.left = `${rect.left}px`;
      }

      const hide = () => {
        tooltip.classList.remove('show');
        document.removeEventListener('click', hide);
      };

      setTimeout(() => document.addEventListener('click', hide), 100);
    }

  })();
});

