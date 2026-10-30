[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# EU PPWR Verpackungs-Compliance-Tracker: Lieferantennachweise, Rezyklatanteil & EU-DoC-Bereitschaftstool (Kostenlose Web-App & Excel-Vorlage)
<img width="1920" height="790" alt="image" src="https://github.com/user-attachments/assets/04c079b8-821c-4b40-857f-cc654a9e34f7" />


![Lizenz](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Plattform](https://img.shields.io/badge/Platform-Web%20Browser%20%7C%20Microsoft%20Excel%20(.xlsx)-217346.svg)
![Verordnung](https://img.shields.io/badge/Regulation-EU%20PPWR%20(EU)%202025%2F40-003399.svg)
![Tool-Typ](https://img.shields.io/badge/Tool-Packaging%20Compliance%20%26%20CAPA%20Tracker-2251FF.svg)

**Der PPWR-Verpackungs-Compliance-Daten- & -Nachweis-Tracker ist ein kostenloses browserbasiertes Compliance-Bewertungstool und eine Microsoft-Excel-Arbeitsmappe (`.xlsx`-Vorlage), erstellt für die Verordnung (EU) 2025/40 (Verpackungs- und Verpackungsabfallverordnung). Er hilft Importeuren, Markeninhabern, Verpackungsingenieuren und Regulatory-Affairs-Teams, Lieferanten-Materialdeklarationen zu zentralisieren, den Post-Consumer-Rezyklatanteil (PCR) zu verifizieren, Grenzwerte für Schwermetalle und PFAS-Substanzen zu prüfen, Verpackungs-Hohlraumverhältnisse zu berechnen und Korrektur- und Vorbeugungsmaßnahmen (CAPA) zu verfolgen, die für die technische Dokumentation nach Anhang VII und die EU-Konformitätserklärung (EU DoC) erforderlich sind.**

> **Wählen Sie Ihren Bereitstellungsmodus:** Testen Sie den Workflow sofort in Ihrem Browser ohne Installation, oder laden Sie die vollständige Microsoft-Excel-Vorlage für dauerhaftes Multi-SKU-Datenmanagement, wiederkehrende Lieferantenaudits und die Offline-Aufbewahrung regulatorischer Aufzeichnungen herunter.
>
> - 🌐 **[Starten Sie das kostenlose Online-PPWR-Verpackungs-Compliance-Bewertungstool (Interaktive HTML-Web-App)](https://hyvoid.github.io/eu-ppwr-compliance-tracker/** — Führen Sie sofortige Verpackungsdaten-Validierungen durch, testen Sie Regelschwellen und erkunden Sie den EU-DoC-Bereitschaftsworkflow direkt in Ihrem Browser (keine Anmeldung oder Software-Installation erforderlich).
> - 📥 **[Laden Sie den Multi-SKU-PPWR-Compliance- & -Lieferantennachweis-Tracker (.xlsx Excel-Arbeitsmappenvorlage) herunter](https://theseusworkshop.com/l/kbsrhr?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=eu-ppwr-compliance-tracker)** — Erhalten Sie die vollständige 6-Blatt-Excel-Arbeitsmappe von der Projekt-Release-Seite für die Offline-Lieferantenaufnahme, automatisierte `XLOOKUP`/`LET`-Formelprüfungen, CAPA-Fristenverfolgung und Compliance-Budgetverwaltung.
>

---

## Was Ihnen beim Verfolgen hilft: EU-PPWR-Compliance-Problempunkte & automatisierte Lösungen

Das Verwalten der Compliance mit der **EU-Verpackungs- und Verpackungsabfallverordnung (PPWR)** über mehrstufige Lieferketten hinweg erfordert die Verknüpfung roher Verpackungsspezifikationen mit verifizierten rechtlichen Nachweisen. Die folgende Tabelle ordnet häufige operative Engpässe den spezifischen Tracking-Mechanismen in diesem Toolkit zu:

| EU-PPWR-Compliance-Problempunkt | Regulatorisches Risiko & Lieferketten-Engpass | Was dieser PPWR-Tracker erfasst & automatisiert (Kernkennzahlen & Felder) |
| :--- | :--- | :--- |
| **Fragmentierte Verpackungs-Stückliste (Bill of Materials, BOM)** | Unfähigkeit nachzuvollziehen, welcher Lieferant welche Unterkomponente über Primär-, Sekundär- und Transportverpackungsebenen hinweg besitzt. | **Produkt-zu-Verpackung-Rückverfolgbarkeitsregister:** Verknüpft SKU-IDs mit eindeutigen Komponenten-IDs, Verpackungsebenen (Verkauf, gebündelt, Transport/E-Commerce), Materialkategorien und verantwortlichen Herstellern. |
| **Unvollständige Lieferanten-Materialdeklarationen** | Hersteller reichen unvollständige Tabellen ein, in denen Polymertypen, Grammgewichte oder Substanzdeklarationen fehlen. | **Vollständigkeits-Screening der Herstellerdaten:** Kennzeichnet automatisch fehlende Komponentengewichte, Abmessungen, **Post-Consumer-Rezyklatanteile (PCR)** und **Sicherheitsdatenblatt-Referenzen (SDS)**. |
| **Ungeprüfte Schwermetall- & PFAS-Grenzwerte** | Akzeptieren von „Compliant"-Behauptungen der Lieferanten, ohne quantitative Laborergebnisse gegen **100-ppm-Schwermetallgrenzwerte** oder **PFAS-Schwellenwerte für Lebensmittelkontakt** zu prüfen. | **Substanz- & Hohlraum-Regelprüfungen:** Vergleicht gemeldete Konzentrationen und **Leerraum- (Hohlraum-) Verhältnisse** mit konfigurierten Schwellenwerten der **Verordnung (EU) 2025/40** und Massenbilanz-Toleranzen. |
| **Verwechslung von Dateneingabe mit rechtlichem Nachweis** | Eine befüllte Excel-Zelle oder einen Dateinamen als gültigen rechtlichen Nachweis behandeln, ohne zu prüfen, ob der Prüfbericht das richtige Material oder die richtige Revision abdeckt. | **Zweistufige Nachweis-Prüfarchitektur:** Trennt automatisiertes Formel-Screening von der obligatorischen menschlichen Expertenprüfung der **ISO/IEC 17025-Labortestberichte** und Lieferantenzertifikate. |
| **Nicht verfolgte Compliance-Lücken & versäumte Fristen** | Fehlgeschlagene Prüfungen und fehlende Zertifikate gehen in E-Mail-Verläufen unter und blockieren die Unterzeichnung der **EU-Konformitätserklärung (EU DoC)**. | **CAPA- & Offene-Lücken-Maßnahmenprotokoll:** Weist jede Nichtkonformität einem Verantwortlichen mit Fälligkeitsdatum, Korrekturmaßnahme und einem harten **DoC-Blockierungsindikator** zu. |
| **Unkontrollierte Labortest- & Korrekturkosten** | Überraschende Ausgaben durch Notfall-Labortests Dritter und Verpackungs-Neudesigns sprengen Compliance-Budgets. | **Kosten-Rollup für Tests & Korrekturen:** Verfolgt angebotene Labortestgebühren und Korrekturmaßnahmenkosten pro Komponente und aggregiert die gesamte finanzielle Exposition auf Produkt-SKU-Ebene. |

---

## Schnellstart-Workflow: So prüfen Sie die EU-PPWR-Verpackungs-Compliance in 4 Schritten

Standardisieren Sie Ihre Lieferanten-Verpackungseingaben einmalig, führen Sie automatisierte Regelvalidierungen gegen die **Verordnung (EU) 2025/40** aus und konzentrieren Sie die Zeit Ihres Regulatory-Teams auf die Prüfung von Labornachweisen und das Schließen von Compliance-Blockern.

### Schritt 1: Konfigurieren Sie die EU-PPWR-Regulierungsschwellen & die Bewertungsbasis
**Aktion:** **[Öffnen Sie das kostenlose browserbasierte PPWR-Compliance-Tool](https://hyvoid.github.io/eu-ppwr-compliance-tracker/** (oder öffnen Sie das Blatt `01_Rule_Parameter_Register` in Excel) und legen Sie Ihre Bewertungsbasis fest.
- Definieren Sie das Bewertungsdatum, die Berichtswährung, den Wechselkursfaktor und die aktive **PPWR-Regelbibliotheks-Version**.
- Konfigurieren Sie operative Schwellen für **Schwermetallgrenzwerte (Blei, Cadmium, Quecksilber, sechswertiges Chrom <= 100 ppm)**, **PFAS-Beschränkungen bei Lebensmittelkontakt**, **Post-Consumer-Rezyklatziele (PCR)** und **maximale Leerraum- (Hohlraum-) Verhältnisse von 50%**.
- Sperren Sie diese Parameter, um einen einheitlichen Prüfstandard über alle Produktlinien und Lieferanteneinreichungen hinweg zu etablieren.

### Schritt 2: Erstellen Sie Ihre Verpackungs-BOM & sammeln Sie Lieferanten-Materialdeklarationen
**Aktion:** Registrieren Sie Ihre **Verpackungs-Stückliste (Bill of Materials, BOM)** und protokollieren Sie Hersteller-Technikdaten in den standardisierten Aufnahmefeldern.
- Ordnen Sie jede SKU über **Primär- (Verkauf), Sekundär- (gebündelt) und Tertiär- (Transport/E-Commerce) Verpackungsebenen** mit einer eindeutigen Komponenten-ID zu.
- Erfassen Sie lieferantengemeldete Komponentengewichte, Materialklassifizierungen (Kunststoff, Papier/Karton, Glas, Metall, Verbundstoff), **PCR-Rezyklatanteilsprozentsätze**, Prüfwerte eingeschränkter Substanzen und Labortest-Angebote.
- Hängen Sie externe Dokument-IDs an, die jede Zeile mit Ihren **Lieferanten-Konformitätserklärungen**, **ISO/IEC 17025-Labortestberichten** und **Sicherheitsdatenblättern (SDS)** verknüpfen.

### Schritt 3: Führen Sie automatisierte Datenqualitätsprüfungen aus & weisen Sie CAPA-Verantwortliche zu
**Aktion:** Führen Sie die integrierten Screening-Regeln aus, um Datenanomalien zu kennzeichnen und offene Compliance-Lücken in verfolgte **Korrektur- und Vorbeugungsmaßnahmen (CAPA)** zu überführen.
- Überprüfen Sie automatisierte Diagnosekennzeichen für fehlende Pflichtfelder, **Massenbilanz-Gewichtsabweichungen** (bei denen Teilgewichte der Komponenten nicht zum deklarierten Gesamtgewicht innerhalb Ihrer konfigurierten Toleranz, z. B. 2%, passen), Schwellenwertverletzungen und nicht verknüpfte Nachweisdateien.
- Leiten Sie jede gekennzeichnete Ausnahme in das **Compliance-Lücken- & CAPA-Protokoll**: Weisen Sie einen verantwortlichen Korrekturverantwortlichen zu, geben Sie den erforderlichen Labor-Nachtest oder das Lieferanten-Korrekturdokument an, setzen Sie eine harte SLA-Frist und markieren Sie, ob die Lücke die Unterzeichnung der **EU-Konformitätserklärung (EU DoC)** blockiert.
- Lassen Sie einen qualifizierten Regulatory-Prüfer unabhängig verifizieren, ob die referenzierten Prüfberichte aktuell, authentisch und auf die exakte Verpackungskomponente anwendbar sind.

### Schritt 4: Konsolidieren Sie die technische Dokumentation nach Anhang VII & skalieren Sie mit der wiederverwendbaren Excel-Vorlage
**Aktion:** Verifizieren Sie die Produktebene-Bereitschaft vor der autorisierten Unterzeichnung und wechseln Sie dann vom einmaligen Browser-Test zur dauerhaften **Microsoft-Excel-Compliance-Arbeitsmappe**.
- Prüfen Sie das konsolidierte Bereitschafts-Dashboard, um drei unabhängige Gates zu bestätigen: **100% Vollständigkeit der Lieferantendaten**, **genehmigte Experten-Nachweisprüfung** und **null offene DoC-blockierende CAPA-Positionen**.
- Stellen Sie Ihr Paket für die **technische Dokumentation nach Anhang VII** und Ihre **EU-DoC-Entwurfsreferenzen** zusammen, sobald alle Stage-Gates freigegeben sind.
- **Bereit für wiederkehrende Audits und Multi-SKU-Portfolios?** Die Web-Anwendung ist für sofortige, installationsfreie Sandbox-Tests einzelner Workflows konzipiert. Sobald Sie Ihren ersten Browser-Test abgeschlossen haben, **[laden Sie die wiederverwendbare PPWR-Compliance-Excel-Arbeitsmappe (.xlsx-Vorlage) herunter](https://theseusworkshop.com/l/kbsrhr?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=eu-ppwr-compliance-tracker)**, um dauerhafte Offline-Speicherung freizuschalten, bis zu **50 Produkte und 500 Verpackungskomponenten** zu verfolgen, mehrstufige Lieferantendatenerfassung zu verwalten und historische Audit-Trails über regulatorische Prüfzyklen hinweg zu pflegen.

---

## Warum ich das entwickelt habe: Trennung von Datenverfügbarkeit und nachgewiesener PPWR-Compliance

Die Vorbereitung der Verpackungs-Compliance-Dokumentation über mehrere Auftragshersteller hinweg ist ein Problem der Lieferketten-Rückverfolgbarkeit und Risikosteuerung.

Ein Lieferant kann einen vollständig ausgefüllten Fragebogen zurücksenden und dabei obligatorische Labornachweise auslassen. Ein akkreditierter Prüfbericht mag in Ihrem gemeinsamen Laufwerk existieren, aber eine veraltete Harzqualität, einen anderen Werksstandort oder eine abgelaufene Prüfnorm abdecken. Eine Produkt-SKU mag alle Verpackungsgewichtsfelder ausgefüllt zeigen, während die Summe der Einzelkomponenten dem deklarierten Gesamtmontagegewicht widerspricht. Wenn jeder Anbieter ein eigenes Tabellenlayout verwendet und PDFs in getrennten Ordnern speichert, schlüpfen diese Abweichungen an der manuellen Prüfung vorbei.

Die Verwechslung von **Datenverfügbarkeit mit nachgewiesener regulatorischer Compliance** setzt Importeure und Markeninhaber schweren kommerziellen Strafen aus.

Betrachten Sie ein konkretes Massenbilanz-Beispiel: Ein Produkt verwendet eine primäre Kunststoffflaschen-Baugruppe mit einem deklarierten Gesamtgewicht von 20 g. Der Hersteller meldet 15 g primäres PET-Harz und 3 g Hilfsverschluss- und Etikettenmaterial. Jede erforderliche Zelle enthält eine Zahl, sodass eine grundlegende Vollständigkeitsprüfung die Zeile als „100% vollständig" markiert. Das deklarierte Gesamtgewicht (20 g) und die Komponentenaufschlüsselung (18 g) weichen jedoch um 2 g voneinander ab – eine unerklärte Massenvarianz von 10%. Wenn Ihre konfigurierte Toleranz 2% beträgt, muss das System diesen Datensatz zur Untersuchung kennzeichnen, statt ihn zur Unterzeichnung der **EU-Konformitätserklärung (EU DoC)** durchzulassen.

Dieselbe Verifikationslücke gilt für dokumentarische Nachweise. Das Eintragen einer Zertifikatsreferenznummer in eine Zelle beweist nicht, dass das Zertifikat authentisch ist, für die **Verordnung (EU) 2025/40** gültig ist oder zur richtigen Verpackungskomponente passt.

Ich habe dieses Toolkit als strukturierte Verifikationssequenz entwickelt, die Produkt-BOM-Datensätze mit Lieferanteneinreichungen verknüpft, numerische Konsistenz prüft, Formel-Screening von menschlicher Expertenprüfung trennt, CAPA-Korrekturen verfolgt und die endgültige Unterzeichnung der **technischen Datei nach Anhang VII** gated. Es deckt fehlende Daten, numerische Widersprüche und ungeprüfte Behauptungen früh auf, bevor sie Zollverzögerungen oder abgelehnte regulatorische Audits verursachen.

---

## Häufige PPWR-Vorbereitungsprobleme, die dies löst (manuelle Tabellen vs. strukturierter Tracker)

| Operativer & regulatorischer Engpass | Manuelle Tabellen- & E-Mail-Chaos (ohne dieses Tool) | Strukturierter PPWR-Compliance-Workflow (mit diesem Tracker) |
| :--- | :--- | :--- |
| **Nicht standardisierte Lieferanten-Dateneinreichungen** | Regulatory-Teams verbringen Stunden damit, nicht zusammenpassende Lieferanten-Excel-Tabellen, uneinheitliche Polymerbezeichnungen und nicht zugeordnete SKU-Codes manuell abzugleichen. | Standardisierte **Hersteller-Datenaufnahme**-Felder und eindeutige Verpackungskomponenten-IDs erzwingen ein einheitliches Datenschema über alle Lieferanten hinweg. |
| **Verwaiste oder nicht passende Labortestberichte** | Ein Schwermetall-Prüfbericht oder **PCR-Massenbilanz-Zertifikat** wird versehentlich mit der falschen Verpackungsebene oder einer veralteten Komponentenrevision verknüpft. | Relationale Rückverfolgbarkeit über `02_Product_Packaging_Register` und `03_Manufacturer_Data_Intake` bindet jede Dokument-ID an eine bestimmte SKU, Verpackungsebene und einen Lieferanten. |
| **Versteckte Gewichts- & Schwellenwert-Widersprüche** | Fehlende Werte, **>50%-Hohlraumverhältnisse** oder Komponentengewichtssummen, die Massenbilanzprüfungen nicht bestehen, bleiben in statischen Lieferantentabellen vergraben. | Automatisierte Excel-`LET`- und `FILTER`-Validierungsregeln kennzeichnen numerische Toleranzverletzungen, **100-ppm-Schwermetall-Ausnahmen** und fehlende Felder sofort. |
| **Formelbestanden verwechselt mit rechtlicher Freigabe** | Das Bestehen einer einfachen Tabellenberechnung wird als rechtlicher Nachweis behandelt, dass die Verpackung die **Verordnung (EU) 2025/40** erfüllt. | Dedizierte Spalten trennen **automatisierte Datenqualitätskennzeichen** von **Experten-Nachweisprüfentscheidungen** und erfordern die menschliche Prüfung der zugrunde liegenden PDFs. |
| **Stockende Lieferanten-Korrekturmaßnahmen (CAPA)** | Anfragen zu fehlenden **PFAS-Deklarationen** oder aktualisierten Laborberichten gehen in E-Mail-Ketten ohne zugewiesenen Verantwortlichen, Budgettransparenz oder Frist verloren. | Das integrierte **Compliance-Lücken- & Maßnahmenprotokoll** verfolgt Korrekturverantwortliche, Ziel-SLA-Termine, Testkosten und Überfälligkeitskennzeichen in einer zentralen Ansicht. |
| **Vorzeitige Unterzeichnung der EU-Konformitätserklärung (EU DoC)** | Eine Produkt-SKU wird für die EU-Markteinführung freigegeben, obwohl kritische Lieferantennachweise oder blockierende Korrekturmaßnahmen ungelöst bleiben. | Mehrdimensionale **Stage-Gated-Bereitschaftssteuerungen** blockieren die endgültige Unterzeichnung technischer Dokumente, bis Datenvollständigkeit, Expertenprüfung und CAPA-Gates alle bestanden sind. |

---

## Für wen das gedacht ist: Zielrollen & Branchen-Compliance-Szenarien

Dieses Toolkit ist für operative, technische und regulatorische Fachkräfte konzipiert, die eine strukturierte **PPWR-Compliance-Software-Alternative oder Excel-Vorlage** ohne Lizenzkosten und Bereitstellungsverzögerung eines Unternehmens-PLM/ERP-Moduls benötigen:

- **Verpackungsingenieure & Verpackungstechnologen:** Nutzen Sie das **Verpackungs-BOM-Register** und den **Hohlraumverhältnis-Rechner**, um Primär-, Sekundär- und Transportverpackungsspezifikationen zu bewerten, Gewichtstoleranzen zu verifizieren und **Verpackungsminimierungs**-Ziele während Design und Lieferantenqualifizierung zu verfolgen.
- **Regulatory-Affairs-Manager & Produkt-Compliance-Beauftragte:** Standardisieren Sie die Zusammenstellung der **technischen Dokumentation nach Anhang VII**, prüfen Sie Lieferantendeklarationen gegen die **Verordnung (EU) 2025/40**, trennen Sie automatisiertes Screening von der Experten-Freigabe und steuern Sie die Ausstellung der **EU-Konformitätserklärung (EU DoC)**.
- **EU-Importeure, Markeninhaber & grenzüberschreitende E-Commerce-Verkäufer (Amazon FBA / DTC):** Etablieren Sie nachweisbare Due Diligence über überseeische Auftragshersteller, verifizieren Sie **Extended-Producer-Responsibility-Dateneingaben (EPR)** und stellen Sie sicher, dass Sendungen die EU-Marktzugangs-Dokumentationsanforderungen vor der Zollabfertigung erfüllen.
- **Supplier-Quality-Assurance-Leiter (SQA) & Einkaufsleiter:** Onboarden Sie Verpackungslieferanten mit einer einheitlichen Datenerfassungsvorlage, verfolgen Sie fehlende Zertifikate, verwalten Sie **Korrektur- und Vorbeugungsmaßnahmen (CAPA)** mit klaren Fristen und prognostizieren Sie Budgets für Dritt-Laborprüfungen.
- **ESG-, Nachhaltigkeits- & Verpackungs-Compliance-Berater:** Liefern Sie wiederholbare **PPWR-Bereitschaftsbewertungen** und Kunden-Gap-Analyse-Audits mit der installationsfreien Browser-Version für Live-Workshops und der Multi-SKU-Excel-Arbeitsmappe für Kunden-Deliverables.

**Umfang & rechtliche Abgrenzung:** Dieses Tool ist ein operativer Workflow- und Nachweisverwaltungs-Rahmen. Es ersetzt keine formelle Rechtsberatung, akkreditierte **ISO/IEC 17025-Labortests**, verbindliche regulatorische Auslegung oder die gesetzlichen Pflichten des Wirtschaftsakteurs, der Verpackungen auf dem Markt der Europäischen Union in Verkehr bringt.

---

## Häufige EU-PPWR-Anwendungsfälle & Branchenszenarien

Organisationen aus Fertigung, Handel und E-Commerce nutzen diesen **PPWR-Verpackungs-Compliance-Daten- & -Nachweis-Tracker**, um vier risikoreiche regulatorische Szenarien zu verwalten:

### 1. EU-Zollabfertigung vor dem Versand & Audits durch Bevollmächtigte (EAR)
Importeure und Nicht-EU-Hersteller, die verpackte Waren auf dem europäischen Markt in Verkehr bringen, müssen auf Verlangen der Marktüberwachungsbehörden oder **EU-Bevollmächtigten (EAR)** vollständige **technische Dateien nach Anhang VII** und unterzeichnete **EU-Konformitätserklärungen** bereitstellen. Dieser Tracker konsolidiert verstreute Lieferanten-PDFs und Testreferenznummern in einen prüfbaren Produktebene-Index, bevor die Waren den Hafen verlassen.

### 2. Verifikation des Post-Consumer-Rezyklatanteils (PCR) & der Kunststoffverpackungssteuer
Die Verifikation verbindlicher **2030/2040-PCR-Rezyklatziele** für kontaktempfindliche und kontaktfreie Kunststoffverpackungen erfordert die Rückverfolgung von Harzdeklarationen und Dritt-Zertifikaten zur Produktkette (Chain of Custody, wie RecyClass oder ISCC PLUS) bis hinunter zu einzelnen Verpackungskomponenten. Die Arbeitsmappe kennzeichnet Komponenten, die Rezyklatanteile ohne verknüpfte Zertifizierungsreferenzen beanspruchen.

### 3. Compliance für Leerraum (Hohlraum) bei E-Commerce- & Transportverpackungen
Unter der **Verordnung (EU) 2025/40** müssen gebündelte, Transport- und E-Commerce-Verpackungen strikte **Verpackungsminimierungs**-Regeln einhalten, einschließlich eines **maximalen Leerraumverhältnisses von 50%**. Verpackungsteams nutzen die Aufnahme- und Validierungsblätter, um Abmessungsvolumina zu erfassen, Hohlraumverhältnisse automatisch zu berechnen und Redesign-CAPAs für übergroße Versandkartons zu protokollieren.

### 4. Screening eingeschränkter Substanzen (PFAS bei Lebensmittelkontakt & 100-ppm-Schwermetalle)
Sicherzustellen, dass Blei, Cadmium, Quecksilber und sechswertiges Chrom unter dem **Summenkonzentrationsgrenzwert von 100 ppm** bleiben – und dass Lebensmittelkontakt-Verpackungen die **PFAS-Beschränkungen** einhalten –, erfordert eine rigorose Labortestbericht-Verfolgung. Das Toolkit trennt rohe chemische Prüfwerte vom Expertenprüfstatus und verfolgt Nachtest-Angebote, wenn Lieferantenzertifikate ablaufen.

---

## Die Geschäftslogik & Methodik: Verborgene kommerzielle Blindstellen in der Verpackungs-Compliance lösen

Selbst wenn Sie keinerlei Hintergrund in europäischem Umweltrecht oder fortgeschrittener Tabellenkalkulation haben, ist das kommerzielle Problem hinter der Verpackungs-Compliance einfach: **Wenn Sie Produkte in der Europäischen Union verkaufen und nicht nachweisen können, dass Ihre Verpackung den Regeln folgt, können Ihre Waren beim Zoll blockiert, von Marktplätzen delistet oder mit Bußgeldern belegt werden.**

Die meisten kleinen und mittleren Unternehmen scheitern bei Compliance-Audits nicht, weil sie das Gesetz brechen wollen, sondern weil sie in **fünf verborgene kommerzielle Entscheidungsblindstellen** fallen. So schützt die Geschäftslogik dieses Trackers Ihr Unternehmen vor jeder Blindstelle:

### Blindstelle 1: „Mein Lieferant hat die Tabelle ausgefüllt, also sind unsere Daten korrekt."
- **Die reale Falle:** Lieferanten raten oft Zahlen, um Papierkram schnell zu erledigen. Beispielsweise schreibt ein Lieferant, dass eine Geschenkbox insgesamt 100 Gramm wiegt, listet aber den Karton mit 70 Gramm und den Kunststoffeinsatz mit 15 Gramm (was zusammen nur 85 Gramm ergibt). Wenn Sie dieses Blatt akzeptieren, ohne die Mathematik zu prüfen, enthält Ihre offizielle Compliance-Datei nachweislich falsche Daten.
- **Wie dieses Tool es löst (strukturierte Stammdaten & Toleranzprüfungen):** Sie erfassen jedes Verpackungsteil einmal in einer Stammliste (`02_Product_Packaging_Register`). Wenn Lieferantenzahlen eingegeben werden, vergleichen automatisierte Regeln die Teile sofort mit dem Gesamtgewicht und den zulässigen Grenzwerten. Wenn die Mathematik um mehr als Ihre zulässige Marge abweicht (z. B. 2%), setzt der Tracker automatisch ein Warnkennzeichen – bevor Sie teure Labortests bezahlen oder rechtliche Dokumente unterzeichnen.

### Blindstelle 2: „Wir haben ein Labortestberichts-PDF in unserem Ordner gespeichert, also sind wir sicher."
- **Die reale Falle:** Ein PDF in einem Ordner zu haben, bedeutet nicht, dass es den tatsächlichen Flaschenverschluss oder Karton abdeckt, den Sie heute versenden. Lieferanten senden häufig veraltete Berichte, Berichte für ein anderes Kunststoffmaterial oder Zertifikate, die zum Produkt eines anderen Kunden gehören.
- **Wie dieses Tool es löst (zweistufige Verifikation: Maschinenprüfung + menschliche Prüfung):** Der Tracker teilt die Verifikation in zwei getrennte Spalten (`04_Data_Quality_Evidence_Check`). Zuerst prüft der Computer, ob die Zahlen und Dokument-IDs vorhanden sind. Zweitens erfordert eine separate Spalte, dass ein menschlicher Prüfer das PDF öffnet, bestätigt, dass es tatsächlich zu exakt dieser Verpackungskomponente passt, und es als „Genehmigt" markiert. Sie verwechseln nie „eine Datei existiert" mit „die Datei ist ein gültiger Nachweis".

### Blindstelle 3: „Wir haben ein Compliance-Problem gefunden und die Fabrik angeschrieben – jetzt warten wir einfach."
- **Die reale Falle:** Bei geschäftigen Produkteinführungen geraten E-Mails, die Lieferanten um fehlende Schwermetalltests oder aktualisierte Rezyklat-Kunststoffzertifikate bitten, in Vergessenheit. Wochen später ist das Produkt versandbereit, und niemand weiß, welche Compliance-Probleme noch offen sind oder wie viel zusätzliche Labortests kosten werden.
- **Wie dieses Tool es löst (Probleme in verfolgte Aufgaben & Budgets verwandeln):** Jedes Mal, wenn eine Prüfung fehlschlägt oder ein Zertifikat abgelehnt wird, protokollieren Sie es im **Compliance-Lücken- & Maßnahmenprotokoll** (`05_Compliance_Gap_Action_Log`). Jedes Problem erhält eine benannte verantwortliche Person, eine Frist, geschätzte Labortest- oder Redesign-Kosten und ein „Blocker"-Tag. Nichts verschwindet in einem E-Mail-Posteingang, und das Management kann die exakten finanziellen Kosten für die Behebung von Compliance-Lücken sehen.

### Blindstelle 4: „Unser Compliance-Tracker ist zu 95% grün, also können wir die rechtliche Erklärung unterzeichnen und versenden."
- **Die reale Falle:** Führungskräfte schauen oft auf einen „95% vollständig"-Fortschrittsbalken und nehmen an, dass ein Produkt marktreif ist. In der regulatorischen Compliance **blockiert ein einziges fehlendes Zertifikat an einer 2-Gramm-Kunststoffkappe das gesamte Produkt daran, seine EU-Konformitätserklärung (EU DoC) rechtlich zu erhalten.** Das Unterzeichnen einer rechtlichen Erklärung mit einem offenen Blocker setzt das Unternehmen und den einzelnen Unterzeichner direkter rechtlicher Haftung aus.
- **Wie dieses Tool es löst (Stage-Gated-Freigabeschutz):** Das finale Übersichts-Dashboard (`06_Compliance_Status_Doc_Index`) weigert sich, ein Produkt als „Bereit für die EU-DoC-Unterzeichnung" zu markieren, nur weil die meisten Zellen ausgefüllt sind. Es wirkt wie eine Sicherheitsverriegelung: Ein Produkt wird nur grün, wenn **(1) alle Lieferantendaten vollständig sind, (2) alle Nachweis-PDFs die menschliche Prüfung bestehen UND (3) null blockierende Korrekturmaßnahmen offen bleiben.**

### Zusammenfassung der 5-Stufen-Methodik
Durch die Befolgung einer strikten Abfolge – **1. Teile registrieren → 2. Lieferantenzahlen sammeln → 3. Mathematik automatisch prüfen → 4. Nachweis-PDFs verifizieren → 5. Blockierende Lücken vor der Unterzeichnung schließen** – verwandelt dieses Tool eine chaotische regulatorische Last in eine wiederholbare Geschäfts-Checkliste, der jeder in Ihrem Team folgen kann.

---

## Über den PPWR-Verpackungs-Compliance-Daten- & -Nachweis-Tracker

Der **PPWR-Verpackungs-Compliance-Daten- & -Nachweis-Tracker** hilft Unternehmen, Verpackungs-Compliance-Daten zu strukturieren, fehlende oder widersprüchliche Lieferanteneingaben zu erkennen, Korrekturmaßnahmen (CAPA) zu verwalten und technische Aufzeichnungen zu organisieren, die für die interne Governance und die Dokumentation zur **Verordnung (EU) 2025/40** erforderlich sind.

Durch die strikte Trennung zwischen strukturierten BOM-Stammdaten, Lieferantendeklarationen, automatisierten Formeldiagnosen, menschlicher Nachweisprüfung, Korrekturmaßnahmen-Workflows und Produktebene-Bereitschaftsreporting stellt das System sicher, dass Teams klar unterscheiden zwischen **Rohdaten zu haben, verifizierte unterstützende Nachweise zu haben und ein genehmigtes Compliance-Ergebnis zu erreichen**.

---

## Technische Details: Architektur der Arbeitsmappe, Formellogik & Validierungsregeln

Die Excel-Implementierung nutzt sechs miteinander verbundene Arbeitsblätter, die von modernen Microsoft-365-Dynamic-Array-Funktionen (`LET`, `FILTER`, `XLOOKUP`, `UNIQUE`, `SORT`, `COUNTIFS`, `SUMIFS`, `HSTACK` und `CHOOSECOLS`) angetrieben werden, um bis zu **50 Produkte, 500 Verpackungskomponenten, 1.000 Lieferanten-Aufnahmedatensätze und 1.000 Compliance-Lücken** zu unterstützen.

| Name des Arbeitsblatts | Primäre operative Funktion | Zentrale Compliance-Outputs |
| :--- | :--- | :--- |
| `01_Rule_Parameter_Register` | PPWR-Regelversionen, Regulierungsschwellen, Währungskurse und Toleranzen pflegen | Zentrale regulatorische Basis- und Bewertungseinstellungen |
| `02_Product_Packaging_Register` | Produkt-SKUs, Verpackungsebenen (primär/sekundär/Transport), Komponenten-IDs und Lieferanten registrieren | Strukturierte Verpackungs-Stücklisten- (BOM-) Stammdaten |
| `03_Manufacturer_Data_Intake` | Lieferantengemeldete Gewichte, Abmessungen, PCR-Rezyklatanteile, Substanzwerte und Dokument-IDs erfassen | Konsolidierte technische Herstellerdeklarationen |
| `04_Data_Quality_Evidence_Check` | Automatisierte Formeldiagnosen neben dedizierten manuellen Expertenprüfspalten ausführen | Automatisierte Datenqualitätskennzeichen + unabhängiger Nachweisprüfstatus |
| `05_Compliance_Gap_Action_Log` | Nichtkonformitäten, CAPA-Korrekturverantwortliche, SLA-Fristen, Testkosten und DoC-Blocker verfolgen | Umsetzbares CAPA-Register mit Finanzkosten-Rollups |
| `06_Compliance_Status_Doc_Index` | SKU-Level-Bereitschaft, Anhang-VII-Dokumentreferenzen, EU-DoC-Status und offene Blocker konsolidieren | Führungs-Compliance-Dashboard und priorisierte Lücken-Warteschlange |

<details>
<summary><strong>Klicken zum Aufklappen: Detaillierter Datenfluss, Kapazitätsspezifikationen, Formelmuster (`LET`) & Validierungslogik</strong></summary>

### Kontrollierter 7-Stufen-Datenfluss

1. **Regeln & Parameter konfigurieren (`01_Rule_Parameter_Register`):** Bewertungsdatum, Regelbibliotheks-Version, Schwermetall-/PFAS-Schwellen, Hohlraumgrenzen und Gewichtstoleranzen festlegen.
2. **Produkte & Verpackungs-BOM registrieren (`02_Product_Packaging_Register`):** Stabile Komponenten-IDs erstellen, die Produkte, Verpackungsebenen, Materialien und verantwortliche Hersteller verknüpfen.
3. **Herstellereinreichungen sammeln (`03_Manufacturer_Data_Intake`):** Lieferantentechnische Messungen, Rezyklatanteil-Deklarationen und externe Dokument-Repository-IDs erfassen.
4. **Automatisierte Datenqualitätsprüfungen ausführen (`04_Data_Quality_Evidence_Check`):** Formelbasiertes Screening auf fehlende Felder, Massenbilanz-Abweichungen und Schwellenwertverletzungen auslösen.
5. **Experten-Nachweisprüfung durchführen (`04_Data_Quality_Evidence_Check`):** Entscheidungen qualifizierter menschlicher Prüfer erfassen, die verifizieren, ob externe Testberichte und Zertifikate die regulatorische Behauptung stützen.
6. **CAPA-Lücken protokollieren & beheben (`05_Compliance_Gap_Action_Log`):** Korrekturverantwortliche, Fristen, Labortest-Angebote und EU-DoC-Blockierungsindikatoren zuweisen.
7. **Produktebene-Bereitschaft bewerten (`06_Compliance_Status_Doc_Index`):** Datenvollständigkeit, Nachweisgenehmigung und offene Blocker vor der Unterzeichnung der technischen Datei nach Anhang VII konsolidieren.

### Kapazität der Arbeitsmappe & Excel-Versionskompatibilität

| Datenbereich | Geplante Design-Kapazität |
| :--- | ---: |
| Regulatorische Regeldatensätze | 200 |
| Verpackungs-BOM-Komponenten | 500 |
| Hersteller-Datenaufnahmedatensätze | 1,000 |
| Compliance-Lücken- & CAPA-Datensätze | 1,000 |
| Produkt-SKUs | 50 |

**Systemanforderungen:** Microsoft 365 (Desktop oder Web) oder Excel-2021/2024-Umgebungen, die Dynamic-Array-Funktionen (`LET`, `FILTER`, `XLOOKUP`, `HSTACK`, `CHOOSECOLS`) unterstützen. Legacy Excel 2016 und Excel 2019 unterstützen die erforderliche Dynamic-Array-Formel-Engine nicht.

### Kritische Implementierungs- & Betriebsschutzmaßnahmen

1. **Automatisierte Prüfungen von der Expertenprüfung getrennt halten:** In `04_Data_Quality_Evidence_Check` sind die Spalten `I:L` ausschließlich für manuelle Expertenprüf-Eingaben reserviert, während benachbarte Spalten automatisierte Formeldiagnosen berechnen. Überschreiben Sie niemals Formelspalten oder behandeln Sie automatisierte „Pass"-Kennzeichen als Ersatz für die manuelle Dokumentprüfung.
2. **Zeilenausrichtung über Quell- und Prüftabellen hinweg beibehalten:** Positionsabhängige Formeln setzen eine stabile Zeilenausrichtung zwischen `02_Product_Packaging_Register`, `03_Manufacturer_Data_Intake` und `04_Data_Quality_Evidence_Check` voraus. Fügen Sie keine Zeilen mitten in der Tabelle ein, löschen oder sortieren Sie keine, ohne abhängige Prüfdatensätze neu auszurichten; hängen Sie neue Datensätze immer am Ende der vorgesehenen Tabellen an.
3. **Dynamic-Array-Spill-Bereiche schützen:** Übersichtsansichten nutzen `FILTER`, `UNIQUE` und `SORT`, um mehrzeilige Ausgaben dynamisch zu spillen. Halten Sie Spill-Zonen frei von manueller Texteingabe, um `#SPILL!`-Fehler zu vermeiden.

### Formelreferenz: Parametrisierte Schwellenwertprüfungen mit `LET`

Die Arbeitsmappe nutzt `LET`, um Zwischenvariablen innerhalb komplexer Validierungsformeln zu binden, was Prüfbarkeit und Berechnungsgeschwindigkeit verbessert:

```excel
=LET(
    actual_value, B2,
    threshold, C2,
    IF(actual_value<=threshold, "Within Threshold", "Review Required")
)
```

### Zusammenfassung der automatisierten Validierungsregeln

| Validierungsbereich | Automatisierte Formelprüfung | Erforderliche operative Maßnahme |
| :--- | :--- | :--- |
| **Pflichtfelder** | Leere Pflichtattribute über BOM- und Lieferanten-Aufnahmeblätter hinweg erkennen | Fehlende technische Spezifikationen beim Hersteller anfordern |
| **Relationaler ID-Abgleich** | Produkt-IDs, Komponenten-IDs und Lieferanten-IDs über Blätter hinweg per `XLOOKUP` auf Übereinstimmung prüfen | Verwaiste Datensätze oder nicht passende Komponentencodes auflösen |
| **Numerische Gewichtstoleranzen** | Summe der Teilkomponentengewichte mit deklariertem Gesamtgewicht innerhalb der konfigurierten %-Toleranz vergleichen | Massenbilanz-Abweichungen mit dem Lieferanten untersuchen |
| **Schwermetallgrenzwerte (100 ppm)** | Gemeldete Summe aus Pb, Cd, Hg und Cr(VI) mit konfiguriertem Schwellenwert vergleichen | Überschreitungen für ISO/IEC 17025-Laborverifikation oder Materialsubstitution kennzeichnen |
| **Rezyklatanteil (PCR)** | Vorhandensein und numerische Gültigkeit der Post-Consumer-Rezyklat-Felder prüfen | Chain-of-Custody-Zertifikate und Massenbilanz-Dokumentation verifizieren |
| **Verpackungs-Hohlraumverhältnis** | Berechnen Sie `(Außenvolumen - Produktvolumen) / Außenvolumen` gegen den maximalen 50%-Leerraumschwellenwert | Verpackungsminimierungs-Neudesign auslösen oder technische Ausnahme dokumentieren |
| **Nachweis-Referenzverknüpfung** | Verifizieren, dass jede Compliance-Behauptung auf eine Dokument-ID im externen Repository verweist | Den tatsächlichen PDF-Bericht auf Umfang, Gültigkeitsdatum und Prüfnorm prüfen |
| **Trennung des Prüfstatus** | Automatisierte Screening-Kennzeichen von manuellen Prüfer-Freigabespalten unterscheiden | Formelle Regulatory-Prüferentscheidung vor dem Schließen des Datensatzes einholen |
| **CAPA- & Blocker-Verfolgung** | Offene Lücken, überfällige Daten, Testkosten und DoC-blockierende Kennzeichen pro SKU aufrollen | Unterzeichnung der EU-Konformitätserklärung zurückhalten, bis alle Blocker geschlossen sind |

</details>

---

## Weitere Entscheidungsunterstützungs-Tools in dieser Serie

Entdecken Sie weitere leichte, installationsfreie Browser- und Microsoft-Excel-Tools für das operative Management in diesem Repository. Jedes Tool ist um strukturierte Stammdaten, transparente Tabellenformeln und Stage-Gated-Entscheidungsworkflows herum aufgebaut.

## Lizenz

Dieses Projekt wird unter der **Apache License 2.0** vertrieben. Siehe [`LICENSE`](./LICENSE) für den vollständigen Lizenztext.
