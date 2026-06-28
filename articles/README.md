<!--
INSTRUCTIONS TO RE-CREATE THIS CATEGORISED TABLE OF CONTENTS

1. SOURCE FILES
   - Fetch all .md files from the /articles directory of the GitHub repository:
     https://github.com/akingdom/akingdom.github.io/tree/main/articles

2. DEFINE SUMMARIES
   - For each .md file, write a 1‑2 sentence summary based on:
     a) The file name
     b) Any available commit messages or inferred context
     c) Manual review of the article content if accessible

3. ASSIGN CATEGORIES
   - Place every article into ONE of these seven thematic groups:
     1. 💼 Business & Strategy
     2. ⚙️ Technology & AI
     3. 🌍 Governance, Peace & Society
     4. 🧠 Spirituality, Trauma & Healing
     5. 📜 History, Space & Humanities
     6. ✍️ Literature, Folklore & Writing Craft
     7. 🏥 Health & Miscellaneous

4. SORT WITHIN CATEGORIES
   - Alphabetically by filename (A‑Z) within each category

5. FORMAT AS MARKDOWN
   - Use a ### heading for each category name
   - Use a Markdown table with two columns: | Filename | Summary |
   - For the Filename column, create a relative hyperlink:
     [display_name](display_name)  →  e.g., [AI_Governance...](AI_Governance...)
     (assumes the .md files are in the same directory as this TOC file)

6. TITLE CLEANUP
   - Convert all filenames to Title Case (capitalise major words) for display
   - Replace underscores with spaces in the displayed title
   - Keep the underlying filename unchanged for the hyperlink
   - Examples:
     - "AI_Governance_Policy_Accountability_First" → "AI Governance Policy Accountability First"
     - "change_imperitive" → "Change Imperitive"
     - "the_times_1820_feb_09" → "The Times 1820 Feb 09"

7. FINAL OUTPUT
   - Combine all categories into a single Markdown document
   - Ensure links are functional when viewed on GitHub or a local Markdown previewer

## How to obtain the year (Git instructions)

Run this from the repository root. It tries:

1. **Creation date** (first commit that introduced the file).  
2. **Last modification date** (if creation date is missing – e.g., for files added without full history).  
3. **Filesystem timestamp** (if Git still returns nothing – works on both Linux and macOS).  
4. Skips `README.md` automatically.

```bash
for f in articles/*.md; do
  base=$(basename "$f")
  [[ "$base" == "README.md" ]] && continue

  # 1. Creation date (first commit)
  year=$(git log --follow --format=%ad --date=format:%Y "$f" 2>/dev/null | tail -1)

  # 2. Fallback: last modified date
  if [ -z "$year" ]; then
    year=$(git log -1 --format=%ad --date=format:%Y "$f" 2>/dev/null)
  fi

  # 3. Fallback: filesystem date (Linux / macOS)
  if [ -z "$year" ]; then
    year=$(stat -c %y "$f" 2>/dev/null | cut -d- -f1)      # Linux
    if [ -z "$year" ]; then
      year=$(stat -f %Sm -t %Y "$f" 2>/dev/null)           # macOS
    fi
  fi

  echo "$base : ${year:-N/A}"
done
```

-->

# Articles – Table of Contents with Summaries

## 💼 Business & Strategy  
*Focus: Competitive advantage, organisational dynamics, strategic decision‑making, and change leadership.*

