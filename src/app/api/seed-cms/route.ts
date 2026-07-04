import { NextResponse } from "next/server";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeBlock(text: string, key: string) {
  return {
    _type: "block" as const,
    _key: key,
    children: [{ _type: "span" as const, _key: `${key}-s`, text }],
    style: "normal",
  };
}

function makeSlug(current: string) {
  return { _type: "slug" as const, current };
}

// ─── Category Definitions ─────────────────────────────────────────────────────

const categories = [
  {
    _type: "serviceCategory",
    slug: makeSlug("unidad-ecografia"),
    name: "Ecografía y Medicina Fetal",
    shortLabel: "Ecografía",
    icon: "Baby",
    color: "#00B0F0",
    fullTitle:
      "Unidad de Ecografía de Alta Precisión y Medicina Fetal",
    lead: "Monitoreamos el milagro de la vida con la máxima rigurosidad científica y tecnología de última generación para darte total tranquilidad.",
    imagePath: "/servicios/eco-fetal-1.webp",
    galleryPaths: [
      "/servicios/eco-fetal-1.webp",
      "/servicios/eco-fetal-2.webp",
      "/servicios/eco-fetal-3.webp",
    ],
    order: 1,
  },
  {
    _type: "serviceCategory",
    slug: makeSlug("prevencion-diagnostico"),
    name: "Prevención y Diagnóstico",
    shortLabel: "Prevención",
    icon: "Shield",
    color: "#0046AD",
    fullTitle:
      "Prevención, Diagnóstico Avanzado y Detección Oportuna",
    lead: "Nos anticipamos a las enfermedades mediante pruebas moleculares y procedimientos de alta fidelidad diagnóstica.",
    imagePath: "/servicios/histeroscopia.png",
    galleryPaths: [
      "/servicios/histeroscopia.png",
      "/servicios/histeroscopia-1.png",
    ],
    order: 2,
  },
  {
    _type: "serviceCategory",
    slug: makeSlug("procedimientos-menores"),
    name: "Procedimientos Menores",
    shortLabel: "Procedimientos",
    icon: "Heart",
    color: "#00B0F0",
    fullTitle:
      "Procedimientos Menores y Soluciones Ambulatorias",
    lead: "Tratamientos rápidos y efectivos diseñados para aliviar molestias comunes, cuidando tu estética y devolviéndote el confort de inmediato.",
    imagePath: "/biopsy-service.jpg",
    galleryPaths: ["/biopsy-service.jpg"],
    order: 3,
  },
  {
    _type: "serviceCategory",
    slug: makeSlug("cirugias-especializadas"),
    name: "Cirugías Ginecológicas",
    shortLabel: "Cirugías",
    icon: "Scissors",
    color: "#002060",
    fullTitle:
      "Cirugías Ginecológicas y Obstétricas Especializadas",
    lead: "Experiencia quirúrgica respaldada por años de práctica institucional, priorizando técnicas mínimamente invasivas y recuperaciones confortables.",
    imagePath: "/servicios/cirugias-1.jpg",
    galleryPaths: ["/servicios/cirugias-1.jpg", "/servicios/cesarea-1.jpg"],
    order: 4,
  },
];

// ─── Service Definitions (category refs filled after first batch) ─────────────

