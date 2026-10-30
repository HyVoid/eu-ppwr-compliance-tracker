[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Outil de suivi de la conformité des emballages EU PPWR : preuves fournisseurs, contenu recyclé et préparation à l'EU DoC (application web et modèle Excel gratuits)
<img width="1920" height="790" alt="image" src="https://github.com/user-attachments/assets/04c079b8-821c-4b40-857f-cc654a9e34f7" />


![Licence](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Plateforme](https://img.shields.io/badge/Platform-Web%20Browser%20%7C%20Microsoft%20Excel%20(.xlsx)-217346.svg)
![Réglementation](https://img.shields.io/badge/Regulation-EU%20PPWR%20(EU)%202025%2F40-003399.svg)
![Type d'outil](https://img.shields.io/badge/Tool-Packaging%20Compliance%20%26%20CAPA%20Tracker-2251FF.svg)

**L'outil de suivi des données et des preuves de conformité des emballages PPWR est un outil gratuit d'évaluation de la conformité fonctionnant dans le navigateur ainsi qu'un classeur Microsoft Excel (modèle `.xlsx`) conçu pour le règlement (UE) 2025/40 (règlement sur les emballages et les déchets d'emballages). Il aide les importateurs, les propriétaires de marques, les ingénieurs packaging et les équipes des affaires réglementaires à centraliser les déclarations de matériaux des fournisseurs, à vérifier le contenu recyclé post-consommation (PCR), à contrôler les limites de substances des métaux lourds et des PFAS, à calculer les ratios d'espace vide des emballages et à suivre les actions correctives et préventives (CAPA) requises pour la documentation technique de l'Annex VII et la déclaration de conformité UE (EU DoC).**

> **Choisissez votre mode de déploiement :** Testez immédiatement le flux de travail dans votre navigateur sans aucune installation, ou téléchargez le modèle Microsoft Excel complet pour la gestion persistante de données multi-SKU, les audits fournisseurs récurrents et la conservation des documents réglementaires hors ligne.
>
> - 🌐 **[Lancez l'outil gratuit d'évaluation de la conformité des emballages PPWR en ligne (application web HTML interactive)](https://hyvoid.github.io/eu-ppwr-compliance-tracker/** — Exécutez des validations instantanées des données d'emballage, testez les seuils des règles et explorez le flux de travail de préparation à l'EU DoC directement dans votre navigateur (aucune inscription ni installation logicielle requise).
> - 📥 **[Téléchargez l'outil de suivi multi-SKU de conformité PPWR et des preuves fournisseurs (modèle de classeur Excel .xlsx)](https://theseusworkshop.com/l/kbsrhr?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=eu-ppwr-compliance-tracker)** — Obtenez le classeur Excel complet à 6 feuilles depuis la page de publication du projet pour la collecte hors ligne des données fournisseurs, les contrôles de formules automatisés `XLOOKUP`/`LET`, le suivi des échéances CAPA et la gestion du budget de conformité.
>

---

## Ce qu'il vous aide à suivre : points de douleur de la conformité EU PPWR et solutions automatisées

Gérer la conformité au **règlement de l'UE sur les emballages et les déchets d'emballages (PPWR)** dans des chaînes d'approvisionnement à plusieurs niveaux exige de relier les spécifications brutes des emballages à des preuves juridiques vérifiées. Le tableau ci-dessous cartographie les goulots d'étranglement opérationnels courants vers les mécanismes de suivi spécifiques de cette boîte à outils :

| Point de douleur de conformité EU PPWR | Risque réglementaire et goulot d'étranglement de la chaîne d'approvisionnement | Ce que cet outil de suivi PPWR capture et automatise (métriques et champs clés) |
| :--- | :--- | :--- |
| **Nomenclature (BOM) d'emballage fragmentée** | Impossibilité de tracer quel fournisseur possède quel sous-composant entre les niveaux d'emballage primaire, secondaire et de transport. | **Registre de traçabilité produit-vers-emballage :** Relie les identifiants SKU aux identifiants de composants uniques, aux niveaux d'emballage (vente, groupé, transport/e-commerce), aux catégories de matériaux et aux fabricants responsables. |
| **Déclarations de matériaux fournisseurs incomplètes** | Les fabricants soumettent des tableurs partiels sans types de polymères, grammages ou déclarations de substances. | **Contrôle de complétude des données fabricants :** Signale automatiquement les poids, dimensions, pourcentages de **contenu recyclé post-consommation (PCR)** et références de **fiches de données de sécurité (SDS)** manquants des composants. |
| **Limites de métaux lourds et PFAS non vérifiées** | Accepter les affirmations « conformes » des fournisseurs sans vérifier les résultats quantitatifs de laboratoire par rapport à la **limite de 100 ppm de métaux lourds** ou aux **seuils PFAS** du contact alimentaire. | **Contrôles des règles sur les substances et l'espace vide :** Compare les concentrations déclarées et les **ratios d'espace vide** aux seuils configurés du **règlement (UE) 2025/40** et aux tolérances de bilan massique. |
| **Confusion entre saisie de données et preuve juridique** | Traiter une cellule Excel remplie ou un nom de fichier comme une preuve juridique valide sans vérifier si le rapport d'essai couvre le bon matériau ou la bonne révision. | **Architecture d'examen des preuves à double état :** Sépare le filtrage automatisé par formules de la vérification humaine obligatoire par un expert des **rapports d'essai de laboratoire ISO/IEC 17025** et des certificats fournisseurs. |
| **Lacunes de conformité non suivies et échéances manquées** | Les contrôles échoués et les certificats manquants se perdent dans les fils d'e-mails, retardant la signature de la **déclaration de conformité UE (EU DoC)**. | **Journal d'actions CAPA et des lacunes ouvertes :** Attribue chaque non-conformité à un responsable avec une date d'échéance, une action de remédiation et un **indicateur bloquant de DoC** strict. |
| **Coûts d'essais de laboratoire et de remédiation non maîtrisés** | Les dépenses surprises liées aux essais de laboratoire tiers d'urgence et aux reconceptions d'emballage dépassent les budgets de conformité. | **Consolidation des coûts d'essais et de remédiation :** Suit les frais d'essais de laboratoire devisés et les coûts d'actions correctives par composant et agrège l'exposition financière totale au niveau du SKU produit. |

---

## Flux de travail de démarrage rapide : comment auditer la conformité des emballages EU PPWR en 4 étapes

Standardisez une fois les saisies d'emballage de vos fournisseurs, exécutez des validations de règles automatisées par rapport au **règlement (UE) 2025/40**, et concentrez le temps de votre équipe réglementaire sur la vérification des preuves de laboratoire et la résolution des blocages de conformité.

### Étape 1 : Configurez les seuils réglementaires EU PPWR et la référence d'évaluation
**Action :** **[Ouvrez l'outil de conformité PPWR gratuit basé navigateur](https://hyvoid.github.io/eu-ppwr-compliance-tracker/** (ou ouvrez la feuille `01_Rule_Parameter_Register` dans Excel) et définissez votre référence d'évaluation.
- Définissez la date d'évaluation, la devise de reporting, le facteur de taux de change et la **version active de la bibliothèque de règles PPWR**.
- Configurez les seuils opérationnels pour les **limites de métaux lourds (plomb, cadmium, mercure, chrome hexavalent <= 100 ppm)**, les **restrictions PFAS de contact alimentaire**, les **objectifs de contenu recyclé post-consommation (PCR)** et les **ratios d'espace vide maximum de 50 %**.
- Verrouillez ces paramètres pour établir une norme d'audit unifiée sur toutes les gammes de produits et les soumissions des fournisseurs.

### Étape 2 : Construisez votre nomenclature d'emballage (BOM) et collectez les déclarations de matériaux des fournisseurs
**Action :** Enregistrez votre **nomenclature d'emballage (BOM)** et consignez les données techniques des fabricants dans les champs de saisie standardisés.
- Cartographiez chaque SKU sur les **niveaux d'emballage primaire (vente), secondaire (groupé) et tertiaire (transport/e-commerce)** avec un identifiant de composant unique.
- Enregistrez les poids de composants soumis par les fournisseurs, les classifications de matériaux (plastique, papier/carton, verre, métal, composite), les **pourcentages de contenu recyclé PCR**, les valeurs d'essai des substances restreintes et les devis d'essais de laboratoire.
- Joignez des identifiants de documents externes reliant chaque ligne à vos **déclarations de conformité fournisseurs**, vos **rapports d'essai de laboratoire ISO/IEC 17025** et vos **fiches de données de sécurité (SDS)**.

### Étape 3 : Exécutez les contrôles automatisés de qualité des données et attribuez les responsables CAPA
**Action :** Exécutez les règles de filtrage intégrées pour signaler les anomalies de données et convertir les lacunes de conformité ouvertes en **actions correctives et préventives (CAPA)** suivies.
- Examinez les indicateurs de diagnostic automatisés pour les champs obligatoires manquants, les **écarts de poids de bilan massique** (lorsque les sous-poids des composants ne correspondent pas au poids total déclaré dans votre tolérance configurée, par exemple 2 %), les violations de seuils et les fichiers de preuve non liés.
- Acheminez chaque exception signalée dans le **journal des lacunes de conformité et des CAPA** : attribuez un responsable de remédiation, précisez le nouvel essai de laboratoire requis ou le document correctif fournisseur, fixez une échéance SLA stricte et marquez si la lacune bloque la signature de la **déclaration de conformité UE (EU DoC)**.
- Faites vérifier de manière indépendante par un réviseur réglementaire qualifié si les rapports d'essai référencés sont à jour, authentiques et applicables au composant d'emballage exact.

### Étape 4 : Consolidez la documentation technique de l'Annex VII et passez à l'échelle avec le modèle Excel reproductible
**Action :** Vérifiez la maturité au niveau produit avant la signature autorisée, puis passez des essais navigateur d'une seule session au **classeur de conformité Microsoft Excel** persistant.
- Consultez le tableau de bord de maturité consolidé pour confirmer trois portes indépendantes : **100 % de complétude des données fournisseurs**, **examen des preuves par un expert approuvé** et **zéro élément CAPA bloquant de DoC ouvert**.
- Compilez votre dossier de **documentation technique de l'Annex VII** et vos **références de projet d'EU DoC** une fois que toutes les portes d'étape sont franchies.
- **Prêt à gérer des audits récurrents et des portefeuilles multi-SKU ?** L'application web est conçue pour des essais sandbox instantanés et sans installation de flux de travail individuels. Une fois votre essai navigateur initial terminé, **[Téléchargez le classeur Excel de conformité PPWR réutilisable (modèle .xlsx)](https://theseusworkshop.com/l/kbsrhr?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=eu-ppwr-compliance-tracker)** pour débloquer le stockage hors ligne persistant, suivre jusqu'à **50 produits et 500 composants d'emballage**, gérer des cycles multiples de collecte de données fournisseurs et conserver des pistes d'audit historiques à travers les cycles de revue réglementaire.

---

## Pourquoi j'ai construit ceci : séparer la disponibilité des données de la conformité PPWR démontrée

Préparer la documentation de conformité des emballages auprès de plusieurs fabricants sous contrat est un problème de traçabilité de la chaîne d'approvisionnement et de contrôle des risques.

Un fournisseur peut renvoyer un questionnaire entièrement rempli tout en omettant la preuve de laboratoire obligatoire. Un rapport d'essai accrédité peut exister dans votre lecteur partagé mais couvrir une nuance de résine obsolète, un site d'usine différent ou une norme d'essai expirée. Un SKU produit peut afficher tous les champs de poids d'emballage remplis alors que la somme des composants individuels contredit le poids total de l'assemblage déclaré. Lorsque chaque fournisseur utilise une mise en page de tableur personnalisée et stocke les PDF dans des dossiers séparés, ces écarts échappent à la revue manuelle.

Confondre la **disponibilité des données avec la conformité réglementaire démontrée** expose les importateurs et les propriétaires de marques à de lourdes sanctions commerciales.

Considérez un exemple concret de bilan massique : un produit utilise un assemblage de bouteille en plastique primaire avec un poids total déclaré de 20 g. Le fabricant déclare 15 g de résine PET primaire et 3 g de matériaux auxiliaires de bouchage et d'étiquetage. Chaque cellule requise contient un nombre, donc un contrôle de complétude de base marque la ligne « 100 % complète ». Cependant, le total déclaré (20 g) et la décomposition des composants (18 g) diffèrent de 2 g — un écart de masse inexpliqué de 10 %. Lorsque votre tolérance configurée est de 2 %, le système doit signaler cet enregistrement pour investigation plutôt que de le laisser passer vers la signature de la **déclaration de conformité UE (EU DoC)**.

Le même écart de vérification s'applique aux preuves documentaires. Saisir un numéro de référence de certificat dans une cellule ne prouve pas que le certificat est authentique, valide pour le **règlement (UE) 2025/40** ou correspondant au bon composant d'emballage.

J'ai construit cette boîte à outils comme une séquence de vérification structurée qui relie les enregistrements de BOM produit aux soumissions des fournisseurs, vérifie la cohérence numérique, sépare le filtrage par formules de l'examen par un expert humain, suit la remédiation CAPA et conditionne la signature finale du **dossier technique de l'Annex VII**. Elle révèle les données manquantes, les contradictions numériques et les affirmations non vérifiées tôt, avant qu'elles ne provoquent des retards en douane ou des audits réglementaires rejetés.

---

## Problèmes courants de préparation PPWR que cela résout (tableurs manuels vs suivi structuré)

| Goulot d'étranglement opérationnel et réglementaire | Chaos des tableurs manuels et des e-mails (sans cet outil) | Flux de travail de conformité PPWR structuré (avec cet outil de suivi) |
| :--- | :--- | :--- |
| **Soumissions de données fournisseurs non standardisées** | Les équipes réglementaires passent des heures à rapprocher à la main des feuilles Excel de fournisseurs disparates, des dénominations de polymères incohérentes et des codes SKU non cartographiés. | Des champs de **saisie de données fabricants** standardisés et des identifiants de composants d'emballage uniques imposent un schéma de données uniforme à tous les fournisseurs. |
| **Rapports d'essai de laboratoire orphelins ou mal appariés** | Un rapport d'essai de métaux lourds ou un **certificat de bilan massique PCR** est lié par erreur au mauvais niveau d'emballage ou à une révision de composant obsolète. | La traçabilité relationnelle entre `02_Product_Packaging_Register` et `03_Manufacturer_Data_Intake` lie chaque identifiant de document à un SKU, un niveau d'emballage et un fournisseur spécifiques. |
| **Contradictions cachées de poids et de seuils** | Les valeurs manquantes, les **ratios d'espace vide > 50 %** ou les sommes de poids de composants qui échouent aux contrôles de bilan massique restent enfouies dans des tableaux fournisseurs statiques. | Les règles de validation Excel `LET` et `FILTER` automatisées signalent instantanément les dépassements de tolérances numériques, les **exceptions de métaux lourds à 100 ppm** et les champs manquants. |
| **Succès de formule confondu avec une signature juridique** | La réussite d'un calcul de tableur de base est traitée comme une preuve juridique que l'emballage satisfait au **règlement (UE) 2025/40**. | Des colonnes dédiées séparent les **indicateurs automatisés de qualité des données** des **décisions d'examen des preuves par un expert**, exigeant une vérification humaine des PDF sous-jacents. |
| **Actions correctives fournisseurs (CAPA) bloquées** | Les demandes de **déclarations PFAS** manquantes ou de rapports de laboratoire mis à jour se perdent dans les chaînes d'e-mails sans responsable, visibilité budgétaire ou échéance attribués. | Le **journal intégré des lacunes de conformité et des actions** suit les responsables de remédiation, les dates SLA cibles, les coûts d'essais et les indicateurs de retard dans une vue centralisée unique. |
| **Signature prématurée de la déclaration de conformité UE (EU DoC)** | Un SKU produit est autorisé à la mise sur le marché de l'UE alors même que des preuves fournisseurs critiques ou des actions correctives bloquantes restent non résolues. | Des **contrôles de maturité à portes d'étape multidimensionnels** bloquent la signature finale du dossier technique jusqu'à ce que les portes de complétude des données, d'examen par un expert et de CAPA soient toutes franchies. |

---

## À qui cela s'adresse : rôles cibles et scénarios de conformité sectoriels

Cette boîte à outils est conçue pour les professionnels opérationnels, techniques et réglementaires qui ont besoin d'une **alternative logicielle de conformité PPWR ou d'un modèle Excel** structurés sans le coût de licence et le délai de déploiement d'un module PLM/ERP d'entreprise :

- **Ingénieurs packaging et technologues packaging :** Utilisez le **registre de BOM d'emballage** et le **calculateur de ratio d'espace vide** pour évaluer les spécifications d'emballage primaires, secondaires et de transport, vérifier les tolérances de poids et suivre les objectifs de **minimisation des emballages** pendant la conception et la qualification des fournisseurs.
- **Responsables des affaires réglementaires et de la conformité produit :** Standardisez l'assemblage de la **documentation technique de l'Annex VII**, auditez les déclarations fournisseurs par rapport au **règlement (UE) 2025/40**, séparez le filtrage automatisé de la signature d'un expert et contrôlez l'émission de la **déclaration de conformité UE (EU DoC)**.
- **Importateurs UE, propriétaires de marques et vendeurs e-commerce transfrontaliers (Amazon FBA / DTC) :** Établissez une diligence raisonnable démontrable auprès des fabricants sous contrat à l'étranger, vérifiez les données d'entrée de **responsabilité élargie des producteurs (EPR)** et garantissez que les expéditions satisfont aux exigences documentaires d'accès au marché de l'UE avant le dédouanement.
- **Responsables qualité fournisseurs (SQA) et achats :** Intégrez les fournisseurs d'emballage avec un modèle de collecte de données uniforme, suivez les certificats manquants, gérez les **actions correctives et préventives (CAPA)** avec des échéances claires et prévoyez les budgets d'essais de laboratoire tiers.
- **Consultants ESG, développement durable et conformité emballage :** Livrez des **évaluations de maturité PPWR** reproductibles et des audits d'analyse des écarts clients à l'aide de la version navigateur sans installation pour les ateliers en direct et du classeur Excel multi-SKU pour les livrables clients.

**Périmètre et limite juridique :** Cet outil est un cadre de flux de travail opérationnel et de gestion des preuves. Il ne remplace pas un conseil juridique formel, des **essais de laboratoire ISO/IEC 17025 accrédités**, une interprétation réglementaire faisant autorité ni les obligations légales de l'opérateur économique qui met des emballages sur le marché de l'Union européenne.

---

## Cas d'usage EU PPWR à haute fréquence et scénarios sectoriels

Les organisations de la fabrication, de la distribution et de l'e-commerce utilisent cet **outil de suivi des données et des preuves de conformité des emballages PPWR** pour gérer quatre scénarios réglementaires à haut risque :

### 1. Dédouanement douanier UE avant expédition et audits des représentants autorisés (EAR)
Les importateurs et les fabricants non-UE qui mettent des marchandises emballées sur le marché européen doivent fournir des **dossiers techniques complets de l'Annex VII** et des **déclarations de conformité UE** signées sur demande des autorités de surveillance du marché ou des **représentants autorisés UE (EAR)**. Cet outil de suivi consolide les PDF fournisseurs épars et les numéros de référence d'essai dans un index produit auditables avant que les marchandises ne quittent le port.

### 2. Vérification du contenu recyclé post-consommation (PCR) et de la taxe sur les emballages plastiques
Vérifier les **objectifs obligatoires de contenu recyclé PCR 2030/2040** pour les emballages plastiques sensibles au contact et sans contact exige de tracer les déclarations de résine et les certificats de chaîne de traçabilité tiers (tels que RecyClass ou ISCC PLUS) jusqu'aux composants d'emballage individuels. Le classeur signale les composants déclarant du contenu recyclé sans références de certification liées.

### 3. Conformité de l'espace vide des emballages e-commerce et de transport
En vertu du **règlement (UE) 2025/40**, les emballages groupés, de transport et e-commerce doivent respecter des règles strictes de **minimisation des emballages**, y compris un **ratio d'espace vide maximum de 50 %**. Les équipes packaging utilisent les feuilles de saisie et de validation pour enregistrer les volumes dimensionnels, calculer automatiquement les ratios d'espace vide et consigner les CAPA de reconception pour les cartons d'expédition surdimensionnés.

### 4. Contrôle des substances restreintes (PFAS au contact alimentaire et métaux lourds à 100 ppm)
Garantir que le plomb, le cadmium, le mercure et le chrome hexavalent restent sous la **limite de concentration cumulée de 100 ppm** — et que les emballages au contact alimentaire respectent les **restrictions PFAS** — exige un suivi rigoureux des rapports de laboratoire. La boîte à outils sépare les valeurs d'essai chimiques brutes de l'état d'examen par un expert et suit les devis de nouveaux essais lorsque les certificats fournisseurs expirent.

---

## La logique métier et la méthodologie : résoudre les angles morts commerciaux cachés de la conformité des emballages

Même si vous n'avez aucune formation en droit européen de l'environnement ou en ingénierie avancée de tableurs, le problème commercial derrière la conformité des emballages est simple : **si vous vendez des produits dans l'Union européenne et ne pouvez pas prouver que votre emballage respecte les règles, vos marchandises peuvent être bloquées en douane, retirées des marketplaces ou sanctionnées par des amendes.**

La plupart des petites et moyennes entreprises échouent aux audits de conformité non pas parce qu'elles ont l'intention d'enfreindre la loi, mais parce qu'elles tombent dans **cinq angles morts de décision commerciale cachés**. Voici comment la logique métier de cet outil de suivi protège votre entreprise de chaque angle mort :

### Angle mort 1 : « Mon fournisseur a rempli le tableur, donc nos données sont exactes. »
- **Le piège du monde réel :** Les fournisseurs devinent souvent les chiffres pour terminer rapidement la paperasse. Par exemple, un fournisseur écrit qu'une boîte cadeau pèse 100 grammes au total, mais indique le carton à 70 grammes et l'insert en plastique à 15 grammes (ce qui ne fait que 85 grammes au total). Si vous acceptez cette feuille sans vérifier le calcul, votre dossier de conformité officiel contient des données prouvées fausses.
- **Comment cet outil résout cela (données de référence structurées et contrôles de tolérance) :** Vous saisissez chaque pièce d'emballage une seule fois dans une liste de référence (`02_Product_Packaging_Register`). Lorsque les chiffres des fournisseurs sont saisis, des règles automatisées comparent immédiatement les pièces au poids total et aux limites autorisées. Si le calcul s'écarte de plus de votre marge autorisée (par exemple, 2 %), l'outil de suivi lève un indicateur d'avertissement automatiquement — avant que vous ne payiez des essais de laboratoire coûteux ou ne signiez des documents juridiques.

### Angle mort 2 : « Nous avons un PDF de rapport d'essai de laboratoire enregistré dans notre dossier, donc nous sommes en sécurité. »
- **Le piège du monde réel :** Avoir un PDF dans un dossier ne signifie pas qu'il couvre le bouchon de bouteille ou le carton réel que vous expédiez aujourd'hui. Les fournisseurs envoient fréquemment des rapports obsolètes, des rapports pour un autre matériau plastique ou des certificats appartenant au produit d'un autre client.
- **Comment cet outil résout cela (vérification en deux étapes : contrôle machine + contrôle humain) :** L'outil de suivi divise la vérification en deux colonnes distinctes (`04_Data_Quality_Evidence_Check`). D'abord, l'ordinateur vérifie si les chiffres et les identifiants de documents sont présents. Ensuite, une colonne distincte exige qu'un réviseur humain ouvre le PDF, confirme qu'il correspond réellement à ce composant d'emballage exact et le marque « Approuvé ». Vous ne confondez jamais « un fichier existe » avec « le fichier est une preuve valide ».

### Angle mort 3 : « Nous avons trouvé un problème de conformité et envoyé un e-mail à l'usine — maintenant nous attendons. »
- **Le piège du monde réel :** Lors des lancements de produits chargés, les e-mails demandant aux fournisseurs des essais de métaux lourds manquants ou des certificats de plastique recyclé mis à jour sont oubliés. Des semaines plus tard, le produit est prêt à être expédié, et personne ne sait quels problèmes de conformité sont encore ouverts ni combien coûteront les essais de laboratoire supplémentaires.
- **Comment cet outil résout cela (transformer les problèmes en tâches suivies et en budgets) :** Chaque fois qu'un contrôle échoue ou qu'un certificat est rejeté, vous le consignez dans le **journal des lacunes de conformité et des actions** (`05_Compliance_Gap_Action_Log`). Chaque problème reçoit une personne nommée en charge, une échéance, un coût estimé d'essai de laboratoire ou de reconception et une étiquette « Bloquant ». Rien ne disparaît dans une boîte de réception e-mail, et la direction peut voir le coût financier exact de la résolution des lacunes de conformité.

### Angle mort 4 : « Notre outil de suivi de conformité est vert à 95 %, donc nous pouvons signer la déclaration juridique et expédier. »
- **Le piège du monde réel :** Les dirigeants regardent souvent une barre de progression « 95 % complète » et supposent qu'un produit est prêt pour le marché. En conformité réglementaire, **un seul certificat manquant sur un bouchon en plastique de 2 grammes bloque tout le produit et l'empêche de recevoir légalement sa déclaration de conformité UE (EU DoC).** Signer une déclaration juridique avec un blocage ouvert expose l'entreprise et le signataire individuel à une responsabilité juridique directe.
- **Comment cet outil résout cela (protection de signature à portes d'étape) :** Le tableau de bord de synthèse final (`06_Compliance_Status_Doc_Index`) refuse de marquer un produit « Prêt pour la signature de l'EU DoC » simplement parce que la plupart des cellules sont remplies. Il agit comme un verrou de sécurité : un produit ne passe au vert que lorsque **(1) toutes les données fournisseurs sont complètes, (2) tous les PDF de preuves passent l'examen humain ET (3) zéro action corrective bloquante reste ouverte.**

### Synthèse de la méthodologie en 5 étapes
En suivant une séquence stricte — **1. Enregistrer les pièces → 2. Collecter les chiffres fournisseurs → 3. Vérifier automatiquement les calculs → 4. Vérifier les PDF de preuves → 5. Fermer les lacunes bloquantes avant la signature** — cet outil transforme un fardeau réglementaire chaotique en une liste de contrôle métier reproductible que n'importe quel membre de votre équipe peut suivre.

---

## À propos de l'outil de suivi des données et des preuves de conformité des emballages PPWR

L'**outil de suivi des données et des preuves de conformité des emballages PPWR** aide les entreprises à structurer les données de conformité des emballages, à détecter les saisies fournisseurs manquantes ou contradictoires, à gérer les actions correctives (CAPA) et à organiser les dossiers techniques requis pour la gouvernance interne et la documentation du **règlement (UE) 2025/40**.

En maintenant une séparation stricte entre les données de référence BOM structurées, les déclarations fournisseurs, les diagnostics de formules automatisés, l'examen humain des preuves, les flux de travail d'actions correctives et le reporting de maturité au niveau produit, le système garantit que les équipes distinguent clairement **avoir des données brutes, avoir des preuves justificatives vérifiées et atteindre un résultat de conformité approuvé**.

---

## Détails techniques : architecture du classeur, logique des formules et règles de validation

L'implémentation Excel utilise six feuilles de calcul interconnectées alimentées par les fonctions de matrice dynamique modernes de Microsoft 365 (`LET`, `FILTER`, `XLOOKUP`, `UNIQUE`, `SORT`, `COUNTIFS`, `SUMIFS`, `HSTACK` et `CHOOSECOLS`) pour prendre en charge jusqu'à **50 produits, 500 composants d'emballage, 1 000 enregistrements de saisie fournisseurs et 1 000 lacunes de conformité**.

| Nom de la feuille de calcul | Fonction opérationnelle principale | Sorties de conformité clés |
| :--- | :--- | :--- |
| `01_Rule_Parameter_Register` | Maintenir les versions des règles PPWR, les seuils réglementaires, les taux de change et les tolérances | Référentiel réglementaire centralisé et paramètres d'évaluation |
| `02_Product_Packaging_Register` | Enregistrer les SKU produits, les niveaux d'emballage (primaire/secondaire/transport), les identifiants de composants et les fournisseurs | Données de référence structurées de la nomenclature d'emballage (BOM) |
| `03_Manufacturer_Data_Intake` | Capturer les poids, dimensions, contenu recyclé PCR, valeurs de substances et identifiants de documents soumis par les fournisseurs | Déclarations techniques fabricants consolidées |
| `04_Data_Quality_Evidence_Check` | Exécuter des diagnostics de formules automatisés parallèlement à des colonnes dédiées d'examen manuel par un expert | Indicateurs automatisés de qualité des données + état d'examen des preuves indépendant |
| `05_Compliance_Gap_Action_Log` | Suivre les non-conformités, les responsables de remédiation CAPA, les échéances SLA, les coûts d'essais et les blocages de DoC | Registre CAPA exploitable avec consolidations des coûts financiers |
| `06_Compliance_Status_Doc_Index` | Consolider la maturité au niveau SKU, les références de documents de l'Annex VII, l'état de l'EU DoC et les blocages ouverts | Tableau de bord de conformité de direction et file de lacunes priorisée |

<details>
<summary><strong>Cliquez pour développer : flux de données détaillé, spécifications de capacité, modèles de formules (`LET`) et logique de validation</strong></summary>

### Flux de données contrôlé en 7 étapes

1. **Configurer les règles et paramètres (`01_Rule_Parameter_Register`) :** Établir la date d'évaluation, la version de la bibliothèque de règles, les seuils métaux lourds/PFAS, les limites d'espace vide et les tolérances de poids.
2. **Enregistrer les produits et la BOM d'emballage (`02_Product_Packaging_Register`) :** Créer des identifiants de composants stables reliant les produits, les niveaux d'emballage, les matériaux et les fabricants responsables.
3. **Collecter les soumissions des fabricants (`03_Manufacturer_Data_Intake`) :** Enregistrer les mesures techniques des fournisseurs, les déclarations de contenu recyclé et les identifiants du référentiel de documents externes.
4. **Exécuter les contrôles automatisés de qualité des données (`04_Data_Quality_Evidence_Check`) :** Déclencher le filtrage basé sur formules pour les champs manquants, les déséquilibres de bilan massique et les dépassements de seuils.
5. **Effectuer l'examen des preuves par un expert (`04_Data_Quality_Evidence_Check`) :** Enregistrer les décisions d'un réviseur humain qualifié vérifiant si les rapports d'essai et certificats externes soutiennent la revendication réglementaire.
6. **Consigner et résoudre les lacunes CAPA (`05_Compliance_Gap_Action_Log`) :** Attribuer les responsables de remédiation, les échéances, les devis d'essais de laboratoire et les indicateurs bloquants de l'EU DoC.
7. **Évaluer la maturité au niveau produit (`06_Compliance_Status_Doc_Index`) :** Consolider la complétude des données, l'approbation des preuves et les blocages ouverts avant la signature du dossier technique de l'Annex VII.

### Capacité du classeur et compatibilité des versions Excel

| Domaine de données | Capacité de conception prévue |
| :--- | ---: |
| Enregistrements de règles réglementaires | 200 |
| Composants de BOM d'emballage | 500 |
| Enregistrements de saisie de données fabricants | 1 000 |
| Enregistrements de lacunes de conformité et CAPA | 1 000 |
| SKU produits | 50 |

**Configuration requise :** Microsoft 365 (bureau ou web) ou des environnements Excel 2021/2024 prenant en charge les fonctions de matrice dynamique (`LET`, `FILTER`, `XLOOKUP`, `HSTACK`, `CHOOSECOLS`). Les anciennes versions Excel 2016 et Excel 2019 ne prennent pas en charge le moteur de formule de matrice dynamique requis.

### Garde-fous critiques d'implémentation et opérationnels

1. **Gardez les contrôles automatisés séparés de l'examen par un expert :** Dans `04_Data_Quality_Evidence_Check`, les colonnes `I:L` sont réservées exclusivement aux saisies d'examen manuel par un expert, tandis que les colonnes adjacentes calculent les diagnostics de formules automatisés. N'écrasez jamais les colonnes de formules et ne traitez pas les indicateurs automatisés « Réussi » comme un substitut à l'inspection manuelle des documents.
2. **Préservez l'alignement des lignes entre les tables source et d'examen :** Les formules dépendantes de la position reposent sur un alignement stable des lignes entre `02_Product_Packaging_Register`, `03_Manufacturer_Data_Intake` et `04_Data_Quality_Evidence_Check`. N'insérez, ne supprimez ni ne triez pas de lignes en milieu de table sans réaligner les enregistrements d'examen dépendants ; ajoutez toujours les nouveaux enregistrements en bas des tables désignées.
3. **Protégez les plages de débordement des matrices dynamiques :** Les vues de synthèse utilisent `FILTER`, `UNIQUE` et `SORT` pour déverser dynamiquement des sorties multi-lignes. Gardez les zones de débordement exemptes de saisie de texte manuelle pour éviter les erreurs `#SPILL!`.

### Référence des formules : contrôles de seuils paramétrés avec `LET`

Le classeur utilise `LET` pour lier des variables intermédiaires dans des formules de validation complexes, améliorant l'auditabilité et la vitesse de calcul :

```excel
=LET(
    actual_value, B2,
    threshold, C2,
    IF(actual_value<=threshold, "Within Threshold", "Review Required")
)
```

### Synthèse des règles de validation automatisées

| Domaine de validation | Contrôle de formule automatisé | Action opérationnelle requise |
| :--- | :--- | :--- |
| **Champs obligatoires** | Détecter les attributs requis vides dans les feuilles de BOM et de saisie fournisseurs | Demander les spécifications techniques manquantes au fabricant |
| **Correspondance d'identifiants relationnels** | Vérifier que les identifiants produits, composants et fournisseurs correspondent entre les feuilles via `XLOOKUP` | Résoudre les enregistrements orphelins ou les codes de composants mal appariés |
| **Tolérances de poids numériques** | Comparer la somme des poids des sous-composants au poids total déclaré dans la tolérance % configurée | Investiguer les écarts de bilan massique avec le fournisseur |
| **Limites de métaux lourds (100 ppm)** | Comparer la somme déclarée de Pb, Cd, Hg et Cr(VI) au seuil configuré | Signaler les dépassements pour vérification en laboratoire ISO/IEC 17025 ou substitution de matériau |
| **Contenu recyclé (PCR)** | Vérifier la présence et la validité numérique des champs de contenu recyclé post-consommation | Vérifier les certificats de chaîne de traçabilité et la documentation de bilan massique |
| **Ratio d'espace vide de l'emballage** | Calculer `(Volume extérieur - Volume produit) / Volume extérieur` par rapport au seuil d'espace vide maximum de 50 % | Déclencher une reconception de minimisation d'emballage ou documenter une exemption technique |
| **Liaison des références de preuves** | Vérifier que chaque revendication de conformité référence un identifiant de document dans le référentiel externe | Auditer le rapport PDF réel pour le périmètre, la date de validité et la norme d'essai |
| **Séparation des états d'examen** | Distinguer les indicateurs de filtrage automatisés des colonnes de signature d'un réviseur manuel | Obtenir une décision formelle d'un réviseur réglementaire avant de clôturer l'enregistrement |
| **Suivi des CAPA et des blocages** | Consolider les lacunes ouvertes, les dates en retard, les coûts d'essais et les indicateurs bloquants de DoC par SKU | Retenir la signature de la déclaration de conformité UE jusqu'à ce que tous les blocages soient fermés |

</details>

---

## Autres outils d'aide à la décision de cette série

Explorez d'autres outils de gestion opérationnelle légers, sans installation, pour navigateur et Microsoft Excel dans ce dépôt. Chaque outil est construit autour de données de référence structurées, de formules de tableur transparentes et de flux de travail de décision métier à portes d'étape.

## Licence

Ce projet est distribué sous la **licence Apache 2.0**. Consultez le fichier [`LICENSE`](./LICENSE) pour le texte intégral de la licence.
