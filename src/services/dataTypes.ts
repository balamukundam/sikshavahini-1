export const BmkLanguages = {
    telugu: 'telugu',
    devanagari: 'devanagari',
    transcription: 'transcription',
  } as const;
  
  export type BmkLanguage = keyof typeof BmkLanguages;

  export interface BaseComponent {
    width: string;
    cType: string;
    language: string;
    border: boolean;    
  }

  
  // Define Component1 with additional properties
  export interface ComponentImage extends BaseComponent {
    image: string;
    title: string;
  }
  
  // Define Component2 with a different set of properties
  export interface ComponentPara extends BaseComponent {
    image: string;
    title: string;
    imageWidth: string;
    floatDirection: string;
    lines: string[];
  }

  export interface ComponentMultiQuest extends BaseComponent {
    lines: string[];
    choices: string[];
  }

  

  export interface ComponentPoem extends BaseComponent {
      tag: string;
      title: string;
      titlePosn: string;
      OddLineSuffix: string;
      EvenLineSuffix: string;
      EvenLineExtraTab: number;
      lines: string[];
      pwidth: number;
      swidth: number;
      count: boolean;
 }

 export interface ComponentTable extends BaseComponent {
  title: string;
  tHeader: string;
  rows: string[];
  langs: string;

 }


  export interface ComponentSeparator extends BaseComponent {
    sepType: string;
  }
 
  export interface ComponentMusicNotes extends BaseComponent {
    musicNotes: string;
    title: string;
  }
  
  // Define a union type for all components
  export type ComponentType = ComponentImage | ComponentPara | ComponentTable | ComponentPoem | ComponentMultiQuest | ComponentMusicNotes | ComponentSeparator;
  
  // DataRow contains an array of any ComponentType
  export interface DataRow {
    preferences: {
      title: string;
      language: string;
      endline: string;
    };
    components: ComponentType[];
  }
  