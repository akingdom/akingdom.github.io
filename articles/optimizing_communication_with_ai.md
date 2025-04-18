# Optimizing Communication with AI  
**High Focus, Low Energy - A Developer’s Guide to asking an AI to make specific changes**

## Introduction

Working with AI can be powerful — but also overwhelming, especially when you're tired or maintaining complex systems. Large rewrites or off-topic changes can derail focus and introduce bugs or confusion.  

This guide outlines a structured approach to reduce cognitive load when requesting code edits or help from AI. It’s intended for developers who need to stay focused, especially under low-energy conditions or while preserving fragile logic in their projects.

---

## 📋 Low-Bandwidth Code Change Request Cheat Sheet

Use this quick reference when you're tired, deep in a problem, or just want to keep things surgical and efficient.

### ⚠️ TL;DR

- 🎯 **Stick to the requested change**
- 🚫 **Don’t touch unrelated parts**
- ✂️ **Avoid large rewrites unless asked**
- 🤔 **If unsure, ask first — don’t assume refactors**

---

### 🔐 INVARIANTS – Do Not Change

List any logic, variable names, or structural elements that **must stay unchanged**.

```
🔐 INVARIANTS
- Keep the `direction` variable behavior as `backward`
- Do not change the `sortItems()` method
```

---

### 🩺 SURGICAL EDIT – Focus on One Fix

Call out the *specific issue*, ideally by line number or function.

```
🩺 SURGICAL EDIT
- Fix how `direction` is set between lines 15–20
- Do not modify the surrounding loop
```

---

### 🛠️ PATCH ONLY – No Extras

Request **just the relevant code snippet or diff**. Skip full reprints or refactors.

```
🛠️ PATCH ONLY
- Return only the updated code to correct `direction`
- No explanations unless absolutely needed
```

---

### ⚠️ COGNITIVE LOAD NOTICE

Use this when you’re fatigued or need to be especially careful with change scope.

```
⚠️ COGNITIVE LOAD NOTICE
- I’m low on bandwidth — stick strictly to the current issue
- Do not restructure anything
- Ask before making broader improvements
```

---

### 💡 Tips for Efficient AI Requests

- Use **labels** like `INVARIANTS`, `SURGICAL EDIT`, and `PATCH ONLY`
- **Avoid ripple effects** by clarifying scope early
- **Explicit > Implicit** — name assumptions and constraints
- **Defer major changes** unless clearly requested
- Keep **comments, explanations, and context minimal** when tired

---

### 📝 Real-World Example

```
⚠️ COGNITIVE LOAD NOTICE
- I'm tired — just fix the bug, no enhancements please

🔐 INVARIANTS
- `direction` must stay `backward`
- Do not change `sortItems()` or its structure

🩺 SURGICAL EDIT
- Fix assignment to `direction` on line 15 only

🛠️ PATCH ONLY
- Return only the fixed code, not a whole block rewrite
```

---

## **Discussion**

## **1. Focus on Key Objectives**
### **1.1 Be Clear About the Primary Task**
One of the most effective ways to reduce the cognitive load when interacting with AI is to clearly define the key objective and stick to it. When making a request, outline the specific task, such as:
- "Refactor this function to optimize performance."
- "Provide code that handles edge cases for a specific input."
- "Identify the potential bugs in this section of code and suggest fixes."

### **1.2 Avoid Unnecessary Code Modifications**
The more significant the change, the more careful you need to be about what you request from the AI. For example, avoid asking for a complete overhaul unless absolutely necessary. If the main goal is to modify or optimize part of a code block, focus solely on that section. Avoid requests that ask for comprehensive rewrites unless you are sure they’ll significantly improve the solution.

This can be done by clearly marking the parts of the code that should not change, and by highlighting any aspects that are fundamental to your broader work. For example:
- "Only modify the logic in this function, do not change the overall structure."