| Filename | Year | Summary |
| :--- | :---: | :--- |
| **[AI Governance Policy Accountability First](AI_Governance_Policy_Accountability_First)** | 2026 | Proposes an accountability‑first framework for AI governance and policy‑making. |
| **[Architecture of Authority – First Principles Analysis of Governance](Architecture_of_Authority-First‑Principles_Analysis_of_Governance)** | 2026 | A first‑principles analysis of governance structures and the architecture of authority. |
| **[Aspirational Leadership](aspirational_leadership)** | 2025 | Discusses aspirational leadership styles and their impact. |
| **[Change Imperitive](change_imperitive)** | 2025 | Addresses the urgent need for change and how to drive it effectively. |
| **[Ethical Framework for Future AI](Ethical_Framework_for_Future_AI)** | 2025 | Outlines a comprehensive ethical framework to guide the development of future AI systems. |
| **[Executive Congestion](Executive_Congestion)** | 2026 | A guide to understanding and managing "executive congestion" in organisations. |
| **[Metrics – Beyond the Engagement](Metrics-Beyond_the_Engagement)** | 2026 | Argues for evaluation metrics that go beyond simple engagement numbers. |

---

## ⚙️ Technology & AI  
*Focus: Artificial intelligence concepts, developer experience, system architecture, and programming practices.*

| Filename | Year | Summary |
| :--- | :---: | :--- |
| **[AI Is Arts Next Tool Not Grave](AI-is-Arts-Next-Tool-Not-Grave)** | 2025 | Discusses AI as the next creative tool for the arts, rather than a threat. |
| **[AI Nomenclature](ai_nomenclature)** | 2024 | Discusses terminology and naming conventions within the AI field. |
| **[AI Safety vs Impediment](ai_safety_vs_Impediment)** | 2025 | Looks at the balance between AI safety measures and potential obstacles to progress. |
| **[AI Verifiable Reality](ai_verifiable_reality)** | 2025 | Examines how AI can construct or verify reality, with epistemic considerations. |
| **[Apple Developer External Content](apple-developer-external-content)** | 2024 | Notes on external content guidelines for Apple developers. |
| **[Global Developer Experience and System Design Mandate](Global_Developer_Experience-and-System_Design_Mandate)** | 2026 | A manifesto on improving global developer experience and system design. |
| **[Governing Autonomous Systems](Governing_Autonomous_Systems)** | 2026 | Explores the challenges and principles of governing autonomous systems. |
| **[Limits of Simplified AI Architecture](limits_of_simplified_AI_architecture)** | 2025 | Discusses the limitations of overly simplified AI architectures. |
| **[Optimizing Communication with AI](optimizing_communication_with_ai)** | 2025 | Explores ways to improve human‑AI communication effectiveness. |
| **[Programming Advice AK](Programming-Advice-AK)** | 2025 | Personal programming tips and experience‑based advice. |
| **[Structuring Class-Based Single-File Apps](structuring-class-based-single-file-apps)** | 2026 | A guide to structuring class‑based single‑file applications. |
| **[Unified Local Orchestration Architecture](Unified_Local_Orchestration_Architecture)** | 2026 | Proposes a unified architecture for local orchestration of services. |

---

## 🌍 Governance, Peace & Society  
*Focus: Authority structures, peace operations, Indigenous issues, and evidence‑based social policy.*

| Filename | Year | Summary |
| :--- | :---: | :--- |
| **[Creative Thinking Cycle](creative_thinking_cycle)** | 2025 | Describes the cyclical process of creative thinking and innovation. |
| **[Indiginous Peoples](indiginous-peoples)** | 2025 | A collection of stories or a list focusing on Indigenous peoples. |
| **[Peace Integrity and Evidence](Peace_Integrity_and_Evidence)** | 2026 | Discusses peace, integrity, and evidence‑based approaches, referencing multilateral peace operations. |
| **[Power vs Peace – Beyond Jurisdiction](Power_vs_Peace-Beyond_Jurisdiction)** | 2026 | Examines the tension between power and peace, looking beyond jurisdictional boundaries. |

---

## 🧠 Spirituality, Trauma & Healing  
*Focus: Faith, trauma recovery, psychological resilience, and divine guidance.*