function buildServices(categoryIds: string[]) {
  const catRef = (idx: number) => ({
    _type: "reference" as const,
    _ref: categoryIds[idx],
  });

  return [
    // ── Category 0: unidad-ecografia ──
    {
      _type: "service",
      slug: makeSlug("ecografia-ginecologica"),
      category: catRef(0),
      title: "Ecografía Ginecológica",
      subtitle: "Diagnóstico por Imagen",
      shortDescription:
        "Diagnóstico por imagen de alta resolución para evaluación completa del aparato reproductor femenino.",
      imagePath: "/ultrasound-service.jpg",
      description: [
        makeBlock(
          "La ecografía ginecológica es un estudio de diagnóstico por imagen que utiliza ondas sonoras de alta frecuencia para visualizar los órganos reproductivos femeninos. Permite una evaluación precisa del útero, los ovarios, las trompas de Falopio y las estructuras pélvicas circundantes. En Nueva Vida, utilizamos equipos de última generación que ofrecen imágenes de alta resolución, facilitando la detección temprana de cualquier anomalía.",
          "p1"
        ),
      ],
      price: "Desde S/ 180",
      duration: "30 minutos",
      preparation: [
        "Vejiga llena (beber 1 litro de agua 1 hora antes)",
        "No es necesario ayuno",
        "Traer exámenes anteriores si los tiene",
      ],
      faqs: [
        {
          q: "¿Es dolorosa la ecografía ginecológica?",
          a: "No, es un procedimiento indoloro y no invasivo. Solo se podría sentir una leve presión durante la exploración transvaginal.",
        },
        {
          q: "¿Cuándo se recomienda realizar una ecografía?",
          a: "Se recomienda realizarla como parte del control ginecológico anual, ante dolor pélvico, sangrados anormales o sospecha de alteraciones.",
        },
        {
          q: "¿Con qué frecuencia debo realizarme una ecografía?",
          a: "Se recomienda al menos una vez al año como prevención, o según indicación médica según su historial clínico.",
        },
      ],
      featured: true,
      order: 1,
    },
    {
      _type: "service",
      slug: makeSlug("ecografia-obstetrica"),
      category: catRef(0),
      title: "Ecografía Obstétrica",
      subtitle: "Control Prenatal",
      shortDescription:
        "Control prenatal con tecnología 4D para monitorear el desarrollo de tu bebé en cada etapa.",
      imagePath: "/service-eco-obs.jpg",
      description: [
        makeBlock(
          "La ecografía obstétrica es el pilar fundamental del control prenatal. En Nueva Vida contamos con tecnología 4D de última generación que permite visualizar al bebé en tiempo real con una claridad excepcional. Este estudio permite evaluar el crecimiento fetal, verificar la vitalidad, determinar la posición del bebé y detectar posibles anomalías.",
          "p1"
        ),
      ],
      price: "Desde S/ 220",
      duration: "45 minutos",
      preparation: [
        "Vejiga llena para el primer trimestre",
        "Traer ecografías anteriores",
        "Traer carné de control prenatal",
      ],
      faqs: [
        {
          q: "¿En qué trimestre puedo ver a mi bebé en 4D?",
          a: "La mejor época para la ecografía 4D es entre las semanas 24 y 32.",
        },
        {
          q: "¿Cuántas ecografías necesito durante el embarazo?",
          a: "Generalmente se recomienda una en cada trimestre: confirmación en el primero, morfológica en el segundo y de bienestar en el tercero.",
        },
      ],
      featured: true,
      order: 2,
    },
    {
      _type: "service",
      slug: makeSlug("cirugia-ginecologica"),
      category: catRef(0),
      title: "Cirugía Ginecológica",
      subtitle: "Tratamiento Quirúrgico",
      shortDescription:
        "Procedimientos quirúrgicos especializados para el tratamiento de patologías ginecológicas con técnicas avanzadas y mínimamente invasivas.",
      imagePath: "/servicios/cirugias-1.jpg",
      description: [
        makeBlock(
          "La cirugía ginecológica abarca un amplio espectro de procedimientos quirúrgicos para el tratamiento de patologías del aparato reproductor femenino. En Nueva Vida, contamos con especialistas capacitados en técnicas de vanguardia que priorizan la mínima invasión, permitiendo menores tiempos de recuperación, menor dolor postoperatorio y mejores resultados estéticos y funcionales.",
          "p1"
        ),
      ],
      price: "Desde S/ 2,500",
      duration: "60 - 120 minutos",
      preparation: [
        "Ayuno de 8 horas",
        "Exámenes preoperatorios completos",
        "Acompañante obligatorio",
        "Suspender anticoagulantes 7 días antes",
        "Valoración anestésica preoperatoria",
      ],
      faqs: [
        {
          q: "¿Qué tipo de cirugías ginecológicas realizan?",
          a: "Realizamos desde procedimientos ambulatorios hasta cirugías complejas como miomectomías, ooforectomías y cirugías de endometriosis, siempre priorizando abordajes mínimamente invasivos.",
        },
        {
          q: "¿Cuánto tiempo de reposo necesito?",
          a: "Depende del tipo de cirugía. Procedimientos ambulatorios requieren 1-3 días de reposo relativo. Cirugías mayores pueden requerir 2-6 semanas de recuperación gradual.",
        },
      ],
      featured: false,
      order: 3,
    },
    {
      _type: "service",
      slug: makeSlug("laparoscopia"),
      category: catRef(0),
      title: "Laparoscopia",
      subtitle: "Cirugía Mínimamente Invasiva",
      shortDescription:
        "Procedimiento quirúrgico mínimamente invasivo para diagnóstico y tratamiento de patologías pélvicas con rápida recuperación.",
      imagePath: "/servicios/cirugias-1.jpg",
      description: [
        makeBlock(
          "La laparoscopia es un procedimiento quirúrgico avanzado que permite visualizar y tratar patologías abdominales y pélvicas a través de pequeñas incisiones. Utilizando una cámara de alta resolución y instrumentos especializados, se pueden realizar desde procedimientos diagnósticos hasta cirugías complejas con mínima invasión, garantizando una recuperación más rápida y menos dolor postoperatorio.",
          "p1"
        ),
      ],
      price: "Desde S/ 3,500",
      duration: "60 - 90 minutos",
      preparation: [
        "Ayuno de 8 horas previas",
        "Exámenes preoperatorios (hemograma, coagulación)",
        "Acompañante obligatorio para el alta",
        "Suspender anticoagulantes 7 días antes",
      ],
      faqs: [
        {
          q: "¿Cuánto tiempo dura la recuperación?",
          a: "La recuperación suele ser de 1 a 2 semanas, mucho más rápida que la cirugía abierta. La mayoría de pacientes retoman sus actividades en 3-5 días.",
        },
        {
          q: "¿Es segura la laparoscopia?",
          a: "Sí, es un procedimiento seguro con baja tasa de complicaciones. Se realiza bajo anestesia general y con monitoreo continuo.",
        },
      ],
      featured: false,
      order: 4,
    },
    {
      _type: "service",
      slug: makeSlug("histeroscopia"),
      category: catRef(0),
      title: "Histeroscopia",
      subtitle: "Evaluación Endouterina",
      shortDescription:
        "Estudio visual directo del interior del útero para diagnóstico y tratamiento de patologías endometriales.",
      imagePath: "/servicios/histeroscopia.png",
      description: [
        makeBlock(
          "La histeroscopia es un procedimiento que permite la visualización directa de la cavidad uterina mediante una cámara de alta resolución. Se utiliza para diagnosticar y tratar condiciones como pólipos, miomas submucosos, adherencias y sangrados anormales. Es un procedimiento ambulatorio, mínimamente invasivo y con rápida recuperación.",
          "p1"
        ),
      ],
      price: "Desde S/ 1,800",
      duration: "30 - 45 minutos",
      preparation: [
        "Realizar el procedimiento en fase proliferativa del ciclo (días 7-12)",
        "Ayuno de 6 horas",
        "Examen de Papanicolau vigente",
        "No tener relaciones sexuales 48 horas antes",
      ],
      faqs: [
        {
          q: "¿La histeroscopia requiere anestesia?",
          a: "Generalmente se realiza con anestesia sedación o local, dependiendo del caso. Es un procedimiento bien tolerado.",
        },
        {
          q: "¿Puedo retornar a mis actividades el mismo día?",
          a: "Sí, la mayoría de pacientes pueden retornar a sus actividades normales al día siguiente, aunque se recomienda reposo relativo por 24 horas.",
        },
      ],
      featured: false,
      order: 5,
    },
    // ── Category 1: prevencion-diagnostico ──
    {
      _type: "service",
      slug: makeSlug("test-de-cobas"),
      category: catRef(1),
      title: "Test de COBAS (VPH)",
      subtitle: "Detección de VPH de Alto Riesgo",
      shortDescription:
        "Prueba molecular de última generación para la detección de virus del papiloma humano de alto riesgo oncogénico.",
      imagePath: "/servicios/histeroscopia.png",
      description: [
        makeBlock(
          "El test de COBAS es una prueba de diagnóstico molecular que detecta los 14 genotipos de VPH de alto riesgo, identificando específicamente los tipos 16 y 18, responsables de aproximadamente el 70% de los cánceres cervicales. Es más sensible que el Papanicolau convencional y constituye una herramienta fundamental en la prevención del cáncer de cuello uterino.",
          "p1"
        ),
      ],
      price: "Desde S/ 350",
      duration: "15 minutos",
      preparation: [
        "No tener relaciones sexuales 48 horas antes",
        "No usar duchas vaginales ni óvulos en las 48 horas previas",
        "Evitar el periodo menstrual",
        "No usar medicamentos vaginales 72 horas antes",
      ],
      faqs: [
        {
          q: "¿En qué se diferencia del Papanicolau?",
          a: "El test de COBAS detecta el ADN del virus del VPH directamente, mientras que el Papanicolau busca alteraciones celulares. Son pruebas complementarias y se recomienda realizar ambas.",
        },
        {
          q: "¿Con qué frecuencia debo realizarme el test?",
          a: "Se recomienda realizarlo cada 3 años en mujeres mayores de 30 años, o anualmente si tiene factores de riesgo.",
        },
      ],
      featured: false,
      order: 1,
    },
    {
      _type: "service",
      slug: makeSlug("histerosonografia"),
      category: catRef(1),
      title: "Histerosonografía",
      subtitle: "Evaluación de Cavidad Uterina",
      shortDescription:
        "Estudio ecográfico especializado con contraste para evaluar la cavidad uterina y detectar anomalías no visibles en ecografía convencional.",
      imagePath: "/servicios/eco-fetal-1.webp",
      description: [
        makeBlock(
          "La histerosonografía, también conocida como sonohisterografía, es un estudio ecográfico que utiliza solución salina estéril como contraste para distender la cavidad uterina y evaluar su estructura con gran precisión. Permite detectar pólipos endometriales, miomas submucosos, adherencias intrauterinas y malformaciones congénitas que no son visibles en la ecografía convencional.",
          "p1"
        ),
      ],
      price: "Desde S/ 280",
      duration: "30 minutos",
      preparation: [
        "Vejiga llena",
        "Realizar en la primera mitad del ciclo menstrual (días 5-12)",
        "No tener relaciones sexuales 48 horas antes",
      ],
      faqs: [
        {
          q: "¿Es dolorosa la histerosonografía?",
          a: "Puede causar cólicos leves similares a los menstruales durante la inyección de la solución salina, pero el procedimiento es bien tolerado y de corta duración.",
        },
        {
          q: "¿Cuándo se indica este estudio?",
          a: "Se indica ante sangrados uterinos anormales, infertilidad, sospecha de pólipos o miomas, y como evaluación preoperatoria.",
        },
      ],
      featured: false,
      order: 2,
    },
    {
      _type: "service",
      slug: makeSlug("biopsia-de-mama"),
      category: catRef(1),
      title: "Biopsia de Mama",
      subtitle: "Diagnóstico Mamario",
      shortDescription:
        "Procedimiento de toma de muestra de tejido mamario para el diagnóstico histopatológico de nódulos y lesiones sospechosas.",
      imagePath: "/biopsy-service.jpg",
      description: [
        makeBlock(
          "La biopsia de mama es un procedimiento diagnóstico que permite obtener una muestra de tejido mamario para su análisis histopatológico. Se realiza bajo guía ecográfica para mayor precisión, permitiendo el diagnóstico definitivo de nódulos, microcalcificaciones y otras lesiones mamarias. En Nueva Vida, contamos con técnicas avanzadas como la biopsia core y la biopsia por punción aspiration con aguja fina (PAAF).",
          "p1"
        ),
      ],
      price: "Desde S/ 450",
      duration: "30 - 45 minutos",
      preparation: [
        "Traer resultados de ecografía y mamografía recientes",
        "No tomar anticoagulantes 7 días antes",
        "Acompañante recomendado",
        "Comunicar alergias a anestésicos",
      ],
      faqs: [
        {
          q: "¿La biopsia de mama duele?",
          a: "Se realiza bajo anestesia local, por lo que no sentirá dolor durante el procedimiento. Puede haber molestias leves posteriores que se controlan con analgésicos comunes.",
        },
        {
          q: "¿Cuánto tardan los resultados?",
          a: "Los resultados histopatológicos están listos entre 5 a 7 días hábiles y se entregan en consulta médica con la explicación detallada del caso.",
        },
      ],
      featured: false,
      order: 3,
    },
    {
      _type: "service",
      slug: makeSlug("biopsia-de-cervix"),
      category: catRef(1),
      title: "Biopsia de Cérvix",
      subtitle: "Toma de Muestra Cervical",
      shortDescription:
        "Procedimiento de toma de muestra de tejido del cuello uterino para diagnóstico de lesiones preneoplásicas y neoplásicas.",
      imagePath: "/servicios/histeroscopia.png",
      description: [
        makeBlock(
          "La biopsia de cérvix es un procedimiento ambulatorio que permite obtener una muestra de tejido del cuello uterino para su análisis histopatológico. Se indica cuando se detectan alteraciones en el Papanicolau o en la colposcopía. Es fundamental para el diagnóstico temprano de lesiones precancerosas y cáncer cervical, permitiendo un tratamiento oportuno y efectivo.",
          "p1"
        ),
      ],
      price: "Desde S/ 300",
      duration: "20 minutos",
      preparation: [
        "Realizar preferentemente en la segunda semana del ciclo menstrual",
        "No tener relaciones sexuales 48 horas antes",
        "No usar duchas vaginales ni medicamentos vaginales 72 horas antes",
        "Traer resultados de Papanicolau reciente",
      ],
      faqs: [
        {
          q: "¿Es dolorosa la biopsia de cérvix?",
          a: "Se puede sentir una leve molestia similar a un cólico menstrual durante la toma de la muestra. El procedimiento es rápido y bien tolerado.",
        },
        {
          q: "¿Qué cuidados debo tener después del procedimiento?",
          a: "Se recomienda evitar relaciones sexuales, uso de tampones y duchas vaginales por 7 días. Es normal un leve sangrado que cede espontáneamente.",
        },
      ],
      featured: false,
      order: 4,
    },
    // ── Category 2: procedimientos-menores ──
    {
      _type: "service",
      slug: makeSlug("exeresis-fibroadenomas"),
      category: catRef(2),
      title: "Exéresis de Fibroadenomas",
      subtitle: "Cirugía Mamaria Ambulatoria",
      shortDescription:
        "Extracción quirúrgica ambulatoria de fibroadenomas mamarios con técnica estética y mínima cicatriz.",
      imagePath: "/biopsy-service.jpg",
      description: [
        makeBlock(
          "La exéresis de fibroadenomas es un procedimiento quirúrgico ambulatorio que permite la extirpación de tumores benignos de la mama. Se realiza bajo anestesia local con técnicas que priorizan el resultado estético, minimizando las cicatrices. El tejido extraído se envía a estudio histopatológico para confirmar el diagnóstico.",
          "p1"
        ),
      ],
      price: "Desde S/ 1,200",
      duration: "45 - 60 minutos",
      preparation: [
        "Ayuno de 6 horas",
        "Exámenes preoperatorios (hemograma, coagulación)",
        "Ecografía mamaria reciente",
        "No tomar anticoagulantes 7 días antes",
      ],
      faqs: [
        {
          q: "¿Dejará una cicatriz visible?",
          a: "Utilizamos técnicas estéticas con incisiones mínimas en zonas ocultas (periareolar o axilar) para que la cicatriz sea prácticamente imperceptible.",
        },
        {
          q: "¿Cuándo puedo retomar mis actividades?",
          a: "La mayoría de pacientes retoman actividades ligeras a las 48 horas y actividades completas en 7 a 10 días.",
        },
      ],
      featured: false,
      order: 1,
    },
    {
      _type: "service",
      slug: makeSlug("aspiracion-quistes"),
      category: catRef(2),
      title: "Aspiración de Quistes",
      subtitle: "Drenaje de Quistes Mamarios y Ováricos",
      shortDescription:
        "Procedimiento ambulatorio de drenaje de quistes mediante punción guiada por ecografía para alivio inmediato.",
      imagePath: "/ultrasound-service.jpg",
      description: [
        makeBlock(
          "La aspiración de quistes es un procedimiento ambulatorio que permite drenar quistes mamarios u ováricos mediante una punción con aguja fina guiada por ecografía. Alivia de forma inmediato el dolor y la presión causados por quistes de gran tamaño. El líquido aspirado puede ser enviado a estudio citopatológico para descartar patologías.",
          "p1"
        ),
      ],
      price: "Desde S/ 350",
      duration: "20 - 30 minutos",
      preparation: [
        "Ecografía reciente del área afectada",
        "No tomar anticoagulantes 7 días antes",
        "Acompañante recomendado",
      ],
      faqs: [
        {
          q: "¿Los quistes pueden volver a aparecer?",
          a: "Es posible que algunos quistes recidiven, especialmente si hay un componente hormonal. El seguimiento ecográfico periódico permite su control.",
        },
        {
          q: "¿Es necesario anesthesia?",
          a: "Se aplica anestesia local en el punto de punción, por lo que el procedimiento es prácticamente indoloro.",
        },
      ],
      featured: false,
      order: 2,
    },
    {
      _type: "service",
      slug: makeSlug("marsupializacion-bartholino"),
      category: catRef(2),
      title: "Marsupialización de Bartholino",
      subtitle: "Tratamiento de Quiste de Bartholino",
      shortDescription:
        "Procedimiento quirúrgico ambulatorio para el tratamiento definitivo de quistes y abscesos de la glándula de Bartholino.",
      imagePath: "/biopsy-service.jpg",
      description: [
        makeBlock(
          "La marsupialización de Bartholino es un procedimiento quirúrgico que crea una abertura permanente en la glándula de Bartholino para permitir el drenaje continuo del líquido y prevenir la recurrencia del quiste o absceso. Se realiza bajo anestesia local o sedación, y es el tratamiento de elección cuando los quistes son recurrentes o se han infectado.",
          "p1"
        ),
      ],
      price: "Desde S/ 800",
      duration: "30 - 45 minutos",
      preparation: [
        "Ayuno de 6 horas",
        "Exámenes preoperatorios básicos",
        "Tratamiento antibiótico previo si hay infección activa",
        "Acompañante obligatorio",
      ],
      faqs: [
        {
          q: "¿Cuál es la tasa de éxito del procedimiento?",
          a: "La marsupialización tiene una tasa de éxito superior al 90%, siendo el tratamiento más efectivo para quistes recurrentes de Bartholino.",
        },
        {
          q: "¿Cuánto es el tiempo de recuperación?",
          a: "La recuperación completa es de 2 a 3 semanas. Se recomienda reposo relativo y evitar relaciones sexuales durante 4 semanas.",
        },
      ],
      featured: false,
      order: 3,
    },
    // ── Category 3: cirugias-especializadas ──
    {
      _type: "service",
      slug: makeSlug("correccion-incontinencia"),
      category: catRef(3),
      title: "Corrección de Incontinencia Urinaria",
      subtitle: "Cirugía de Piso Pélvico",
      shortDescription:
        "Cirugía especializada para la corrección de la incontinencia urinaria de esfuerzo mediante técnicas modernas y mínimamente invasivas.",
      imagePath: "/servicios/cirugias-1.jpg",
      description: [
        makeBlock(
          "La corrección de incontinencia urinaria es un procedimiento quirúrgico especializado que utiliza técnicas de bandas suburetrales (TVT/TVT-O) para restablecer el soporte anatómico de la uretra. En Nueva Vida, contamos con entrenamiento avanzado en cirugía de piso pélvico, ofreciendo soluciones definitivas con técnicas mínimamente invasivas que garantizan una rápida recuperación y excelentes resultados funcionales.",
          "p1"
        ),
      ],
      price: "Desde S/ 4,500",
      duration: "60 - 90 minutos",
      preparation: [
        "Estudio urodinámico previo",
        "Ayuno de 8 horas",
        "Exámenes preoperatorios completos",
        "Acompañante obligatorio para el alta",
        "Suspender anticoagulantes 7 días antes",
      ],
      faqs: [
        {
          q: "¿Cuál es la tasa de éxito de la cirugía?",
          a: "Las bandas suburetrales tienen una tasa de éxito del 85-95% a largo plazo, siendo una de las cirugías con mejores resultados en uroginecología.",
        },
        {
          q: "¿Cuánto tiempo dura la recuperación?",
          a: "La hospitalización suele ser de 24 horas. Se recomienda evitar esfuerzos físicos por 4-6 semanas y retomar actividades gradually.",
        },
      ],
      featured: false,
      order: 1,
    },
    {
      _type: "service",
      slug: makeSlug("histerectomia"),
      category: catRef(3),
      title: "Histerectomía",
      subtitle: "Cirugía Ginecológica Mayor",
      shortDescription:
        "Procedimiento quirúrgico de extirpación del útero mediante técnicas mínimamente invasivas para diversas patologías ginecológicas.",
      imagePath: "/servicios/cirugias-1.jpg",
      description: [
        makeBlock(
          "La histerectomía es un procedimiento quirúrgico que consiste en la extirpación del útero. Se indica ante patologías como miomas sintomáticos, endometriosis severa, prolapso uterino, sangrado uterino anormal refractario y patologías premalignas o malignas. En Nueva Vida priorizamos los abordajes laparoscópicos y vaginales que ofrecen menor dolor postoperatorio, menor pérdida sanguínea y recuperación más rápida.",
          "p1"
        ),
      ],
      price: "Desde S/ 6,000",
      duration: "90 - 150 minutos",
      preparation: [
        "Estudios preoperatorios completos (hemograma, coagulación, perfil hepático, ECG)",
        "Ayuno de 8 horas",
        "Estudio de Imagen (ecografía o RMN) reciente",
        "Acompañante obligatorio",
        "Valoración anestésica preoperatoria",
      ],
      faqs: [
        {
          q: "¿La histerectomía provoca menopausia?",
          a: "Solo si se extirpan ambos ovarios. Si se conservan los ovarios, la paciente no entrará en menopausia quirúrgica y continuará produciendo hormonas.",
        },
        {
          q: "¿Cuánto tiempo de hospitalización se necesita?",
          a: "En abordajes laparoscópicos, la hospitalización suele ser de 1 a 2 días. La recuperación completa se logra en 4 a 6 semanas.",
        },
      ],
      featured: false,
      order: 2,
    },
    {
      _type: "service",
      slug: makeSlug("cesarea-segura"),
      category: catRef(3),
      title: "Cesárea Segura",
      subtitle: "Cirugía Obstétrica",
      shortDescription:
        "Procedimiento de cesárea con técnica quirúrgica moderna, priorizando la seguridad materna y fetal con la mejor recuperación posible.",
      imagePath: "/servicios/cesarea-1.jpg",
      description: [
        makeBlock(
          "La cesárea es un procedimiento quirúrgico obstétrico que permite la extracción del bebé a través de una incisión abdominal y uterina. Se realiza cuando el parto vaginal no es posible o seguro para la madre o el bebé. En Nueva Vida, empleamos la técnica de cesárea con cierre por planos (Misgav-Ladach) que reduce el sangrado, disminuye el dolor postoperatorio y acelera la recuperación.",
          "p1"
        ),
      ],
      price: "Desde S/ 4,000",
      duration: "45 - 60 minutos",
      preparation: [
        "Ayuno de 8 horas (o según indicación del anestesiólogo)",
        "Grupo sanguíneo y factor Rh",
        "Hemograma y pruebas serológicas",
        "Ecografía obstétrica reciente",
        "Acompañante obligatorio",
      ],
      faqs: [
        {
          q: "¿Cuánto tiempo de recuperación necesita una cesárea?",
          a: "La hospitalización es de 2 a 3 días. La recuperación completa toma entre 4 a 6 semanas, durante las cuales se debe evitar cargar peso y hacer esfuerzos.",
        },
        {
          q: "¿Puedo tener un parto vaginal después de una cesárea?",
          a: "Depende del tipo de incisión anterior y las condiciones actuales. El parto vaginal después de cesárea (PVDC) es posible en casos seleccionados y debe ser evaluado individualmente.",
        },
      ],
      featured: false,
      order: 3,
    },
    {
      _type: "service",
      slug: makeSlug("ligadura-trompas"),
      category: catRef(3),
      title: "Ligadura de Trompas",
      subtitle: "Método Anticonceptivo Quirúrgico",
      shortDescription:
        "Procedimiento quirúrgico de esterilización femenina definitiva mediante técnicas mínimamente invasivas.",
      imagePath: "/servicios/cirugias-1.jpg",
      description: [
        makeBlock(
          "La ligadura de trompas es un método anticonceptivo quirúrgico permanente que consiste en la oclusión o sección de las trompas de Falopio para impedir la fecundación. Se realiza habitualmente por laparoscopia, lo que permite una rápida recuperación. Es una decisión que debe ser bien meditada, y en Nueva Vida ofrecemos asesoría completa antes del procedimiento.",
          "p1"
        ),
      ],
      price: "Desde S/ 3,500",
      duration: "30 - 45 minutos",
      preparation: [
        "Valoración psicológica y consejería reproductiva",
        "Ayuno de 8 horas",
        "Exámenes preoperatorios básicos",
        "Acompañante obligatorio para el alta",
        "Consentimiento informado firmado con 72 horas de anticipación",
      ],
      faqs: [
        {
          q: "¿Es reversible la ligadura de trompas?",
          a: "Técnicamente es posible realizar una reanastomosis tubárica, pero no siempre garantiza la restauración de la fertilidad. Debe considerarse un método permanente.",
        },
        {
          q: "¿Afecta mi vida sexual o hormonal?",
          a: "No. La ligadura de trompas no altera la producción hormonal ni la libido. Los ciclos menstruales continúan normalmente.",
        },
      ],
      featured: false,
      order: 4,
    },
  ];
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    _type: "testimonial",
    authorName: "María García",
    quote: [
      makeBlock(
        "El Dr. Adolfo es un profesional excepcional. Me hizo sentir cómoda en todo momento y su atención fue impecable durante todo mi embarazo.",
        "q1"
      ),
    ],
    rating: 5,
    order: 1,
  },
  {
    _type: "testimonial",
    authorName: "Carolina López",
    quote: [
      makeBlock(
        "La tecnología que manejan es de primera. La ecografía 4D fue una experiencia increíble para mi familia. Totalmente recomendado.",
        "q1"
      ),
    ],
    rating: 5,
    order: 2,
  },
  {
    _type: "testimonial",
    authorName: "Ana Torres",
    quote: [
      makeBlock(
        "Excelente atención desde la recepción hasta la consulta. El ambiente es muy acogedor y profesional. Sin duda el mejor consultorio.",
        "q1"
      ),
    ],
    rating: 5,
    order: 3,
  },
];

