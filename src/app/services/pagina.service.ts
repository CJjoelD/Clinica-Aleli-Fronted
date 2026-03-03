import { Injectable, signal, effect } from '@angular/core';
import { PageConfig, SectionConfig } from '../models/cms.model';

@Injectable({
    providedIn: 'root'
})
export class PaginaService {
    private readonly STORAGE_KEY = 'clinica_aleli_cms_config';

    // State
    pages = signal<PageConfig[]>([]);

    constructor() {
        this.loadInitialConfig();

        // Auto-save to localStorage whenever pages signal changes
        effect(() => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.pages()));
        });
    }

    private loadInitialConfig() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        const initialConfig = [
            this.getInitialInicioConfig(),
            this.getInitialEspecialidadesConfig(),
            this.getInitialDirectorioConfig(),
            this.getInitialBlogConfig(),
            this.getInitialResultadosConfig(),
            this.getInitialNosotrosConfig()
        ];

        if (saved) {
            try {
                const savedPages: PageConfig[] = JSON.parse(saved);
                // Merge logic: keep saved pages, but add missing ones from initialConfig
                const mergedPages = [...initialConfig];

                savedPages.forEach(savedPage => {
                    const index = mergedPages.findIndex(p => p.id === savedPage.id);
                    if (index !== -1) {
                        // Special merge for blog articles to ensure new ones appear
                        if (savedPage.id === 'blog') {
                            const initialArticulos = mergedPages[index].sections.find(s => s.id === 'articulos');
                            const savedArticulos = savedPage.sections.find(s => s.id === 'articulos');

                            if (initialArticulos && savedArticulos) {
                                // Keep saved items but add any new ones from initial that aren't there
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
            title: 'Sobre Nosotros',
            sections: [
                {
                    id: 'nosotros_hero',
                    name: 'Banner Nosotros',
                    enabled: true,
                    content: {
                        title: 'Nuestra Historia',
                        description: 'Más de 20 años al servicio de la salud de nuestra comunidad.',
                        imageUrl: 'assets/images/NOSOTROS/banner.png'
                    }
                },
                {
                    id: 'mision_vision',
                    name: 'Misión y Visión',
                    enabled: true,
                    content: {
                        mision_title: 'Misión',
                        mision_text: 'Brindar atención médica de excelencia con calidez humana.',
                        vision_title: 'Visión',
                        vision_text: 'Ser la clínica líder en especialidades médicas en la región.'
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
                        description: 'Cuidamos de ti con profesionalismo y calidez. Especialidades médicas de alto nivel, tecnología avanzada y atención personalizada para el bienestar de su familia.',
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
                        description: 'Te brindamos los mejores servicios médicos en el Austro cuencano, con personal altamente capacitado y disponibles para tus necesidades.',
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
                const section = page.sections.find(s => s.id === sectionId);
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
                const section = page.sections.find(s => s.id === sectionId);
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
                                imageUrl: 'assets/images/ESPECIALIDADES/DR_PABLO_ADRIA_CHICA_ALVARACIN.png',
                                services: ['Cirugía de la vesícula', 'Hernias abdominales']
                            }
                        ]
                    }
                }
            ]
        };
    }
}
