# The Class‑Based Single‑File Architecture
*Build maintainable, AI‑ready web applications without a 'build' step*

## 1. The Problem

You have a working web application—maybe a small tool, a data viewer, or a utility.  
It’s all in one HTML file because that was the fastest way to get it working.  
But now the codebase is growing: global functions are tangled, state is scattered, and making a small change means reading through hundreds of lines.

At the same time, you care about:

- **Load speed** – many modules means many HTTP requests.  
- **Developer experience** – opening ten files to fix a bug is exhausting.  
- **AI collaboration** – modern coding assistants have limited context windows; feeding them a 2000‑line monolith causes mistakes.

The typical answer is “split everything into ES modules” – but that introduces new problems: tooling overhead, network waterfalls, and a level of ceremony that can slow down a solo developer or a small team.

Is there a middle way?

## 2. The Core Idea

> **Keep a single file for deployment, but organise the code inside as if it were a modular project.**

This means:

- One HTML document (or a single entry script).  
- Zero build step.  
- Instant loading – no network waterfall.  
- Internally, the JavaScript is divided into **self‑contained classes**, each responsible for exactly one part of the application.

The result is a codebase that is *modular in thought, singular in delivery*.

## 3. The Anatomy of the Pattern

Let’s break down the concrete practices that make this work.

### 3.1 Classes as Concern Containers

Every major area of the UI or logic becomes a class.

| Concern | Example Class |
|---------|---------------|
| Application state & localStorage | `AppState` |
| Data loading & caching | `DataLoader` |
| Core algorithm / parser | `Parser` (static methods) |
| Rendering of the main content | `Renderer` |
| Navigation (dropdowns, buttons) | `Navigator` |
| Full‑text search | `SearchManager` |
| Text‑to‑speech | `SpeechController` |
| A specific widget (QR code, sidebar) | `QRManager`, `Sidebar` |
| Wiring & initialisation | `App` (orchestrator) |

Each class is placed in a clearly labelled section of the file, making it easy for a human to scroll to the right place and for an AI assistant to receive only that section as context.

### 3.2 Constructor Injection for Dependencies

A class never reaches out to a global variable for another component. It receives exactly what it needs through its constructor.

```js
class Renderer {
  constructor(state, parser, qrManager, contentElement) {
    this.state = state;
    this.parser = parser;
    this.qr = qrManager;
    this.el = contentElement;
  }
}
```

This makes dependencies explicit. You can see at a glance what a class depends on. It also makes testing trivial – you pass in a mock DOM element or a stub state object.

### 3.3 The Shadow Interface (JSDoc Contract)

Right above every class, write a short JSDoc comment that summarises:

- **What it needs** (input).  
- **What it produces** (output).  
- **What side‑effects it has** (DOM changes, network, storage).

```js
/**
 * SearchManager – Handles search input and results display.
 * Input: AppState, a navigateTo function
 * Output: populates #search-results, triggers navigation
 * Side‑effects: DOM manipulation, calls parseUSFM
 */
class SearchManager { ... }
```

This “shadow interface” acts as a contract for both human developers and AI. When you need to modify the class, you can read the contract first and immediately understand its boundaries.

### 3.4 Widget Ownership: One Class, One Piece of the DOM

No class touches another class’s HTML unless through a public method. Each class “owns” a specific element or region.

- `Renderer` writes to `#content`.  
- `NoteManager` controls the bottom bar when a footnote is open.  
- `SearchManager` owns the search input and results list.

This is far more intuitive than splitting UI and logic into separate layers (a “view layer” that every logic class talks to). For a small‑to‑medium project, the overhead of a dedicated view layer isn’t worth it.

### 3.5 Direct Method Calls, Not Event Buses

Classes communicate by calling methods on each other directly, using the references they received via constructor injection.

```js
// Orchestrator wires them:
this.navigator.navigateTo(book, chapter);    // triggers render
this.searchManager.handleSearch(event);      // triggers navigation
```

There is no custom event bus, no pub‑sub, no flux store. The call stack is visible in your browser’s debugger. This makes the flow of control predictable and easy to follow for both humans and AI.

### 3.6 Input → Processing → Output within Each Class

Even within a single class, follow the IPO pattern:

