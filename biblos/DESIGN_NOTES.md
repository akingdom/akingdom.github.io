# **Biblos Design Notes**

Biblos is a single‑file, offline‑first Scripture reader.  
These notes outline the principles that guide how it’s built and maintained.

## It’s Just a File

The entire application lives in **one HTML document**. No frameworks, no build steps, no server components. This is a deliberate choice aimed at clarity, durability, and ease of use.

* **One request, fast load.** No dependency chains or module waterfalls.  
* **No tooling required.** Open `index.html` in any browser; edit it with any text editor.  
* **Portable by design.** Works from a USB stick, a static host, or a fully offline cache.

## Offline by Default

Once a translation is loaded, everything runs locally. IndexedDB stores the text, and a service worker can make the reader available without a network. The web platform is the runtime, not a dependency.

## The Text Comes First

USFM (Unified Standard Format Markers) is the source of truth. Biblos **parses and displays** that text as‑is—without additions or interpretation. Strong’s numbers, footnotes, and structural markers appear exactly where the source places them.

## Code for Humans, Predictable for AI

The JavaScript is organised into **small, self‑contained classes**, each with a clear responsibility. No global sprawl, no hidden coupling.

* A developer can scroll to a class and understand its role quickly.  
* An AI assistant can work on a single class (with its JSDoc contract) and make targeted, non‑disruptive changes.

## Fidelity Over Feature Creep

Every addition must support the act of reading and engaging with Scripture. Before introducing anything new, we ask whether it genuinely improves the experience or simply adds surface area.

* The interface stays quiet, typographic, and responsive.  
* The code stays flat, readable, and easy to reason about.

## No Lock‑in, No Cost

MIT licensed. No accounts, tracking, analytics, or ads. You can fork it, embed it, or inspect the source freely.

## Practical Commitments

* **Keep the single‑file promise.** If a feature requires a build step or server, reconsider the approach.  
* **Preserve class boundaries.** New logic belongs in a new class or in the class responsible for the relevant widget. **Existing features should remain intact when updating code.**  
* **Sanitise input early.** All USFM‑derived HTML is cleaned before injection; footnote text is stripped of tags.  
* **Respect the reader’s device.** Avoid heavy polyfills, autoplaying media, or unnecessary DOM churn.

## Inspired by Tradition

“Biblos” comes from the Greek word for “book” or “scroll.” The logo nods to the codex tradition. The design aims to feel as steady and unobtrusive as a well‑printed page.

## Who This Is For

* **Readers** who want a fast, focused Bible.  
* **Developers** who value clarity and simplicity.  
* **AI assistants** that benefit from predictable, well‑documented code.  
* **Distributors** who need a lightweight, offline‑capable resource.
