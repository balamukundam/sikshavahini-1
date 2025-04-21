import { InstrumentType } from "./InstrumentFactory";
import { RagamName } from "./RagamFactory";

export const BmkLanguages = {
    telugu: 'telugu',
    devanagari: 'devanagari',
    transcription: 'transcription',
  } as const;
  
  export type BmkLanguage = keyof typeof BmkLanguages;

  export interface musicSets{
    bpm: number,
    pitch: number,
    instrument: InstrumentType,
    melakarta: number,

  }

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
    speeds: string;
    talamSeq: string;
  }

  export interface ComponentMusicGeethams extends BaseComponent {
    musicNotes: string;
    musicLyrics: string[];
    title: string;
    speeds: string;
    talamSeq: string;
    ragam: RagamName;
  }

  export interface ComponentMusicGeethamsMulti extends BaseComponent {
    musicPallavi: string;
    lyricsPallavi: string;
    gamakPallavi: string;
    musicNotes: string[];
    musicLyrics: string[];    
    title: string;
    pallaviGati: number;
    gatis: number[];
    talamSeq: string;
    ragam: RagamName;
  }

  export interface ComponentMusicVarnamAdi extends BaseComponent {
    musicPallavi: string;
    lyricsPallavi: string;
    musicAnuPallavi: string;
    lyricsAnuPallavi: string;
    musicMuktayi: string;
    musicCharanam: string
    musicNotes: string[];
    musicLyrics: string[];
    title: string;
    talamSeq: string;
    ragam: RagamName;
  }

  export interface ComponentMusicLKalpanaNotes extends BaseComponent {
    musicNotes: string;
    musicPallavi: string;
    lyricsPallavi: string;
    pStart: string;
    title: string;
    npb: string;
    talamSeq: string;
  }
  
  // Define a union type for all components
  export type ComponentType = ComponentImage | ComponentPara | ComponentTable | ComponentPoem | ComponentMultiQuest | ComponentMusicNotes | ComponentMusicGeethams | ComponentMusicGeethamsMulti | ComponentMusicLKalpanaNotes | ComponentSeparator;
  
  // DataRow contains an array of any ComponentType
  export interface DataRow {
    preferences: {
      title: string;
      language: string;
      endline: string;
    };
    components: ComponentType[];
  }

  export const noteOptions = [
    { label: "E", value: 76 },
    { label: "D#", value: 75 },
    { label: "D", value: 74 },
    { label: "C#", value: 73 },
    { label: "C", value: 72 },
    { label: "B", value: 71 },
    { label: "A#", value: 70 },
    { label: "A", value: 69 },
    { label: "G#", value: 68 },
    { label: "G", value: 67 },
    { label: "F#", value: 66 },
    { label: "F", value: 65 },
    { label: "E", value: 64 },
    { label: "D#", value: 63 },
    { label: "D", value: 62 },
    { label: "C#", value: 61 },
    { label: "C", value: 60 },
    { label: "B", value: 59 },
    { label: "A#", value: 58 },
    { label: "A", value: 57 },
    { label: "G#", value: 56 },
    { label: "G", value: 55 },
    { label: "F#", value: 54 },
  ];

  export const melakartaDataList = [
    { subtype: "1. Indu Chakra", items: [
      {value:	1	, name:"	Kanakāngi	"},
      {value:	2	, name:"	Ratnāngi	"},
      {value:	3	, name:"	Gānamūrti	"},
      {value:	4	, name:"	Vanaspati	"},
      {value:	5	, name:"	Mānavati	"},
      {value:	6	, name:"	Tānarūpi	"},] },
    { subtype: "2. Netra Chakra", items: [
      {value:	7	, name:"	Senāvati	"},
      {value:	8	, name:"	Hanumatodi	"},
      {value:	9	, name:"	Dhenukā	"},
      {value:	10	, name:"	Nātakapriyā	"},
      {value:	11	, name:"	Kokilapriyā	"},
      {value:	12	, name:"	Rūpavati	"},] },
    { subtype: "3. Agni Chakra", items: [
      {value:	13	, name:"	Gāyakapriyā	"},
      {value:	14	, name:"	Vakuḷābharaṇam	"},
      {value:	15	, name:"	Māyāmāḻavagowla	"},
      {value:	16	, name:"	Chakravākam	"},
      {value:	17	, name:"	Sūryakāntam	"},
      {value:	18	, name:"	Hātakāmbari	"},
      ] },
    { subtype: "4. Veda Chakra", items: [
      {value:	19	, name:"	Jhankāradhvani	"},
      {value:	20	, name:"	Naṭabhairavi	"},
      {value:	21	, name:"	Kīravāṇi	"},
      {value:	22	, name:"	Kharaharapriyā	"},
      {value:	23	, name:"	Gourimanohari	"},
      {value:	24	, name:"	Varuṇapriyā	"},] },
    { subtype: "5. Bana Chakra", items: [
      {value:	25	, name:"	Māraranjani	"},
      {value:	26	, name:"	Chārukesi	"},
      {value:	27	, name:"	Sarasāngi	"},
      {value:	28	, name:"	Harikāmbhōji	"},
      {value:	29	, name:"	Dhīraśankarābharaṇam	"},
      {value:	30	, name:"	Nāganandini	"},] },
    { subtype: "6. Rutu Chakra", items: [
      {value:	31	, name:"	Yāgapriyā	"},
      {value:	32	, name:"	Rāgavardhini	"},
      {value:	33	, name:"	Gāngeyabhuśani	"},
      {value:	34	, name:"	Vāgadhīśvari	"},
      {value:	35	, name:"	Śūlini	"},
      {value:	36	, name:"	Chalanāṭa	"},] },
    { subtype: "7. Rishi Chakra", items: [
      {value:	37	, name:"	Sālagam	"},
      {value:	38	, name:"	Jalārnavam	"},
      {value:	39	, name:"	Jhālavarāḷi	"},
      {value:	40	, name:"	Navanītam	"},
      {value:	41	, name:"	Pāvani	"},
      {value:	42	, name:"	Raghupriyā	"},] },
    { subtype: "8. Vasu Chakra", items: [
      {value:	43	, name:"	Gavāmbhodi	"},
      {value:	44	, name:"	Bhavapriyā	"},
      {value:	45	, name:"	Śubhapantuvarāḷi	"},
      {value:	46	, name:"	Shaḍvidamārgini	"},
      {value:	47	, name:"	Suvarnāngi	"},
      {value:	48	, name:"	Divyamaṇi	"},] },
    { subtype: "9. Brahma Chakra", items: [
      {value:	49	, name:"	Dhavaḻāmbari	"},
      {value:	50	, name:"	Nāmanārāyaṇi	"},
      {value:	51	, name:"	Kāmavardhini	"},
      {value:	52	, name:"	Rāmapriyā	"},
      {value:	53	, name:"	Gamanāśrama	"},
      {value:	54	, name:"	Viśvambari	"},] },
    { subtype: "10. Disi Chakra", items: [
      {value:	55	, name:"	Śāmaḻāngi	"},
      {value:	56	, name:"	Śanmukhapriyā	"},
      {value:	57	, name:"	Simhendramadhyamam	"},
      {value:	58	, name:"	Hemavati	"},
      {value:	59	, name:"	Dharmavati	"},
      {value:	60	, name:"	Nītimati	"},] },
    { subtype: "11. Rudra Chakra", items: [
      {value:	61	, name:"	Kāntāmaṇi	"},
      {value:	62	, name:"	Riśabhapriyā	"},
      {value:	63	, name:"	Latāngi	"},
      {value:	64	, name:"	Vāchaspati	"},
      {value:	65	, name:"	Mechakalyāni	"},
      {value:	66	, name:"	Chitrāmbari	"},] },    
    { subtype: "12. Aditya Chakra", items: [
      {value:	67	, name:"	Sucharitrā	"},
      {value:	68	, name:"	Jyoti svarupini	"},
      {value:	69	, name:"	Dhāthuvardhani	"},
      {value:	70	, name:"	Nāsikābhūśaṇi	"},
      {value:	71	, name:"	Kōsalam	"},
      {value:	72	, name:"	Rasikapriyā	"},] },

    // Add more subtypes here...tem 3.3"] }
  ];
  