// ─── Mentorships ──────────────────────────────────────────────────────────────

const mentorships = [
  {
    _type: "mentorship",
    title: "Alta Especialización en Ginecología Funcional",
    slug: makeSlug("ginecologia-funcional-sarge"),
    institution: "Sociedad Argentina de Ginecología y Estética (SARGE)",
    location: "Buenos Aires, Argentina",
    flag: "\u{1F1E6}\u{1F1F7}",
    imagePath: "/doctores/dr-elias-1.jpg",
    galleryPaths: [
      "/doctores/dr-elias-1.jpg",
      "/doctores/dr-elias-2.jpg",
      "/doctores/dr-elias-banner.jpeg",
    ],
    galleryLabel: "Ver galería",
    description:
      "Certificación avanzada y entrenamiento médico en tecnologías aplicadas a la ginecología funcional, cursado bajo la tutela directa del Dr. Jorge Elías, referente e ícono de la medicina funcional en Sudamérica.",
    order: 1,
  },
  {
    _type: "mentorship",
    title: "Cirugía Avanzada de Piso Pélvico",
    slug: makeSlug("cirugia-piso-pelvico-fucs"),
    institution:
      "Fundación Universitaria de Ciencias de la Salud (FUCS)",
    location: "Cúcuta, Colombia",
    flag: "\u{1F1E8}\u{1F1F4}",
    imagePath: "/doctores/dr-ochoa-1.jpg",
    galleryPaths: [
      "/doctores/dr-ochoa-1.jpg",
      "/doctores/dr-ochoa-2.jpg",
      "/doctores/dr-ochoa-3.jpg",
    ],
    galleryLabel: "Ver galería quirúrgica",
    description:
      "Perfeccionamiento de técnicas quirúrgicas de vanguardia en prolapso genital, incontinencia urinaria y reparación sitio específica, entrenado por el Dr. Álvaro Ochoa, uno de los máximos expositores de piso pélvico en Colombia y Sudamérica.",
    order: 2,
  },
  {
    _type: "mentorship",
    title: "Medicina Fetal y Ecografía Compleja",
    slug: makeSlug("medicina-fetal-eco-imagen"),
    institution: "Escuela de Ultrasonido ECO IMAGEN",
    location: "Lima, Perú",
    flag: "\u{1F1F5}\u{1F1F1}",
    imagePath: "/doctores/dr-zapata-1.jpg",
    galleryPaths: ["/doctores/dr-zapata-1.jpg", "/doctores/dr-zapata-2.jpg"],
    description:
      "Sólida preparación experta en neurosonografía, ecocardiografía fetal y Doppler avanzado para el manejo de embarazos de alto riesgo, estudios realizados junto al reconocido especialista Dr. Josué Zapata.",
    order: 3,
  },
];

