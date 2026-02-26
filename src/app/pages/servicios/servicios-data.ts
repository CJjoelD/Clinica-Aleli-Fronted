export interface ServiceInfo {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    pointsTitle: string;
    points: string[];
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
        ]
    },
    {
        id: 'ginecologia-y-obstetricia',
        category: 'MEDICINA INTEGRAL',
        title: 'Ginecología y obstetricia',
        description: 'El servicio de cirugía general de la Clínica Alelí ofrece atención de las mujeres durante el embarazo y el parto, y en el diagnóstico y tratamiento de enfermedades de los órganos reproductivos femeninos',
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
            'Cuidado integral and personalizado para tu hijo desde su nacimiento.',
            'Consulta de control para un crecimiento y desarrollo saludable.',
            'Diagnóstico temprano y tratamiento adecuado de problemas de salud.'
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
        ]
    },
    {
        id: 'traumatologia-y-ortopedia',
        category: 'MEDICINA INTEGRAL',
        title: 'Traumatología y Ortopedia',
        description: 'El servicio de cirugía general de la Clínica Alelí te ofrece distintos servicios especializados en prevenir, diagnosticar y tratar enfermedades o lesiones en el sistema musculoesquelético',
        image: 'assets/images/BLOG/imagen9.png',
        pointsTitle: 'ATIÉNDETE CON NOSOTROS MEDICINA FAMILIAR',
        points: [
            'Evaluación y tratamiento para dolores crónicos en huesos, músculos y articulaciones.',
            'Prevención y tratamiento de deformidades óseas y malformaciones congénitas.',
            'Equipo de expertos en ortopedia y traumatología comprometidos con tu salud.'
        ]
    }
];
