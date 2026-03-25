# AI Governance Policy  
## Accountability‑First Model for Safe AI Deployment  

**By Andrew Kingdom | Version 1.3 | 2026-03-23 | Public Draft**

---

## Description
A plain‑language governance model for AI systems that enforces real accountability, not just stated responsibility.  
Designed for leaders, policymakers, and organizations deploying AI at scale, with a focus on limiting harm, exposing risk, and ensuring decisions remain traceable to individuals.

**Policy Definition:**  
A policy is a clearly stated guide for decision-making and behavior; it is **not** a technical procedure or detailed instruction, but a signpost showing how we are expected to act responsibly and accountably.

**Interpretation:**  
This policy prioritizes truthful understanding of system limits over speed, scale, or certainty; accountability exists to enforce this, not replace it.

---

## Executive Summary

**Core Rule**  
No AI system is released unless it has survived independent challenge.  
Builders cannot approve their own systems.

**Structure (who holds power)**  
- **Builders** → create systems and must disclose limits and failures  
- **Risk & Integrity Unit** → tests, challenges, and can block release  
- **External Oversight** → audits and publishes findings  
- **Executives** → make final decisions and accept accountability  

**Mandatory Gates (no bypass)**  
1. Capability  
2. Failure  
3. Harm  
4. Independent Review  
5. Monitoring  

**Accountability (enforces, does not replace understanding)**  
- Builders → undisclosed or hidden risks  
- Risk & Integrity Unit → inadequate or weak testing  
- Executives → knowingly accepted risks that resulted in harm  

**Final Principle**  
If we cannot clearly explain a system’s limits, we do not release it.

---

## Full AI Governance Policy (Plain Language Version)

### *Purpose: prevent scaled harm from systems we do not fully understand*

---

## 1. Scope

This policy applies to any AI system that:

* is used in production and directly interfaces with users, **or**
* is used to make or inform an operational, financial, or customer‑facing decision.

No system is exempt based on size, novelty, or commercial pressure.

---

## 2. Core Requirement

> No AI system may be deployed unless it has been independently tested and its limits are clearly understood and documented.  
> This process may not be bypassed for reasons of urgency, competition, or commercial pressure.

The team that builds a system cannot be the final authority on releasing it.

---

## 3. Roles and Authority

### 3.1 Builders (Product & Engineering)

Builders must:

* Describe what the system does and does not do  
* Identify where it fails, misleads, or can be misused  
* Provide evidence from testing, not assumptions  

They must not:

* Hide known issues  
* Overstate capability  

**Accountability:**  
If known, material risks are hidden or misrepresented, the approving executives are accountable for releasing a system without adequate disclosure. Builders who proactively escalate risks in good faith are protected from retaliation.

---

### 3.2 Risk & Integrity Unit (Independent Internal Team)

This team must:

* Test systems under realistic and adverse conditions  
* Challenge assumptions and claims  
* Document risks clearly  

They have authority to:

* Delay or block release  

**Independence & Resources:**  
The unit reports directly to the board (or equivalent governing body), maintains a budget separate from product lines, and has authority to hire its own technical and legal expertise.  
The unit’s performance reviews and compensation must not be tied to the release schedule or commercial success of the products they audit.  
Members may not report into product, engineering, or revenue‑generating functions.

**Accountability:**  
If they approve a system without adequate testing or ignore clear risks, they share responsibility for resulting harm.

---

### 3.3 External Oversight (Independent Review)

For high‑impact systems—those affecting physical safety, fundamental rights (housing, employment, criminal justice, finance), or more than one million users—external review is required.

External review must occur **prior to deployment**, not after release.  
Findings, including disagreements, must be published.

**Accountability:**  
If oversight is compromised or withheld, the issue must be disclosed and the body replaced.

---

### 3.4 Executive Decision‑Makers

Executives must:

* Review a one‑page **Executive Risk Summary** prepared by the Risk & Integrity Unit, which distills the top 3–5 risks, their potential impact, and the rationale for acceptance  
* Confirm in writing that they understand and accept those risks  

They must not:

* Claim lack of awareness after approval  
* Override risk findings without justification  

**Overriding a Risk & Integrity Block:**  
If the unit blocks release, an override requires unanimous approval from a cross‑functional committee (e.g., CEO, Chief Risk Officer, board member) and triggers an automatic external audit.  
The override and its justification must be disclosed publicly **before** deployment.

**Accountability:**  
If harm occurs from known risks, executives are personally accountable and may be subject to internal and external consequences.

---

