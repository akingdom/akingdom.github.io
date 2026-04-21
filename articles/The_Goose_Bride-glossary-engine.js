// filename: glossary-engine.js
document.addEventListener('DOMContentLoaded', () => {
  (function () {

    // --- CONFIGURATION ---
    const START_SUFFIX = "STARTGLOSSARY";
    const END_SUFFIX = "ENDGLOSSARY";

    const STRIP_ORIGINAL_TAGS = false;
    const STRIP_UNUSED_FROM_GLOSSARY = true;
    const DUMP_DIAGNOSTICS = true;
    const IGNORE_KEYWORD = "SKIP_LINK";

    const glossaryLookup = {};
    const glossaryGroups = [];
    const foundInText = new Set();

    // --- NORMALISATION ---
    const normalizeKey = (str) =>
      str
        .toLowerCase()
        .replace(/[–—]/g, '-')
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();

    function termMatch(raw) {
      return raw.match(/^(.+?)(?:\s*\(|\s*–|$)/);
    }

    function safeInsertAfter(referenceNode, newNode) {
      if (!referenceNode || !referenceNode.parentNode) return false;
      const parent = referenceNode.parentNode;
      if (referenceNode.nextSibling) {
        parent.insertBefore(newNode, referenceNode.nextSibling);
      } else {
        parent.appendChild(newNode);
      }
      return true;
    }

    // --- MARKERS ---
    const startNode = document.querySelector(`[id$="${START_SUFFIX}" i]`);
    const endNode = document.querySelector(`[id$="${END_SUFFIX}" i]`);
    if (!startNode || !endNode) return;

    // --- EXTRACT ---
    const range = document.createRange();
    range.setStartAfter(startNode);
    range.setEndBefore(endNode);
    const fragment = range.extractContents();

    // --- PARSE (Structured Data) ---
    const parseLine = (text, groupIndex) => {
      let raw = text.trim();
    
      const skipLink = raw.includes(IGNORE_KEYWORD);
      raw = raw.replace(IGNORE_KEYWORD, '').trim();
    
      const termMatchResult = termMatch(raw);
      if (!termMatchResult) return;
    
      const term = termMatchResult[1].trim();
      let altPart = null;
      let description = '';
    
      // Keywords that identify an "alternate" section
      const altKeywords = /^(pl\.|plural|alt\.|alternate|sing\.|singular|Lat\.|obs\.)/i;
    
      const defMatch = raw.match(/\((.*?)\)/);
      if (defMatch) {
        const inner = defMatch[1].trim();
        
        // Split by semicolon
        if (inner.includes(';')) {
          const parts = inner.split(';');
          const firstPart = parts[0].trim();
          
          // ONLY treat as an alternate if it starts with one of our keywords
          if (altKeywords.test(firstPart)) {
            altPart = firstPart.replace(/:$/, ''); // Clean up trailing colons
            description = parts.slice(1).join(';').trim();
          } else {
            // Otherwise, the whole thing is just a definition containing a semicolon
            description = inner;
          }
        } else {
          description = inner;
        }
      } else {
        const dashSplit = raw.split('–');
        if (dashSplit.length > 1) {
          description = dashSplit.slice(1).join('–').trim();
        }
      }
    
      const key = normalizeKey(term);
    
      if (!glossaryLookup[key]) {
        glossaryLookup[key] = {
          original: term,
          alt: altPart,
          desc: description,
          skipLink,
          groupIndex
        };
      }
    };

    let currentGroupIndex = -1;
    fragment.querySelectorAll('h1,h2,h3,h4,h5,h6,li').forEach(el => {
      if (/^H/i.test(el.tagName)) {
        glossaryGroups.push(el.textContent.trim());
        currentGroupIndex = glossaryGroups.length - 1;
      } else {
        parseLine(el.textContent, currentGroupIndex);
      }
    });

    const linkableKeys = Object.keys(glossaryLookup).filter(k => !glossaryLookup[k].skipLink);
    const termSet = new Set(linkableKeys);
    const maxWords = Math.max(...linkableKeys.map(k => k.split(' ').length), 1);

    // --- MATCH ENGINE ---
    function matchAt(text, index) {
      const slice = text.slice(index);
      if (index > 0 && /[\p{L}\p{N}]/u.test(text[index - 1])) return null;

      const regex = /[\p{L}\p{N}-]+/gu;
      const matches = [];
      let m;
      
      while ((m = regex.exec(slice)) !== null && matches.length < maxWords) {
        if (matches.length === 0 && m.index !== 0) break; 
        matches.push({
          word: m[0],
          startOffset: m.index,
          endOffset: m.index + m[0].length
        });
      }

      if (matches.length === 0) return null;

      for (let len = matches.length; len > 0; len--) {
        const currentSet = matches.slice(0, len);
        const candidateWords = currentSet.map(m => m.word);
        const candidate = normalizeKey(candidateWords.join(' '));

        if (termSet.has(candidate)) {
          const lastWord = currentSet[len - 1];
          return {
            key: candidate,
            match: slice.slice(currentSet[0].startOffset, lastWord.endOffset),
            consumeLength: lastWord.endOffset
          };
        }
      }
      return null;
    }

    // --- SCAN ---
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const p = node.parentElement;
        if (!p || p.closest('.term,h1,h2,h3,h4,h5,h6,a,button,script,style,code')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    for (const node of nodes) {
      const text = node.nodeValue;
      const frag = document.createDocumentFragment();
      let i = 0;

      while (i < text.length) {
        const match = matchAt(text, i);
        if (!match) {
          frag.appendChild(document.createTextNode(text[i]));
          i++;
        } else {
          const data = glossaryLookup[match.key];
          const span = document.createElement('span');
          span.className = 'term';
          span.textContent = match.match;

          span.onclick = (e) => {
            e.stopPropagation();
            showDefinition(data, span); // Pass the whole data object
          };

          frag.appendChild(span);
          foundInText.add(match.key);
          i += match.consumeLength;
        }
      }
      node.parentNode.replaceChild(frag, node);
    }

    // --- GLOSSARY OUTPUT ---
    const wrapper = document.createElement('div');
    wrapper.className = 'glossary-source-area';

    if (!STRIP_ORIGINAL_TAGS) {
      if (STRIP_UNUSED_FROM_GLOSSARY) {
        fragment.querySelectorAll('li').forEach(li => {
          const key = normalizeKey(li.textContent);
          const used = [...foundInText].some(k => key.includes(k));
          const skipped = Object.keys(glossaryLookup).some(k => glossaryLookup[k].skipLink && key.includes(k));
          if (!used && !skipped) li.remove();
        });
        fragment.querySelectorAll('ul,ol').forEach(list => { if (!list.children.length) list.remove(); });
      }
      wrapper.appendChild(fragment);
      safeInsertAfter(endNode, wrapper);
    }
    
    startNode?.remove();
    endNode?.remove();

    // --- TOOLTIP ---
    let tooltip = document.querySelector('.definition-tooltip') || document.createElement('div');
    tooltip.className = 'definition-tooltip';
    if (!tooltip.parentNode) document.body.appendChild(tooltip);

    function showDefinition(data, target) {
      // Logic: If alt exists, wrap it in em and follow with semicolon. Otherwise, just description.
      const altHtml = data.alt ? `<em>${data.alt}</em> ` : '';
      
      tooltip.innerHTML = `<strong>${data.original}</strong> ${altHtml}<br>${data.desc}`;
      tooltip.classList.add('show');

      const r = target.getBoundingClientRect();
      tooltip.style.position = 'absolute';
      tooltip.style.top = `${r.bottom + window.scrollY + 8}px`;
      tooltip.style.left = `${r.left}px`;

      const hide = () => {
        tooltip.classList.remove('show');
        document.removeEventListener('click', hide);
      };
      setTimeout(() => document.addEventListener('click', hide), 50);
    }

    // --- DIAGNOSTICS ---
    if (DUMP_DIAGNOSTICS) {
      console.group("Glossary Engine");
      console.log("Linked:", [...foundInText]);
      console.groupEnd();
    }

  })();
});