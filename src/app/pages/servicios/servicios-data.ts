export interface ServiceSection {
    title: string;
    content: string;
    items?: string[];
}

export interface ServiceInfo {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    pointsTitle: string;
    points: string[];
    extraSections?: ServiceSection[];
}

export const SERVICES_DATA: ServiceInfo[] = [
    {
        id: 'cirugia-general',
        category: 'CIRUGÍA GENERAL',
        title: 'Cirugía general',
        description: 'El servicio de cirugía general de la Clínica Alelí te ofrece servicios de cirugía enfocados en intervenciones de alta complejidad y los principales procedimientos quirúrgicos que nuestro equipo de profesionales realiza.',
        image: 'assets/images/BLOG/imagen1.png',
        pointsTitle: 'LA MEJOR ATENCIÓN QUIRÚRGICA',
        points: [
            'Cirugía laparoscópica para tratar estas condiciones de manera efectiva',
            'Cirugías menores como tratamiento de hemorroides, fístulas o abscesos.',
            'Cirugías de alta complejidad para tratar distintas patologías.'
        ],
        extraSections: [
            {
                title: 'VENTAJAS DE LA CIRUGÍA LAPAROSCÓPICA',
                content: 'La cirugía laparoscópica ha revolucionado el campo de la medicina quirúrgica gracias a sus múltiples beneficios. En Clínica Alelí, utilizamos las técnicas más modernas para garantizar una recuperación rápida y segura.'
            },
            {
                title: 'Rápida Recuperación',
                content: 'Una de las mayores ventajas de la cirugía laparoscópica es el tiempo reducido de recuperación. A diferencia de las cirugías tradicionales, permite a los pacientes retornar a sus actividades diarias en menos tiempo.'
            },
            {
                title: 'Mínima Invasión',
                content: 'La laparoscopía es una técnica mínimamente invasiva que utiliza herramientas especializadas y una cámara de alta definición para realizar procedimientos con la mayor precisión posible.'
            },
            {
                title: 'Mínimo Dolor',
                content: 'Gracias al tamaño reducido de las incisiones y la delicadeza del procedimiento, los pacientes suelen experimentar mucho menos dolor en comparación con las cirugías convencionales.'
            }
        ]
    },
    {
        id: 'ginecologia-y-obstetricia',
        category: 'MEDICINA INTEGRAL',
        title: 'Ginecología y obstetricia',
        description: 'El servicio de ginecología y obstetricia de la Clínica Alelí ofrece atención de las mujeres durante el embarazo y el parto, y en el diagnóstico y tratamiento de enfermedades de los órganos reproductivos femeninos',
        image: 'assets/images/BLOG/imagen2.png',
        pointsTitle: 'ATIÉNDETE CON NOSOTROS',
        points: [
            'Tratamientos para trastornos menstruales, síndrome premenstrual y menopausia.',
            'Asesoramiento especializado en salud reproductiva y planificación familiar.',
            'Atención integral durante el embarazo, desde el inicio hasta el postparto.'
        ]
    },
    {
        id: 'pediatria',
        category: 'SERVICIO PEDIATRICO',
        title: 'Atención Integral y Especializada en Pediatría',
        description: 'El servicio de pediatría de la Clínica Alelí está dedicado a ofrecer una atención integral y especializada para los más pequeños.',
        image: 'assets/images/BLOG/imagen3.png',
        pointsTitle: 'TEN LA ATENCIÓN PARA TU BEBÉ',
        points: [
            'Cuidado integral y personalizado para tu hijo desde su nacimiento.',
            'Consulta de control para un crecimiento y desarrollo saludable.',
            'Diagnóstico temprano y tratamiento adecuado de problemas de salud.'
        ],
        extraSections: [
            {
                title: 'NUTRICIÓN PEDIÁTRICA DESDE EL NACIMIENTO',
                content: 'Durante los primeros años, el cuerpo y el cerebro atraviesan etapas críticas de formación que requieren un aporte adecuado de nutrientes. Esto no solo fortalece el sistema inmunológico, sino que también establece las bases para prevenir enfermedades crónicas en la adultez.'
            },
            {
                title: 'CUIDADOS PROFESIONALES PARA TUS NIÑOS',
                content: 'Los cuidados profesionales para tus niños son una de las prioridades más importantes como padres y médicos. Estos chequeos son fundamentales no solo para detectar posibles problemas de salud, sino también para fomentar una relación de confianza.',
                items: [
                    'Importancia de los chequeos médicos: Evaluación del crecimiento y desarrollo.',
                    'Vacunación: Administración de vacunas esenciales que protegen contra enfermedades graves.',
                    'Cuándo comenzar: Es recomendable llevar a los bebés a su primera cita dentro de las primeras semanas.',
                    'Signos de alerta: Fiebre persistente, cambios en el apetito o dificultad para respirar.'
                ]
            }
        ]
    },
    {
        id: 'psicologia-clinica',
        category: 'MEDICINA GENERAL',
        title: 'Psicología Clínica',
        description: 'En Clínica Alelí te ofrecemos servicios de Psicología Clínica para ayudarte a superar dificultades emocionales y psicológicas. Nuestro equipo de psicólogos brinda apoyo en trastornos como ansiedad, depresión, estrés, y problemas de relación, utilizando enfoques terapéuticos adaptados a tus necesidades.',
        image: 'assets/images/BLOG/imagen4.png',
        pointsTitle: 'PSICOLOGÍA CLÍNICA',
        points: [
            'Terapias personalizadas para mejorar tu bienestar emocional.',
            'Apoyo en el manejo de trastornos de la conducta y problemas familiares.',
            'Técnicas terapéuticas modernas para el desarrollo personal y emocional.'
        ],
        extraSections: [
            {
                title: 'LA IMPORTANCIA DE LA SALUD MENTAL',
                content: '¿Cuándo consultar a un psicólogo? Es común que las personas enfrenten desafíos emocionales en algún momento de sus vidas. Sin embargo, hay ciertas señales que no debes ignorar.'
            },
            {
                title: 'Señales de que Necesitas Atención Psicológica',
                content: 'Si experimentas alguno de estos síntomas, puede ser el momento de buscar apoyo profesional:',
                items: [
                    'Ansiedad persistente o preocupación constante.',
                    'Depresión o tristeza prolongada que afecta tu día a día.',
                    'Estrés crónico y dificultades para dormir.',
                    'Problemas de relación o conflictos recurrentes.'
                ]
            },
            {
                title: 'Beneficios de Consultar a un Psicólogo',
                content: 'Un psicólogo no solo te ayuda a manejar sus problemas actuales, sino que también te brinda herramientas para prevenir futuros desequilibrios.',
                items: [
                    'Mejorar tu capacidad para resolver conflictos.',
                    'Identificar patrones de pensamiento que afectan tu bienestar.',
                    'Aprender a gestionar emociones como la ira o el miedo.'
                ]
            }
        ]
    },
    {
        id: 'otorrinolaringologia',
        category: 'CIRUGÍA GENERAL',
        title: 'Otorrinolaringología',
        description: 'En Clínica Alelí, nuestro servicio de Otorrinolaringología está especializado en el diagnóstico y tratamiento de enfermedades del oído, nariz y garganta. Contamos con un equipo de expertos que atiende condiciones como infecciones respiratorias, pérdida auditiva, alergias, problemas de voz y trastornos del equilibrio.',
        image: 'assets/images/BLOG/imagen5.png',
        pointsTitle: 'ATIÉNDETE CON NOSOTROS',
        points: [
            'Tratamiento experto para problemas de oído, nariz y garganta.',
            'Atención temprana en problemas respiratorios en niños, como adenoides y amígdalas.',
            'Atención para infecciones recurrentes de garganta, oídos y senos paranasales.'
        ]
    },
    {
        id: 'cardiologia',
        category: 'MEDICINA GENERAL',
        title: 'Cardiología',
        description: 'En Clínica Alelí, nuestro servicio de Cardiología está diseñado para ofrecer atención integral y especializada en el diagnóstico, tratamiento y prevención de enfermedades cardíacas. Contamos con un equipo de cardiólogos altamente capacitados que utilizan tecnología de vanguardia para ofrecer un cuidado completo a nuestros pacientes.',
        image: 'assets/images/BLOG/imagen6.png',
        pointsTitle: 'ATIÉNDETE CON NOSOTROS',
        points: [
            'Consultas regulares para mantener tu salud cardiovascular en su mejor estado.',
            'Diagnóstico preciso mediante pruebas como electrocardiogramas y ecocardiogramas.',
            'Atención experta para pacientes con antecedentes familiares de enfermedades cardíacas.'
        ],
        extraSections: [
            {
                title: 'CUIDA TU CORAZÓN: TIPS PARA UNA VIDA SALUDABLE',
                content: 'La alimentación juega un papel fundamental en la salud del corazón. Consumir una dieta equilibrada y rica en nutrientes puede ayudar a prevenir enfermedades cardíacas.',
                items: [
                    'Mantén una Dieta Saludable: Rico en antioxidantes y fibra.',
                    'Abandona el Tabaco: Reduce significativamente el riesgo de infartos.',
                    'Realiza Ejercicio Físico: Al menos 150 minutos de ejercicio moderado a la semana.',
                    'Controla la Diabetes e Hipertensión: Vital para prevenir complicaciones mayores.'
                ]
            }
        ]
    },
    {
        id: 'cirugia-coloproctologia',
        category: 'CIRUGÍA GENERAL',
        title: 'Cirugía coloproctología',
        description: 'El servicio de cirugía coloproctología de la Clínica Alelí está dedicado al diagnóstico y tratamiento quirúrgico de enfermedades intestinales y del colon.',
        image: 'assets/images/BLOG/imagen7.png',
        pointsTitle: 'ATIÉNDETE CON NOSOTROS DIAGNÓSTICO Y TRATAMIENTO',
        points: [
            'Cirugía laparoscópica para tratar estas condiciones de manera efectiva',
            'Cirugías menores como tratamiento de hemorroides, fístulas o abscesos.',
            'Cirugías de alta complejidad para tratar distintas patologías.'
        ]
    },
    {
        id: 'medicina-familiar',
        category: 'MEDICINA GENERAL',
        title: 'Medicina Familiar',
        description: 'En Clínica Alelí, nuestro servicio de Medicina Familiar está orientado a brindar atención médica integral y continua a toda la familia, desde los más pequeños hasta los adultos mayores. Nuestros médicos de familia son profesionales altamente capacitados que se enfocan en la prevención, diagnóstico y tratamiento de diversas condiciones de salud.',
        image: 'assets/images/BLOG/imagen8.png',
        pointsTitle: 'ATIÉNDETE CON NOSOTROS MEDICINA FAMILIAR',
        points: [
            'Cuidado integral y personalizado para toda la familia, desde niños hasta adultos mayores.',
            'Prevención y control de enfermedades crónicas como diabetes, hipertensión y colesterol alto.',
            'Diagnóstico y tratamiento de enfermedades comunes como resfriados, infecciones y dolores.'
        ],
        extraSections: [
            {
                title: 'LA IMPORTANCIA VITAL DE LAS VISITAS MÉDICAS',
                content: 'Saber que estamos siendo monitoreados por profesionales puede brindarnos una tranquilidad invaluable. Las revisiones periódicas permiten detectar problemas antes de que sean graves.',
                items: [
                    'Tranquilidad mental: Monitoreo constante de tu salud.',
                    'Promoción de hábitos saludables: Orientación sobre nutrición and actividad física.',
                    'Preparación: Haz una lista de preguntas y lleva tus registros médicos anteriores.'
                ]
            },
            {
                title: 'Preguntas Frecuentes',
                content: 'Resolvemos tus dudas sobre las revisiones médicas.',
                items: [
                    '¿Con qué frecuencia? Es recomendable una revisión anual.',
                    '¿Es necesario análisis de sangre? Depende de tu historial y edad.',
                    '¿Pueden prevenir todas las enfermedades? Aumentan mucho las posibilidades de detección temprana.'
                ]
            }
        ]
    },
    {
        id: 'traumatologia-y-ortopedia',
        category: 'MEDICINA INTEGRAL',
        title: 'Traumatología y Ortopedia',
        description: 'El servicio de traumatología y ortopedia de la Clínica Alelí te ofrece distintos servicios especializados en prevenir, diagnosticar y tratar enfermedades o lesiones en el sistema musculoesquelético',
        image: 'assets/images/BLOG/imagen9.png',
        pointsTitle: 'ATIÉNDETE CON NOSOTROS MEDICINA FAMILIAR',
        points: [
            'Evaluación y tratamiento para dolores crónicos en huesos, músculos y articulaciones.',
            'Prevención y tratamiento de deformidades óseas y malformaciones congénitas.',
            'Equipo de expertos en ortopedia y traumatología comprometidos con tu salud.'
        ],
        extraSections: [
            {
                title: 'FISIOTERAPIA: EL CAMINO HACIA LA RECUPERACIÓN',
                content: 'La fisioterapia es una de las disciplinas médicas más efectivas y esenciales para tratar una amplia variedad de afecciones musculoesqueléticas y mejorar la calidad de vida de los pacientes. Nuestro objetivo es proporcionarte un tratamiento integral.'
            },
            {
                title: 'Beneficios de la Fisioterapia en la Clínica Alelí',
                content: 'La fisioterapia no solo es útil para tratar afecciones existentes, sino que también es clave en la prevención de futuras lesiones.',
                items: [
                    'Alivio del dolor mediante técnicas manuales y electroterapia.',
                    'Recuperación de la movilidad con ejercicios guiados.',
                    'Fortalecimiento muscular para evitar nuevas lesiones.',
                    'Rehabilitación postquirúrgica efectiva.'
                ]
            }
        ]
    },
    {
        id: 'laboratorios-clinicos',
        category: 'DIAGNÓSTICO',
        title: 'Laboratorios Clínicos',
        description: 'Realizarse laboratorios clínicos con regularidad es una inversión en tu bienestar y calidad de vida. Contamos con tecnología avanzada para resultados confiables.',
        image: 'assets/images/BLOG/imagen1.png',
        pointsTitle: 'BENEFICIOS DE LOS ANÁLISIS',
        points: [
            'Detección temprana de enfermedades antes de que presenten síntomas.',
            'Monitoreo continuo de condiciones crónicas.',
            'Resultados precisos con equipamiento de alta tecnología.'
        ],
        extraSections: [
            {
                title: 'BENEFICIOS DE REALIZARSE LABORATORIOS CON REGULARIDAD',
                content: 'Cuidar de nuestra salud es una responsabilidad que no debemos tomar a la ligera. Los análisis permiten diagnosticar, prevenir y monitorear diversas condiciones médicas.',
                items: [
                    'Química Sanguínea: Evalúa niveles de glucosa, lípidos y electrolitos.',
                    'Hematología: Hemograma completo para detectar anemias e infecciones.',
                    'Inmunología y Serología: Detecta anticuerpos y patologías virales.',
                    'Marcadores Tumorales: Ayudan en la detección temprana de ciertos tipos de cáncer.'
                ]
            }
        ]
    }
];