// ─── Facilities ───────────────────────────────────────────────────────────────

const facilities = [
  {
    _type: "facility",
    imagePath: "/instalaciones/instalacion-1.jpg",
    alt: "Infraestructura física del Consultorio Nueva Vida",
    caption: "Áreas de atención modernas y cómodas",
    order: 1,
  },
  {
    _type: "facility",
    imagePath: "/instalaciones/instalacion-2.jpg",
    alt: "Tecnología médica de última generación",
    caption: "Equipos de diagnóstico de alta resolución",
    order: 2,
  },
];

// ─── Health Articles ──────────────────────────────────────────────────────────

const healthArticles = [
  {
    _type: "healthArticle",
    slug: makeSlug("endometriosis"),
    icon: "Heart",
    color: "from-pink-500/10 to-rose-500/10",
    title: "Endometriosis",
    description:
      "La endometriosis es una condición en la que el tejido que normalmente reviste el interior del útero crece fuera de él. Puede causar dolor pélvico crónico, especialmente durante la menstruación, y puede afectar la fertilidad. El diagnóstico temprano es fundamental para un tratamiento efectivo.",
    order: 1,
  },
  {
    _type: "healthArticle",
    slug: makeSlug("sindrome-ovario-poliquistico"),
    icon: "Stethoscope",
    color: "from-blue-500/10 to-indigo-500/10",
    title: "Síndrome de Ovario Poliquístico (SOP)",
    description:
      "El SOP es un trastorno hormonal común que afecta a mujeres en edad reproductiva. Se caracteriza por niveles elevados de andrógenos, períodos irregulares y quistes en los ovarios. El diagnóstico y manejo adecuado pueden prevenir complicaciones a largo plazo.",
    order: 2,
  },
  {
    _type: "healthArticle",
    slug: makeSlug("cancer-cuello-uterino"),
    icon: "Shield",
    color: "from-emerald-500/10 to-teal-500/10",
    title: "Cáncer de Cuello Uterino",
    description:
      "El cáncer de cuello uterino es uno de los más prevenibles gracias a las pruebas de tamizaje como el Papanicolau y la vacuna contra el VPH. La detección temprana de lesiones precancerosas permite un tratamiento con altas tasas de curación.",
    order: 3,
  },
  {
    _type: "healthArticle",
    slug: makeSlug("embarazo-saludable"),
    icon: "Baby",
    color: "from-cyan-500/10 to-sky-500/10",
    title: "Embarazo Saludable",
    description:
      "Un embarazo saludable requiere controles prenatales regulares, una alimentación balanceada, suplementación de ácido fólico y actividad física adecuada. Las ecografías periódicas son esenciales para monitorear el desarrollo del bebé.",
    order: 4,
  },
  {
    _type: "healthArticle",
    slug: makeSlug("menopausia"),
    icon: "Heart",
    color: "from-orange-500/10 to-amber-500/10",
    title: "Menopausia y Climaterio",
    description:
      "La menopausia marca el fin de la etapa reproductiva de la mujer. Los cambios hormonales pueden provocar síntomas como sofocos, cambios de humor y osteoporosis. Un manejo integral mejora significativamente la calidad de vida.",
    order: 5,
  },
  {
    _type: "healthArticle",
    slug: makeSlug("infecciones-vaginales"),
    icon: "Shield",
    color: "from-violet-500/10 to-purple-500/10",
    title: "Infecciones Vaginales",
    description:
      "Las infecciones vaginales son muy comunes y pueden ser causadas por hongos, bacterias o parásitos. Los síntomas incluyen flujo anormal, picor y molestias. El diagnóstico correcto garantiza un tratamiento rápido y efectivo.",
    order: 6,
  },
];

