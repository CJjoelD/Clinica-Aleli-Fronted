import { Injectable, signal, effect } from '@angular/core';
import { PageConfig, SectionConfig } from '../models/cms.model';
import { SERVICES_DATA } from '../pages/servicios/servicios-data';

@Injectable({
    providedIn: 'root'
})
export class PaginaService {
    private readonly STORAGE_KEY = 'clinica_aleli_cms_config';
    private readonly VERSION_KEY = 'clinica_aleli_cms_version';
    private readonly CURRENT_VERSION = '5.0.0';

    // State
    pages = signal<PageConfig[]>([]);

    constructor() {
        this.checkVersionAndLoad();

        // Auto-save to localStorage whenever pages signal changes
        effect(() => {
            const data = JSON.stringify(this.pages());
            localStorage.setItem(this.STORAGE_KEY, data);
            console.log('CMS: Configuración guardada en localStorage');
        });

        // Sync between tabs
        window.addEventListener('storage', (e) => {
            if (e.key === this.STORAGE_KEY && e.newValue) {
                try {
                    console.log('CMS: Detectado cambio en otra pestaña, sincronizando...');
                    this.pages.set(JSON.parse(e.newValue));
                } catch (err) {
                    console.error('Error al sincronizar CMS entre pestañas', err);
                }
            }
        });
    }

