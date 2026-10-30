# EU PPWR Packaging Compliance Tracker: Supplier Evidence, Recycled Content & EU DoC Readiness Tool (Free Web App & Excel Template)

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Web%20Browser%20%7C%20Microsoft%20Excel%20(.xlsx)-217346.svg)
![Regulation](https://img.shields.io/badge/Regulation-EU%20PPWR%20(EU)%202025%2F40-003399.svg)
![Tool Type](https://img.shields.io/badge/Tool-Packaging%20Compliance%20%26%20CAPA%20Tracker-2251FF.svg)

**The PPWR Packaging Compliance Data & Evidence Tracker is a free browser-based compliance assessment tool and Microsoft Excel workbook (`.xlsx` template) built for Regulation (EU) 2025/40 (Packaging and Packaging Waste Regulation). It helps importers, brand owners, packaging engineers, and regulatory affairs teams centralize supplier material declarations, verify Post-Consumer Recycled (PCR) content, check heavy metal and PFAS substance limits, calculate packaging void-space ratios, and track Corrective and Preventive Actions (CAPA) required for Annex VII Technical Documentation and the EU Declaration of Conformity (EU DoC).**

> **Choose your deployment mode:** Test the workflow immediately in your browser with zero installation, or download the full Microsoft Excel template for persistent multi-SKU data management, recurring supplier audits, and offline regulatory record-keeping.
>
> - 🌐 **[Launch the Free Online PPWR Packaging Compliance Assessment Tool (Interactive HTML Web App)](./index.html)** — Run instant packaging data validations, test rule thresholds, and explore the EU DoC readiness workflow directly in your browser (no signup or software installation required).
> - 📥 **[Download the Multi-SKU PPWR Compliance & Supplier Evidence Tracker (.xlsx Excel Workbook Template)](./releases)** — Get the complete 6-sheet Excel workbook from the project release page for offline supplier intake, automated `XLOOKUP`/`LET` formula checks, CAPA deadline tracking, and compliance budget management.
>

---

## What It Helps You Track: EU PPWR Compliance Pain Points & Automated Solutions

Managing **EU Packaging and Packaging Waste Regulation (PPWR)** compliance across multi-tier supply chains requires linking raw packaging specifications to verified legal evidence. The table below maps common operational bottlenecks to the specific tracking mechanisms inside this toolkit:

| EU PPWR Compliance Pain Point | Regulatory Risk & Supply Chain Bottleneck | What This PPWR Tracker Captures & Automates (Key Metrics & Fields) |
| :--- | :--- | :--- |
| **Fragmented Packaging Bill of Materials (BOM)** | Inability to trace which supplier owns which sub-component across primary, secondary, and transport packaging levels. | **Product-to-Packaging Traceability Register:** Links SKU IDs to unique component IDs, packaging levels (sales, grouped, transport/e-commerce), material categories, and responsible manufacturers. |
| **Incomplete Supplier Material Declarations** | Manufacturers submit partial spreadsheets missing polymer types, gram weights, or substance declarations. | **Manufacturer Data Completeness Screening:** Automatically flags missing component weights, dimensions, **Post-Consumer Recycled (PCR)** percentages, and **Safety Data Sheet (SDS)** references. |
| **Unverified Heavy Metal & PFAS Limits** | Accepting supplier "compliant" claims without checking quantitative lab results against **100 ppm heavy metal limits** or food-contact **PFAS thresholds**. | **Substance & Void-Space Rule Checks:** Compares reported concentrations and **empty space (void space) ratios** against configured **Regulation (EU) 2025/40** thresholds and mass-balance tolerances. |
| **Confusing Data Entry with Legal Proof** | Treating a populated Excel cell or file name as valid legal evidence without checking if the test report covers the right material or revision. | **Dual-State Evidence Review Architecture:** Separates automated formula screening from mandatory human expert verification of **ISO/IEC 17025 lab test reports** and supplier certificates. |
| **Untracked Compliance Gaps & Missed Deadlines** | Failed checks and missing certificates get buried in email threads, stalling **EU Declaration of Conformity (EU DoC)** sign-off. | **CAPA & Open Gap Action Log:** Assigns each non-conformity to an owner with a due date, remediation action, and a hard **DoC-Blocking Indicator**. |
| **Uncontrolled Lab Testing & Remediation Costs** | Surprise expenses from emergency third-party laboratory testing and packaging redesigns blow past compliance budgets. | **Testing & Remediation Cost Roll-Up:** Tracks quoted laboratory testing fees and corrective-action costs per component and aggregates total financial exposure at the product SKU level. |

---

## Quick Start Workflow: How to Audit EU PPWR Packaging Compliance in 4 Steps

Standardize your supplier packaging inputs once, run automated rule validations against **Regulation (EU) 2025/40**, and focus your regulatory team's time on verifying laboratory evidence and closing compliance blockers.

### Step 1: Configure EU PPWR Regulatory Thresholds & Assessment Baseline
**Action:** **[Open the Free Browser-Based PPWR Compliance Tool](./index.html)** (or open Sheet `01_Rule_Parameter_Register` in Excel) and set your assessment baseline.
- Define the assessment date, reporting currency, exchange-rate factor, and active **PPWR rule-library version**.
- Configure operational thresholds for **heavy metal limits (Lead, Cadmium, Mercury, Hexavalent Chromium <= 100 ppm)**, **PFAS food-contact restrictions**, **Post-Consumer Recycled (PCR) content targets**, and **maximum 50% empty space (void space) ratios**.
- Lock these parameters to establish a unified audit standard across all product lines and supplier submissions.

### Step 2: Build Your Packaging BOM & Collect Supplier Material Declarations
**Action:** Register your **Packaging Bill of Materials (BOM)** and log manufacturer technical data into the standardized intake fields.
- Map every SKU across **primary (sales), secondary (grouped), and tertiary (transport/e-commerce) packaging levels** with a unique component ID.
- Record supplier-submitted component weights, material classifications (plastic, paper/cardboard, glass, metal, composite), **PCR recycled content percentages**, restricted-substance test values, and laboratory testing quotations.
- Attach external document IDs linking each row to your **Supplier Declarations of Compliance**, **ISO/IEC 17025 lab test reports**, and **Safety Data Sheets (SDS)**.

### Step 3: Run Automated Data Quality Checks & Assign CAPA Owners
**Action:** Execute the built-in screening rules to flag data anomalies and convert open compliance gaps into tracked **Corrective and Preventive Actions (CAPA)**.
- Review automated diagnostic flags for missing mandatory fields, **mass-balance weight discrepancies** (where component sub-weights fail to match declared total weight within your configured tolerance, such as 2%), threshold violations, and unlinked evidence files.
- Route every flagged exception into the **Compliance Gap & CAPA Log**: assign a responsible remediation owner, specify the required laboratory re-test or supplier corrective document, set a hard SLA deadline, and mark whether the gap blocks **EU Declaration of Conformity (EU DoC)** sign-off.
- Have a qualified regulatory reviewer independently verify whether the referenced test reports are current, authentic, and applicable to the exact packaging component.

### Step 4: Consolidate Annex VII Technical Documentation & Scale with the Repeatable Excel Template
**Action:** Verify product-level readiness before authorized sign-off, then transition from single-session browser testing to the persistent **Microsoft Excel Compliance Workbook**.
- Check the consolidated readiness dashboard to confirm three independent gates: **100% supplier data completeness**, **approved expert evidence review**, and **zero open DoC-blocking CAPA items**.
- Compile your **Annex VII Technical Documentation** package and **EU DoC draft references** once all stage-gates clear.
- **Ready to manage recurring audits and multi-SKU portfolios?** The web application is built for instant, zero-install sandbox testing of individual workflows. Once you finish your initial browser trial, **[Download the Reusable PPWR Compliance Excel Workbook (.xlsx Template)](./releases)** to unlock persistent offline storage, track up to **50 products and 500 packaging components**, manage multi-round supplier data collection, and maintain historical audit trails across regulatory review cycles.

---

## Why I Built This: Separating Data Availability from Demonstrated PPWR Compliance

Preparing packaging compliance documentation across multiple contract manufacturers is a supply-chain traceability and risk-control problem.

A supplier can return a fully populated questionnaire while omitting mandatory laboratory proof. An accredited test report might exist in your shared drive but cover an outdated resin grade, a different factory site, or an expired test standard. A product SKU might show every packaging weight field completed while the sum of individual components contradicts the declared total assembly weight. When every vendor uses a custom spreadsheet layout and stores PDFs in separate folders, these discrepancies slip past manual review.

Confusing **data availability with demonstrated regulatory compliance** exposes importers and brand owners to severe commercial penalties.

Consider a concrete mass-balance example: a product uses a primary plastic bottle assembly with a declared total weight of 20 g. The manufacturer reports 15 g of primary PET resin and 3 g of auxiliary closure and label materials. Every required cell contains a number, so a basic completeness check marks the row "100% Complete." However, the declared total (20 g) and the component breakdown (18 g) differ by 2 g—a 10% unexplained mass variance. When your configured tolerance is 2%, the system must flag that record for investigation rather than passing it toward **EU Declaration of Conformity (EU DoC)** sign-off.

The same verification gap applies to documentary evidence. Entering a certificate reference number into a cell does not prove that the certificate is authentic, valid for **Regulation (EU) 2025/40**, or matched to the right packaging component.

I built this toolkit as a structured verification sequence that links product BOM records to supplier submissions, checks numerical consistency, separates formula screening from human expert review, tracks CAPA remediation, and gates final **Annex VII technical file** sign-off. It exposes missing data, numerical contradictions, and unverified claims early, before they cause customs delays or rejected regulatory audits.

---

## Common PPWR Preparation Problems This Solves (Manual Spreadsheets vs. Structured Tracker)

| Operational & Regulatory Bottleneck | Manual Spreadsheet & Email Chaos (Without This Tool) | Structured PPWR Compliance Workflow (With This Tracker) |
| :--- | :--- | :--- |
| **Non-Standard Supplier Data Submissions** | Regulatory teams spend hours reconciling mismatched vendor Excel sheets, inconsistent polymer naming, and unmapped SKU codes by hand. | Standardized **Manufacturer Data Intake** fields and unique Packaging Component IDs enforce a uniform data schema across all suppliers. |
| **Orphaned or Mismatched Laboratory Test Reports** | A heavy-metal test report or **PCR mass-balance certificate** is mistakenly linked to the wrong packaging layer or an obsolete component revision. | Relational traceability across `02_Product_Packaging_Register` and `03_Manufacturer_Data_Intake` binds every document ID to a specific SKU, packaging tier, and supplier. |
| **Hidden Weight & Threshold Contradictions** | Missing values, **>50% void-space ratios**, or component weight sums that fail mass-balance checks remain buried inside static supplier tables. | Automated Excel `LET` and `FILTER` validation rules flag numeric tolerance breaches, **100 ppm heavy-metal exceptions**, and missing fields instantaneously. |
| **Formula Passes Mistaken for Legal Sign-Off** | Passing a basic spreadsheet calculation is treated as legal proof that the packaging satisfies **Regulation (EU) 2025/40**. | Dedicated columns separate **Automated Data Quality Flags** from **Expert Evidence Review Decisions**, requiring human verification of underlying PDFs. |
| **Stalled Supplier Corrective Actions (CAPA)** | Requests for missing **PFAS declarations** or updated lab reports get lost in email chains with no assigned owner, budget visibility, or deadline. | Built-in **Compliance Gap & Action Log** tracks remediation owners, target SLA dates, testing costs, and overdue flags in one centralized view. |
| **Premature EU Declaration of Conformity (EU DoC) Sign-Off** | A product SKU is cleared for EU market placement even though critical supplier evidence or blocking corrective actions remain unresolved. | Multi-dimensional **Stage-Gated Readiness Controls** block final technical-document sign-off until data completeness, expert review, and CAPA gates all pass. |

---

## Who This Is For: Target Roles & Industry Compliance Scenarios

This toolkit is built for operational, technical, and regulatory professionals who need a structured **PPWR compliance software alternative or Excel template** without the licensing cost and deployment delay of an enterprise PLM/ERP module:

- **Packaging Engineers & Packaging Technologists:** Use the **Packaging BOM Register** and **Void-Space Ratio Calculator** to evaluate primary, secondary, and transport packaging specifications, verify weight tolerances, and track **packaging minimisation** targets during design and supplier qualification.
- **Regulatory Affairs Managers & Product Compliance Officers:** Standardize **Annex VII Technical Documentation** assembly, audit supplier declarations against **Regulation (EU) 2025/40**, separate automated screening from expert sign-off, and control **EU Declaration of Conformity (EU DoC)** issuance.
- **EU Importers, Brand Owners & Cross-Border E-Commerce Sellers (Amazon FBA / DTC):** Establish demonstrable due diligence across overseas contract manufacturers, verify **Extended Producer Responsibility (EPR)** data inputs, and ensure shipments meet EU market-access documentation requirements before customs clearance.
- **Supplier Quality Assurance (SQA) & Procurement Leads:** Onboard packaging vendors with a uniform data-collection template, track missing certificates, manage **Corrective and Preventive Actions (CAPA)** with clear deadlines, and forecast third-party laboratory testing budgets.
- **ESG, Sustainability & Packaging Compliance Consultants:** Deliver repeatable **PPWR readiness assessments** and client gap-analysis audits using the zero-install browser version for live workshops and the multi-SKU Excel workbook for client deliverables.

**Scope & Legal Boundary:** This tool is an operational workflow and evidence-management framework. It does not replace formal legal counsel, accredited **ISO/IEC 17025 laboratory testing**, authoritative regulatory interpretation, or the statutory obligations of the economic operator placing packaging on the European Union market.

---

## High-Frequency EU PPWR Use Cases & Industry Scenarios

Organizations across manufacturing, retail, and e-commerce use this **PPWR Packaging Compliance Data & Evidence Tracker** to manage four high-risk regulatory scenarios:

### 1. Pre-Shipment EU Customs Clearance & Authorized Representative (EAR) Audits
Importers and non-EU manufacturers placing packaged goods on the European market must provide complete **Annex VII technical files** and signed **EU Declarations of Conformity** upon request by market surveillance authorities or **EU Authorized Representatives (EAR)**. This tracker consolidates scattered supplier PDFs and test reference numbers into an auditable product-level index before goods leave the port.

### 2. Post-Consumer Recycled (PCR) Content & Plastic Packaging Tax Verification
Verifying mandatory **2030/2040 PCR recycled content targets** for contact-sensitive and non-contact plastic packaging requires tracing resin declarations and third-party chain-of-custody certificates (such as RecyClass or ISCC PLUS) down to individual packaging components. The workbook flags components claiming recycled content without linked certification references.

### 3. E-Commerce & Transport Packaging Empty Space (Void Space) Compliance
Under **Regulation (EU) 2025/40**, grouped, transport, and e-commerce packaging must adhere to strict **packaging minimisation** rules, including a **maximum 50% empty space ratio**. Packaging teams use the intake and validation sheets to record dimensional volumes, calculate void-space ratios automatically, and log redesign CAPAs for oversized shipping boxes.

### 4. Restricted Substances Screening (PFAS in Food Contact & 100 ppm Heavy Metals)
Ensuring that lead, cadmium, mercury, and hexavalent chromium remain below the **100 ppm sum concentration limit**—and that food-contact packaging complies with **PFAS restrictions**—requires rigorous lab report tracking. The toolkit separates raw chemical test values from expert review status and tracks re-testing quotes when supplier certificates expire.

---

## The Business Logic & Methodology: Solving Hidden Commercial Blind Spots in Packaging Compliance

Even if you have zero background in European environmental law or advanced spreadsheet engineering, the commercial problem behind packaging compliance is straightforward: **if you sell products in the European Union and cannot prove your packaging follows the rules, your goods can be blocked at customs, delisted by marketplaces, or fined.**

Most small and mid-sized businesses fail compliance audits not because they intend to break the law, but because they fall into **five hidden commercial decision blind spots**. Here is how the business logic of this tracker protects your company from each blind spot:

### Blind Spot 1: "My supplier filled out the spreadsheet, so our data is accurate."
- **The Real-World Trap:** Suppliers often guess numbers to finish paperwork quickly. For example, a supplier writes that a gift box weighs 100 grams total, but lists the cardboard at 70 grams and the plastic insert at 15 grams (which only adds up to 85 grams). If you accept that sheet without checking the math, your official compliance file contains provably false data.
- **How This Tool Solves It (Structured Master Data & Tolerance Checks):** You enter each packaging part once in a master list (`02_Product_Packaging_Register`). When supplier numbers are entered, automated rules immediately compare the parts against the total weight and allowed limits. If the math is off by more than your allowed margin (for example, 2%), the tracker raises a warning flag automatically—before you pay for expensive lab tests or sign legal documents.

### Blind Spot 2: "We have a laboratory test report PDF saved in our folder, so we are safe."
- **The Real-World Trap:** Having a PDF in a folder does not mean it covers the actual bottle cap or carton you are shipping today. Suppliers frequently send outdated reports, reports for a different plastic material, or certificates belonging to another customer's product.
- **How This Tool Solves It (Two-Step Verification: Machine Check + Human Check):** The tracker splits verification into two separate columns (`04_Data_Quality_Evidence_Check`). First, the computer checks if the numbers and document IDs are present. Second, a separate column requires a human reviewer to open the PDF, confirm it actually matches that exact packaging component, and mark it "Approved." You never confuse "a file exists" with "the file is valid proof."

### Blind Spot 3: "We found a compliance problem and emailed the factory—now we just wait."
- **The Real-World Trap:** In busy product launches, emails asking suppliers for missing heavy-metal tests or updated recycled-plastic certificates get forgotten. Weeks later, the product is ready to ship, and nobody knows which compliance problems are still open or how much extra lab testing will cost.
- **How This Tool Solves It (Turning Problems into Tracked Tasks & Budgets):** Every time a check fails or a certificate is rejected, you log it into the **Compliance Gap & Action Log** (`05_Compliance_Gap_Action_Log`). Every problem gets a named person in charge, a deadline, an estimated lab-testing or redesign cost, and a "Blocker" tag. Nothing disappears into an email inbox, and management can see the exact financial cost of fixing compliance gaps.

### Blind Spot 4: "Our compliance tracker is 95% green, so we can sign the legal declaration and ship."
- **The Real-World Trap:** Executives often look at a "95% Complete" progress bar and assume a product is ready for the market. In regulatory compliance, **one single missing certificate on a 2-gram plastic cap blocks the entire product from legally receiving its EU Declaration of Conformity (EU DoC).** Signing a legal declaration with an open blocker exposes the company and the individual signer to direct legal liability.
- **How This Tool Solves It (Stage-Gated Sign-Off Protection):** The final summary dashboard (`06_Compliance_Status_Doc_Index`) refuses to mark a product "Ready for EU DoC Sign-Off" just because most cells are filled. It acts like a safety interlock: a product only turns green when **(1) all supplier data is complete, (2) all evidence PDFs pass human review, AND (3) zero blocking corrective actions remain open.**

### Summary of the 5-Stage Methodology
By following a strict sequence—**1. Register Parts → 2. Collect Supplier Numbers → 3. Auto-Check Math → 4. Verify Evidence PDFs → 5. Close Blocking Gaps Before Sign-Off**—this tool turns a chaotic regulatory burden into a repeatable business checklist that anyone on your team can follow.

---

## About the PPWR Packaging Compliance Data & Evidence Tracker

The **PPWR Packaging Compliance Data & Evidence Tracker** helps businesses structure packaging compliance data, detect missing or contradictory supplier inputs, manage corrective actions (CAPA), and organize technical records required for internal governance and **Regulation (EU) 2025/40** documentation.

By maintaining strict separation between structured BOM master data, supplier declarations, automated formula diagnostics, human evidence review, corrective-action workflows, and product-level readiness reporting, the system ensures teams clearly distinguish between **having raw data, having verified supporting evidence, and achieving an approved compliance outcome**.

---

## Technical Details: Workbook Architecture, Formula Logic & Validation Rules

The Excel implementation uses six interconnected worksheets powered by modern Microsoft 365 dynamic array functions (`LET`, `FILTER`, `XLOOKUP`, `UNIQUE`, `SORT`, `COUNTIFS`, `SUMIFS`, `HSTACK`, and `CHOOSECOLS`) to support up to **50 products, 500 packaging components, 1,000 supplier intake records, and 1,000 compliance gaps**.

| Worksheet Name | Primary Operational Function | Key Compliance Outputs |
| :--- | :--- | :--- |
| `01_Rule_Parameter_Register` | Maintain PPWR rule versions, regulatory thresholds, currency rates, and tolerances | Centralized regulatory baseline and assessment settings |
| `02_Product_Packaging_Register` | Register product SKUs, packaging tiers (primary/secondary/transport), component IDs, and suppliers | Structured Packaging Bill of Materials (BOM) master data |
| `03_Manufacturer_Data_Intake` | Capture supplier-submitted weights, dimensions, PCR recycled content, substance values, and doc IDs | Consolidated manufacturer technical declarations |
| `04_Data_Quality_Evidence_Check` | Execute automated formula diagnostics alongside dedicated manual expert review columns | Automated data-quality flags + independent evidence review status |
| `05_Compliance_Gap_Action_Log` | Track non-conformities, CAPA remediation owners, SLA deadlines, testing costs, and DoC blockers | Actionable CAPA register with financial cost roll-ups |
| `06_Compliance_Status_Doc_Index` | Consolidate SKU-level readiness, Annex VII document references, EU DoC status, and open blockers | Executive compliance dashboard and prioritized gap queue |

<details>
<summary><strong>Click to expand: Detailed Data Flow, Capacity Specs, Formula Patterns (`LET`) & Validation Logic</strong></summary>

### Controlled 7-Stage Data Flow

1. **Configure Rules & Parameters (`01_Rule_Parameter_Register`):** Establish assessment date, rule-library version, heavy-metal/PFAS thresholds, void-space limits, and weight tolerances.
2. **Register Products & Packaging BOM (`02_Product_Packaging_Register`):** Create stable component IDs linking products, packaging levels, materials, and responsible manufacturers.
3. **Collect Manufacturer Submissions (`03_Manufacturer_Data_Intake`):** Record supplier technical measurements, recycled-content declarations, and external document repository IDs.
4. **Run Automated Data-Quality Checks (`04_Data_Quality_Evidence_Check`):** Trigger formula-based screening for missing fields, mass-balance mismatches, and threshold breaches.
5. **Conduct Expert Evidence Review (`04_Data_Quality_Evidence_Check`):** Record qualified human reviewer decisions verifying whether external test reports and certificates support the regulatory claim.
6. **Log & Resolve CAPA Gaps (`05_Compliance_Gap_Action_Log`):** Assign remediation owners, deadlines, laboratory testing quotes, and EU DoC-blocking indicators.
7. **Evaluate Product-Level Readiness (`06_Compliance_Status_Doc_Index`):** Consolidate data completeness, evidence approval, and open blockers before Annex VII technical file sign-off.

### Workbook Capacity & Excel Version Compatibility

| Data Domain | Planned Design Capacity |
| :--- | ---: |
| Regulatory rule records | 200 |
| Packaging BOM components | 500 |
| Manufacturer data intake records | 1,000 |
| Compliance gap & CAPA records | 1,000 |
| Product SKUs | 50 |

**System Requirements:** Microsoft 365 (Desktop or Web) or Excel 2021/2024 environments supporting dynamic array functions (`LET`, `FILTER`, `XLOOKUP`, `HSTACK`, `CHOOSECOLS`). Legacy Excel 2016 and Excel 2019 do not support the required dynamic array formula engine.

### Critical Implementation & Operational Safeguards

1. **Keep Automated Checks Separate from Expert Review:** In `04_Data_Quality_Evidence_Check`, columns `I:L` are reserved exclusively for manual expert review inputs, while adjacent columns compute automated formula diagnostics. Never overwrite formula columns or treat automated "Pass" flags as a substitute for manual document inspection.
2. **Preserve Row Alignment Across Source and Review Tables:** Position-dependent formulas rely on stable row alignment between `02_Product_Packaging_Register`, `03_Manufacturer_Data_Intake`, and `04_Data_Quality_Evidence_Check`. Do not insert, delete, or sort rows mid-table without re-aligning dependent review records; always append new records at the bottom of the designated tables.
3. **Protect Dynamic Array Spill Ranges:** Summary views use `FILTER`, `UNIQUE`, and `SORT` to spill multi-row outputs dynamically. Keep spill zones clear of manual text entry to avoid `#SPILL!` errors.

### Formula Reference: Parameterized Threshold Checks with `LET`

The workbook uses `LET` to bind intermediate variables inside complex validation formulas, improving auditability and calculation speed:

```excel
=LET(
    actual_value, B2,
    threshold, C2,
    IF(actual_value<=threshold, "Within Threshold", "Review Required")
)
```

### Summary of Automated Validation Rules

| Validation Area | Automated Formula Check | Operational Action Required |
| :--- | :--- | :--- |
| **Mandatory Fields** | Detect blank required attributes across BOM and supplier intake sheets | Request missing technical specifications from manufacturer |
| **Relational ID Matching** | Verify product IDs, component IDs, and supplier IDs match across sheets via `XLOOKUP` | Resolve orphaned records or mismatched component codes |
| **Numeric Weight Tolerances** | Compare sum of sub-component weights against declared total weight within configured % tolerance | Investigate mass-balance discrepancies with supplier |
| **Heavy-Metal Limits (100 ppm)** | Compare reported Pb, Cd, Hg, and Cr(VI) sum against configured threshold | Flag exceedances for ISO/IEC 17025 lab verification or material substitution |
| **Recycled Content (PCR)** | Check presence and numerical validity of Post-Consumer Recycled content fields | Verify chain-of-custody certificates and mass-balance documentation |
| **Packaging Void-Space Ratio** | Calculate `(Outer Volume - Product Volume) / Outer Volume` against max 50% empty-space threshold | Trigger packaging minimisation redesign or document technical exemption |
| **Evidence Reference Linkage** | Verify every compliance claim references a document ID in the external repository | Audit the actual PDF report for scope, validity date, and test standard |
| **Review State Separation** | Distinguish automated screening flags from manual reviewer sign-off columns | Obtain formal regulatory reviewer decision before closing record |
| **CAPA & Blocker Tracking** | Roll up open gaps, overdue dates, testing costs, and DoC-blocking flags per SKU | Hold EU Declaration of Conformity sign-off until all blockers close |

</details>

---

## Other Decision-Support Tools in This Series

Explore other lightweight, zero-install browser and Microsoft Excel operational management tools in this repository. Every tool is built around structured master data, transparent spreadsheet formulas, and stage-gated business decision workflows.

## License

This project is distributed under the **Apache License 2.0**. See [`LICENSE`](./LICENSE) for the full license text.