## 4. Required Release Process

### 4.1 Capability Statement

Clear description of:

* what the system can do  
* what it appears to do but cannot reliably do  
* whether the system requires human verification or operates autonomously, and the protocol for emergency deactivation  

---

### 4.2 Failure and Misuse Report

Document:

* known failure modes  
* likely misuse scenarios  
* conditions where outputs may mislead  
* known biases, gaps, or legal risks (e.g., copyright or privacy concerns) in the underlying training data  

---

### 4.3 Harm Testing

Must include:

* realistic user scenarios  
* attempts to misuse or break the system  
* evaluation of real‑world impact  

---

### 4.4 Independent Review

Risk & Integrity Unit must:

* verify testing  
* confirm risks are disclosed  

High‑impact systems must also undergo external review.

---

### 4.5 Deployment Controls

Systems must include:

* usage limits where needed  
* monitoring for errors and misuse  
* ability to pause or roll back quickly  

---

### 4.6 Controlled Deployment (Optional Path)

For systems where real‑world learning is necessary before full release, a **Controlled Deployment** may be authorized. This requires:

* All previous gates (4.1–4.5) satisfied  
* A defined, limited user group  
* Enhanced monitoring and a mandatory pause clause  
* An explicit time limit or conditions for moving to full deployment  

Controlled deployments are not a bypass; they are a strictly supervised way to gather live data under controlled conditions.

---

## 5. Post‑Deployment Requirements

After release:

* Monitor for errors, misuse, and over‑reliance  
* Escalate significant issues to the Risk & Integrity Unit and Executives **within 72 hours**  
* Disclose major failures publicly within the same timeframe  

---

## 6. Records and Transparency

Record all major decisions, including:

* risks identified  
* objections raised  
* approvals made  

Records must be:

* time‑stamped  
* preserved without alteration  

---

## 7. Independent Appeals Mechanism

Any Builder or external party may appeal a decision made under this policy—such as a block, an override, or a finding of non‑compliance—to the External Oversight body or a designated board committee.  
Appeals must be acknowledged within 15 days and resolved within a reasonable timeframe.  
Retaliation against an appellant is prohibited.

---

## 8. Reporting and Protection

Provide clear reporting channels:

* internal  
* external (for serious concerns)  

Retaliation against reporting is prohibited and penalized.

---

## 9. Enforcement

Violations include:

* hiding or minimizing risks  
* bypassing required steps  
* misrepresenting capability  

**Consequences may include:**

* removal from role  
* financial penalties  
* external reporting to authorities  

Disciplinary measures are applied progressively to encourage learning and improvement.  
Progressive discipline does not apply in cases of intentional concealment or fraud.

---

## 10. Guiding Principle

> If we do not understand a system well enough to explain its limits clearly, we do not release it.  
> If harm appears, we act immediately—not after justification or delay.  
> Accountability exists to uphold this standard, not to compensate for its absence.

---

## Version History

- v1.0 (2026‑03‑23) – Initial release  
- v1.2 (2026‑03‑23) – Amendments following two rounds of review by 4 x AIs: refined scope, strengthened override process, defined high‑impact systems, added controlled deployment path, specified monitoring escalation timeframe, established independent appeals mechanism, formalized executive risk summary, and clarified unit independence.
- v1.3 (2026-03-23) – Rebalanced to clarify that accountability enforces, but does not replace, truthful understanding of system limits

---

## Intended Use

This document may be:

* adopted directly by organizations  
* adapted into internal policy or regulatory frameworks  
* used as a baseline for AI governance discussions  

---

## Authorship & Accountability

Authored and published by:

**Andrew Kingdom**

The author accepts responsibility for the ideas and structure presented herein.  
Organizations adopting this policy retain full responsibility for its implementation and outcomes.

---

## License

MIT License

Copyright (c) 2026 Andrew Kingdom

Permission is hereby granted, free of charge, to any person obtaining a copy
of this document to use, copy, modify, and distribute it, subject to the following condition:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the document.

THE DOCUMENT IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NON-INFRINGEMENT.

---

## Attribution

If you use or adapt this policy, attribution is appreciated:

“Based on AI Governance Policy by Andrew Kingdom”

---

## Notes

* This document intentionally uses plain language to prevent ambiguity.  
* It is designed to make accountability visible and enforceable.  
* It assumes human judgment is fallible and structures must compensate for that.

---

## Feedback

Issues and discussion can be raised via [GitHub Issues in this repository](https://github.com/akingdom/akingdom.github.io/issues).