    private checkVersionAndLoad() {
        const savedVersion = localStorage.getItem(this.VERSION_KEY);
        if (savedVersion !== this.CURRENT_VERSION) {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION);
        }
        this.loadInitialConfig();
    }

    private loadInitialConfig() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        const initialConfig = [
            this.getInitialInicioConfig(),
            this.getInitialServiciosConfig(),
            this.getInitialEspecialidadesConfig(),
            this.getInitialDirectorioConfig(),
            this.getInitialBlogConfig(),
            this.getInitialResultadosConfig(),
            this.getInitialNosotrosConfig(),
            this.getInitialContactoConfig(),
            this.getInitialInstalacionesConfig(),
            ...this.getInitialAllServicesDetails()
        ];

        if (saved) {
            try {
                const savedPages: PageConfig[] = JSON.parse(saved);
                const mergedPages = [...initialConfig];

                savedPages.forEach(savedPage => {
                    const index = mergedPages.findIndex(p => p.id === savedPage.id);
                    if (index !== -1) {
                        // Merged fix removed as it was overwriting IDs by position
                        // which corrupted data when adding/removing items.
                        // Now we trust the saved page content.

                        // Existing blog merge logic...
                        if (savedPage.id === 'blog') {
                            const initialArticulos = mergedPages[index].sections.find((s: SectionConfig) => s.id === 'articulos');
                            const savedArticulos = savedPage.sections.find((s: SectionConfig) => s.id === 'articulos');

                            if (initialArticulos && savedArticulos) {
                                initialArticulos.content.items.forEach((initialItem: any) => {
                                    if (!savedArticulos.content.items.find((savedItem: any) => savedItem.id === initialItem.id)) {
                                        savedArticulos.content.items.push(initialItem);
                                    }
                                });
                            }
                        }
                        mergedPages[index] = savedPage;
                    }
                });

                this.pages.set(mergedPages);
            } catch (e) {
                console.error('Error parsing saved CMS config', e);
                this.pages.set(initialConfig);
            }
        } else {
            this.pages.set(initialConfig);
        }
    }

    getInitialBlogConfig(): PageConfig {
        return {
            id: 'blog',
            title: 'Blog de Artículos',
            sections: [
                {
                    id: 'blog_header',
                    name: 'Cabecera Blog',
                    enabled: true,
                    content: {
                        label: 'BLOG',
                        title: 'ARTICULOS'
                    }
                },
                {
                    id: 'articulos',
                    name: 'Lista de Artículos',
                    enabled: true,
                    content: {
                        items: [
                            {
                                id: 'laboratorios-clinicos',
                                title: 'BENEFICIOS DE REALIZARSE LABORATORIOS CLÍNICOS CON REGULARIDAD',
                                excerpt: 'Cuidar de nuestra salud es una responsabilidad que no debemos tomar a la ligera y realizarse laboratorios con regularidad...',
                                imageUrl: 'assets/images/BLOG/imagen1.png',
                                link: 'laboratorios-clinicos'
                            },
                            {
                                id: 'cirugia-laparoscopica',
                                title: 'VENTAJAS DE LA CIRUGÍA LAPAROSCÓPICA',
                                excerpt: 'La cirugía laparoscópica ha revolucionado el campo de la medicina quirúrgica gracias a sus múltiples beneficios...',
                                imageUrl: 'assets/images/BLOG/imagen2.png',
                                link: 'cirugia-laparoscopica'
                            },
                            {
                                id: 'salud-mental',
                                title: 'LA IMPORTANCIA DE LA SALUD MENTAL: ¿CUÁNDO CONSULTAR A UN PSICÓLOGO?',
                                excerpt: 'En la actualidad, la importancia de la salud mental se ha convertido en un tema central para una vida plena...',
                                imageUrl: 'assets/images/BLOG/imagen3.png',
                                link: 'salud-mental'
                            },
                            {
                                id: 'nutricion-pediatrica',
                                title: 'LA IMPORTANCIA DE LA NUTRICIÓN PEDIÁTRICA DESDE EL NACIMIENTO',
                                excerpt: 'La nutrición pediátrica es un pilar fundamental para garantizar el crecimiento y desarrollo óptimo de los niños...',
                                imageUrl: 'assets/images/BLOG/imagen4.png',
                                link: 'nutricion-pediatrica'
                            },
                            {
                                id: 'fisioterapia',
                                title: 'FISIOTERAPIA: EL CAMINO HACIA LA RECUPERACIÓN Y EL BIENESTAR',
                                excerpt: 'La fisioterapia es una de las disciplinas más efectivas para tratar afecciones musculoesqueléticas...',
                                imageUrl: 'assets/images/BLOG/imagen5.png',
                                link: 'fisioterapia'
                            },
                            {
                                id: 'cuidados-ninos',
                                title: 'CUIDADOS PROFESIONALES PARA TUS NIÑOS',
                                excerpt: 'Los cuidados profesionales para tus niños son una de las prioridades más importantes como padres y médicos...',
                                imageUrl: 'assets/images/BLOG/imagen6.png',
                                link: 'cuidados-ninos'
                            },
                            {
                                id: 'cardiologia',
                                title: 'CUIDA TU CORAZÓN: TIPS DE CARDIOLOGÍA PARA UNA VIDA SALUDABLE',
                                excerpt: 'La salud del corazón es esencial para nuestro bienestar general. Un corazón sano nos permite vitalidad...',
                                imageUrl: 'assets/images/BLOG/imagen7.png',
                                link: 'cardiologia'
                            },
                            {
                                id: 'visitas-medicas',
                                title: 'LA IMPORTANCIA VITAL DE LAS VISITAS MÉDICAS REGULARES',
                                excerpt: 'En el ajetreo de la vida moderna, a menudo descuidamos lo más valioso: nuestra salud...',
                                imageUrl: 'assets/images/BLOG/imagen8.png',
                                link: 'visitas-medicas'
                            },
                            {
                                id: 'cirugia-estetica',
                                title: 'CIRUGÍA ESTÉTICA: UN VISTAZO DETALLADO A LA TRANSFORMACIÓN PERSONAL',
                                excerpt: 'Si estás considerando la cirugía estética para lograr una transformación personal, estás en el lugar adecuado...',
                                imageUrl: 'assets/images/BLOG/imagen9.png',
                                link: 'cirugia-estetica'
                            },
                            {
                                id: 'nutricion-saludable',
                                title: 'LA IMPORTANCIA DE LA NUTRICIÓN PARA UNA VIDA SALUDABLE',
                                excerpt: 'La nutrición es un pilar fundamental para mantener un estilo de vida saludable y lleno de energía...',
                                imageUrl: 'assets/images/Nutricion_saludable.png',
                                link: 'nutricion-saludable'
                            }
                        ]
                    }
                }
            ]
        };
    }

    getInitialNosotrosConfig(): PageConfig {
        return {
            id: 'nosotros',
            title: 'Nosotros',
            sections: [
                {
                    id: 'nosotros_hero',
                    name: 'Banner Nosotros',
                    enabled: true,
                    content: {
                        title: 'Nosotros',
                        subtitle: 'Cuidamos tu salud con compromiso y vocación',
                        description: 'Somos una Clínica de especialidades, con personal altamente capacitado, los cuales brindan sus servicios a las personas que lo necesiten.',
                        imageUrl: 'assets/images/NOSOTROS/nosotros_banner.png'
                    }
                },
                {
                    id: 'mision_vision',
                    name: 'Misión y Visión',
                    enabled: true,
                    content: {
                        mision_title: 'Misión',
                        mision_text: 'Nuestra misión es ser un referente de salud, reconocido por la población como un centro de calidad, basado en principios y valores éticos, que usa alta tecnología, infraestructura de primera y recursos eficientes, garantizando una atención centrada en el paciente, oportuna, segura y de calidad.',
                        vision_title: 'Visión',
                        vision_text: 'La visión de la institución es ser un referente en salud regional y nacional, certificado y acreditado con normas internacionales, que brinde servicios de excelencia y con ética profesional, manteniendo la mejora continua.'
                    }
                },
                {
                    id: 'instalaciones_primer_nivel',
                    name: 'Instalaciones de Primer Nivel',
                    enabled: true,
                    content: {
                        title: 'Nuestras Instalaciones de Primer Nivel',
                        description: 'La Clínica Alelí en la ciudad de Cuenca ofrece instalaciones de primer nivel con tecnología avanzada y un ambiente moderno y cómodo, brindando atención integral y personalizada para el bienestar de nuestros pacientes.',
                        items: [
                            { title: 'Quirófano', imageUrl: 'assets/images/INSTALACIONES/ESPACIODETRABAJO.png' },
                            { title: 'Elevador', imageUrl: 'assets/images/INSTALACIONES/ACENSOR.png' },
                            { title: 'Habitación', imageUrl: 'assets/images/INSTALACIONES/CAMILLAMORADA.png' },
                            { title: 'Recepción', imageUrl: 'assets/images/INSTALACIONES/PEOPLE.png' }
                        ]
                    }
                }
            ]
        };
    }

    getInitialInicioConfig(): PageConfig {
        return {
            id: 'inicio',
            title: 'Página de Inicio',
            sections: [
                {
                    id: 'hero',
                    name: 'Banner Principal',
                    enabled: true,
                    content: {
                        title: 'Bienvenidos a la Clínica Alelí',
                        description: 'Atención médica de excelencia con calidez humana. Especialidades de alto nivel y tecnología avanzada al servicio de tu bienestar.',
                        buttonText: 'AGENDAR CITA',
                        secondaryButtonText: 'CONÓCENOS'
                    }
                },
                {
                    id: 'servicios',
                    name: 'Nuestros Servicios',
                    enabled: true,
                    content: {
                        title: 'NUESTROS SERVICIOS',
                        items: [
                            {
                                id: 1,
                                title: 'SERVICIOS MÉDICOS',
                                description: 'Nuestro equipo altamente capacitado utiliza las técnicas más avanzadas para ofrecer soluciones efectivas y seguras a sus necesidades de salud.',
                                imageUrl: 'assets/images/Dra.-Ligia-Naranjo-Bernal.jpg',
                                link: '/servicios'
                            },
                            {
                                id: 2,
                                title: 'INSTALACIONES',
                                description: 'Nuestra clínica ofrece instalaciones de primer nivel con tecnología avanzada y un ambiente moderno y cómodo, brindando atención integral.',
                                imageUrl: 'assets/images/Clinica_Aleli_cuarto.jpg',
                                link: '/instalaciones'
                            },
                            {
                                id: 3,
                                title: 'ESPECIALIDADES',
                                description: 'Nos especializamos en ofrecer atención médica de alta calidad con un enfoque personalizado para el bienestar de nuestros pacientes.',
                                imageUrl: 'assets/images/Servicios.webp',
                                link: '/especialidades'
                            }
                        ]
                    }
                },
                {
                    id: 'nosotros',
                    name: 'Sobre Nosotros',
                    enabled: true,
                    content: {
                        title: 'Comprometidos con tu salud, con el cuidado que mereces',
                        description: 'Somos una Clínica de especialidades, con personal altamente capacitado, los cuales brindan sus servicios a las personas que lo necesiten.',
                        imageUrl: 'assets/images/Imagen_general.webp'
                    }
                },
                {
                    id: 'beneficios',
                    name: 'Beneficios',
                    enabled: true,
                    content: {
                        subtitle: 'LO QUE NOS DIFERENCIA',
                        title: '¿Por qué elegir Clínica Alelí?',
                        items: [
                            { id: 1, title: 'Instalaciones Modernas', description: 'Contamos con ambientes diseñados para su comodidad y equipados con tecnología de vanguardia.', icon: 'hospital' },
                            { id: 2, title: 'Especialidades', description: 'Una amplia gama de especialistas médicos comprometidos con un diagnóstico preciso y humano.', icon: 'user' },
                            { id: 3, title: 'Atención de Calidad', description: 'Equipamiento moderno y procesos certificados para garantizar la seguridad de su familia.', icon: 'shield' }
                        ]
                    }
                },
                {
                    id: 'acciones_rapidas',
                    name: 'Acciones Rápidas',
                    enabled: true,
                    content: {
                        items: [
                            { title: 'Agendar Cita Médica', tag: 'RÁPIDO', description: 'Atención inmediata y personalizada. Elija su especialista hoy mismo.', buttonText: 'AGENDAR AHORA', type: 'primary' },
                            { title: 'Resultados Médicos', tag: 'ONLINE', description: 'Acceda a sus informes de laboratorio e imágenes desde la comodidad de su hogar.', buttonText: 'VER RESULTADOS', type: 'secondary', link: '/resultados' },
                            { title: 'Cartera de Servicios', tag: 'SERVICIOS', description: 'Explore todas las soluciones de salud que tenemos disponibles para usted.', buttonText: 'EXPLORAR', type: 'tertiary', link: '/servicios' }
                        ]
                    }
                },
                {
                    id: 'faq',
                    name: 'Preguntas Frecuentes',
                    enabled: true,
                    content: {
                        subtitle: 'RESOLVEMOS TUS DUDAS',
                        title: 'Preguntas Frecuentes',
                        items: [
                            { question: '¿Cómo puedo agendar una cita médica?', answer: 'Puede agendar su cita haciendo clic en el botón "AGENDAR CITA" en nuestra web, enviándonos un mensaje por WhatsApp al 098 493 2129 o llamando directamente a nuestra recepción.' },
                            { question: '¿Cuáles son los horarios de atención?', answer: 'Atendemos de Lunes a Viernes de 08:00 a 19:00 y Sábados de 09:00 a 13:00. Contamos con médicos de guardia para emergencias.' }
                        ]
                    }
                },
                {
                    id: 'especialidades_destacadas',
                    name: 'Especialistas Destacados',
                    enabled: true,
                    content: {
                        title: 'NUESTROS ESPECIALISTAS',
                        subtitle: 'Expertos en diversas áreas de la medicina a su servicio',
                        items: [
                            { name: 'Dr. Alvaro Buñay R.', specialty: 'Cardiología', description: 'Especialista en diagnóstico y tratamiento de enfermedades del corazón.', imageUrl: 'assets/images/Dr.-Alvaro-Bunay-R-1.jpg' },
                            { name: 'Dr. Pablo Adrian Chica', specialty: 'Cirujano General', description: 'Experto en procedimientos quirúrgicos avanzados y atención de urgencias.', imageUrl: 'assets/images/DR.-PABLO-ADRIAN-CHICA-ALVARRACIN.jpg' },
                            { name: 'Dra. Ligia Naranjo Bernal', specialty: 'Anestesiología', description: 'Dedicada a proporcionar el máximo confort y seguridad a nuestros pacientes.', imageUrl: 'assets/images/DRA-LIGIA.jpg' }
                        ]
                    }
                }
            ]
        };
    }

    getInitialServiciosConfig(): PageConfig {
        return {
            id: 'servicios',
            title: 'Servicios Médicos',
            sections: [
                {
                    id: 'hero',
                    name: 'Sección Hero',
                    enabled: true,
                    content: {
                        title: 'SERVICIO',
                        description: 'En Clínica Alelí, nos especializamos en ofrecer atención médica de alta calidad con un enfoque personalizado para el bienestar de nuestros pacientes.'
                    }
                },
                {
                    id: 'servicios',
                    name: 'Lista de Servicios',
                    enabled: true,
                    content: {
                        title: 'Especialidades Médicas',
                        subtitle: 'Nuestra clínica ofrece estos servicios médicos',
                        items: [
                            { id: 'cirugia-general', title: 'CIRUGÍA GENERAL', description: 'Nuestro equipo de cirujanos altamente capacitados utiliza las técnicas más avanzadas para ofrecer soluciones efectivas y seguras.', link: 'cirugia-general' },
                            { id: 'ginecologia-y-obstetricia', title: 'GINECOLOGÍA Y OBSTETRICIA', description: 'Cuidado integral de la salud de la mujer en todas sus etapas, con un enfoque cálido, profesional y especializado.', link: 'ginecologia-y-obstetricia' },
                            { id: 'pediatria', title: 'PEDIATRÍA INTEGRAL', description: 'Atención médica dedicada al crecimiento y bienestar de los más pequeños, brindando tranquilidad a toda la familia.', link: 'pediatria' },
                            { id: 'psicologia-clinica', title: 'PSICOLOGÍA CLÍNICA', description: 'Apoyo emocional y herramientas profesionales para fortalecer la salud mental y el equilibrio personal.', link: 'psicologia-clinica' },
                            { id: 'otorrinolaringologia', title: 'OTORRINOLARINGOLOGÍA', description: 'Especialistas en el diagnóstico y tratamiento de afecciones de oído, nariz y garganta.', link: 'otorrinolaringologia' },
                            { id: 'cardiologia', title: 'CARDIOLOGÍA PREVENTIVA', description: 'Monitoreo y cuidado avanzado de la salud cardiovascular, previniendo enfermedades del corazón.', link: 'cardiologia' },
                            { id: 'medicina-familiar', title: 'MEDICINA FAMILIAR', description: 'Atención médica integral y continua a toda la familia, enfocada en la prevención y el bienestar.', link: 'medicina-familiar' },
                            { id: 'traumatologia-y-ortopedia', title: 'TRAUMATOLOGÍA Y FISIOTERAPIA', description: 'Prevención y tratamiento de lesiones musculoesqueléticas con técnicas modernas de rehabilitación.', link: 'traumatologia-y-ortopedia' },
                            { id: 'laboratorios-clinicos', title: 'LABORATORIOS CLÍNICOS', description: 'Análisis clínicos con resultados precisos y rápidos utilizando tecnología de vanguardia.', link: 'laboratorios-clinicos' }
                        ]
                    }
                },
                {
                    id: 'nosotros_hero',
                    name: 'Espacios / Instalaciones',
                    enabled: true,
                    content: {
                        title: 'Nuestras Instalaciones',
                        description: 'Contamos con espacios modernos y equipados para tu comodidad y seguridad.'
                    }
                }
            ]
        };
    }

    getInitialEspecialidadesConfig(): PageConfig {
        return {
            id: 'especialidades',
            title: 'Especialidades',
            sections: [
                {
                    id: 'banner',
                    name: 'Banner Superior',
                    enabled: true,
                    content: {
                        imageUrl: 'assets/images/SERVICIOS/Especialidades_Banner.png',
                        alt: 'Nuestras Especialidades Médicas'
                    }
                },
                {
                    id: 'search_header',
                    name: 'Cabecera de Búsqueda',
                    enabled: true,
                    content: {
                        title: 'ESPECIALIDADES',
                        subtitle: 'Encuentra al especialista ideal para ti'
                    }
                },
                {
                    id: 'servicios',
                    name: 'Listado de Especialidades',
                    enabled: true,
                    content: {
                        items: [
                            { title: 'CIRUGÍA GENERAL', description: 'Especialidad médica que abarca las operaciones del aparato digestivo.' },
                            { title: 'GINECOLOGÍA', description: 'Atención a la salud del sistema reproductor femenino.' },
                            { title: 'PEDIATRÍA', description: 'Especialidad médica que estudia al niño y sus enfermedades.' },
                            { title: 'CARDIOLOGÍA', description: 'Rama de la medicina que se encarga del estudio del corazón.' }
                        ]
                    }
                }
            ]
        };
    }

    getInitialResultadosConfig(): PageConfig {
        return {
            id: 'resultados',
            title: 'Portal de Resultados',
            sections: [
                {
                    id: 'lookup_header',
                    name: 'Cabecera de Acceso',
                    enabled: true,
                    content: {
                        logoUrl: 'assets/images/Logo-negro-aleli.png',
                        title: 'Portal de Resultados',
                        subtitle: 'Clínica de especialidades'
                    }
                },
                {
                    id: 'instructions',
                    name: 'Instrucciones',
                    enabled: true,
                    content: {
                        title: 'Para acceder a los resultados de sus exámenes:',
                        steps: [
                            { num: '1', text: 'Digite su número de cédula' },
                            { num: '2', text: 'Digite su número de orden' },
                            { num: '3', text: 'Presione el botón "Confirmar"' }
                        ]
                    }
                }
            ]
        };
    }

    updatePage(updatedPage: PageConfig) {
        this.pages.update(pages => pages.map(p => p.id === updatedPage.id ? updatedPage : p));
    }

    getPage(id: string): PageConfig | undefined {
        return this.pages().find(p => p.id === id);
    }

    updateSection(pageId: string, sectionId: string, content: any) {
        this.pages.update(pages => {
            const page = pages.find(p => p.id === pageId);
            if (page) {
                const section = page.sections.find((s: SectionConfig) => s.id === sectionId);
                if (section) {
                    section.content = content;
                }
            }
            return [...pages];
        });
    }

    toggleSection(pageId: string, sectionId: string, enabled: boolean) {
        this.pages.update(pages => {
            const page = pages.find(p => p.id === pageId);
            if (page) {
                const section = page.sections.find((s: SectionConfig) => s.id === sectionId);
                if (section) {
                    section.enabled = enabled;
                }
            }
            return [...pages];
        });
    }

    getInitialDirectorioConfig(): PageConfig {
        return {
            id: 'directorio',
            title: 'Directorio de Médicos',
            sections: [
                {
                    id: 'header_directorio',
                    name: 'Encabezado Directorio',
                    enabled: true,
                    content: { title: 'Nuestros Profesionales', subtitle: 'Conoce a nuestro equipo de especialistas' }
                },
                {
                    id: 'lista_medicos',
                    name: 'Lista de Médicos',
                    enabled: true,
                    content: {
                        items: [
                            {
                                id: 'pablo-chica',
                                name: 'Dr. Pablo Adrian Chica Alvarracin',
                                specialty: 'Cirujano general y Laparoscópico',
                                bio: 'El Dr. Chica Alvarracín comprende la importancia de brindar un cuidado centrado en el paciente...',
                                image: 'assets/images/DR.-PABLO-ADRIAN-CHICA-ALVARRACIN.jpg',
                                imageUrl: 'assets/images/ESPECIALIDADES/DR_PABLO_ADRIA_CHICA_ALVARACIN.png',
                                services: ['Cirugía de la vesícula', 'Hernias abdominales']
                            }
                        ]
                    }
                }
            ]
        };
    }

    getInitialContactoConfig(): PageConfig {
        return {
            id: 'contacto',
            title: 'Información de Contacto',
            sections: [
                {
                    id: 'datos_contacto',
                    name: 'Datos Principales',
                    enabled: true,
                    content: {
                        address: 'Av. Gran Colombia y Calle Larga, Cuenca, Ecuador',
                        phone: '099 550 0139',
                        email: 'info@clinicaaleli.com',
                        schedule: 'Lunes a Viernes: 08:00 - 19:00 | Sábados: 09:00 - 13:00'
                    }
                }
            ]
        };
    }

    getInitialInstalacionesConfig(): PageConfig {
        return {
            id: 'instalaciones',
            title: 'Instalaciones',
            sections: [
                {
                    id: 'hero',
                    name: 'Banner Principal',
                    enabled: true,
                    content: {
                        title: 'Instalaciones',
                        description: 'Espacios diseñados para tu bienestar'
                    }
                },
                {
                    id: 'galeria_instalaciones',
                    name: 'Galería de Fotos',
                    enabled: true,
                    content: {
                        items: [
                            { title: 'Quirófano', imageUrl: 'assets/images/INSTALACIONES/ESPACIODETRABAJO.png' },
                            { title: 'Elevador', imageUrl: 'assets/images/INSTALACIONES/ACENSOR.png' },
                            { title: 'Habitación', imageUrl: 'assets/images/INSTALACIONES/CAMILLAMORADA.png' },
                            { title: 'Recepción', imageUrl: 'assets/images/INSTALACIONES/PEOPLE.png' }
                        ]
                    }
                },
                {
                    id: 'detalles_instalaciones',
                    name: 'Detalle de Espacios',
                    enabled: true,
                    content: {
                        items: [
                            {
                                id: 'quirofanos',
                                title: 'NUESTROS QUIRÓFANOS EN LA CLÍNICA ALELÍ EN CUENCA',
                                imageUrl: 'assets/images/INSTALACIONES/ESPACIODETRABAJO.png',
                                points: [
                                    'Equipados con tecnología de última generación para garantizar precisión y seguridad en cada procedimiento.',
                                    'Personal médico altamente capacitado y especializado en diversas áreas quirúrgicas.',
                                    'Estrictos protocolos de higiene y esterilización para asegurar un entorno seguro.'
                                ]
                            },
                            {
                                id: 'recuperacion',
                                title: 'SALAS DE RECUPERACION',
                                imageUrl: 'assets/images/INSTALACIONES/CAMILLAMORADA.png',
                                points: [
                                    'Equipamiento avanzado para el monitoreo continuo de los pacientes.',
                                    'Ambientes diseñados para favorecer el descanso y la pronta recuperación.',
                                    'Espacios confortables y privados para una recuperación tranquila y segura.'
                                ]
                            },
                            {
                                id: 'consultorios',
                                title: 'CONSULTORIOS DE PRIMERA',
                                imageUrl: 'assets/images/INSTALACIONES/CONSULTA.png',
                                points: [
                                    'Consultorios modernos y equipados con tecnología avanzada para un diagnóstico preciso.',
                                    'Amplia variedad de especialidades médicas en un solo lugar.',
                                    'Gestión eficiente de citas para minimizar los tiempos de espera.'
                                ]
                            },
                            {
                                id: 'sonrisa',
                                title: 'TEN LA MEJOR SONRISA',
                                imageUrl: 'assets/images/INSTALACIONES/SONRISA.png',
                                points: [
                                    'Consultorios modernos y equipados con tecnología avanzada para un diagnóstico preciso.',
                                    'Amplia variedad de especialidades médicas en un solo lugar.',
                                    'Gestión eficiente de citas para minimizar los tiempos de espera.'
                                ]
                            }
                        ]
                    }
                },
                {
                    id: 'resumen_caracteristicas',
                    name: 'Resumen de Características',
                    enabled: true,
                    content: {
                        title: 'Nuestras Instalaciones',
                        items: [
                            {
                                id: 1,
                                title: 'Nuestras Modernas',
                                description: 'Instalaciones modernas y tecnológicamente avanzadas que garantizan una atención médica de calidad.',
                                icon: 'check-circle'
                            },
                            {
                                id: 2,
                                title: 'Especialidades',
                                description: 'Amplia gama de especialidades y servicios en un entorno cómodo y seguro.',
                                icon: 'check-circle'
                            },
                            {
                                id: 3,
                                title: 'Equipamiento',
                                description: 'Quirófanos equipados con tecnologías de punta para realizar procedimientos con máxima precisión y seguridad.',
                                icon: 'check-circle'
                            }
                        ]
                    }
                }
            ]
        };
    }

    getInitialAllServicesDetails(): PageConfig[] {
        return SERVICES_DATA.map((s: any) => ({
            id: `srv_${s.id}`,
            title: `Pág: ${s.title.substring(0, 15)}...`,
            sections: [
                {
                    id: 'hero',
                    name: 'Cabecera del Servicio',
                    enabled: true,
                    content: {
                        category: s.category,
                        title: s.title,
                        description: s.description,
                        imageUrl: s.image
                    }
                },
                {
                    id: 'points',
                    name: 'Puntos Clave / Características',
                    enabled: true,
                    content: {
                        title: s.pointsTitle,
                        items: s.points.map((p: string) => ({ title: p }))
                    }
                },
                ...(s.extraSections || []).map((extra: any, index: number) => ({
                    id: `extra_${index}`,
                    name: `Sección: ${extra.title}`,
                    enabled: true,
                    content: {
                        title: extra.title,
                        description: extra.content,
                        items: (extra.items || []).map((it: string) => ({ title: it }))
                    }
                }))
            ]
        }));
    }
}
