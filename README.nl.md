[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# EU PPWR-verpakkingscompliance-tracker: leveranciersbewijs, gerecycled gehalte en EU DoC-readiness-tool (gratis web-app en Excel-sjabloon)
<img width="1920" height="790" alt="image" src="https://github.com/user-attachments/assets/04c079b8-821c-4b40-857f-cc654a9e34f7" />


![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Web%20Browser%20%7C%20Microsoft%20Excel%20(.xlsx)-217346.svg)
![Regulation](https://img.shields.io/badge/Regulation-EU%20PPWR%20(EU)%202025%2F40-003399.svg)
![Tool Type](https://img.shields.io/badge/Tool-Packaging%20Compliance%20%26%20CAPA%20Tracker-2251FF.svg)

**De PPWR Packaging Compliance Data & Evidence Tracker is een gratis browsergebaseerde compliance-assessmenttool en Microsoft Excel-werkboek (`.xlsx`-sjabloon), gebouwd voor Verordening (EU) 2025/40 (de verordening betreffende verpakkingen en verpakkingsafval). Het helpt importeurs, merkeigenaren, verpakkingsingenieurs en regulatory-affairs-teams om materiaaldeclaraties van leveranciers te centraliseren, het Post-Consumer Recycled (PCR)-gehalte te verifiëren, limieten voor zware metalen en PFAS-stoffen te controleren, void-space-verhoudingen van verpakkingen te berekenen en Corrective and Preventive Actions (CAPA) bij te houden die vereist zijn voor Annex VII technische documentatie en de EU-conformiteitsverklaring (EU DoC).**

> **Kies uw implementatiemodus:** Test de workflow direct in uw browser zonder installatie, of download het volledige Microsoft Excel-sjabloon voor persistent multi-SKU-databeheer, terugkerende leveranciersaudits en offline regelgevingsarchivering.
>
> - 🌐 **[Start de gratis online PPWR-verpakkingscompliance-assessmenttool (interactieve HTML-web-app)](https://hyvoid.github.io/eu-ppwr-compliance-tracker/** — Voer direct verpakkingsdatavalidaties uit, test regeldrempels en verken de EU DoC-readiness-workflow rechtstreeks in uw browser (geen registratie of software-installatie vereist).
> - 📥 **[Download de Multi-SKU PPWR Compliance- en leveranciersbewijstracker (.xlsx Excel-werkboeksjabloon)](https://theseusworkshop.com/l/kbsrhr?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=eu-ppwr-compliance-tracker)** — Haal het complete 6-sheet Excel-werkboek op van de projectreleasepagina voor offline leveranciersinname, geautomatiseerde `XLOOKUP`/`LET` formulecontroles, CAPA-deadlinetracking en compliancebudgetbeheer.
>

---

## Wat het u helpt bij te houden: EU PPWR-compliancepijnpunten en geautomatiseerde oplossingen

Het beheren van compliance met de **EU-verordening betreffende verpakkingen en verpakkingsafval (PPWR)** in multi-tier toeleveringsketens vereist het koppelen van ruwe verpakkingsspecificaties aan geverifieerd juridisch bewijs. De onderstaande tabel koppelt veelvoorkomende operationele knelpunten aan de specifieke trackingmechanismen in deze toolkit:

| EU PPWR-compliancepijnpunt | Regelgevingsrisico en toeleveringsknelpunt | Wat deze PPWR-tracker vastlegt en automatiseert (kernstatistieken en velden) |
| :--- | :--- | :--- |
| **Gefragmenteerde verpakkings-Bill of Materials (BOM)** | Onvermogen om te traceren welke leverancier welke subcomponent bezit over primaire, secundaire en transportverpakkingsniveaus. | **Product-naar-verpakking traceerbaarheidsregister:** Koppelt SKU-ID's aan unieke component-ID's, verpakkingsniveaus (verkoop, gegroepeerd, transport/e-commerce), materiaalcategorieën en verantwoordelijke fabrikanten. |
| **Onvolledige materiaaldeclaraties van leveranciers** | Fabrikanten leveren gedeeltelijke spreadsheets aan zonder polymeertypes, gramgewichten of stofdeclaraties. | **Screening op volledigheid van fabrikantdata:** Markeert automatisch ontbrekende componentgewichten, afmetingen, **Post-Consumer Recycled (PCR)**-percentages en **Safety Data Sheet (SDS)**-verwijzingen. |
| **Niet-geverifieerde limieten voor zware metalen en PFAS** | Het accepteren van "compliant"-claims van leveranciers zonder kwantitatieve labresultaten te controleren tegen **100 ppm limieten voor zware metalen** of **PFAS-drempels** voor voedselcontact. | **Stof- en void-space-regelcontroles:** Vergelijkt gerapporteerde concentraties en **lege-ruimte (void space)-verhoudingen** met geconfigureerde **Verordening (EU) 2025/40**-drempels en massabalans-toleranties. |
| **Data-invoer verwarren met juridisch bewijs** | Een ingevulde Excel-cel of bestandsnaam als geldig juridisch bewijs behandelen zonder te controleren of het testrapport het juiste materiaal of de juiste revisie dekt. | **Dual-state bewijsreviewarchitectuur:** Scheidt geautomatiseerde formulescreening van verplichte menselijke expertverificatie van **ISO/IEC 17025-labtestrapporten** en leverancierscertificaten. |
| **Niet-bijgehouden compliancegaten en gemiste deadlines** | Mislukte controles en ontbrekende certificaten raken begraven in e-mailthreads, waardoor de ondertekening van de **EU-conformiteitsverklaring (EU DoC)** stokt. | **CAPA- en open-gap-actielogboek:** Wijs elke non-conformiteit toe aan een eigenaar met een vervaldatum, remediërende actie en een harde **DoC-blokkeringsindicator**. |
| **Ongecontroleerde labtest- en remediëringskosten** | Verrassingskosten van spoedtests in externe laboratoria en verpakkingsherontwerpen overschrijden compliancebudgetten. | **Test- en remediëringskosten-roll-up:** Houdt geciteerde laboratoriumtestkosten en correctieve-actiekosten per component bij en aggregeert de totale financiële blootstelling op product-SKU-niveau. |

---

## Quick Start-workflow: EU PPWR-verpakkingscompliance auditen in 4 stappen

Standaardiseer uw leveranciersverpakkingsinputs één keer, voer geautomatiseerde regelvalidaties uit tegen **Verordening (EU) 2025/40** en richt de tijd van uw regelgevingsteam op het verifiëren van laboratoriumbewijs en het sluiten van complianceblockers.

### Stap 1: Configureer EU PPWR-regeldrempels en assessmentbasislijn
**Actie:** **[Open de gratis browsergebaseerde PPWR-compliancetool](https://hyvoid.github.io/eu-ppwr-compliance-tracker/** (of open Sheet `01_Rule_Parameter_Register` in Excel) en stel uw assessmentbasislijn in.
- Definieer de assessmentdatum, rapportagevaluta, wisselkoersfactor en de actieve **PPWR-regelbibliotheekversie**.
- Configureer operationele drempels voor **limieten voor zware metalen (lood, cadmium, kwik, zeswaardig chroom <= 100 ppm)**, **PFAS-beperkingen voor voedselcontact**, **doelstellingen voor Post-Consumer Recycled (PCR)-gehalte** en **maximaal 50% lege-ruimte (void space)-verhoudingen**.
- Vergrendel deze parameters om een uniforme auditstandaard vast te stellen over alle productlijnen en leveranciersinzendingen.

### Stap 2: Bouw uw verpakkings-BOM en verzamel materiaaldeclaraties van leveranciers
**Actie:** Registreer uw **verpakkings-Bill of Materials (BOM)** en log technische data van fabrikanten in de gestandaardiseerde innamevelden.
- Koppel elke SKU over **primaire (verkoop), secundaire (gegroepeerde) en tertiaire (transport/e-commerce) verpakkingsniveaus** met een unieke component-ID.
- Registreer door leveranciers ingediende componentgewichten, materiaalclassificaties (kunststof, papier/karton, glas, metaal, composiet), **PCR-percentages gerecycled gehalte**, testwaarden voor beperkte stoffen en laboratoriumtestoffertes.
- Voeg externe document-ID's toe die elke rij koppelen aan uw **leveranciersconformiteitsverklaringen**, **ISO/IEC 17025-labtestrapporten** en **Safety Data Sheets (SDS)**.

### Stap 3: Voer geautomatiseerde datakwaliteitscontroles uit en wijs CAPA-eigenaren toe
**Actie:** Voer de ingebouwde screeningsregels uit om data-anomalieën te markeren en open compliancegaten om te zetten in bijgehouden **Corrective and Preventive Actions (CAPA)**.
- Beoordeel geautomatiseerde diagnostische vlaggen voor ontbrekende verplichte velden, **massabalans-gewichtsafwijkingen** (waar componentsubgewichten niet overeenkomen met het gedeclareerde totale gewicht binnen uw geconfigureerde tolerantie, zoals 2%), drempeloverschrijdingen en niet-gekoppelde bewijsbestanden.
- Leid elke gemarkeerde uitzondering naar het **Compliance Gap & CAPA-logboek**: wijs een verantwoordelijke remediëringseigenaar toe, specificeer de vereiste laboratoriumhertest of het corrigerende leveranciersdocument, stel een harde SLA-deadline in en markeer of het gat de ondertekening van de **EU-conformiteitsverklaring (EU DoC)** blokkeert.
- Laat een gekwalificeerde regelgevingsreviewer onafhankelijk verifiëren of de gerefereerde testrapporten actueel, authentiek en van toepassing zijn op de exacte verpakkingscomponent.

### Stap 4: Consolideer Annex VII technische documentatie en schaal met de herbruikbare Excel-sjabloon
**Actie:** Verifieer de readiness op productniveau vóór geautoriseerde ondertekening en stap vervolgens over van browsertesten in één sessie naar het persistente **Microsoft Excel-compliancewerkboek**.
- Controleer het geconsolideerde readiness-dashboard om drie onafhankelijke gates te bevestigen: **100% volledigheid van leveranciersdata**, **goedgekeurde expertbewijsreview** en **nul open DoC-blokkerende CAPA-items**.
- Stel uw **Annex VII technische documentatie**-pakket en **EU DoC-conceptverwijzingen** samen zodra alle stage-gates zijn gepasseerd.
- **Klaar om terugkerende audits en multi-SKU-portfolio's te beheren?** De webapplicatie is gebouwd voor direct, zero-install sandboxtesten van individuele workflows. Zodra u uw eerste browsertest hebt afgerond, **[downloadt u het herbruikbare PPWR-compliance Excel-werkboek (.xlsx-sjabloon)](https://theseusworkshop.com/l/kbsrhr?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=eu-ppwr-compliance-tracker)** om permanente offline opslag te ontgrendelen, tot **50 producten en 500 verpakkingscomponenten** te volgen, multi-round leveranciersdatacollectie te beheren en historische audit trails te onderhouden over regelgevingsreviewcycli heen.

---

## Waarom ik dit heb gebouwd: databeschikbaarheid scheiden van aangetoonde PPWR-compliance

Het voorbereiden van verpakkingscompliancedocumentatie over meerdere contractfabrikanten is een probleem van traceerbaarheid in de toeleveringsketen en risicobeheersing.

Een leverancier kan een volledig ingevulde vragenlijst terugsturen terwijl verplicht laboratoriumbewijs ontbreekt. Een geaccrediteerd testrapport kan in uw gedeelde drive staan maar een verouderde harskwaliteit, een andere fabriekslocatie of een verlopen teststandaard dekken. Een product-SKU kan elk verpakkingsgewichtveld ingevuld tonen terwijl de som van individuele componenten in tegenspraak is met het gedeclareerde totale montagegewicht. Wanneer elke leverancier een eigen spreadsheetindeling gebruikt en PDF's in aparte mappen opslaat, glippen deze afwijkingen langs handmatige review.

Het verwarren van **databeschikbaarheid met aangetoonde regelgevingscompliance** stelt importeurs en merkeigenaren bloot aan ernstige commerciële boetes.

Beschouw een concreet massabalansvoorbeeld: een product gebruikt een primaire kunststof flessenassemblage met een gedeclareerd totaalgewicht van 20 g. De fabrikant rapporteert 15 g primaire PET-hars en 3 g hulp-sluiting- en labelmaterialen. Elke vereiste cel bevat een getal, dus een basis-volledigheidscontrole markeert de rij als "100% compleet". Het gedeclareerde totaal (20 g) en de componentuitsplitsing (18 g) verschillen echter met 2 g — een onverklaarde massavariantie van 10%. Wanneer uw geconfigureerde tolerantie 2% is, moet het systeem die record markeren voor onderzoek in plaats van deze door te laten naar ondertekening van de **EU-conformiteitsverklaring (EU DoC)**.

Dezelfde verificatiekloof geldt voor documentair bewijs. Het invoeren van een certificaatreferentienummer in een cel bewijst niet dat het certificaat authentiek is, geldig is voor **Verordening (EU) 2025/40** of gekoppeld is aan de juiste verpakkingscomponent.

Ik heb deze toolkit gebouwd als een gestructureerde verificatiereeks die product-BOM-records koppelt aan leveranciersinzendingen, numerieke consistentie controleert, formulescreening scheidt van menselijke expertreview, CAPA-remediëring bijhoudt en de uiteindelijke ondertekening van het **Annex VII technisch dossier** gate't. Het legt ontbrekende data, numerieke tegenstrijdigheden en niet-geverifieerde claims vroeg bloot, vóór ze douanevertragingen of afgewezen regelgevingsaudits veroorzaken.

---

## Veelvoorkomende PPWR-voorbereidingsproblemen die dit oplost (handmatige spreadsheets versus gestructureerde tracker)

| Operationeel en regelgevingsknelpunt | Handmatige spreadsheet- en e-mailchaos (zonder deze tool) | Gestructureerde PPWR-complianceworkflow (met deze tracker) |
| :--- | :--- | :--- |
| **Niet-standaard leveranciersdata-inzendingen** | Regelgevingsteams besteden uren aan het handmatig reconciliëren van niet-overeenkomende leveranciers-Excelsheets, inconsistente polymeerbenaming en niet-gemapte SKU-codes. | Gestandaardiseerde **Manufacturer Data Intake**-velden en unieke Packaging Component-ID's dwingen een uniform dataschema af over alle leveranciers. |
| **Verweesde of niet-overeenkomende labtestrapporten** | Een zware-metalen testrapport of **PCR-massabalanscertificaat** wordt per ongeluk gekoppeld aan de verkeerde verpakkingslaag of een verouderde componentrevisie. | Relationele traceerbaarheid over `02_Product_Packaging_Register` en `03_Manufacturer_Data_Intake` bindt elke document-ID aan een specifieke SKU, verpakkingstier en leverancier. |
| **Verborgen gewichts- en drempeltegenstrijdigheden** | Ontbrekende waarden, **>50% void-space-verhoudingen** of componentgewichtsommen die massabalanscontroles niet doorstaan, blijven begraven in statische leverancierstabellen. | Geautomatiseerde Excel `LET`- en `FILTER`-validatieregels markeren numerieke tolerantieoverschrijdingen, **100 ppm uitzonderingen voor zware metalen** en ontbrekende velden onmiddellijk. |
| **Formulegeslaagd aanzien voor juridische ondertekening** | Het slagen voor een basis-spreadsheetberekening wordt behandeld als juridisch bewijs dat de verpakking voldoet aan **Verordening (EU) 2025/40**. | Speciale kolommen scheiden **geautomatiseerde datakwaliteitsvlaggen** van **expertbewijsreviewbeslissingen**, wat menselijke verificatie van onderliggende PDF's vereist. |
| **Vastgelopen corrigerende acties van leveranciers (CAPA)** | Verzoeken om ontbrekende **PFAS-verklaringen** of bijgewerkte labrapporten gaan verloren in e-mailketens zonder toegewezen eigenaar, budgetzicht of deadline. | Ingebouwd **Compliance Gap & Action-logboek** houdt remediëringseigenaren, doel-SLA-data, testkosten en achterstallige vlaggen bij in één gecentraliseerd overzicht. |
| **Voortijdige ondertekening van de EU-conformiteitsverklaring (EU DoC)** | Een product-SKU wordt vrijgegeven voor plaatsing op de EU-markt terwijl kritiek leveranciersbewijs of blokkerende corrigerende acties onopgelost blijven. | Multidimensionale **stage-gated readiness-controles** blokkeren de uiteindelijke ondertekening van technische documenten totdat datavolledigheid, expertreview en CAPA-gates allemaal slagen. |

---

## Voor wie dit is: doelrollen en sectorcompliancescenario's

Deze toolkit is gebouwd voor operationele, technische en regelgevingsprofessionals die een gestructureerd **PPWR-compliancesoftware-alternatief of Excel-sjabloon** nodig hebben zonder de licentiekosten en implementatievertraging van een enterprise PLM/ERP-module:

- **Verpakkingsingenieurs en verpakkingstechnologen:** Gebruik het **verpakkings-BOM-register** en de **void-space-verhoudingscalculator** om primaire, secundaire en transportverpakkingsspecificaties te evalueren, gewichtstoleranties te verifiëren en **verpakkingsminimalisatie**-doelen bij te houden tijdens ontwerp en leverancierskwalificatie.
- **Regulatory-affairs-managers en productcompliance-officers:** Standaardiseer de assemblage van **Annex VII technische documentatie**, audit leveranciersverklaringen tegen **Verordening (EU) 2025/40**, scheid geautomatiseerde screening van expertondertekening en beheer de uitgifte van de **EU-conformiteitsverklaring (EU DoC)**.
- **EU-importeurs, merkeigenaren en grensoverschrijdende e-commerceverkopers (Amazon FBA / DTC):** Stel aantoonbare due diligence vast over overzeese contractfabrikanten, verifieer **Extended Producer Responsibility (EPR)**-datainputs en zorg dat zendingen voldoen aan de documentatievereisten voor EU-markttoegang vóór douane-inklaring.
- **Supplier Quality Assurance (SQA)- en inkoopleads:** Onboard verpakkingsleveranciers met een uniform datacollectiesjabloon, houd ontbrekende certificaten bij, beheer **Corrective and Preventive Actions (CAPA)** met duidelijke deadlines en voorspel budgetten voor externe laboratoriumtests.
- **ESG-, duurzaamheids- en verpakkingscompliance-consultants:** Lever herhaalbare **PPWR-readiness-assessments** en client-gap-analyse-audits met de zero-install browserversie voor live workshops en het multi-SKU Excel-werkboek voor clientdeliverables.

**Scope en juridische grens:** Deze tool is een operationele workflow- en bewijsbeheerraamwerk. Het vervangt geen formeel juridisch advies, geaccrediteerde **ISO/IEC 17025-laboratoriumtests**, gezaghebbende regelgevingsinterpretatie of de wettelijke verplichtingen van de economische operator die verpakkingen op de markt van de Europese Unie plaatst.

---

## Hoogfrequente EU PPWR-use cases en sectorscenario's

Organisaties in productie, retail en e-commerce gebruiken deze **PPWR Packaging Compliance Data & Evidence Tracker** om vier risicovolle regelgevingsscenario's te beheren:

### 1. EU-douane-inklaring vóór verzending en audits door gemachtigde vertegenwoordigers (EAR)
Importeurs en niet-EU-fabrikanten die verpakte goederen op de Europese markt plaatsen, moeten op verzoek van markttoezichtautoriteiten of **EU-gemachtigde vertegenwoordigers (EAR)** volledige **Annex VII technische dossiers** en ondertekende **EU-conformiteitsverklaringen** verstrekken. Deze tracker consolideert verspreide leveranciers-PDF's en testreferentienummers in een auditbare index op productniveau voordat goederen de haven verlaten.

### 2. Verificatie van Post-Consumer Recycled (PCR)-gehalte en kunststofverpakkingsbelasting
Het verifiëren van verplichte **2030/2040 PCR-doelstellingen voor gerecycled gehalte** voor contactgevoelige en niet-contact kunststofverpakkingen vereist het traceren van harsverklaringen en third-party chain-of-custody-certificaten (zoals RecyClass of ISCC PLUS) tot op individuele verpakkingscomponenten. Het werkboek markeert componenten die gerecycled gehalte claimen zonder gekoppelde certificeringsverwijzingen.

### 3. Lege-ruimte (void space)-compliance voor e-commerce- en transportverpakkingen
Onder **Verordening (EU) 2025/40** moeten gegroepeerde, transport- en e-commerceverpakkingen voldoen aan strikte **verpakkingsminimalisatie**-regels, inclusief een **maximale lege-ruimteverhouding van 50%**. Verpakkingsteams gebruiken de inname- en validatiesheets om dimensionele volumes vast te leggen, void-space-verhoudingen automatisch te berekenen en herontwerp-CAPA's voor te grote verzenddozen te loggen.

### 4. Screening op beperkte stoffen (PFAS in voedselcontact en 100 ppm zware metalen)
Zorgen dat lood, cadmium, kwik en zeswaardig chroom onder de **100 ppm somconcentratielimiet** blijven — en dat voedselcontactverpakkingen voldoen aan **PFAS-beperkingen** — vereist rigoureuze labrapporttracking. De toolkit scheidt ruwe chemische testwaarden van expertreviewstatus en houdt hertestoffertes bij wanneer leverancierscertificaten verlopen.

---

## De bedrijfslogica en methodologie: verborgen commerciële blinde vlekken in verpakkingscompliance oplossen

Zelfs als u nul achtergrond hebt in Europees milieurecht of geavanceerde spreadsheetengineering, is het commerciële probleem achter verpakkingscompliance eenvoudig: **als u producten verkoopt in de Europese Unie en niet kunt bewijzen dat uw verpakking aan de regels voldoet, kunnen uw goederen bij de douane worden geblokkeerd, door marktplaatsen worden gedelist of worden beboet.**

De meeste kleine en middelgrote bedrijven zakken voor compliance-audits niet omdat ze de wet willen overtreden, maar omdat ze in **vijf verborgen commerciële beslissingsblinde vlekken** trappen. Hier is hoe de bedrijfslogica van deze tracker uw bedrijf beschermt tegen elke blinde vlek:

### Blinde vlek 1: "Mijn leverancier heeft de spreadsheet ingevuld, dus onze data is nauwkeurig."
- **De echte valkuil:** Leveranciers gokken vaak getallen om papierwerk snel af te ronden. Een leverancier schrijft bijvoorbeeld dat een geschenkdoos in totaal 100 gram weegt, maar noteert het karton op 70 gram en het kunststof inzetstuk op 15 gram (wat samen slechts 85 gram is). Als u dat blad accepteert zonder de rekensom te controleren, bevat uw officiële compliancedossier aantoonbaar foutieve data.
- **Hoe deze tool het oplost (gestructureerde masterdata en tolerantiecontroles):** U voert elk verpakkingsonderdeel één keer in een hoofdlijst in (`02_Product_Packaging_Register`). Wanneer leveranciersgetallen worden ingevoerd, vergelijken geautomatiseerde regels de onderdelen direct met het totale gewicht en toegestane limieten. Als de rekensom meer afwijkt dan uw toegestane marge (bijvoorbeeld 2%), geeft de tracker automatisch een waarschuwingsvlag — voordat u betaalt voor dure labtests of juridische documenten ondertekent.

### Blinde vlek 2: "We hebben een labtestrapport-PDF in onze map opgeslagen, dus we zijn veilig."
- **De echte valkuil:** Een PDF in een map betekent niet dat deze de daadwerkelijke flessendop of doos dekt die u vandaag verzendt. Leveranciers sturen regelmatig verouderde rapporten, rapporten voor een ander kunststofmateriaal of certificaten die bij het product van een andere klant horen.
- **Hoe deze tool het oplost (tweestapsverificatie: machinecontrole + menselijke controle):** De tracker splitst verificatie in twee aparte kolommen (`04_Data_Quality_Evidence_Check`). Eerst controleert de computer of de getallen en document-ID's aanwezig zijn. Vervolgens vereist een aparte kolom dat een menselijke reviewer de PDF opent, bevestigt dat deze werkelijk overeenkomt met die exacte verpakkingscomponent en deze markeert als "Goedgekeurd". U verwart "een bestand bestaat" nooit met "het bestand is geldig bewijs".

### Blinde vlek 3: "We vonden een complianceprobleem en mailden de fabriek — nu wachten we gewoon."
- **De echte valkuil:** Bij drukke productlanceringen worden e-mails aan leveranciers over ontbrekende zware-metalen tests of bijgewerkte gerecycled-kunststofcertificaten vergeten. Weken later is het product klaar om te verzenden en weet niemand welke complianceproblemen nog openstaan of hoeveel extra labtesten zullen kosten.
- **Hoe deze tool het oplost (problemen omzetten in bijgehouden taken en budgetten):** Telkens wanneer een controle mislukt of een certificaat wordt afgewezen, logt u dit in het **Compliance Gap & Action-logboek** (`05_Compliance_Gap_Action_Log`). Elk probleem krijgt een benoemde verantwoordelijke, een deadline, een geschatte labtest- of herontwerpkost en een "Blocker"-tag. Niets verdwijnt in een e-mailinbox en het management kan de exacte financiële kost van het oplossen van compliancegaten zien.

### Blinde vlek 4: "Onze compliancetracker is 95% groen, dus we kunnen de juridische verklaring ondertekenen en verzenden."
- **De echte valkuil:** Leidinggevenden kijken vaak naar een voortgangsbalk van "95% compleet" en nemen aan dat een product klaar is voor de markt. Bij regelgevingscompliance blokkeert **één enkel ontbrekend certificaat op een kunststof dop van 2 gram het hele product om legaal zijn EU-conformiteitsverklaring (EU DoC) te ontvangen.** Het ondertekenen van een juridische verklaring met een open blocker stelt het bedrijf en de individuele ondertekenaar bloot aan directe juridische aansprakelijkheid.
- **Hoe deze tool het oplost (stage-gated ondertekeningsbescherming):** Het uiteindelijke samenvattingsdashboard (`06_Compliance_Status_Doc_Index`) weigert een product als "Klaar voor EU DoC-ondertekening" te markeren alleen omdat de meeste cellen zijn ingevuld. Het werkt als een veiligheidsvergrendeling: een product wordt pas groen wanneer **(1) alle leveranciersdata compleet is, (2) alle bewijs-PDF's de menselijke review doorstaan EN (3) nul blokkerende corrigerende acties open blijven.**

### Samenvatting van de 5-stapsmethodologie
Door een strikte volgorde te volgen — **1. Onderdelen registreren → 2. Leveranciersgetallen verzamelen → 3. Rekensommen automatisch controleren → 4. Bewijs-PDF's verifiëren → 5. Blokkerende gaten sluiten vóór ondertekening** — zet deze tool een chaotische regelgevingslast om in een herhaalbare bedrijfschecklist die iedereen in uw team kan volgen.

---

## Over de PPWR Packaging Compliance Data & Evidence Tracker

De **PPWR Packaging Compliance Data & Evidence Tracker** helpt bedrijven verpakkingscompliancedata te structureren, ontbrekende of tegenstrijdige leveranciersinputs te detecteren, corrigerende acties (CAPA) te beheren en technische records te organiseren die vereist zijn voor interne governance en **Verordening (EU) 2025/40**-documentatie.

Door een strikte scheiding te handhaven tussen gestructureerde BOM-masterdata, leveranciersverklaringen, geautomatiseerde formulediagnostiek, menselijke bewijsreview, corrigerende-actieworkflows en readiness-rapportage op productniveau, zorgt het systeem ervoor dat teams duidelijk onderscheid maken tussen **het hebben van ruwe data, het hebben van geverifieerd ondersteunend bewijs en het bereiken van een goedgekeurd complianceresultaat**.

---

## Technische details: werkboekarchitectuur, formullelogica en validatieregels

De Excel-implementatie gebruikt zes onderling verbonden werkbladen, aangedreven door moderne Microsoft 365-dynamische-arrayfuncties (`LET`, `FILTER`, `XLOOKUP`, `UNIQUE`, `SORT`, `COUNTIFS`, `SUMIFS`, `HSTACK` en `CHOOSECOLS`) ter ondersteuning van maximaal **50 producten, 500 verpakkingscomponenten, 1.000 leveranciersinnamerecords en 1.000 compliancegaten**.

| Werkbladnaam | Primaire operationele functie | Belangrijkste compliance-outputs |
| :--- | :--- | :--- |
| `01_Rule_Parameter_Register` | PPWR-regelversies, regelgevingsdrempels, valutakoersen en toleranties bijhouden | Gecentraliseerde regelgevingsbasislijn en assessmentinstellingen |
| `02_Product_Packaging_Register` | Product-SKU's, verpakkingstiers (primair/secundair/transport), component-ID's en leveranciers registreren | Gestructureerde verpakkings-Bill of Materials (BOM)-masterdata |
| `03_Manufacturer_Data_Intake` | Door leveranciers ingediende gewichten, afmetingen, PCR-gerecycled gehalte, stofwaarden en document-ID's vastleggen | Geconsolideerde technische verklaringen van fabrikanten |
| `04_Data_Quality_Evidence_Check` | Geautomatiseerde formulediagnostiek uitvoeren naast speciale handmatige expertreviewkolommen | Geautomatiseerde datakwaliteitsvlaggen + onafhankelijke bewijsreviewstatus |
| `05_Compliance_Gap_Action_Log` | Non-conformiteiten, CAPA-remediëringseigenaren, SLA-deadlines, testkosten en DoC-blockers bijhouden | Actiebaar CAPA-register met financiële kostenroll-ups |
| `06_Compliance_Status_Doc_Index` | SKU-niveau readiness, Annex VII-documentverwijzingen, EU DoC-status en open blockers consolideren | Executive compliancedashboard en geprioriteerde gap-wachtrij |

<details>
<summary><strong>Klik om uit te vouwen: gedetailleerde datastroom, capaciteitsspecificaties, formulepatronen (`LET`) en validatielogica</strong></summary>

### Gecontroleerde 7-staps datastroom

1. **Regels en parameters configureren (`01_Rule_Parameter_Register`):** Stel assessmentdatum, regelbibliotheekversie, drempels voor zware metalen/PFAS, void-space-limieten en gewichtstoleranties vast.
2. **Producten en verpakkings-BOM registreren (`02_Product_Packaging_Register`):** Creëer stabiele component-ID's die producten, verpakkingsniveaus, materialen en verantwoordelijke fabrikanten koppelen.
3. **Leveranciersinzendingen verzamelen (`03_Manufacturer_Data_Intake`):** Registreer technische metingen van leveranciers, verklaringen over gerecycled gehalte en externe documentrepository-ID's.
4. **Geautomatiseerde datakwaliteitscontroles uitvoeren (`04_Data_Quality_Evidence_Check`):** Trigger formulegebaseerde screening op ontbrekende velden, massabalansmismatches en drempeloverschrijdingen.
5. **Expertbewijsreview uitvoeren (`04_Data_Quality_Evidence_Check`):** Registreer beslissingen van gekwalificeerde menselijke reviewers die verifiëren of externe testrapporten en certificaten de regelgevingsclaim ondersteunen.
6. **CAPA-gaten loggen en oplossen (`05_Compliance_Gap_Action_Log`):** Wijs remediëringseigenaren, deadlines, laboratoriumtestoffertes en EU DoC-blokkeringsindicatoren toe.
7. **Readiness op productniveau evalueren (`06_Compliance_Status_Doc_Index`):** Consolideer datavolledigheid, bewijsgoedkeuring en open blockers vóór ondertekening van het Annex VII technisch dossier.

### Werkboekcapaciteit en Excel-versiecompatibiliteit

| Datadomein | Geplande ontwerpcapaciteit |
| :--- | ---: |
| Regelgevingsregelrecords | 200 |
| Verpakkings-BOM-componenten | 500 |
| Leveranciersdatainnamerecords | 1.000 |
| Compliancegap- en CAPA-records | 1.000 |
| Product-SKU's | 50 |

**Systeemvereisten:** Microsoft 365 (Desktop of Web) of Excel 2021/2024-omgevingen die dynamische-arrayfuncties (`LET`, `FILTER`, `XLOOKUP`, `HSTACK`, `CHOOSECOLS`) ondersteunen. Legacy Excel 2016 en Excel 2019 ondersteunen de vereiste dynamische-array-formule-engine niet.

### Kritieke implementatie- en operationele beschermingen

1. **Houd geautomatiseerde controles gescheiden van expertreview:** In `04_Data_Quality_Evidence_Check` zijn kolommen `I:L` uitsluitend gereserveerd voor handmatige expertreviewinputs, terwijl aangrenzende kolommen geautomatiseerde formulediagnostiek berekenen. Overschrijf nooit formulekolommen en behandel geautomatiseerde "Pass"-vlaggen nooit als vervanging voor handmatige documentinspectie.
2. **Behoud rijuitlijning over bron- en reviewtabellen:** Positieafhankelijke formules vertrouwen op stabiele rijuitlijning tussen `02_Product_Packaging_Register`, `03_Manufacturer_Data_Intake` en `04_Data_Quality_Evidence_Check`. Voeg geen rijen in, verwijder ze niet en sorteer ze niet midden in een tabel zonder afhankelijke reviewrecords opnieuw uit te lijnen; voeg nieuwe records altijd onderaan de aangewezen tabellen toe.
3. **Bescherm dynamische-array spill-bereiken:** Samenvattingsweergaven gebruiken `FILTER`, `UNIQUE` en `SORT` om meerrijige outputs dynamisch te spillen. Houd spill-zones vrij van handmatige tekstinvoer om `#SPILL!`-fouten te voorkomen.

### Formulereferentie: geparametriseerde drempelcontroles met `LET`

Het werkboek gebruikt `LET` om tussenvariabelen te binden binnen complexe validatieformules, wat de auditbaarheid en berekeningssnelheid verbetert:

```excel
=LET(
    actual_value, B2,
    threshold, C2,
    IF(actual_value<=threshold, "Within Threshold", "Review Required")
)
```

### Samenvatting van geautomatiseerde validatieregels

| Validatiegebied | Geautomatiseerde formulecontrole | Vereiste operationele actie |
| :--- | :--- | :--- |
| **Verplichte velden** | Detecteer lege vereiste attributen over BOM- en leveranciersinnamesheets | Vraag ontbrekende technische specificaties op bij de fabrikant |
| **Relationele ID-matching** | Verifieer dat product-ID's, component-ID's en leveranciers-ID's over sheets overeenkomen via `XLOOKUP` | Los verweesde records of niet-overeenkomende componentcodes op |
| **Numerieke gewichtstoleranties** | Vergelijk de som van subcomponentgewichten met het gedeclareerde totale gewicht binnen een geconfigureerde %-tolerantie | Onderzoek massabalansafwijkingen met de leverancier |
| **Limieten voor zware metalen (100 ppm)** | Vergelijk de gerapporteerde som van Pb, Cd, Hg en Cr(VI) met de geconfigureerde drempel | Markeer overschrijdingen voor ISO/IEC 17025-labverificatie of materiaalsubstitutie |
| **Gerecycled gehalte (PCR)** | Controleer aanwezigheid en numerieke geldigheid van Post-Consumer Recycled-gehaltevelden | Verifieer chain-of-custody-certificaten en massabalansdocumentatie |
| **Void-space-verhouding van verpakkingen** | Bereken `(Buitenvolume - Productvolume) / Buitenvolume` tegen de maximale 50% lege-ruimtedrempel | Trigger verpakkingsminimalisatie-herontwerp of documenteer technische vrijstelling |
| **Bewijsverwijzingskoppeling** | Verifieer dat elke complianceclaim verwijst naar een document-ID in de externe repository | Audit de daadwerkelijke PDF-rapportage op scope, geldigheidsdatum en teststandaard |
| **Scheiding van reviewstatussen** | Onderscheid geautomatiseerde screeningsvlaggen van handmatige reviewerondertekeningskolommen | Verkrijg formele regelgevingsreviewerbeslissing vóór het sluiten van de record |
| **CAPA- en blockertracking** | Rol open gaten, achterstallige data, testkosten en DoC-blokkeringsvlaggen per SKU op | Houd de ondertekening van de EU-conformiteitsverklaring tegen totdat alle blockers zijn gesloten |

</details>

---

## Andere beslissingsondersteunende tools in deze serie

Ontdek andere lichtgewicht, zero-install browser- en Microsoft Excel-operationele-managementtools in deze repository. Elke tool is gebouwd rond gestructureerde masterdata, transparante spreadsheetformules en stage-gated bedrijfsbeslissingsworkflows.

## Licentie

Dit project wordt gedistribueerd onder de **Apache License 2.0**. Zie [`LICENSE`](./LICENSE) voor de volledige licentietekst.