// ─── siteSettings ─────────────────────────────────────────────────────────────

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  companyName: "Nueva Vida",
  slogan: "Quiénes Somos",
  tagline: "Tu bienestar, nuestra misión principal",
  phone: "+51 983 554 248",
  whatsapp: "51983554248",
  email: "info@nuevavida.pe",
  address: "Av. Principal 123, Centro Médico, Chincha - Perú",
  businessHours: "Lun - Vie: 4:00 PM - 8:00 PM",
  aboutDescription:
    "En Nueva Vida, contamos con más de 15 años de experiencia brindando atención ginecológica integral de la más alta calidad. Nuestro consultorio está equipado con tecnología de última generación para garantizar diagnósticos precisos y tratamientos efectivos.",
  aboutFeatures: [
    "Tecnología 4D",
    "Ambiente Privado",
    "Atención Personalizada",
    "Resultados Inmediatos",
  ],
  servicesTitle: "Atención especializada para tu salud íntima",
  servicesDescription:
    "Diagnóstico, cirugía y prevención con la más alta tecnología médica.",
  ctaTitle: "¿Lista para cuidar de tu salud?",
  ctaDescription:
    "Agenda tu cita de manera rápida y sencilla. Nuestro equipo está listo para brindarte la atención que mereces.",
  footerDescription:
    "Brindamos atención médica especializada con la más alta calidad y calidez humana. Su salud y bienestar son nuestra prioridad.",
  servicesPageTitle: "Nuestros Servicios Especializados",
  servicesPageDescription:
    "Tecnología médica de vanguardia y calidez humana para proteger lo que más amas: tu salud y la de tu familia.",
  servicesCtaTitle: "¿Necesitas orientación sobre algún servicio?",
  servicesCtaDescription:
    "Nuestro equipo está disponible para resolver tus dudas y ayudarte a elegir el servicio adecuado para ti.",
  healthPageTitle: "Información para tu bienestar",
  healthPageDescription:
    "Artículos informativos sobre salud femenina y respuestas a las preguntas más frecuentes para que tomes mejores decisiones sobre tu salud.",
  healthFaqTitle: "Preguntas Frecuentes",
  healthFaqDescription:
    "Encuentra respuestas a las dudas más comunes sobre salud ginecológica.",
  healthFaqs: [
    {
      q: "¿Con qué frecuencia debo acudir a un control ginecológico?",
      a: "Se recomienda realizar un control ginecológico al menos una vez al año, o cada 6 meses si existen factores de riesgo como antecedentes familiares de cáncer, patologías crónicas o antecedentes de infecciones recurrentes. En Nueva Vida, diseñamos un plan de control personalizado para cada paciente.",
    },
    {
      q: "¿La ecografía ginecológica es dolorosa?",
      a: "No, la ecografía ginecológica es un procedimiento completamente indoloro y no invasivo. Utiliza ondas sonoras para crear imágenes de los órganos pélvicos. Durante la ecografía transvaginal, solo podría sentir una leve presión pero sin ningún tipo de dolor.",
    },
    {
      q: "¿A partir de qué edad debo iniciar mis controles ginecológicos?",
      a: "Se recomienda iniciar los controles ginecológicos a partir de los 21 años, o dentro de los 3 años posteriores al inicio de la actividad sexual, lo que ocurra primero. Sin embargo, ante cualquier síntoma o preocupación, puede consultar en cualquier momento.",
    },
    {
      q: "¿Qué es el Papanicolau y por qué es importante?",
      a: "El Papanicolau es una prueba de tamizaje que detecta células anormales en el cuello uterino antes de que se conviertan en cáncer. Es la herramienta más efectiva para la prevención del cáncer cervical. Se recomienda realizarlo anualmente a todas las mujeres sexualmente activas.",
    },
    {
      q: "¿Cómo puedo prepararme para mi primera cita ginecológica?",
      a: "Para tu primera cita, te recomendamos: anotar tus dudas, conocer tu historial menstrual (fecha de última menstruación, regularidad), traer exámenes anteriores si los tienes, no tener relaciones sexuales 48 horas antes, y venir con la vejiga llena si se realizará ecografía.",
    },
    {
      q: "¿Qué servicios ofrecen para mujeres embarazadas?",
      a: "Ofrecemos ecografías obstétricas en 2D, 3D y 4D para el control del desarrollo fetal, Doppler fetal para evaluar el flujo sanguíneo, control prenatal completo, y seguimiento del embarazo en todas sus etapas. También brindamos asesoría sobre nutrición y preparación para el parto.",
    },
    {
      q: "¿Aceptan seguros médicos?",
      a: "Sí, trabajamos con los principales seguros médicos. Para mayor información sobre cobertura y convenios, puedes contactarnos por WhatsApp o llamarnos directamente. Nuestro equipo administrativo te brindará toda la información necesaria.",
    },
    {
      q: "¿Cuánto tiempo tardan los resultados de los exámenes?",
      a: "Los tiempos varían según el tipo de examen: Papanicolau 48 horas, biopsias 5-7 días hábiles, ecografías resultados inmediatos, exámenes de laboratorio 24-72 horas. Entregamos los resultados en el consultorio o los enviamos por correo electrónico según tu preferencia.",
    },
  ],
};