- **Input** – method parameters, state reads.  
- **Processing** – internal logic, pure helpers.  
- **Output** – state writes, DOM updates, calls to other services.

For example, `SpeechController.play()`:

1. **Input**: checks `this.isSpeaking`, reads the current verse block from the DOM.  
2. **Processing**: calculates resume position, creates an utterance.  
3. **Output**: sets `this.isSpeaking`, updates the play button icon, starts speaking.

This keeps methods clean and predictable.

### 3.7 The Orchestrator

At the top level, an `App` class (or a simple `window.onload` function) does three things:

1. **Creates** all the instances in dependency order.  
2. **Wires** them together (passes references).  
3. **Binds** global events (keyboard shortcuts, window resize) to the appropriate methods.

Everything else lives inside the classes.

## 4. Why This Works for Humans and AI

### For the Human Developer

- **One file** – no switching tabs, no complex directory structure.  
- **Clear sections** – any editor’s “Go to Symbol” or simple search for “class” gives you a table of contents.  
- **Explicit dependencies** – you never wonder “where does this variable come from?”  
- **Easy to debug** – the call stack is not hidden behind events or middleware.

### For the AI Assistant

- **Reduced context** – you can give it a single class (60–150 lines) and it has everything it needs.  
- **Shadow interface** – the JSDoc tells the AI the class’s contract without forcing it to infer from the whole codebase.  
- **No hidden globals** – the AI cannot accidentally break something two classes away because dependencies are injected.

When you ask an AI to fix a bug in the search, you supply only `SearchManager` and maybe the two‑line `AppState` definition. That’s it.

## 5. Getting There: Progressive Refactoring

If you already have a monolithic script, you don’t have to rewrite it all at once. Follow a stage‑by‑stage plan:

1. **Extract pure logic** first – the parser or data transformation functions. They have no DOM dependencies and are easiest to encapsulate into static methods.  
2. **Centralise state** – move all global variables into a single `AppState` class. Keep property names the same; existing code still works.  
3. **Wrap simple widgets** – QR code, footnote bar, voice sidebar. They are self‑contained and low‑risk.  
4. **Data loading** – encapsulate IndexedDB or fetch logic into a `DataLoader` class.  
5. **The renderer** – the heart of the UI; move it into a class that receives state and a parser.  
6. **Navigation & search** – dropdown logic, search input handling.  
7. **Complex subsystems** – text‑to‑speech.  
8. **Orchestrator** – finally, remove all global wiring and let `App` do it.

At each stage, keep the old global function as an alias that delegates to the class method. Test after every stage. You never break the running application.

## 6. When to Use This Pattern

This pattern shines for **small‑to‑medium client‑side applications** that:

- Are under ~2000 lines of JavaScript.  
- Have a single developer or a very small team.  
- Value fast load times and offline capability.  
- Are maintained with the help of AI assistants.  
- Don’t yet need code splitting or a full build pipeline.

Examples: data viewers, interactive tools, browser‑based games, dashboards, scripture readers, documentation browsers.

## 7. When to Split into Multiple Files

The single‑file approach works until it doesn’t. Consider splitting when:

- The file grows beyond ~2500 lines and becomes hard to scroll.  
- You need to lazy‑load parts of the application for performance.  
- Multiple people are working on different sections simultaneously and merge conflicts become frequent.  
- You are ready to introduce a lightweight build step (e.g., a simple concatenation script, or ES modules with a bundler).

Even then, the internal class structure remains the same. You simply move each class to its own file and add `import`/`export`. No logic changes. The pattern is future‑proof.

## 8. Summary

The Single‑File Class Architecture is a pragmatic compromise:

- **For the network**: one request, instant load.  
- **For the developer**: clear code, no tooling, easy to navigate.  
- **For the AI**: bite‑sized context, explicit contracts.

It’s not about avoiding modularity—it’s about achieving it without the ceremony that usually accompanies it. If your project is small enough to fit in a room, you don’t need a skyscraper’s plumbing.

---

*This pattern emerged from a real‑world refactoring of a 2000-line web app in preparation for future expansion/extension, which the author thought useful to share. The principles apply to any client‑side app that values simplicity, speed, and clarity. This is a useful approach but not a new one - many existing systems are built along similar lines to this guide.*
