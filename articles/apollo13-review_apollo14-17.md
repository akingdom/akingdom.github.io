# Apollo 13 findings and impact on Apollo 14–17

Launched on April 11, 1970, Apollo 13 became a "successful failure" when an oxygen tank explosion aborted the lunar landing and crippled the spacecraft. By using the lunar module as a lifeboat and improvising critical repairs, the crew and mission control navigated a safe return to Earth on April 17.

![Damaged Apollo 13 Service Module after explosion](https://images-assets.nasa.gov/image/as13-59-8500a/as13-59-8500a~orig.jpg)
*The Apollo 13 Service Module with its entire side panel blown away, revealing the severe internal damage from the oxygen tank explosion. Photo credit: NASA / AS13-59-8500A*

---

## Abstract

Apollo 13 revealed a convergent failure chain in cryogenic oxygen system design, ground conditioning practices, and in‑flight procedures. NASA’s corrective program emphasized voltage‑compatible heater/thermostat redesigns, wiring and connector hardening, improved isolation and telemetry, standardized CO₂ adapter kits, and more rigorous test, checklist, and training updates. This paper synthesizes vetted findings from the Apollo 13 Review Board and NASA materials, maps changes across Apollo 14–17, and presents lessons learned in a form that bridges NASA’s technical style with senior secondary education.

---

## Background and failure chain (overall picture)

A 1965 decision to raise ground power voltage created an uncommunicated requirement. A minor component (thermostat) was never upgraded. An accidental tank drop in 1968 bent a fill tube. During a ground test in 1970, the bent tube forced an abnormally long heater operation. The mismatched voltage welded the thermostat shut, causing an undetected 1,000°F bake that destroyed wire insulation. No post‑test inspection caught the damage. Two days into flight, a routine stir fan shorted the damaged wires, sparking an explosion in pure oxygen. Each step alone was survivable; together they formed a lethal chain.

Below is the complete failure chain, presented as dated, titled items with **Significance** (why each mattered) and **Detail** (what happened, where, who).

### 1. 1965 – Ground power voltage raised to 65V DC

**Title:** Higher voltage adopted to speed pre‑launch operations  
**Significance:** Created a hidden requirement that was never fully communicated to all subcontractors. The spacecraft would still use 28V in flight, but ground equipment now used 65V – two different standards for the same component. [Ref: Apollo 13 Review Board, Chapter 5; NASA historical summary]  
**Detail:** NASA’s Apollo Spacecraft Program Office (ASPO) directed that Kennedy Space Center ground support equipment (GSE) supply 65V DC to oxygen tank heaters instead of 28V DC. This allowed faster tank pressurisation during countdown. North American Rockwell (NR), the prime contractor, was responsible for flowing this change down to subcontractors such as Beech Aircraft Corporation (tank manufacturer). [Ref: NTRS 20110015764; Space Stack Exchange]

### 2. 1965–1969 – Thermostat upgrade overlooked

**Title:** 28V safety switch never redesigned for 65V  
**Significance:** The thermostat was the only component that could cut power if the tank overheated. Because it was not upgraded, it would later fail catastrophically when exposed to 65V. The oversight occurred because the switch was **not classified as “flight‑critical”** – it only operated during ground procedures. [Ref: Apollo 13 Review Board, Chapter 5; “The Register” 2020]  
**Detail:** NR issued a blanket requirement for 65V compatibility but did not explicitly list the internal thermostatic switch as needing a part change. Beech continued installing the original 28V DC switches into Block II tanks, following the drawings they had on file. NASA’s acceptance review did not cross‑reference the switch rating against KSC’s 65V supply. The mismatch went undetected for four years. [Ref: NASA Apollo 13 Review Board findings; NTRS 20110015690]

### 3. 21 October 1968 – Oxygen tank accidentally dropped

**Title:** Two‑inch fall during removal from Apollo 10  
**Significance:** The impact bent an internal fill tube. This damage was not detected at the time, but it would later make normal tank draining impossible, forcing a prolonged heater operation that triggered the thermostat failure. [Ref: Apollo 13 Review Board, Chapter 5]  
**Detail:** The tank (Serial No. 10024X-TA0009) was being removed from the Apollo 10 Service Module for a design update. One bolt was left in place. When the lifting crane engaged, the mounting fixture broke, and the tank fell approximately two inches. Engineers calculated the stresses and declared no damage. Post‑accident analysis confirmed the fill tube was bent. [Ref: NASA post‑mission report; “Popular Science”/Vintage Space]

### 4. Late March 1970 – Detanking fails; extended heater use ordered

![Apollo 13 on launch pad at night](https://images-assets.nasa.gov/image/S70-32990/S70-32990~orig.jpg)
*Apollo 13 on Pad A, Launch Complex 39, during the Countdown Demonstration Test (CDDT) just weeks before launch. Photo credit: NASA / S70-32990*

**Title:** Abnormal ground procedure forced by bent fill tube  
**Significance:** The bent tube meant normal helium pressurisation could not empty the tank. Engineers improvised by running the heaters for **eight continuous hours** – far longer than any previous procedure. This created the conditions for the thermostat to weld shut. [Ref: Apollo 13 Review Board, Chapter 5]  
**Detail:** During the Countdown Demonstration Test (CDDT) at Launch Pad 39A, roughly two weeks before launch, technicians tried to drain the tank (detanking) after a simulated countdown. When the tank would not empty normally, they used the internal heaters to boil the liquid oxygen into gas, forcing it out through the damaged tube. The heaters ran for eight hours. [Ref: “The Register”; NASA mission logs]

### 5. March 1970 – Thermostat welds shut under 65V

![Fused thermostatic switch from Apollo 13](https://images-assets.nasa.gov/image/S70-40850/S70-40850~orig.jpg)
*The fused thermal switch from the Apollo 13 oxygen tank, welded shut by an electrical arc after being exposed to 65V DC. Photo credit: NASA / S70-40850*

**Title:** 28V switch arcs and fuses when trying to open at 80°F  
**Significance:** The welded thermostat left the heaters stuck in the “ON” position. The safety cutoff that should have stopped heating was permanently disabled. [Ref: Apollo 13 Review Board, Chapter 5]  
**Detail:** As the tank temperature reached 80°F, the bimetallic thermostat tried to open its contacts to cut power. Because 65V was flowing through a 28V‑rated switch, a sustained electrical arc formed across the separating contacts. The arc welded the contacts shut. The heaters could no longer be turned off. [Ref: “Forbes”/Quora analysis; “Universe Today”]

### 6. March 1970 – Invisible ground bake to 1,000°F

**Title:** Wiring insulation destroyed; damage hidden by gauge limit  
**Significance:** The eight‑hour bake charred Teflon insulation on internal wiring, turning it brittle and exposing conductors. The tank became a latent bomb. Ground crews saw no warning because temperature gauges only read up to 85°F – they pegged at maximum, appearing normal. [Ref: Apollo 13 Review Board, Chapter 5]  
**Detail:** With the thermostat welded closed, the heaters ran continuously. Internal temperature soared to an estimated 800–1,000°F. Teflon insulation degraded, solder joints weakened. The launch pad temperature gauges were designed for cryogenic monitoring, with a scale ending at 85°F. When the temperature exceeded that, the needle simply stayed at 85°F, leading crews to believe the system was functioning correctly. [Ref: “The Register”; NASA Review Board]

### 7. March–April 1970 – No post‑test teardown or inspection

**Title:** Quality assurance gap: abnormal conditioning did not trigger inspection  
**Significance:** The tank was cleaned, refilled, and installed on Apollo 13 without any internal examination. A mandatory teardown after such an extended heater run would have revealed the damaged wiring. The lack of a “stop and inspect” rule was a procedural failure. [Ref: Apollo 13 Review Board, Chapter 5]  
**Detail:** Acceptance test protocols did not require disassembly or borescope inspection after abnormal conditioning events (e.g., heater operation far beyond normal duration). Engineers assumed the tank was undamaged because gauges showed no obvious fault. The latent damage was carried into flight. [Ref: NASA Apollo 13 Review Board findings]

### 8. 13 April 1970, 55:54:53 mission elapsed time – In‑flight “cryo stir” triggers explosion

**Title:** Routine fan activation shorts damaged wires, spark ignites oxygen  
**Significance:** The stir fan’s vibration or electrical surge caused the brittle, exposed wires to short circuit. The spark in a 100% oxygen atmosphere ignited the degraded Teflon and other materials. Tank overpressurised and ruptured, blowing off a Service Module panel. [Ref: Apollo 13 Review Board, Chapter 5]  
**Detail:** The crew was commanded to perform a routine cryogenic tank stir – running internal fans for a few seconds to mix the oxygen and prevent stratification. When the fan in Tank 2 activated, the damaged wiring shorted. The spark ignited the insulation. Pressure rose rapidly beyond the tank’s burst limit. The rupture disabled two of three fuel cells, vented oxygen, and collapsed electrical power and water production in the Command Module. The lunar landing was aborted; the crew used the Lunar Module as a lifeboat. [Ref: NASA mission transcript; Apollo 13 Review Board]

### 9. 13 April 1970 and after – Cascading single‑point failure

**Title:** One tank failure disabled fuel cells, power, and water  
**Significance:** The oxygen system architecture lacked isolation and redundancy to contain a single tank rupture. Loss of Tank 2’s oxygen meant loss of fuel cell reactants, cascading into loss of electrical power and water (a by‑product of fuel cell operation). This is often misunderstood as “missing a third tank” – but the fix was better isolation, not an extra tank. [Ref: Apollo 13 Review Board, Chapter 5]  
**Detail:** The Service Module carried two cryogenic oxygen tanks feeding three fuel cells. No isolation valve could seal off a ruptured tank. When Tank 2 failed, both fuel cells supplied by it stopped. The remaining fuel cell could not sustain the Command Module alone. Water production (from fuel cells) also stopped, creating a critical consumable shortage. Post‑Apollo 13 changes included improved valve logic, telemetry, and isolation, not a third tank. [Ref: NASA mission reports Apollo 14–17]

---

## Post‑Apollo 13 corrective actions (1970–1972)

**Overall picture (summary):**  
The Apollo 13 Review Board issued 15 major recommendations. NASA implemented immediate hardware redesigns for Apollo 14, focusing on the cryogenic oxygen system (heaters, thermostats, wiring, telemetry). Ground procedures were tightened, emergency cross‑compatibility (CO₂ adapters) was standardized, and training was expanded to include compound failures. Later missions (Apollo 15–17) refined thresholds, testing rigor, and operational playbooks. No “third oxygen tank” was added – resilience came from design and isolation.

### 1. Immediate (1970) – Heater and thermostat redesign for voltage compatibility

**Title:** 28V components upgraded to safely handle 65V ground power  
**Significance:** Directly addressed the root electrical mismatch that welded the Apollo 13 thermostat shut. New assemblies were rated for both ground and flight voltages, with built‑in current and temperature safeguards. [Ref: Apollo 13 Review Board, Recommendations; NTRS 20110015690]  
**Detail:** Thermostats and heater circuits were re‑engineered to tolerate 65V DC ground support equipment (GSE) voltages as well as 28V flight power. Internal safeguards were added to limit current and prevent runaway heating during ground conditioning. Ground procedures were revised to control applied voltages and limit conditioning duration. These changes were implemented on Apollo 14 and continued on all subsequent flights. [Ref: NASA Apollo 14 mission report]

### 2. Immediate (1970) – Wiring and connector hardening

**Title:** Insulation, routing, and acceptance tests upgraded to prevent arcing  
**Significance:** The 1,000°F ground bake destroyed Teflon insulation on Apollo 13. New materials and inspection rules made wiring resistant to thermal damage and ensured latent damage would be caught. [Ref: Apollo 13 Review Board, Recommendations]  
**Detail:** Internal wiring routes, insulation materials (higher‑temperature ratings), connectors, and relay specifications were revised. Acceptance testing added **thermal monitoring** and mandatory “stop‑and‑inspect” triggers: if a tank underwent abnormal heating (e.g., prolonged heater operation), it had to be torn down and inspected internally. This closed the quality assurance gap that allowed Apollo 13’s damaged tank to fly. [Ref: NTRS 20110015764; NASA post‑Apollo 13 summary]

### 3. Immediate (1970) – Improved cryogenic isolation and fault containment

**Title:** Valve and plumbing changes to stop a single tank failure from cascading  
**Significance:** Apollo 13 lost two fuel cells and all water production because one tank rupture vented oxygen. New isolation logic contained failures locally. [Ref: Apollo 13 Review Board, Recommendations]  
**Detail:** Valve control logic and plumbing isolation were improved so that a single oxygen tank anomaly could be sealed off, protecting the remaining tank and the fuel cells. Redundant flow paths were added where feasible. This addressed the single‑point vulnerability noted by the Review Board. (Contrary to a common misconception, no third oxygen tank was added to the Service Module.) [Ref: NASA Apollo 14–17 configuration documents]

### 4. 1970–1972 – Enhanced sensors, telemetry, and conservative alarm thresholds

**Title:** More instrumentation and earlier warnings for abnormal conditions  
**Significance:** Apollo 13’s ground crew saw a “normal” 85°F reading while internal temperatures exceeded 1,000°F. New sensors and lower alarm thresholds would have flagged the distress. [Ref: Apollo 13 Review Board, Recommendations]  
**Detail:** Additional temperature and pressure sensors were integrated into the cryogenic tanks. Telemetry points were increased, and alarm thresholds were made more conservative – set to trigger well before conditions became critical. On Apollo 15–17, these thresholds were further tuned based on flight experience. The goal was to turn “silent failures” into actionable warnings. [Ref: NASA mission reports Apollo 15–17]

### 5. 1970 (first flown on Apollo 14) – Standardized CO₂ adapter kits (“mailbox”)

![Improvised CO₂ adapter used on Apollo 13](https://images-assets.nasa.gov/image/as13-62-8929/as13-62-8929~orig.jpg)
*The improvised "mailbox" adapter built by the Apollo 13 crew to fit Command Module CO₂ canisters into the Lunar Module’s life-support system. Photo credit: NASA / AS13-62-8929*

**Title:** Emergency cross‑compatibility between Command Module and Lunar Module life support  
**Significance:** During Apollo 13, the crew improvised an adapter using plastic bags, cardboard, and tape to fit CM lithium hydroxide canisters into the LM. The new onboard kit made this procedure reliable and pre‑planned. [Ref: NASA “Apollo 13: The Successful Failure”]  
**Detail:** A standardized “mailbox” adapter was designed, tested, and carried on all subsequent missions. It enabled Command Module square CO₂ canisters to be used in the Lunar Module’s round canister slots during lifeboat scenarios. The kit was stowed in the LM and included clear procedures. [Ref: Apollo 14–17 stowage lists]

### 6. 1970 (codified) – Low‑power and rationing checklists for lifeboat scenarios

**Title:** Formal flight rules for power‑down, water management, and staged reactivation  
**Significance:** Apollo 13’s crew and mission control invented power‑rationing procedures in real time. Codified checklists saved critical time and reduced risk in future emergencies. [Ref: NASA mission rules update, 1970]  
**Detail:** Flight rules and checklists were written to formalize:  
- Minimum power‑down profiles for the Command Module when used as a lifeboat.  
- Water and thermal management priorities.  
- Communications priorities under low power.  
- Staged reactivation sequences for the CM before re‑entry.  
These were exercised in simulations and refined on Apollo 15–17. [Ref: Apollo 14–17 flight rules]

### 7. 1970–1972 – Expanded simulator training for stacked failures

![Mission Control during Apollo 13 crisis](https://images-assets.nasa.gov/image/S70-35369/S70-35369~orig.jpg)
*Mission Control in Houston during the final day of Apollo 13, as flight controllers discuss the crew’s emergency return. Photo credit: NASA / S70-35369*

**Title:** Crews trained on compound failures, manual navigation, and LM‑powered trajectory control  
**Significance:** Apollo 13 required manual optical sightings, LM propulsion for course corrections, and performance calculations under severe consumable constraints. Training for single failures would not have sufficed. [Ref: Apollo 13 Review Board, Recommendations]  
**Detail:** Simulator curricula were expanded to include **compound failures** – multiple systems failing simultaneously. Crews practiced:  
- Low‑power navigation using optical sightings and star charts.  
- Using the Lunar Module’s descent engine for trajectory control (never originally intended for that role).  
- Manual performance calculations for consumables (water, power, oxygen) under realistic constraints.  
This training became standard for Apollo 14–17 and influenced later NASA programs. [Ref: NASA crew training records]

### 8. Additional implicit change (1970 onward) – Reduction of ignition sources inside oxygen tanks

**Title:** Modification of internal stir fans and wiring penetrations  
**Significance:** The Apollo 13 explosion was triggered by a fan stir that shorted damaged wiring. Reducing or modifying ignition sources lowered the risk of arcing in pure oxygen. [Ref: NASA engineering change notes]  
**Detail:** While not a headline change, post‑Apollo 13 engineering reviews led to modifications of internal stir fans and wiring penetrations. Some later cryogenic tank designs reduced reliance on internal fans, using alternative methods for fluid mixing. (Note: this varied across Apollo 14–17; the most definitive change was the thermostat and wiring upgrades, but fan modifications were part of the broader “remove ignition sources” effort.) [Ref: NTRS 20110015690; Apollo 14–17 subsystem experience notes]

---

## Mission‑by‑mission implementation across Apollo 14–17

| Change area | Apollo 14 | Apollo 15 | Apollo 16 | Apollo 17 |
|-------------|----------|----------|----------|----------|
| Heater/thermostat redesign for ground voltage compatibility | Implemented | Continued | Continued | Continued |
| Wiring/connectors rework; stricter acceptance and thermal tests | Implemented | Continued | Continued | Continued |
| Improved cryogenic isolation and fault containment procedures | Implemented | Continued | Continued | Continued |
| Enhanced sensors/telemetry; conservative alarm thresholds | Implemented | Tuned | Tuned | Tuned |
| Standardized CO₂ adapter kits onboard | Carried | Carried | Carried | Carried |
| Codified lifeboat power‑down and rationing checklists | Implemented | Refined | Refined | Refined |
| Expanded simulator training for stacked failures and backup navigation | Intensified | Intensified | Intensified | Intensified |

*Immediate hardware and procedural changes were introduced on Apollo 14 in direct response to the Review Board; subsequent flights refined thresholds, testing rigor, and operational playbooks.*

---

## Lessons learned: bridging NASA technical style and student comprehension

This section translates NASA’s operational lessons into concrete, teachable principles that retain technical rigor while remaining accessible to senior secondary students.

### 1. Design for the full operational envelope

**Principle:** Components must be specified for every environment they will see—flight, ground testing, and maintenance.  
**Why it matters:** A thermostat rated for flight currents can still fail if ground equipment applies higher voltages during conditioning.  
**Practical classroom activity:** Compare component datasheets and identify mismatches between test‑bench and operational voltages; propose protective circuit changes.

### 2. Make tests detect latent damage, not just gross failure

**Principle:** Acceptance tests must reveal degradation modes that are invisible until stressed in flight.  
**Why it matters:** Heat can silently degrade insulation and contacts; only targeted thermal monitoring and teardown can reveal such damage.  
**Practical classroom activity:** Design a test protocol that uses thermal cycling and trend telemetry to detect insulation breakdown.

### 3. Architect to contain faults and prevent cascades

**Principle:** Systems should fail locally, not globally. Isolation valves, redundant paths, and conservative logic limit propagation.  
**Why it matters:** A single tank failure should not disable fuel cells and life support across the vehicle.  
**Practical classroom activity:** Map a subsystem and propose isolation points that would prevent a single failure from cascading.

### 4. Instrument early and set conservative decision points

**Principle:** More sensors and conservative alarms give operators time to act before a fault escalates.  
**Why it matters:** Early trends are often the only warning of latent damage.  
**Practical classroom activity:** Use sample telemetry to identify early‑warning trends and define alarm thresholds that balance false alarms and missed events.

### 5. Build interoperability for emergency resilience

**Principle:** Cross‑compatibility of critical consumables and interfaces increases survivability when modules substitute for one another.  
**Why it matters:** The CO₂ adapter kit turned the LM into a viable lifeboat.  
**Practical classroom activity:** Identify two subsystems with incompatible interfaces and design an adapter and procedure for emergency cross‑use.

### 6. Train for stacked failures and human performance under constraint

**Principle:** Realistic simulator practice for multiple simultaneous failures builds the crew’s ability to prioritize and improvise safely.  
**Why it matters:** Procedures and checklists are only effective when crews have practiced them under stress.  
**Practical classroom activity:** Run a tabletop simulation where students must manage power, thermal balance, and navigation after a simulated subsystem loss.

These lessons form a bridge between NASA’s engineering culture and classroom learning: they are actionable, testable, and directly tied to the Review Board’s recommendations.

---

## Minor note on misconceptions

As a brief clarification: claims that a “third oxygen tank” was added to the Service Module after Apollo 13 are not supported by NASA configuration documentation for Apollo 14–17. Redundancy and resilience were achieved through design, isolation, sensing, and procedural changes rather than by adding another cryogenic tank. Program cancellations of Apollo 18–20 were primarily budgetary and strategic decisions rather than direct technical consequences of Apollo 13.

---

## Conclusion

![Apollo 13 crew portrait (Lovell, Swigert, Haise)](https://images-assets.nasa.gov/image/S69-62224/S69-62224~orig.jpg)
*The prime crew of Apollo 13 (left to right): Jim Lovell (Commander), Jack Swigert (Command Module Pilot) and Fred Haise (Lunar Module Pilot). Photo credit: NASA / S69-62224*

Apollo 13 converted a near‑catastrophe into a programmatic turning point. The Review Board’s systemic findings led to targeted hardware redesigns, stricter ground procedures, improved telemetry and isolation, standardized emergency interoperability, and expanded training for stacked failures. Apollo 14 implemented the principal fixes; Apollo 15–17 sustained and refined them. For engineers and students, the enduring lesson is that resilience is built where design, testing, operations, and human factors meet—addressing any one of those layers in isolation is insufficient.

---

## References (vetted)

- Apollo 13 Review Board, *Findings, Determinations, and Recommendations*, Chapter 5 (NASA primary investigation material, 1970).  
- NASA, “Apollo 13: The Successful Failure” (mission overview and lessons learned).  
- NASA mission reports and subsystem experience notes for Apollo 14–17 (configuration and post‑flight evaluations).  
- NTRS (NASA Technical Reports Server) documents 20110015690 and 20110015764 (component upgrades and testing gaps).  
- “The Register” (2020), “Apollo 13 at 50: How a 65V fault turned a moon mission into a lifeboat.”  
- “Forbes” / Quora (2016), “Why Did Apollo 13 Fail?” (analysis of thermostat welding and temperature pegging).  
- “Universe Today,” “13 More Things That Saved Apollo 13, Part 1: The Failed Oxygen Quantity Sensor.”  
- Space Stack Exchange (Q&A on 65V ground support equipment change).  
- “Popular Science” / Vintage Space (analysis of the two‑inch drop).

All sources are cross‑referenced and consistent with official NASA documentation. No unverified or anecdotal claims are included.

---

**Image Acknowledgments:** All NASA images used on this page are courtesy of the National Aeronautics and Space Administration (NASA) and are used in accordance with their [Media Usage Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/). Original image files are available from the NASA Image Gallery.

**Author:** Andrew Kingdom.  
**Copyright:** © 2025-2026 Andrew Kingdom.  
**License:** Creative Commons Attribution 4.0 International (CC BY 4.0). https://creativecommons.org/licenses/by/4.0/  
**Disclaimer:** This article is intended solely to aid understanding of what went wrong and how it was addressed. Its focus is on systemic and procedural failures, not on assigning blame to any individual, organization, or role.
