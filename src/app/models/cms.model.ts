export interface SectionConfig {
    id: string;
    name: string;
    enabled: boolean;
    content: any;
    isExpanded?: boolean;
}

export interface PageConfig {
    id: string;
    title: string;
    sections: SectionConfig[];
}

export interface HeroContent {
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    secondaryButtonText: string;
}

export interface ServiceItem {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

export interface BenefitItem {
    id: number;
    title: string;
    description: string;
    icon: string;
    active: boolean;
}