| Filename | Year | Summary |
| :--- | :---: | :--- |
| **[First Aid Venomous Bites Stings](first_aid_venomous_bites_stings)** | 2025 | Practical first‑aid guidance for treating venomous bites and stings. |
| **[Growing by Divine Guidance](growing_by_divine_guidance)** | 2025 | A piece on personal growth through divine or spiritual guidance. |
| **[Journey of Faith Trust and Eternal Promise](Journey_of_Faith_Trust_and_Eternal_Promise)** | 2025 | A spiritual reflection on faith, trust, and eternal promises. |
| **[Resurrection of Jesus Christ – An Inquiry](Resurrection_of_Jesus_Christ-An_Inquiry)** | 2026 | A historical and theological inquiry into the resurrection of Jesus Christ. |
| **[Trauma and Belief](Trauma_and_Belief)** | 2025 | Explores the relationship between psychological trauma and belief systems. |
| **[Trauma and Discipline V2](Trauma_and_Discipline_v2)** | 2025 | A second edition discussing trauma and discipline with updated insights. |
| **[Trauma Healing and Awareness](trauma_healing_and_awareness)** | 2026 | Addresses trauma healing and raising awareness about mental health. |
| **[Weight Health](weight-health)** | 2025 | An article about weight management and general health. |

---

## 📜 History, Space & Humanities  
*Focus: Space exploration, historical reconstructions, archives, etymology, and mathematics.*

| Filename | Year | Summary |
| :--- | :---: | :--- |
| **[Apollo13 Review Apollo14-17](apollo13-review_apollo14-17)** | 2025 | A review of Apollo 13, with extensions to the Apollo 14–17 missions. |
| **[Etymology](etymology)** | 2024 | A detailed article on etymology, with timeline updates. |
| **[Etymology Notes](etymology-notes)** | 2025 | Miscellaneous notes on word origins and etymology. |
| **[Japanese](Japanese)** | 2025 | Notes on the Japanese language, culture, or learning strategies. |
| **[Maths](maths)** | 2024 | An article on a mathematical topic. |
| **[Moon](moon)** | 2025 | An article about the Moon, covering science and cultural aspects. |
| **[Random](random)** | 2024 | Thoughts on randomness in reality and in computation. |
| **[Reconstructing Cleopatra VII](reconstructing_cleopatra_vii)** | 2025 | Discusses the historical and facial reconstruction of Cleopatra VII. |
| **[Reconstructing Henry I England](reconstructing_henry_i_england)** | 2026 | Covers the portrait or historical reconstruction of Henry I of England. |
| **[The Times 1820 Feb 09](the_times_1820_feb_09)** | 2025 | An archive or commentary on the February 9, 1820 issue of *The Times*. |

---

## ✍️ Literature, Folklore & Writing Craft  
*Focus: Fiction, mythology, microfiction, and the art of writing.*

| Filename | Year | Summary |
| :--- | :---: | :--- |
| **[AK on Jane Austen](AK_on_Jane_Austen)** | 2024 | Personal reflections and literary commentary on the works of Jane Austen. |
| **[AK on Writing](AK_on_writing)** | 2024 | Thoughts on writing techniques, creative process, and practical advice. |
| **[Microstory – The Unsafe Saddle](microstory-The_unsafe_saddle)** | 2025 | A micro‑fiction piece titled "The Unsafe Saddle". |
| **[Microstorywriting](microstorywriting)** | 2025 | Tips and guidance on writing micro‑stories. |
| **[Tale – Bread Salt Blood](tale-bread-salt-blood)** | 2025 | A story entitled "Bread, Salt and Blood". |
| **[The Goose Bride](The_Goose_Bride)** | 2024 | The main narrative of the "Goose Bride" tale. |

---

## 🏥 Health & Miscellaneous  
*Focus: First aid, physical wellbeing, and leftover eclectic topics.*

| Filename | Year | Summary |
| :--- | :---: | :--- |
| **[Playground Housekeeping](playground-housekeeping)** | 2024 | Notes on moving on from "playground". |

---
