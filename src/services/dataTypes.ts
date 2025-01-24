export const BmkLanguages = {
    telugu: 'telugu',
    devanagari: 'devanagari',
  } as const;
  
  export type BmkLanguage = keyof typeof BmkLanguages;