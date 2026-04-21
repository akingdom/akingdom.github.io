// filename: glossary-engine.js
document.addEventListener('DOMContentLoaded', () => {
  (function () {

    // --- CONFIG ---
    const START_SUFFIX = "STARTGLOSSARY";
    const END_SUFFIX = "ENDGLOSSARY";

    const STRIP_ORIGINAL_TAGS = false;
    const STRIP_UNUSED_FROM_GLOSSARY = true;
    const DUMP_DIAGNOSTICS = true;
    const IGNORE_KEYWORD = "SKIP_LINK";

    const glossaryLookup = {};
    const glossaryGroups = [];
    const foundInText = new Set();

    // --- NORMALIZE ---
    const normalizeKey = (str) =>
      str
        .toLowerCase()
        .replace(/[–—]/g, '-')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();

    // --- TOKENIZER ---
    function tokenize(text) {
      return text.match(/[\p{L}\p{N}]+|[^\p{L}\p{N}]+/gu) || [];
    }

    // --- BUILD TERM INDEX (for multi-word support) ---
    const termIndex = {}; // first-word → [ { words:[], key } ]

    function registerVariant(variant, data) {
      const words = normalizeKey(variant).split(' ');
      if (!words.length) return;

      const first = words[0];
      if (!termIndex[first]) termIndex[first] = [];

      termIndex[first].push({
        words,
        key: normalizeKey(variant),
        data
      });
    }

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

      const pluralMatch = raw.match(/(?:plural|pl\.)\s*:\s*([^;,)]+)/i);
      const altMatch = raw.match(/alt\s*:\s*([^;,)]+)/i);

      const variants = [
        term,
        ...(pluralMatch ? pluralMatch[1].split(',') : []),
        ...(altMatch ? altMatch[1].split(',') : [])
      ].map(v => v.trim()).filter(Boolean);

      variants.forEach((variant, i) => {
        const key = normalizeKey(variant);

        if (!glossaryLookup[key]) {
          glossaryLookup[key] = {
            original: term,
            def: definition,
            skipLink,
            groupIndex
          };

          registerVariant(variant, glossaryLookup[key]);
        }
      });
    };

    let currentGroupIndex = -1;

    fragment.querySelectorAll('h1,h2,h3,h4,h5,h6,li').forEach(el => {
      if (el.tagName.startsWith('H')) {
        glossaryGroups.push(el.textContent.trim());
        currentGroupIndex = glossaryGroups.length - 1;
      } else {
        parseLine(el.textContent, currentGroupIndex);
      }
    });

    // --- MATCH TERMS (token-based, multi-word) ---
    function matchTerms(tokens) {
      const results = [];

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (!/[\p{L}\p{N}]/u.test(token)) continue;

        const word = normalizeKey(token);
        const candidates = termIndex[word];
        if (!candidates) continue;

        for (const candidate of candidates) {
          const { words, key, data } = candidate;

          let match = true;

          for (let j = 0; j < words.length; j++) {
            const t = tokens[i + j];
            if (!t || normalizeKey(t) !== words[j]) {
              match = false;
              break;
            }
          }

          if (match) {
            results.push({
              index: i,
              length: words.length,
              key,
              data
            });
          }
        }
      }

      return results;
    }

    // --- 4. Scan DOM ---
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        const p = node.parentElement;
        if (!p || p.closest('.term, h1,h2,h3,h4,h5,h6,a,button,script,style,code')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let curr;
    while ((curr = walker.nextNode())) nodes.push(curr);

    nodes.forEach(node => {
      const tokens = tokenize(node.nodeValue);
      const matches = matchTerms(tokens);

      if (!matches.length) return;

      const frag = document.createDocumentFragment();
      let i = 0;

      while (i < tokens.length) {
        const match = matches.find(m => m.index === i);

        if (match) {
          const text = tokens.slice(i, i + match.length).join('');
          const data = match.data;

          if (data.skipLink) {
            frag.appendChild(document.createTextNode(text));
          } else {
            const span = document.createElement('span');
            span.className = 'term';
            span.textContent = text;

            span.onclick = (e) => {
              e.stopPropagation();
              showDefinition(data.original, data.def, span);
            };

            frag.appendChild(span);
            foundInText.add(match.key);
          }

          i += match.length;
        } else {
          frag.appendChild(document.createTextNode(tokens[i]));
          i++;
        }
      }

      node.parentNode.replaceChild(frag, node);
    });

    // --- 5. DOM RE-ENTRY ---
    if (STRIP_ORIGINAL_TAGS) {
      startNode.remove();
      endNode.remove();
    } else {
      const wrapper = document.createElement('div');
      wrapper.className = 'glossary-source-area';

      if (STRIP_UNUSED_FROM_GLOSSARY) {
        fragment.querySelectorAll('li').forEach(li => {
          const text = normalizeKey(li.textContent);

          const isUsed = Array.from(foundInText).some(t => text.includes(t));
          const isSkipped = Object.keys(glossaryLookup).some(k =>
            glossaryLookup[k].skipLink && text.includes(k)
          );

          if (!isUsed && !isSkipped) li.remove();
        });
      }

      wrapper.appendChild(fragment);

      if (startNode.parentNode) {
        startNode.parentNode.insertBefore(wrapper, startNode.nextSibling);
      }

      startNode.remove();
      endNode.remove();
    }

    // --- 6. Diagnostics ---
    if (DUMP_DIAGNOSTICS) {
      console.group("Glossary Diagnostic Report");
      console.log("✅ Linked:", Array.from(foundInText));
      console.log("❌ Unused:", Object.keys(glossaryLookup).filter(k => !foundInText.has(k)));
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

      tooltip.style.position = 'absolute';
      tooltip.style.top = `${rect.bottom + scrollY + 8}px`;
      tooltip.style.left = `${rect.left}px`;

      const hide = () => {
        tooltip.classList.remove('show');
        document.removeEventListener('click', hide);
      };

      setTimeout(() => document.addEventListener('click', hide), 100);
    }

  })();
});