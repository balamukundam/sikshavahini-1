export const BmkLanguages = {
    telugu: 'telugu',
    devanagari: 'devanagari',
  } as const;
  
  export type BmkLanguage = keyof typeof BmkLanguages;

  export interface BaseComponent {
    width: string;
    cType: string;
    title: string;
  }

  
  // Define Component1 with additional properties
  export interface ComponentImage extends BaseComponent {
    image: string;
  }
  
  // Define Component2 with a different set of properties
  export interface ComponentPara extends BaseComponent {
    image: string;
    imageWidth: string;
    floatDirection: string;
    lines: string[];
  }
  
  // Define a union type for all components
  export type ComponentType = ComponentImage | ComponentPara;
  
  // DataRow contains an array of any ComponentType
  export interface DataRow {
    components: ComponentType[];
  }
  