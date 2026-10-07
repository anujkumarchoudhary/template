export interface HeadingPart {
  text: string;
  color?: string;
  weight?: string;
}

export interface ServiceType {
  slug: string;
  sectionsOrder: string[];

  banner?: {
    code?: string;
    isCenter?: boolean;
    isVisible: boolean;
    headingParts: HeadingPart[];
    desc?: string;
    span?: string;
    button?: string;
    width?: string;
  };

  keyStats?: {
    isVisible: boolean;
    code?: string;
    breakIndex?: number;
    headingParts: HeadingPart[];
    isCard?: boolean;
    imgWidth?: string;
    imgHeight?: string;
    width?: number;
    img?: string;
    list: {
      icon?: string;
      description: string;
    }[];
  };

  whatAreService?: {
    isVisible: boolean;
    isVariant?: string;
    img?: string;
    headingParts: HeadingPart[];
    bgColor?: string;
    button?: string;
    width?: number;
    customPadding?: string;
    imgWidth?: string;
    imgHeight?: string;
    data: { description: string }[];
  };

  importantToBusiness?: {
    isVariant?: string;
    breakIndex?: number;
    borderColor?: string;
    isVisible: boolean;
    isCenter?: boolean;
    cardColor?: string;
    headingParts: HeadingPart[];
    button?: string;
    data: {
      icon?: string;
      name: string;
      description: string[];
    }[];
  };

  whatIncluded?: {
    isVisible: boolean;
    isVariant?: string;
    isCenter?: boolean;
    headingParts: HeadingPart[];
    list: {
      icon?: string;
      title: string;
      description: string[];
      button?: string;
      btnColor?: string;
    }[];
  };

  ourProcess?: {
    isVisible: boolean;
    breakIndex?: number;
    isCenter?: boolean;
    headingParts: HeadingPart[];
    description?: string;
    bgGradient?: string;
    services: {
      icon?: string;
      title: string;
      description: string[];
    }[];
  };

  serviceResult?: {
    isVisible: boolean;
    isVariant?: string;
    isCenter?: boolean;
    textColor?: string;
    headingParts: HeadingPart[];
    bgColor?: string;
    titleColor?: string;
    img?: string;
    imgHeight?: string;
    description?: string[];
    list?: any[];
  };

  faqData?: {
    isVisible: boolean;
    subTitle?: string;
    headingParts: HeadingPart[];
    description?: string;
    list: {
      title: string;
      description: string;
    }[];
  };

  seoPackages?: {
    isVisible: boolean;
    cardLength?: number;
    headingParts: HeadingPart[];
    description?: string;
    button?: string;
    data: {
      title: string;
      description: string;
      price: string;
      list: { des: string[] }[];
    }[];
  };
}
