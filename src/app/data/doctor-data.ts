export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    image: string;
    imageUrl?: string;
    category: string;
    subCategory?: string;
    contact?: string;
    email?: string;
    bio?: string;
    services?: string[];
    experience?: string[];
    education?: string[];
    schedules?: string;
    rating?: number;
    website?: string;
}

export const DOCTORS: Doctor[] = [
    {
        id: 'pablo-chica',
        name: 'Dr. Pablo Adrian Chica Alvarracin',
        specialty: 'Cirujano general y Laparoscópico',
        image: 'assets/images/DR.-PABLO-ADRIAN-CHICA-ALVARRACIN.jpg',
        imageUrl: 'assets/images/ESPECIALIDADES/DR_PABLO_ADRIA_CHICA_ALVARACIN.png',
        category: 'Departamento de Cirugía',
        subCategory: 'Cirugía Laparoscópica',
        contact: '0995812026',
        email: 'Pchicaaczs5@gmail.com',
        bio: 'El Dr. Chica Alvarracin comprende la importancia de brindar un cuidado centrado en el paciente. Trabaja en estrecha colaboración con cada paciente para desarrollar planes de tratamiento personalizados y brindar apoyo durante todo el proceso quirúrgico y de recuperación. Su empatía y comunicación efectiva crean una relación médico-paciente sólida y confiable. Su habilidad en técnicas avanzadas, su enfoque centrado en el paciente y su dedicación a la excelencia hacen que sea la elección perfecta para brindarte atención quirúrgica de alta calidad y resultados exitosos.',
        services: [
            'Cirugía de la vesícula',
            'Cirugía de Apéndice',
            'Hernias abdominales',
            'Cirugía de emergencia',
            'Manejo inicial del politrauma',
            'Cirugía menor (lipomas)'
        ],
        experience: [
            'Más de 10 años de experiencia en Cirugía Laparoscópica Avanzada.',
            'Médico Tratante en Centros de Trauma Nivel I.',
            'Especialista en Cirugía de Emergencias y Control de Daños.'
        ],
        education: [
            'Especialidad en Cirugía General y Laparoscopía - Universidad de Cuenca.',
            'Diplomado en Cirugía Mínimamente Invasiva.',
            'Certificaciones internacionales en Soporte Vital Avanzado en Trauma (ATLS).'
        ],
        schedules: 'Lunes a Viernes: 08:00 - 18:00',
        rating: 4.9
    },
    {
        id: 'ligia-naranjo',
        name: 'Dra. Ligia Naranjo Bernal',
        specialty: 'Anestesiología',
        image: 'assets/images/ESPECIALIDADES/DRA_LIGIA_NARANJO_BERNAL.png',
        category: 'Departamento de Cirugía',
        subCategory: 'Anestesiología',
        contact: '0999834994',
        email: 'ligianaranjob@gmail.com',
        bio: 'La anestesiología es esencial para garantizar que los pacientes estén cómodos y seguros durante cirugías y procedimientos médicos. La Dra. Ligia Naranjo Bernal se especializa en adaptar la anestesia a las necesidades individuales de cada paciente, garantizando un control preciso de la sedación y minimizando cualquier riesgo. La Dra. Ligia Naranjo Bernal como tu especialista en anestesiología, estás eligiendo a una profesional comprometida con tu comodidad y seguridad durante procedimientos médicos.',
        services: [
            'Valoración de pacientes en el preoperatorio y preparación para la intervención quirúrgica',
            'Cuidado del paciente adulto y pediátrico en el intra y post operatorio',
            'Manejo del dolor perioperatorio',
            'Bloqueos regionales',
            'Anestesia Total Intravenosa',
            'Reanimación',
            'MBA con Especialización en Salud'
        ]
    },
    {
        id: 'catherine-cabrera',
        name: 'Dra. Catherine Cabrera',
        specialty: 'Coloproctología, Cirugía General y Laparoscópica',
        image: 'assets/images/ESPECIALIDADES/DRA_CATHERINE_CABRERA.png',
        category: 'Departamento de Cirugía',
        subCategory: 'Cirugía Coloproctología',
        contact: '093 921 5849',
        email: 'catherinecabreraordonez@gmail.com',
        bio: 'La Dra. Catherine Cabrera es una renombrada especialista en coloproctología, cirugía general y laparoscópica, que ha demostrado un compromiso excepcional con la salud digestiva. Su experiencia en estas áreas la convierte en una líder confiable en el diagnóstico y tratamiento de afecciones gastrointestinales. Su experiencia en múltiples disciplinas médicas, su compromiso con la excelencia y su enfoque centrado en el paciente la convierten en una elección confiable para el cuidado de tu salud digestiva.',
        services: [
            'Atención y prevención de enfermedades clínico - quirúrgicas del colon, recto y ano.',
            'Cirugías de emergencia: apéndice vesícula hernias',
            'Cirugías Hemorroides',
            'Cirugías Fisura Anal',
            'Cirugías Fistula Perianal',
            'Cirugías Abscesos perianales',
            'Estreñimiento crónico',
            'Colitis',
            'Enfermedades de transmisión sexual',
            'Colonoscopia'
        ]
    },
    {
        id: 'ana-gonzales',
        name: 'Dra. Ana Patricia Gonzales',
        specialty: 'Nefróloga',
        image: 'assets/images/ESPECIALIDADES/DR_ANA_PATRICIA_GONZALES.png',
        category: 'Departamento Medicina Interna',
        subCategory: 'Nefrología',
        bio: 'Dedicada al cuidado integral de la salud renal, la Dra. Ana Patricia Gonzales ofrece diagnóstico y tratamiento para pacientes con patologías de los riñones. Su enfoque se centra en la prevención y el manejo oportuno de enfermedades renales críticas.',
        services: ['Nefrología']
    },
    {
        id: 'ana-jimbo',
        name: 'Dra. Ana Cristina Jimbo J.',
        specialty: 'Pediatría - Nutrición Pediátrica',
        image: 'assets/images/ESPECIALIDADES/DRA_ANA_CRISTINA_JIMBO_J.png',
        category: 'Departamento de Pediatría',
        subCategory: 'Pediatría',
        contact: '0994325771',
        bio: 'La Dra. Jimbo entiende las necesidades únicas de sus pacientes jóvenes y se compromete a brindar atención personalizada y compasiva. Desde la infancia hasta la adolescencia, su enfoque está en el diagnóstico y tratamiento de una variedad de condiciones pediátricas, asegurando que cada niño reciba la atención médica adecuada. su experiencia en atención pediátrica, nutrición y prevención hace que sea la elección perfecta para brindar el cuidado médico que tus hijos merecen.',
        services: [
            'Control de salud y desarrollo',
            'Orientación Nutricional',
            'Diagnóstico y tratamiento de enfermedades pediátricas',
            'Atención de Urgencia',
            'Recepción de recién nacido',
            'Asesoramiento a los padres para promover un crecimiento saludable'
        ]
    },
    {
        id: 'katy-yunga',
        name: 'Lcda. Katy Yunga Q.',
        specialty: 'Fisioterapia',
        image: 'assets/images/ESPECIALIDADES/LCDA_KATY_YUNGA_Q.png',
        category: 'Departamento Medicina Interna',
        subCategory: 'Fisioterapia',
        contact: '098 328 2160',
        bio: 'La Lcda. Katy Yunga Q. es mucho más que una especialista en fisioterapia; es una agente de cambio que transforma vidas a través del movimiento. Su enfoque integral, su pasión por la recuperación y su compromiso con la excelencia la convierten en una profesional destacada en su campo. Si buscas un experto en fisioterapia que te ayude a recuperar tu movimiento y vitalidad, no busques más: la Lcda. Yunga Q. es la respuesta.',
        services: [
            'Evaluacion, diagnósticos y tratamiento fisioterapeutico',
            'Fisioterapia traumatológica (post operatorios, patologías osteomusculares, síndromes dolorosos)',
            'Fisioterapia neurológica',
            'Fisioterapia respiratoria y cardíaca',
            'Fisioterapia oncológica',
            'Fisioterapia deportiva',
            'Fisioterapia gerontológica',
            'Fisioterapia pediátrica'
        ]
    },
    {
        id: 'alvaro-beltran',
        name: 'Dr. Alvaro Leonardo Beltrán Vidal',
        specialty: 'Ginecología y Obstetricia',
        image: 'assets/images/ESPECIALIDADES/DR_ALVARO_LEONARDO_BELTRÁN_VIDAL.png',
        category: 'Departamento de Ginecología y Obstetricia',
        subCategory: 'Ginecología y Obstetricia',
        contact: '098-465-5508',
        bio: 'El Dr. Beltrán realiza atención del parto normal y distócico, cesárea, histerectomía abdominal y vaginal, miomectomía, cistectomías ováricas, ooforectomías abierta y laparoscópica, esterilización quirúrgica, resección de tumores benignos de mama, corrección de malformaciones uterinas, vaginales y vulvares, resección histeroscópica de pólipos endometriales y ciertos tipos de miomas submucosos, legrado uterino instrumental diagnóstico y terapéutico.',
        services: [
            'Planificación familiar y anticoncepción',
            'Detección oportuna y prevención de cáncer de mama, útero y ovarios',
            'Control prenatal del embarazo normal y de alto riesgo',
            'Tratamiento y prevención de infecciones de transmisión sexual',
            'Tratamiento de hemorragias uterinas anormales',
            'Tratamiento de trastornos endocrino-metabólicos',
            'Tratamiento de tumores y patologías benignas de útero, mama y ovario',
            'Valoración de la pareja infértil',
            'Tratamiento de fertilidad de baja complejidad',
            'Trastornos inflamatorios e infecciosos ginecológicos',
            'Prevención y tratamiento de aborto',
            'Colposcopía'
        ]
    },
    {
        id: 'deniss-calderon',
        name: 'Dr. Deniss Calderón Aleman',
        specialty: 'Otorrinolaringología - Cirugía estética',
        image: 'assets/images/ESPECIALIDADES/DR_DENISS_CALDERON_ALEMAN.png',
        category: 'Departamento de Otorrinolaringología',
        contact: '098 390 9933',
        email: 'orl.dcalderon@gmail.com',
        website: 'https://drdenisscalderon.com/',
        bio: 'Médico, Cirujano plástico estético en Cuenca - Ecuador, con trayectoria nacional e internacional. Su experiencia ha permitido lograr satisfacer las necesidades y expectativas de clientes que confían en su trabajo y equipo de trabajo. Trabajamos con el objetivo de mejorar la calidad de vida nuestros pacientes y brindarles una atención médica personalizada de alta calidad y calidez. El Doctor Deniss Calderón se especializa en rinoplastia funcional y estética con métodos innovadores poco de rápida recuperación.',
        services: [
            'Rinoplastia Ultrasónica',
            'Cirugía funcional y estética nasal',
            'Cirugías endoscópica y microscópica de oído',
            'Microcirugía laríngea',
            'Cirugía de amígdalas',
            'Cirugía de adenoides',
            'Cirugía del Ronquido',
            'Cirugía Endoscópica de Nariz y Senos paranasales'
        ]
    },
    {
        id: 'fernando-sigua',
        name: 'Dr. Fernando Sigua Espinoza',
        specialty: 'Medicina Familiar - Cuidados Paliativos',
        image: 'assets/images/ESPECIALIDADES/DR_FERNANDO_SIGUA_ESPINOZA.png',
        category: 'Departamento Medicina Interna',
        subCategory: 'Medicina Familiar',
        contact: '0985235143',
        email: 'siguaespinoza@yahoo.es',
        bio: 'El Dr. Fernando Sigua Espinoza es un destacado especialista en medicina familiar y un maestro en el arte de los cuidados paliativos. Con una sólida formación y un compromiso inquebrantable con el bienestar de sus pacientes, el Dr. Sigua es un líder en la atención médica integral y el alivio del sufrimiento. Su compasión y su enfoque integral lo convierten en un médico confiable y un defensor de la calidad de vida.',
        services: [
            'Atención integral preventiva por etapas de vida',
            'Manejo integral de dolor y cuidados paliativos',
            'Atención domiciliaria las 24 horas',
            'Cuidados Paliativos oncológicos y no oncológicos'
        ]
    },
    {
        id: 'lucila-alvarado',
        name: 'Dra. Lucila Alvarado Palacios',
        specialty: 'Pediatría',
        image: 'assets/images/ESPECIALIDADES/DRA_LUCILA_ALVARADO_PALACIOS.png',
        category: 'Departamento de Pediatría',
        subCategory: 'Pediatría',
        contact: '0998148736',
        email: 'ludlcarmen@gmail.com',
        bio: 'La Dra. Alvarado Palacios no solo se enfoca en la resolución de enfermedades y problemas de salud en niños, sino que también aboga por un enfoque integral del cuidado pediátrico. Reconoce la importancia de no solo tratar los síntomas, sino de comprender y abordar las causas subyacentes. Su enfoque holístico garantiza que cada niño reciba la atención necesaria para su desarrollo físico y emocional óptimo.',
        services: [
            'Tratamiento de enfermedades en Recién Nacidos, Niños y Adolescentes',
            'Recepción neonatal en parto o cesárea',
            'Desarrollo y crecimiento infantil',
            'Puericultura',
            'Lactancia materna y nutrición'
        ]
    },
    {
        id: 'alvaro-bunay',
        name: 'Dr. Alvaro Buñay R.',
        specialty: 'Cardiología',
        image: 'assets/images/ESPECIALIDADES/DR_ALVARO_BUÑAY.png',
        category: 'Departamento Medicina Interna',
        subCategory: 'Cardiología',
        contact: '0984932129',
        email: 'redcardiosalud@gmail.com',
        bio: 'El Dr. Álvaro Buñay R. es un destacado especialista en cardiología dedicado a cuidar de la salud de tu corazón. Con una pasión inquebrantable por su campo y años de experiencia, el Dr. Buñay se ha convertido en un referente en el diagnóstico y tratamiento de enfermedades cardiovasculares. Cuando se trata de la salud de tu corazón, confiar en un experto como el Dr. Álvaro Buñay R. te brinda la tranquilidad que necesitas.',
        services: [
            'Hipertensión arterial e Insuficiencia cardíaca',
            'Enfermedad coronaria y Arritmias',
            'Prevención, diagnóstico y tratamiento de enfermedades cardiovasculares',
            'Riesgo cardiovascular y Aptitud física',
            'Electrocardiograma y Ecocardiograma',
            'Holter de 24 horas y Presurometría',
            'Ergometría'
        ]
    },
    {
        id: 'carlos-ivan-aguilar',
        name: 'Dr. Carlos Iván Aguilar',
        specialty: 'Cirugía General',
        image: 'assets/images/ESPECIALIDADES/DR_CARLOS_IVAN_AGUILAR_GAIBOR.png',
        category: 'Departamento de Cirugía',
        subCategory: 'Cirugía General',
        contact: '0987360991',
        email: 'caloaguilar@hotmail.com',
        bio: 'Cuando eliges al Dr. Carlos Iván Aguilar Gaibor como tu cirujano, estás confiando en un profesional altamente capacitado y experimentado. Su enfoque meticuloso, habilidades quirúrgicas excepcionales y compromiso con la seguridad del paciente te brindan la tranquilidad que necesitas al someterte a cualquier procedimiento quirúrgico.',
        services: [
            'Cirugía de vesícula biliar y apéndice',
            'Cirugía de tiroides',
            'Hernias abdominales, inguinales, incisionales',
            'Cirugía de cuidado agudo (emergencias)',
            'Manejo de paciente politraumatizado',
            'Manejo de heridas, suturas',
            'Cirugía menor (resección de lipomas, nevus, quistes, etc.)'
        ]
    },
    {
        id: 'vicente-velez',
        name: 'Dr. Vicente Velez P.',
        specialty: 'Pediatría',
        image: 'assets/images/ESPECIALIDADES/DR_VICENTE_VELEZ_P.png',
        category: 'Departamento de Pediatría',
        subCategory: 'Pediatría',
        contact: '099 474 8320',
        email: 'vicentevelezp@hotmail.com',
        bio: 'El Dr. Vicente Vélez P. es un reconocido especialista en pediatría que ha dedicado su carrera a la atención médica de los más pequeños. Con una sólida formación académica y años de experiencia, el Dr. Vélez se ha convertido en un referente en el cuidado de la salud infantil. Su pasión por la pediatría y su compromiso con la prevención lo hacen la elección perfecta.',
        services: ['Pediatría integral', 'Control de crecimiento', 'Prevención de enfermedades infantiles']
    },
    {
        id: 'fabricio-lata',
        name: 'Dr. Fabricio Lata Cando',
        specialty: 'Medicina Interna',
        image: 'assets/images/ESPECIALIDADES/DR_FABRICIO_LATA_CANDO.png',
        category: 'Departamento Medicina Interna',
        subCategory: 'Medicina Interna',
        contact: '0997730375',
        email: 'faxalata@gmail.com',
        bio: 'Nuestro experto médico está listo para brindarle atención integral y personalizada. Se enfoca en el diagnóstico y tratamiento de enfermedades en adultos. Abarca diversas áreas medicas como diabetes, tiroides, hipertensión arterial, problemas de colesterol, enfermedades pulmonares, infecciones, entre otras.',
        services: ['Medicina Interna', 'Control de enfermedades crónicas', 'Diagnóstico integral de adultos']
    },
    {
        id: 'carlos-palacios',
        name: 'Dr. Carlos Palacios Reinoso',
        specialty: 'Anestesiología',
        image: 'assets/images/ESPECIALIDADES/DR_CARLOS_PALACIOS_REINOSO.png',
        category: 'Departamento de Cirugía',
        subCategory: 'Anestesiología',
        contact: '0997112428',
        email: 'cspalaciosr@hotmail.com',
        bio: 'El Dr. Carlos Palacios Reinoso es un reconocido especialista en anestesiología con una dedicación excepcional a la comodidad y seguridad del paciente. Su experiencia abarca anestesia regional y anestesia intravenosa total (TIVA), lo que lo convierte en un líder en el campo de la anestesia avanzada.',
        services: [
            'Valoración preoperatoria y cuidados postoperatorios',
            'Anestesia regional',
            'Anestesia intravenosa total (TIVA)',
            'Terapia del dolor'
        ]
    },
    {
        id: 'diana-moreno',
        name: 'Dra. Diana Moreno',
        specialty: 'Traumatología y Ortopedia',
        image: 'assets/images/ESPECIALIDADES/DRA_DIANA_MORENO.png',
        category: 'Departamento de Cirugía',
        subCategory: 'Traumatología y Ortopedia',
        email: 'artrosaludcuenca@gmail.com',
        bio: 'La Dra. Moreno utiliza técnicas modernas para garantizar resultados óptimos. Su enfoque en la medicina basada en evidencia le permite brindar tratamientos innovadores y eficaces, desde lesiones deportivas hasta afecciones degenerativas. Tu salud y bienestar son su prioridad.',
        services: [
            'Diagnóstico y manejo de lesiones deportivas',
            'Artroscopia Hombro, Rodilla y Tobillo',
            'Factores de crecimiento PRP',
            'Trauma osteo-articular: fracturas, esguinces',
            'Manejo de enfermedad degenerativa: Osteoartrosis',
            'Reemplazo articular Hombro y Rodilla'
        ]
    }
];