## **2. Communicating Constraints and Invariants**
### **2.1 Define Invariants**
In any AI-based development process, there are certain aspects of your code or approach that must remain unchanged. These might be:
- Specific algorithms or patterns you prefer to use.
- Architectural decisions that shouldn't be modified.
- Specific variables or function names that should not be altered.

To help AI maintain focus and avoid unnecessary changes, it’s helpful to explicitly communicate what **should remain invariant**. You can do this by marking invariants clearly, both in your code and in the requests you make.

Example approach:
- "Do not change the function signature or variable names in this block."
- "Ensure the overall architecture remains the same; only optimize the algorithm."

### **2.2 Request for Limited Scope Changes**
When you need a change, be as specific as possible. For instance, if you're asking to fix or improve a function, provide a specific description of the issue:
- "Can you improve the time complexity of this function? Focus only on the loop logic."
- "Please handle the edge case for negative numbers in the following function."

## **3. Handling Exhaustion and Mental Load**
### **3.1 Avoid Overloading with Changes**
When tired or under mental strain, the mental load of reviewing multiple changes to a codebase can quickly become overwhelming. In such cases, focus on specific, well-defined tasks rather than large-scale revisions. If you are handling complex code, consider providing incremental feedback instead of asking for a full rewrite.

### **3.2 Break Tasks into Smaller Parts**
Instead of attempting a major change all at once, break down the task into manageable sections. For example:
- "First, improve the sorting algorithm. Once that’s done, we can work on optimizing the data handling."

### **3.3 Limit Unnecessary Comparisons**
Having to manually re-compare code to previous versions after multiple iterations is mentally taxing. To reduce this effort:
- Request AI to provide minimal changes at a time, only updating the part that requires adjustment.
- Ensure that AI provides a "diff" or highlights the key sections of the updated code, so that you don't need to compare everything.

## **4. Making Feedback and Requirements Clear**
### **4.1 Structuring Requests for Clarity**
The clearer you can be in your initial request, the better the response from the AI will be. Consider using a **structured template** for communicating your needs:
- **Objective**: What is the main task? (e.g., optimize, fix, refactor)
- **Scope**: What specific part of the code needs to be addressed? (e.g., a function, a loop, etc.)
- **Constraints/Invariants**: What must not change? (e.g., variable names, logic structure, etc.)
- **Expected Outcome**: What do you want to achieve? (e.g., improved performance, fixed bug, etc.)

### **4.2 Simplify Revisions with Explicit Feedback**
AI models often propose solutions that involve significant rewrites. Instead of broadly requesting “improvements,” aim for concrete changes like:
- "Refactor the loop to improve efficiency."
- "Fix this bug without altering the function's interface."

Being specific about what should **not change** can be just as important as what should.

## **5. Improving Future Interactions**
### **5.1 Use Reusable Templates for Common Tasks**
Given that many tasks are repetitive (e.g., optimizing functions, bug fixing), creating a **template** or **checklist** of common requests can speed up future interactions and reduce cognitive load. For example:
- **Function Optimization Template**: "Improve this function’s time complexity while keeping the original logic intact. Ensure no changes to variable names."

### **5.2 Save Time with Standard Practices**
Make use of consistent naming conventions, code structure, and common libraries in your communication. This consistency will help both you and the AI focus on solving the specific problem rather than explaining or re-clarifying common practices.

---

## **Conclusion**
Optimizing communication with AI is not just about asking the right questions—it's about structuring your requests, defining clear boundaries, and reducing unnecessary complexity. By taking a strategic approach, you can maximize the benefits of working with AI while minimizing confusion and mental overload. By applying these principles, developers can streamline their work, maintain focus on key tasks, and ensure their energy is directed toward meaningful problem-solving.

---
**Author**: Andrew Kingdom. This paper came about from a discussion with ChatGPT on how better to approach changes.

**AI**: This structure is designed to be comprehensive yet easy to follow, focusing on practical suggestions and examples that will resonate with other AI users and developers who may face similar challenges.

For full licensing terms, visit [Creative Commons CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
