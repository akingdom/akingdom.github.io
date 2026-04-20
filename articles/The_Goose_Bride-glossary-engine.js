// filename: glossary-engine.js
document.addEventListener('DOMContentLoaded', () => {
  (function () {

    // --- CONFIG ---
    const START_SUFFIX = "STARTGLOSSARY";
    const END_SUFFIX = "ENDGLOSSARY";

    const STRIP_ORIGINAL_TAGS = false;         // TRUE = remove glossary entirely
    const STRIP_UNUSED_FROM_GLOSSARY = true;   // only applies if above is FALSE
    const DUMP_DIAGNOSTICS = true;
    const IGNORE_KEYWORD = "SKIP_LINK";

    const glossaryLookup = {};
    const glossaryGroups = [];
    const foundInText = new Set();

    // --- Unicode-safe normalization ---
    const normalizeKey = (str) =>
      str
        .toLowerCase()
        .normalize('NFKD') // (è == ē == e)    
        .replace(/[\u0300-\u036f]/g, '') // strip diacritics only
        .replace(/[–—]/g, '-')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();

    // --- 1. Locate markers ---
    const startNode = document.querySelector(`[id$="${START_SUFFIX}" i]`);
    const endNode = document.querySelector(`[id$="${END_SUFFIX}" i]`);
    if (!startNode || !endNode) return;

    // --- 2. Extract glossary ---
    const range = document.createRange();
    range.setStartAfter(startNode);
    range.setEndBefore(endNode);
    const fragment = range.extractContents();

    // --- 3. Parse glossary ---
    const parseLine = (text, groupIndex) => {
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
          skipLink,
          groupIndex
        };
      }
    };

    let currentGroupIndex = -1;

    fragment.querySelectorAll('h1, h2, h3, h4, h5, h6, li').forEach(el => {
      if (el.tagName.startsWith('H')) {
        glossaryGroups.push(el.textContent.trim());
        currentGroupIndex = glossaryGroups.length - 1;
      } else if (el.tagName === 'LI') {
        parseLine(el.textContent, currentGroupIndex);
      }
    });

    // --- 4. TOKEN MATCHER (NO REGEX MATCHING) ---

    const maxPhraseLength = Math.max(
      ...Object.keys(glossaryLookup).map(k => k.split(' ').length),
      1
    );

    function tokenize(text) {
      return text.split(/(\s+|[^\p{L}\p{N}-]+)/u);
    }

    function matchTerms(tokens) {
      const result = [];

      for (let i = 0; i < tokens.length; i++) {

        let matched = false;

        for (let len = maxPhraseLength; len > 0; len--) {

          const slice = tokens.slice(i, i + len).join('');
          const key = normalizeKey(slice);
          const data = glossaryLookup[key];

          if (data && !data.skipLink && !foundInText.has(key)) {

            result.push({
              type: 'term',
              text: slice,
              data
            });

            foundInText.add(key);
            i += len - 1;
            matched = true;
            break;
          }
        }

        if (!matched) {
          result.push({
            type: 'text',
            text: tokens[i]
          });
        }
      }

      return result;
    }

    // --- 5. WALK TEXT NODES ---

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const p = node.parentElement;
          if (!p || p.closest('.term, h1, h2, h3, h4, h5, h6, a, button, script, style, code')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];
    let curr;
    while ((curr = walker.nextNode())) nodes.push(curr);

    nodes.forEach(node => {
      const text = node.nodeValue;

      if (!text || !text.trim()) return;

      const tokens = tokenize(text);
      const matches = matchTerms(tokens);

      const frag = document.createDocumentFragment();

      matches.forEach(part => {
        if (part.type === 'term') {
          const span = document.createElement('span');
          span.className = 'term';
          span.textContent = part.text;

          span.onclick = (e) => {
            e.stopPropagation();
            showDefinition(part.data.original, part.data.def, span);
          };

          frag.appendChild(span);
        } else {
          frag.appendChild(document.createTextNode(part.text));
        }
      });

      node.parentNode.replaceChild(frag, node);
    });

    // --- 6. DOM RE-ENTRY ---

    if (STRIP_ORIGINAL_TAGS) {
      if (startNode?.parentNode) startNode.remove();
      if (endNode?.parentNode) endNode.remove();
    } else {

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

      if (startNode?.parentNode) startNode.remove();
      if (endNode?.parentNode) endNode.remove();
    }

    // --- 7. DIAGNOSTICS ---

    if (DUMP_DIAGNOSTICS) {
      console.group("Glossary Diagnostic Report");

      const termKeys = Object.keys(glossaryLookup);

      console.log("✅ Linked:", Array.from(foundInText).sort());
      console.log("❌ Unused:", termKeys.filter(t => !foundInText.has(t)).sort());

      let output = "";

      glossaryGroups.forEach((groupTitle, groupIndex) => {
        const items = Array.from(foundInText)
          .filter(key => glossaryLookup[key].groupIndex === groupIndex)
          .sort()
          .map(key => {
            const item = glossaryLookup[key];
            return `- **${item.original}** (${item.def})`;
          });

        if (items.length) {
          output += `### ${groupTitle}\n${items.join('\n')}\n\n`;
        }
      });

      const ungrouped = Array.from(foundInText)
        .filter(key => glossaryLookup[key].groupIndex === -1)
        .sort()
        .map(key => {
          const item = glossaryLookup[key];
          return `- **${item.original}** (${item.def})`;
        });

      if (ungrouped.length) {
        output = `### General / Ungrouped\n${ungrouped.join('\n')}\n\n` + output;
      }

      console.log("📝 Grouped Linked Items:\n" + (output || "None"));
      console.groupEnd();
    }

    // --- 8. TOOLTIP ---

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
