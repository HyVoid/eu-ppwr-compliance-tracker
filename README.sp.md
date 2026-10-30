[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Rastreador de Cumplimiento de Envases PPWR de la UE: Evidencia de Proveedores, Contenido Reciclado y Herramienta de Preparación para la EU DoC (Aplicación Web Gratuita y Plantilla de Excel)
<img width="1920" height="790" alt="image" src="https://github.com/user-attachments/assets/04c079b8-821c-4b40-857f-cc654a9e34f7" />


![Licencia](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Plataforma](https://img.shields.io/badge/Platform-Web%20Browser%20%7C%20Microsoft%20Excel%20(.xlsx)-217346.svg)
![Regulación](https://img.shields.io/badge/Regulation-EU%20PPWR%20(EU)%202025%2F40-003399.svg)
![Tipo de herramienta](https://img.shields.io/badge/Tool-Packaging%20Compliance%20%26%20CAPA%20Tracker-2251FF.svg)

**El Rastreador de Datos y Evidencia de Cumplimiento de Envases PPWR es una herramienta gratuita de evaluación de cumplimiento basada en navegador y un libro de trabajo de Microsoft Excel (plantilla `.xlsx`) creado para el Reglamento (UE) 2025/40 (Reglamento de Envases y Residuos de Envases). Ayuda a importadores, propietarios de marcas, ingenieros de envases y equipos de asuntos regulatorios a centralizar las declaraciones de materiales de los proveedores, verificar el contenido de material reciclado posconsumo (PCR), comprobar los límites de sustancias de metales pesados y PFAS, calcular las proporciones de espacio vacío de los envases y rastrear las Acciones Correctivas y Preventivas (CAPA) requeridas para la Documentación Técnica del Anexo VII y la Declaración UE de Conformidad (EU DoC).**

> **Elija su modo de implementación:** Pruebe el flujo de trabajo inmediatamente en su navegador sin instalación, o descargue la plantilla completa de Microsoft Excel para la gestión persistente de datos de múltiples SKU, auditorías recurrentes de proveedores y registro regulatorio sin conexión.
>
> - 🌐 **[Inicie la Herramienta Gratuita de Evaluación de Cumplimiento de Envases PPWR en Línea (Aplicación Web HTML Interactiva)](https://hyvoid.github.io/eu-ppwr-compliance-tracker/** — Ejecute validaciones instantáneas de datos de envases, pruebe los umbrales de las reglas y explore el flujo de trabajo de preparación para la EU DoC directamente en su navegador (sin registro ni instalación de software requeridos).
> - 📥 **[Descargue el Rastreador de Cumplimiento PPWR y Evidencia de Proveedores de Múltiples SKU (Plantilla de Libro de Trabajo de Excel .xlsx)](https://theseusworkshop.com/l/kbsrhr?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=eu-ppwr-compliance-tracker)** — Obtenga el libro de trabajo de Excel completo de 6 hojas desde la página de lanzamiento del proyecto para la captura de proveedores sin conexión, comprobaciones de fórmulas automatizadas con `XLOOKUP`/`LET`, seguimiento de plazos de CAPA y gestión del presupuesto de cumplimiento.
>

---

## Qué Le Ayuda a Rastrear: Puntos Críticos de Cumplimiento PPWR de la UE y Soluciones Automatizadas

Gestionar el cumplimiento del **Reglamento de Envases y Residuos de Envases de la UE (PPWR)** en cadenas de suministro de múltiples niveles requiere vincular especificaciones de envases sin procesar con evidencia legal verificada. La siguiente tabla mapea los cuellos de botella operativos comunes con los mecanismos de seguimiento específicos dentro de este kit de herramientas:

| Punto Crítico de Cumplimiento PPWR de la UE | Riesgo Regulatorio y Cuello de Botella de la Cadena de Suministro | Qué Captura y Automatiza Este Rastreador PPWR (Métricas y Campos Clave) |
| :--- | :--- | :--- |
| **Lista de Materiales (BOM) de Envases Fragmentada** | Incapacidad para rastrear qué proveedor es dueño de qué subcomponente en los niveles de envase primario, secundario y de transporte. | **Registro de Trazabilidad Producto-a-Envase:** Vincula los identificadores de SKU con identificadores de componentes únicos, niveles de envase (venta, agrupado, transporte/comercio electrónico), categorías de materiales y fabricantes responsables. |
| **Declaraciones de Materiales de Proveedores Incompletas** | Los fabricantes envían hojas de cálculo parciales que omiten tipos de polímero, gramajes o declaraciones de sustancias. | **Cribado de Completitud de Datos del Fabricante:** Marca automáticamente los pesos de componentes faltantes, las dimensiones, los porcentajes de **material reciclado posconsumo (PCR)** y las referencias a las **Fichas de Datos de Seguridad (SDS)**. |
| **Límites de Metales Pesados y PFAS No Verificados** | Aceptar las afirmaciones de "cumplimiento" de los proveedores sin comprobar los resultados cuantitativos de laboratorio contra los **límites de 100 ppm de metales pesados** o los **umbrales de PFAS** de contacto con alimentos. | **Comprobaciones de Reglas de Sustancias y Espacio Vacío:** Compara las concentraciones reportadas y las **proporciones de espacio vacío** contra los umbrales configurados del **Reglamento (UE) 2025/40** y las tolerancias de balance de masas. |
| **Confundir la Entrada de Datos con la Prueba Legal** | Tratar una celda de Excel rellenada o un nombre de archivo como evidencia legal válida sin comprobar si el informe de prueba cubre el material o la revisión correctos. | **Arquitectura de Revisión de Evidencia de Dos Estados:** Separa el cribado automatizado por fórmulas de la verificación humana obligatoria por expertos de los **informes de pruebas de laboratorio ISO/IEC 17025** y los certificados de proveedores. |
| **Brechas de Cumplimiento Sin Rastrear y Plazos Perdidos** | Las comprobaciones fallidas y los certificados faltantes se entierran en hilos de correo electrónico, retrasando la firma de la **Declaración UE de Conformidad (EU DoC)**. | **Registro de Acciones CAPA y Brechas Abiertas:** Asigna cada no conformidad a un responsable con fecha de vencimiento, acción de remediación y un **Indicador de Bloqueo de la DoC** estricto. |
| **Costos de Pruebas de Laboratorio y Remediación Sin Control** | Los gastos sorpresa de pruebas de laboratorio de terceros de emergencia y rediseños de envases superan los presupuestos de cumplimiento. | **Acumulación de Costos de Pruebas y Remediación:** Rastrea las tarifas de pruebas de laboratorio cotizadas y los costos de acciones correctivas por componente, y agrega la exposición financiera total a nivel de SKU de producto. |

---

## Flujo de Trabajo de Inicio Rápido: Cómo Auditar el Cumplimiento de Envases PPWR de la UE en 4 Pasos

Estandarice las entradas de envases de sus proveedores una vez, ejecute validaciones de reglas automatizadas contra el **Reglamento (UE) 2025/40** y concentre el tiempo de su equipo regulatorio en verificar la evidencia de laboratorio y cerrar los bloqueos de cumplimiento.

### Paso 1: Configure los Umbrales Regulatorios PPWR de la UE y la Línea Base de Evaluación
**Acción:** **[Abra la Herramienta Gratuita de Cumplimiento PPWR Basada en Navegador](https://hyvoid.github.io/eu-ppwr-compliance-tracker/** (o abra la hoja `01_Rule_Parameter_Register` en Excel) y establezca su línea base de evaluación.
- Defina la fecha de evaluación, la moneda de reporte, el factor de tipo de cambio y la **versión activa de la biblioteca de reglas PPWR**.
- Configure los umbrales operativos para **límites de metales pesados (plomo, cadmio, mercurio, cromo hexavalente <= 100 ppm)**, **restricciones de PFAS en contacto con alimentos**, **objetivos de contenido de material reciclado posconsumo (PCR)** y **proporciones máximas de 50% de espacio vacío**.
- Bloquee estos parámetros para establecer un estándar de auditoría unificado en todas las líneas de productos y envíos de proveedores.

### Paso 2: Construya Su BOM de Envases y Recoja las Declaraciones de Materiales de los Proveedores
**Acción:** Registre su **Lista de Materiales (BOM) de Envases** y registre los datos técnicos del fabricante en los campos de captura estandarizados.
- Mapee cada SKU en los **niveles de envase primario (venta), secundario (agrupado) y terciario (transporte/comercio electrónico)** con un identificador de componente único.
- Registre los pesos de componentes enviados por el proveedor, las clasificaciones de materiales (plástico, papel/cartón, vidrio, metal, compuesto), los **porcentajes de contenido reciclado PCR**, los valores de prueba de sustancias restringidas y las cotizaciones de pruebas de laboratorio.
- Adjunte identificadores de documentos externos que vinculen cada fila con sus **Declaraciones de Conformidad de Proveedores**, **informes de pruebas de laboratorio ISO/IEC 17025** y **Fichas de Datos de Seguridad (SDS)**.

### Paso 3: Ejecute Comprobaciones Automatizadas de Calidad de Datos y Asigne Responsables de CAPA
**Acción:** Ejecute las reglas de cribado integradas para marcar anomalías de datos y convertir las brechas de cumplimiento abiertas en **Acciones Correctivas y Preventivas (CAPA)** rastreadas.
- Revise las banderas de diagnóstico automatizadas para campos obligatorios faltantes, **discrepancias de peso de balance de masas** (cuando los subpesos de los componentes no coinciden con el peso total declarado dentro de su tolerancia configurada, como el 2%), violaciones de umbrales y archivos de evidencia no vinculados.
- Dirija cada excepción marcada al **Registro de Brechas de Cumplimiento y CAPA**: asigne un responsable de remediación, especifique la nueva prueba de laboratorio requerida o el documento correctivo del proveedor, establezca un plazo SLA estricto y marque si la brecha bloquea la firma de la **Declaración UE de Conformidad (EU DoC)**.
- Haga que un revisor regulatorio calificado verifique de forma independiente si los informes de prueba referenciados son actuales, auténticos y aplicables al componente de envase exacto.

### Paso 4: Consolide la Documentación Técnica del Anexo VII y Escale con la Plantilla de Excel Repetible
**Acción:** Verifique la preparación a nivel de producto antes de la firma autorizada, y luego pase de la prueba en navegador de una sola sesión al **Libro de Trabajo de Cumplimiento de Microsoft Excel** persistente.
- Compruebe el panel de preparación consolidado para confirmar tres compuertas independientes: **100% de completitud de datos de proveedores**, **revisión de evidencia aprobada por expertos** y **cero elementos CAPA abiertos que bloqueen la DoC**.
- Compile su paquete de **Documentación Técnica del Anexo VII** y las **referencias del borrador de la EU DoC** una vez que todas las compuertas de etapa se superen.
- **¿Listo para gestionar auditorías recurrentes y carteras de múltiples SKU?** La aplicación web está creada para pruebas instantáneas en sandbox sin instalación de flujos de trabajo individuales. Una vez que termine su prueba inicial en el navegador, **[Descargue el Libro de Trabajo de Excel de Cumplimiento PPWR Reutilizable (Plantilla .xlsx)](https://theseusworkshop.com/l/kbsrhr?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=eu-ppwr-compliance-tracker)** para desbloquear el almacenamiento persistente sin conexión, rastrear hasta **50 productos y 500 componentes de envase**, gestionar la recopilación de datos de proveedores en múltiples rondas y mantener pistas de auditoría históricas a través de los ciclos de revisión regulatoria.

---

## Por Qué Construí Esto: Separar la Disponibilidad de Datos del Cumplimiento PPWR Demostrado

Preparar la documentación de cumplimiento de envases en múltiples fabricantes por contrato es un problema de trazabilidad de la cadena de suministro y control de riesgos.

Un proveedor puede devolver un cuestionario completamente rellenado mientras omite la prueba de laboratorio obligatoria. Un informe de prueba acreditado puede existir en su unidad compartida pero cubrir un grado de resina obsoleto, una fábrica diferente o un estándar de prueba vencido. Un SKU de producto puede mostrar todos los campos de peso de envase completados mientras la suma de los componentes individuales contradice el peso total del ensamblaje declarado. Cuando cada proveedor usa un diseño de hoja de cálculo personalizado y almacena los PDF en carpetas separadas, estas discrepancias pasan desapercibidas en la revisión manual.

Confundir la **disponibilidad de datos con el cumplimiento regulatorio demostrado** expone a los importadores y propietarios de marcas a severas sanciones comerciales.

Considere un ejemplo concreto de balance de masas: un producto usa un ensamblaje de botella de plástico primaria con un peso total declarado de 20 g. El fabricante reporta 15 g de resina PET primaria y 3 g de materiales auxiliares de cierre y etiqueta. Cada celda requerida contiene un número, por lo que una comprobación de completitud básica marca la fila como "100% Completa". Sin embargo, el total declarado (20 g) y el desglose de componentes (18 g) difieren en 2 g: una varianza de masa sin explicar del 10%. Cuando su tolerancia configurada es del 2%, el sistema debe marcar ese registro para investigación en lugar de pasarlo hacia la firma de la **Declaración UE de Conformidad (EU DoC)**.

La misma brecha de verificación se aplica a la evidencia documental. Introducir un número de referencia de certificado en una celda no prueba que el certificado sea auténtico, válido para el **Reglamento (UE) 2025/40** o que corresponda al componente de envase correcto.

Construí este kit de herramientas como una secuencia de verificación estructurada que vincula los registros de BOM de producto con los envíos de proveedores, comprueba la consistencia numérica, separa el cribado por fórmulas de la revisión humana por expertos, rastrea la remediación de CAPA y controla la firma final del **archivo técnico del Anexo VII**. Expone los datos faltantes, las contradicciones numéricas y las afirmaciones no verificadas temprano, antes de que causen retrasos aduaneros o auditorías regulatorias rechazadas.

---

## Problemas Comunes de Preparación PPWR que Esto Resuelve (Hojas de Cálculo Manuales vs. Rastreador Estructurado)

| Cuello de Botella Operativo y Regulatorio | Caos de Hojas de Cálculo Manuales y Correo Electrónico (Sin Esta Herramienta) | Flujo de Trabajo de Cumplimiento PPWR Estructurado (Con Este Rastreador) |
| :--- | :--- | :--- |
| **Envíos de Datos de Proveedores No Estandarizados** | Los equipos regulatorios pasan horas conciliando a mano hojas de Excel de proveedores no coincidentes, nombres de polímeros inconsistentes y códigos de SKU sin mapear. | Los campos de **Captura de Datos del Fabricante** estandarizados y los identificadores únicos de Componentes de Envase imponen un esquema de datos uniforme entre todos los proveedores. |
| **Informes de Pruebas de Laboratorio Huérfanos o No Coincidentes** | Un informe de prueba de metales pesados o un **certificado de balance de masas de PCR** se vincula por error a la capa de envase equivocada o a una revisión de componente obsoleta. | La trazabilidad relacional entre `02_Product_Packaging_Register` y `03_Manufacturer_Data_Intake` vincula cada identificador de documento a un SKU, nivel de envase y proveedor específicos. |
| **Contradicciones Ocultas de Peso y Umbrales** | Valores faltantes, **proporciones de espacio vacío >50%** o sumas de peso de componentes que no superan las comprobaciones de balance de masas permanecen enterradas dentro de tablas estáticas de proveedores. | Las reglas de validación automatizadas de Excel con `LET` y `FILTER` marcan instantáneamente las violaciones de tolerancia numérica, las **excepciones de metales pesados de 100 ppm** y los campos faltantes. |
| **Aprobaciones por Fórmulas Confundidas con la Firma Legal** | Superar un cálculo básico de hoja de cálculo se trata como prueba legal de que el envase cumple el **Reglamento (UE) 2025/40**. | Columnas dedicadas separan las **Banderas Automatizadas de Calidad de Datos** de las **Decisiones de Revisión de Evidencia por Expertos**, requiriendo la verificación humana de los PDF subyacentes. |
| **Acciones Correctivas de Proveedores Estancadas (CAPA)** | Las solicitudes de **declaraciones de PFAS** faltantes o informes de laboratorio actualizados se pierden en cadenas de correo sin un responsable asignado, visibilidad presupuestaria o fecha límite. | El **Registro de Brechas de Cumplimiento y Acciones** integrado rastrea los responsables de remediación, las fechas SLA objetivo, los costos de pruebas y las banderas de retraso en una vista centralizada. |
| **Firma Prematura de la Declaración UE de Conformidad (EU DoC)** | Un SKU de producto se autoriza para la comercialización en la UE aunque la evidencia crítica del proveedor o las acciones correctivas bloqueantes sigan sin resolver. | Los **Controles de Preparación por Compuertas de Etapa** multidimensionales bloquean la firma final del documento técnico hasta que la completitud de datos, la revisión por expertos y las compuertas de CAPA se superen. |

---

## Para Quién Es Esto: Roles Objetivo y Escenarios de Cumplimiento de la Industria

Este kit de herramientas está construido para profesionales operativos, técnicos y regulatorios que necesitan una **alternativa de software de cumplimiento PPWR o plantilla de Excel** estructurada sin el costo de licencias ni el retraso de implementación de un módulo PLM/ERP empresarial:

- **Ingenieros y Tecnólogos de Envases:** Usan el **Registro de BOM de Envases** y la **Calculadora de Proporción de Espacio Vacío** para evaluar especificaciones de envases primarios, secundarios y de transporte, verificar tolerancias de peso y rastrear objetivos de **minimización de envases** durante el diseño y la calificación de proveedores.
- **Gerentes de Asuntos Regulatorios y Responsables de Cumplimiento de Producto:** Estandarizan el ensamblaje de la **Documentación Técnica del Anexo VII**, auditan las declaraciones de proveedores contra el **Reglamento (UE) 2025/40**, separan el cribado automatizado de la firma por expertos y controlan la emisión de la **Declaración UE de Conformidad (EU DoC)**.
- **Importadores de la UE, Propietarios de Marcas y Vendedores de Comercio Electrónico Transfronterizo (Amazon FBA / DTC):** Establecen una diligencia debida demostrable entre los fabricantes por contrato en el extranjero, verifican las entradas de datos de **Responsabilidad Ampliada del Productor (EPR)** y garantizan que los envíos cumplan los requisitos de documentación de acceso al mercado de la UE antes del despacho de aduanas.
- **Responsables de Aseguramiento de Calidad de Proveedores (SQA) y de Compras:** Incorporan proveedores de envases con una plantilla de recopilación de datos uniforme, rastrean certificados faltantes, gestionan **Acciones Correctivas y Preventivas (CAPA)** con plazos claros y pronostican presupuestos de pruebas de laboratorio de terceros.
- **Consultores de ESG, Sostenibilidad y Cumplimiento de Envases:** Entregan **evaluaciones de preparación PPWR** repetibles y auditorías de análisis de brechas para clientes usando la versión de navegador sin instalación para talleres en vivo y el libro de trabajo de Excel de múltiples SKU para entregables de clientes.

**Alcance y Límite Legal:** Esta herramienta es un flujo de trabajo operativo y un marco de gestión de evidencia. No reemplaza el asesoramiento legal formal, las **pruebas de laboratorio ISO/IEC 17025 acreditadas**, la interpretación regulatoria autorizada ni las obligaciones legales del operador económico que coloca envases en el mercado de la Unión Europea.

---

## Casos de Uso Frecuentes de PPWR de la UE y Escenarios de la Industria

Organizaciones de manufactura, retail y comercio electrónico usan este **Rastreador de Datos y Evidencia de Cumplimiento de Envases PPWR** para gestionar cuatro escenarios regulatorios de alto riesgo:

### 1. Despacho Aduanero de la UE Previo al Envío y Auditorías de Representante Autorizado (EAR)
Los importadores y fabricantes no comunitarios que colocan productos envasados en el mercado europeo deben proporcionar **archivos técnicos del Anexo VII** completos y **Declaraciones UE de Conformidad** firmadas a solicitud de las autoridades de vigilancia del mercado o de los **Representantes Autorizados de la UE (EAR)**. Este rastreador consolida los PDF dispersos de proveedores y los números de referencia de pruebas en un índice auditable a nivel de producto antes de que las mercancías salgan del puerto.

### 2. Verificación de Contenido de Material Reciclado Posconsumo (PCR) y del Impuesto sobre Envases de Plástico
Verificar los **objetivos obligatorios de contenido reciclado PCR de 2030/2040** para envases de plástico sensibles al contacto y no sensibles requiere rastrear las declaraciones de resina y los certificados de cadena de custodia de terceros (como RecyClass o ISCC PLUS) hasta los componentes de envase individuales. El libro de trabajo marca los componentes que afirman contenido reciclado sin referencias de certificación vinculadas.

### 3. Cumplimiento del Espacio Vacío en Envases de Comercio Electrónico y Transporte
Bajo el **Reglamento (UE) 2025/40**, los envases agrupados, de transporte y de comercio electrónico deben cumplir estrictas reglas de **minimización de envases**, incluida una **proporción máxima de 50% de espacio vacío**. Los equipos de envases usan las hojas de captura y validación para registrar volúmenes dimensionales, calcular automáticamente las proporciones de espacio vacío y registrar CAPA de rediseño para cajas de envío sobredimensionadas.

### 4. Cribado de Sustancias Restringidas (PFAS en Contacto con Alimentos y 100 ppm de Metales Pesados)
Garantizar que el plomo, el cadmio, el mercurio y el cromo hexavalente permanezcan por debajo del **límite de concentración de suma de 100 ppm**, y que los envases de contacto con alimentos cumplan las **restricciones de PFAS**, requiere un seguimiento riguroso de los informes de laboratorio. El kit de herramientas separa los valores de pruebas químicas sin procesar del estado de revisión por expertos y rastrea las cotizaciones de nuevas pruebas cuando los certificados de proveedores caducan.

---

## La Lógica de Negocio y la Metodología: Resolviendo Puntos Ciegos Comerciales Ocultos en el Cumplimiento de Envases

Incluso si no tiene antecedentes en derecho ambiental europeo o ingeniería avanzada de hojas de cálculo, el problema comercial detrás del cumplimiento de envases es sencillo: **si vende productos en la Unión Europea y no puede demostrar que sus envases siguen las reglas, sus mercancías pueden ser bloqueadas en aduanas, retiradas por los mercados o multadas.**

La mayoría de las pequeñas y medianas empresas fallan las auditorías de cumplimiento no porque pretendan infringir la ley, sino porque caen en **cinco puntos ciegos ocultos de decisión comercial**. Así protege la lógica de negocio de este rastreador a su empresa de cada punto ciego:

### Punto Ciego 1: "Mi proveedor rellenó la hoja de cálculo, así que nuestros datos son precisos."
- **La Trampa del Mundo Real:** Los proveedores a menudo adivinan los números para terminar el papeleo rápidamente. Por ejemplo, un proveedor escribe que una caja de regalo pesa 100 gramos en total, pero lista el cartón en 70 gramos y el inserto de plástico en 15 gramos (lo que solo suma 85 gramos). Si acepta esa hoja sin comprobar las matemáticas, su archivo de cumplimiento oficial contiene datos demostrablemente falsos.
- **Cómo Esta Herramienta lo Resuelve (Datos Maestros Estructurados y Comprobaciones de Tolerancia):** Introduce cada pieza de envase una vez en una lista maestra (`02_Product_Packaging_Register`). Cuando se introducen los números del proveedor, las reglas automatizadas comparan inmediatamente las piezas con el peso total y los límites permitidos. Si las matemáticas se desvían más allá de su margen permitido (por ejemplo, 2%), el rastreador levanta una bandera de advertencia automáticamente, antes de que pague costosas pruebas de laboratorio o firme documentos legales.

### Punto Ciego 2: "Tenemos un PDF de informe de prueba de laboratorio guardado en nuestra carpeta, así que estamos seguros."
- **La Trampa del Mundo Real:** Tener un PDF en una carpeta no significa que cubra la tapa de botella o caja real que está enviando hoy. Los proveedores envían con frecuencia informes obsoletos, informes para un material plástico diferente o certificados que pertenecen al producto de otro cliente.
- **Cómo Esta Herramienta lo Resuelve (Verificación en Dos Pasos: Comprobación de Máquina + Comprobación Humana):** El rastreador divide la verificación en dos columnas separadas (`04_Data_Quality_Evidence_Check`). Primero, la computadora comprueba si los números y los identificadores de documentos están presentes. Segundo, una columna separada requiere que un revisor humano abra el PDF, confirme que realmente coincide con ese componente de envase exacto y lo marque "Aprobado". Nunca confunde "existe un archivo" con "el archivo es una prueba válida".

### Punto Ciego 3: "Encontramos un problema de cumplimiento y enviamos un correo a la fábrica; ahora solo esperamos."
- **La Trampa del Mundo Real:** En lanzamientos de producto ajetreados, los correos que piden a los proveedores pruebas de metales pesados faltantes o certificados de plástico reciclado actualizados se olvidan. Semanas después, el producto está listo para enviarse y nadie sabe qué problemas de cumplimiento siguen abiertos ni cuánto costarán las pruebas de laboratorio adicionales.
- **Cómo Esta Herramienta lo Resuelve (Convirtiendo Problemas en Tareas y Presupuestos Rastreados):** Cada vez que una comprobación falla o un certificado se rechaza, lo registra en el **Registro de Brechas de Cumplimiento y Acciones** (`05_Compliance_Gap_Action_Log`). Cada problema recibe una persona responsable, una fecha límite, un costo estimado de prueba de laboratorio o rediseño y una etiqueta de "Bloqueo". Nada desaparece en una bandeja de entrada de correo, y la gerencia puede ver el costo financiero exacto de corregir las brechas de cumplimiento.

### Punto Ciego 4: "Nuestro rastreador de cumplimiento está 95% en verde, así que podemos firmar la declaración legal y enviar."
- **La Trampa del Mundo Real:** Los ejecutivos a menudo miran una barra de progreso de "95% Completo" y asumen que un producto está listo para el mercado. En cumplimiento regulatorio, **un solo certificado faltante en una tapa de plástico de 2 gramos bloquea todo el producto para recibir legalmente su Declaración UE de Conformidad (EU DoC).** Firmar una declaración legal con un bloqueo abierto expone a la empresa y al firmante individual a responsabilidad legal directa.
- **Cómo Esta Herramienta lo Resuelve (Protección de Firma por Compuertas de Etapa):** El panel de resumen final (`06_Compliance_Status_Doc_Index`) se niega a marcar un producto "Listo para la Firma de la EU DoC" solo porque la mayoría de las celdas están rellenadas. Actúa como un enclavamiento de seguridad: un producto solo se pone en verde cuando **(1) todos los datos de proveedores están completos, (2) todos los PDF de evidencia superan la revisión humana, Y (3) cero acciones correctivas bloqueantes permanecen abiertas.**

### Resumen de la Metodología de 5 Etapas
Siguiendo una secuencia estricta—**1. Registrar Piezas → 2. Recoger Números de Proveedores → 3. Auto-Comprobar Matemáticas → 4. Verificar PDF de Evidencia → 5. Cerrar Brechas Bloqueantes Antes de la Firma**—esta herramienta convierte una carga regulatoria caótica en una lista de verificación de negocio repetible que cualquiera de su equipo puede seguir.

---

## Sobre el Rastreador de Datos y Evidencia de Cumplimiento de Envases PPWR

El **Rastreador de Datos y Evidencia de Cumplimiento de Envases PPWR** ayuda a las empresas a estructurar los datos de cumplimiento de envases, detectar entradas de proveedores faltantes o contradictorias, gestionar acciones correctivas (CAPA) y organizar los registros técnicos requeridos para la gobernanza interna y la documentación del **Reglamento (UE) 2025/40**.

Al mantener una separación estricta entre los datos maestros estructurados del BOM, las declaraciones de proveedores, los diagnósticos de fórmulas automatizados, la revisión humana de evidencia, los flujos de trabajo de acciones correctivas y el reporte de preparación a nivel de producto, el sistema garantiza que los equipos distingan claramente entre **tener datos sin procesar, tener evidencia de respaldo verificada y lograr un resultado de cumplimiento aprobado**.

---

## Detalles Técnicos: Arquitectura del Libro de Trabajo, Lógica de Fórmulas y Reglas de Validación

La implementación en Excel usa seis hojas de trabajo interconectadas impulsadas por funciones de matrices dinámicas modernas de Microsoft 365 (`LET`, `FILTER`, `XLOOKUP`, `UNIQUE`, `SORT`, `COUNTIFS`, `SUMIFS`, `HSTACK` y `CHOOSECOLS`) para soportar hasta **50 productos, 500 componentes de envase, 1,000 registros de captura de proveedores y 1,000 brechas de cumplimiento**.

| Nombre de la Hoja de Trabajo | Función Operativa Principal | Resultados Clave de Cumplimiento |
| :--- | :--- | :--- |
| `01_Rule_Parameter_Register` | Mantiene versiones de reglas PPWR, umbrales regulatorios, tipos de cambio y tolerancias | Línea base regulatoria centralizada y ajustes de evaluación |
| `02_Product_Packaging_Register` | Registra SKU de productos, niveles de envase (primario/secundario/transporte), identificadores de componentes y proveedores | Datos maestros estructurados de la Lista de Materiales (BOM) de Envases |
| `03_Manufacturer_Data_Intake` | Captura pesos, dimensiones, contenido reciclado PCR, valores de sustancias e identificadores de documentos enviados por el proveedor | Declaraciones técnicas consolidadas del fabricante |
| `04_Data_Quality_Evidence_Check` | Ejecuta diagnósticos de fórmulas automatizados junto a columnas dedicadas de revisión manual por expertos | Banderas automatizadas de calidad de datos + estado de revisión de evidencia independiente |
| `05_Compliance_Gap_Action_Log` | Rastrea no conformidades, responsables de remediación de CAPA, plazos SLA, costos de pruebas y bloqueos de la DoC | Registro de CAPA accionable con acumulaciones de costos financieros |
| `06_Compliance_Status_Doc_Index` | Consolida la preparación a nivel de SKU, las referencias de documentos del Anexo VII, el estado de la EU DoC y los bloqueos abiertos | Panel de cumplimiento ejecutivo y cola de brechas priorizada |

<details>
<summary><strong>Haga clic para expandir: Flujo de Datos Detallado, Especificaciones de Capacidad, Patrones de Fórmulas (`LET`) y Lógica de Validación</strong></summary>

### Flujo de Datos Controlado de 7 Etapas

1. **Configure Reglas y Parámetros (`01_Rule_Parameter_Register`):** Establezca la fecha de evaluación, la versión de la biblioteca de reglas, los umbrales de metales pesados/PFAS, los límites de espacio vacío y las tolerancias de peso.
2. **Registre Productos y BOM de Envases (`02_Product_Packaging_Register`):** Cree identificadores de componentes estables que vinculen productos, niveles de envase, materiales y fabricantes responsables.
3. **Recoja los Envíos del Fabricante (`03_Manufacturer_Data_Intake`):** Registre las mediciones técnicas del proveedor, las declaraciones de contenido reciclado y los identificadores del repositorio de documentos externos.
4. **Ejecute Comprobaciones Automatizadas de Calidad de Datos (`04_Data_Quality_Evidence_Check`):** Active el cribado basado en fórmulas para campos faltantes, desajustes de balance de masas y violaciones de umbrales.
5. **Realice la Revisión de Evidencia por Expertos (`04_Data_Quality_Evidence_Check`):** Registre las decisiones de revisores humanos calificados verificando si los informes de prueba y certificados externos respaldan la afirmación regulatoria.
6. **Registre y Resuelva las Brechas de CAPA (`05_Compliance_Gap_Action_Log`):** Asigne responsables de remediación, plazos, cotizaciones de pruebas de laboratorio e indicadores de bloqueo de la EU DoC.
7. **Evalúe la Preparación a Nivel de Producto (`06_Compliance_Status_Doc_Index`):** Consolide la completitud de datos, la aprobación de evidencia y los bloqueos abiertos antes de la firma del archivo técnico del Anexo VII.

### Capacidad del Libro de Trabajo y Compatibilidad de Versiones de Excel

| Dominio de Datos | Capacidad de Diseño Planificada |
| :--- | ---: |
| Registros de reglas regulatorias | 200 |
| Componentes de BOM de envases | 500 |
| Registros de captura de datos del fabricante | 1,000 |
| Registros de brechas de cumplimiento y CAPA | 1,000 |
| SKU de productos | 50 |

**Requisitos del Sistema:** Microsoft 365 (Escritorio o Web) o entornos Excel 2021/2024 que admitan funciones de matrices dinámicas (`LET`, `FILTER`, `XLOOKUP`, `HSTACK`, `CHOOSECOLS`). Excel 2016 y Excel 2019 heredados no admiten el motor de fórmulas de matrices dinámicas requerido.

### Salvaguardas Críticas de Implementación y Operación

1. **Mantenga Separadas las Comprobaciones Automatizadas de la Revisión por Expertos:** En `04_Data_Quality_Evidence_Check`, las columnas `I:L` están reservadas exclusivamente para entradas manuales de revisión por expertos, mientras que las columnas adyacentes calculan diagnósticos de fórmulas automatizados. Nunca sobrescriba las columnas de fórmulas ni trate las banderas automatizadas de "Aprobado" como un sustituto de la inspección manual de documentos.
2. **Preserve la Alineación de Filas Entre las Tablas de Origen y Revisión:** Las fórmulas dependientes de la posición dependen de una alineación estable de filas entre `02_Product_Packaging_Register`, `03_Manufacturer_Data_Intake` y `04_Data_Quality_Evidence_Check`. No inserte, elimine ni ordene filas a mitad de la tabla sin realinear los registros de revisión dependientes; siempre añada registros nuevos al final de las tablas designadas.
3. **Proteja los Rangos de Desbordamiento de Matrices Dinámicas:** Las vistas de resumen usan `FILTER`, `UNIQUE` y `SORT` para desbordar salidas de múltiples filas dinámicamente. Mantenga las zonas de desbordamiento libres de entradas de texto manuales para evitar errores `#SPILL!`.

### Referencia de Fórmulas: Comprobaciones de Umbral Parametrizadas con `LET`

El libro de trabajo usa `LET` para vincular variables intermedias dentro de fórmulas de validación complejas, mejorando la auditabilidad y la velocidad de cálculo:

```excel
=LET(
    actual_value, B2,
    threshold, C2,
    IF(actual_value<=threshold, "Within Threshold", "Review Required")
)
```

### Resumen de las Reglas de Validación Automatizadas

| Área de Validación | Comprobación de Fórmula Automatizada | Acción Operativa Requerida |
| :--- | :--- | :--- |
| **Campos Obligatorios** | Detecta atributos obligatorios en blanco en las hojas de BOM y captura de proveedores | Solicite las especificaciones técnicas faltantes al fabricante |
| **Cotejo de Identificadores Relacionales** | Verifica que los identificadores de producto, componente y proveedor coincidan entre hojas mediante `XLOOKUP` | Resuelva registros huérfanos o códigos de componente no coincidentes |
| **Tolerancias de Peso Numérico** | Compara la suma de los pesos de subcomponentes contra el peso total declarado dentro de una tolerancia de % configurada | Investigue las discrepancias de balance de masas con el proveedor |
| **Límites de Metales Pesados (100 ppm)** | Compara la suma reportada de Pb, Cd, Hg y Cr(VI) contra el umbral configurado | Marque las superaciones para verificación de laboratorio ISO/IEC 17025 o sustitución de material |
| **Contenido Reciclado (PCR)** | Comprueba la presencia y validez numérica de los campos de contenido de material reciclado posconsumo | Verifique los certificados de cadena de custodia y la documentación de balance de masas |
| **Proporción de Espacio Vacío del Envase** | Calcula `(Volumen Exterior - Volumen del Producto) / Volumen Exterior` contra el umbral máximo de 50% de espacio vacío | Active el rediseño de minimización de envases o documente la exención técnica |
| **Vinculación de Referencias de Evidencia** | Verifica que cada afirmación de cumplimiento referencie un identificador de documento en el repositorio externo | Audite el informe PDF real en cuanto a alcance, fecha de validez y estándar de prueba |
| **Separación del Estado de Revisión** | Distingue las banderas de cribado automatizado de las columnas de firma del revisor manual | Obtenga una decisión formal del revisor regulatorio antes de cerrar el registro |
| **Seguimiento de CAPA y Bloqueos** | Acumula brechas abiertas, fechas vencidas, costos de pruebas y banderas de bloqueo de la DoC por SKU | Retenga la firma de la Declaración UE de Conformidad hasta que todos los bloqueos se cierren |

</details>

---

## Otras Herramientas de Soporte de Decisiones en Esta Serie

Explore otras herramientas ligeras de gestión operativa de navegador sin instalación y de Microsoft Excel en este repositorio. Cada herramienta está construida en torno a datos maestros estructurados, fórmulas de hoja de cálculo transparentes y flujos de trabajo de decisión de negocio por compuertas de etapa.

## Licencia

Este proyecto se distribuye bajo la **Licencia Apache 2.0**. Consulte [`LICENSE`](./LICENSE) para el texto completo de la licencia.