// ─── Sanity API Helper ────────────────────────────────────────────────────────

interface SanityMutationResponse {
  transactionId?: string;
  results?: Array<{ id: string; _id?: string }>;
  message?: string;
}

async function mutateSanity(
  endpoint: string,
  token: string,
  mutations: Array<Record<string, unknown>>
): Promise<SanityMutationResponse> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Sanity API error ${res.status}: ${text}`
    );
  }

  return res.json();
}

// ─── POST Handler ─────────────────────────────────────────────────────────────

export async function POST() {
  const errors: string[] = [];

  // 1. Read env vars
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_READ_TOKEN;

  if (!projectId) {
    return NextResponse.json(
      { success: false, error: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID env var" },
      { status: 500 }
    );
  }
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Missing SANITY_API_READ_TOKEN env var" },
      { status: 500 }
    );
  }

  const endpoint = `https://${projectId}.api.sanity.io/v2025-01-01/data/mutate/${dataset}`;

  const counts = {
    siteSettings: 0,
    categories: 0,
    services: 0,
    testimonials: 0,
    mentorships: 0,
    facilities: 0,
    healthArticles: 0,
  };

  try {
    // ── Batch 1: siteSettings (createOrReplace) + categories (create) ──
    const batch1Mutations: Array<Record<string, unknown>> = [
      { createOrReplace: siteSettings },
      ...categories.map((cat) => ({ create: cat })),
    ];

    const batch1Result = await mutateSanity(endpoint, token, batch1Mutations);
    counts.siteSettings = 1;
    counts.categories = categories.length;

    // Extract category IDs from the response results.
    // batch1 has 1 createOrReplace + 4 creates = 5 results.
    // Results[0] is siteSettings, Results[1..4] are the 4 categories.
    const categoryIds: string[] = [];
    if (batch1Result.results && batch1Result.results.length >= 5) {
      for (let i = 1; i <= 4; i++) {
        const r = batch1Result.results[i];
        categoryIds.push(r._id || r.id || "");
      }
    } else if (batch1Result.results) {
      // Fallback: try to get IDs from whatever results we have
      for (let i = 1; i < batch1Result.results.length; i++) {
        const r = batch1Result.results[i];
        if (r._id || r.id) categoryIds.push(r._id || r.id);
      }
    }

    if (categoryIds.length < 4) {
      // Attempt to proceed with empty refs — the mutations will still be sent
      errors.push(
        `Warning: Could not extract all category IDs from batch 1 response. Got ${categoryIds.length}/4. Services may have broken references.`
      );
      // Pad with empty strings if needed
      while (categoryIds.length < 4) {
        categoryIds.push("");
      }
    }

    // ── Batch 2: services, testimonials, mentorships, facilities, healthArticles ──
    const services = buildServices(categoryIds);

    const batch2Mutations: Array<Record<string, unknown>> = [
      ...services.map((svc) => ({ create: svc })),
      ...testimonials.map((t) => ({ create: t })),
      ...mentorships.map((m) => ({ create: m })),
      ...facilities.map((f) => ({ create: f })),
      ...healthArticles.map((a) => ({ create: a })),
    ];

    // Sanity allows up to ~50 mutations per call. Our total is 16+3+3+2+6=30, safe.
    const batch2Result = await mutateSanity(endpoint, token, batch2Mutations);

    counts.services = services.length;
    counts.testimonials = testimonials.length;
    counts.mentorships = mentorships.length;
    counts.facilities = facilities.length;
    counts.healthArticles = healthArticles.length;

    return NextResponse.json({
      success: true,
      transactionIds: [
        batch1Result.transactionId,
        batch2Result.transactionId,
      ].filter(Boolean),
      created: counts,
      errors,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errors.push(message);
    return NextResponse.json(
      {
        success: false,
        created: counts,
        errors,
      },
      { status: 500 }
    );
  }
}