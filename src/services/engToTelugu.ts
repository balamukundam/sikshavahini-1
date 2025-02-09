export class EngToTelService {

  constructor() { }

  private curLang:number = 0;


  getStringInUserLanguage(slang:string, str1: string): string {
    const langMap: Record<string, (s: string) => string> = {
      transcription: this.getStringInTranscript.bind(this),
      devanagari: this.getStringInSanskrit.bind(this)
    };
  
    return (langMap[slang.toLowerCase()] || this.getStringInTelugu.bind(this))(str1);
  }


  getStringInTranscript(str1:string):string {

    let str2: string = str1;
    
    str2=this.replaceAll(str2,'Mk', 'Ák');
    str2=this.replaceAll(str2,'MK', 'ÁK');
    str2=this.replaceAll(str2,'Mg', 'Ág');
    str2=this.replaceAll(str2,'MG', 'ÁG');
    str2=this.replaceAll(str2,'Mc', 'Ñc');
    str2=this.replaceAll(str2,'MC', 'ÑC');
    str2=this.replaceAll(str2,'Mj', 'Ñj');
    str2=this.replaceAll(str2,'MJ', 'ÑJ');
    str2=this.replaceAll(str2,'MT', 'NT');
    str2=this.replaceAll(str2,'MD', 'ND');
    str2=this.replaceAll(str2,'Mt', 'nt');
    str2=this.replaceAll(str2,'Md', 'nd');
    str2=this.replaceAll(str2,'Mp', 'mp');
    str2=this.replaceAll(str2,'Mb', 'mb');

    str2=this.findandReplaceChars(str2);

    str2=this.replaceAll(str2, 'aa', 'A');		
    str2=this.replaceAll(str2, 'ee', 'I');	
    str2=this.replaceAll(str2, 'ii', 'I');	
    str2=this.replaceAll(str2, 'uu', 'U');	
    str2=this.replaceAll(str2, 'oo', 'U');	
    str2=this.replaceAll(str2, 'Ru', 'F');	
    str2=this.replaceAll(str2, 'zu', 'Z');	
    str2=this.replaceAll(str2, 'ea', 'E');	
    str2=this.replaceAll(str2, 'ai', 'Y');	
    str2=this.replaceAll(str2, 'oe', 'O');	
    str2=this.replaceAll(str2, 'ou', 'W');	
    str2=this.replaceAll(str2, 'au', 'W');
    str2=this.replaceAll(str2, '@h', 'Ĥ');	
    str2=this.replaceAll(str2, 'kh', 'K');	
    str2=this.replaceAll(str2, 'gh', 'G');	
    str2=this.replaceAll(str2, '~m', 'Á');	
    str2=this.replaceAll(str2, 'ch', 'c');
    str2=this.replaceAll(str2, '~c', 'Ç');	
    str2=this.replaceAll(str2, 'Ch', 'C');
    str2=this.replaceAll(str2, '~j', 'Ĵ');		
    str2=this.replaceAll(str2, '~n', 'Ñ');	
    str2=this.replaceAll(str2, 'Th', 'Ŧ');	
    str2=this.replaceAll(str2, 'Dh', 'Ð');	
    str2=this.replaceAll(str2, 'th', 'ť');	
    str2=this.replaceAll(str2, 'dh', 'đ');	
    str2=this.replaceAll(str2, 'f', 'P');	
    str2=this.replaceAll(str2, 'ph', 'P');
    str2=this.replaceAll(str2, 'bh', 'B');	
    str2=this.replaceAll(str2, 'w', 'v');	
    str2=this.replaceAll(str2, 'sh', 'Ś');	
    str2=this.replaceAll(str2, 'lh', 'L');	
    str2=this.replaceAll(str2, '~r', 'Ŕ');
    str2=this.replaceAll(str2, 'h', 'H');

    str2=this.replaceAll(str2, 'A', 'ā');		
    str2=this.replaceAll(str2, 'I', 'ī');	
    str2=this.replaceAll(str2, 'U', 'ū');		
    str2=this.replaceAll(str2, 'R', 'r̥');
    str2=this.replaceAll(str2, 'F', 'r̥̄');	
    str2=this.replaceAll(str2, 'z', 'l̥');	
    str2=this.replaceAll(str2, 'Z', 'l̥̄');	
    str2=this.replaceAll(str2, 'E', 'ē');	
    str2=this.replaceAll(str2, 'Y', 'ai');	
    str2=this.replaceAll(str2, 'O', 'ō');	
    str2=this.replaceAll(str2, 'W', 'au');
    str2=this.replaceAll(str2, 'M', 'ṃ');    
    str2=this.replaceAll(str2, 'Ĥ', 'ḥ');	
    str2=this.replaceAll(str2, 'K', 'kh');	
    str2=this.replaceAll(str2, 'G', 'gh');	
    str2=this.replaceAll(str2, 'Á', 'ṅ');	
    str2=this.replaceAll(str2, 'C', 'ch');
    str2=this.replaceAll(str2, 'J', 'jh');		
    str2=this.replaceAll(str2, 'Ñ', 'ñ');	
    str2=this.replaceAll(str2, 'T', 'ṭ');	
    str2=this.replaceAll(str2, 'Ŧ', 'ṭh');	
    str2=this.replaceAll(str2, 'D', 'ḍ');		
    str2=this.replaceAll(str2, 'Ð', 'ḍh');
    str2=this.replaceAll(str2, 'N', 'ṇ');
    str2=this.replaceAll(str2, 'ť', 'th');	
    str2=this.replaceAll(str2, 'đ', 'dh');	
    str2=this.replaceAll(str2, 'f', 'P');	
    str2=this.replaceAll(str2, 'P', 'ph');
    str2=this.replaceAll(str2, 'B', 'bh');	
    str2=this.replaceAll(str2, 'w', 'v');	
    str2=this.replaceAll(str2, 'S', 'ś');		
    str2=this.replaceAll(str2, 'Ś', 'ṣ');	
    str2=this.replaceAll(str2, 'L', 'ḷ');	
    str2=this.replaceAll(str2, 'Ŕ', 'ṟ');
    str2=this.replaceAll(str2, 'H', 'h');

    str2=this.replaceAll(str2, '^', '');
    str2=this.replaceAll(str2, 'x', '');
    str2=this.replaceAll(str2, 'X', '');
    str2=this.replaceAll(str2, 'q', '');
    str2=this.replaceAll(str2, 'Q', '');
    str2=this.replaceAll(str2, 'V', '');   

   // str2=this.replaceAll(str2, 'x', ' '+ String.fromCharCode(3073));
   // str2=this.replaceAll(str2, 'X', ' '+ String.fromCharCode(3133));
   // str2=this.replaceAll(str2, 'q', ' '+ String.fromCharCode(2386));
   // str2=this.replaceAll(str2, 'Q', ' '+ String.fromCharCode(2385));
   // str2=this.replaceAll(str2, 'V', ' '+ String.fromCharCode(7386));   


    return str2;
  
}

  getStringInSanskrit(str2:string):string {

      this.curLang=1;
      str2=this.replaceAll(str2,'Mk', 'Ák');
      str2=this.replaceAll(str2,'MK', 'ÁK');
      str2=this.replaceAll(str2,'Mg', 'Ág');
      str2=this.replaceAll(str2,'MG', 'ÁG');
      str2=this.replaceAll(str2,'Mc', 'Ñc');
      str2=this.replaceAll(str2,'MC', 'ÑC');
      str2=this.replaceAll(str2,'Mj', 'Ñj');
      str2=this.replaceAll(str2,'MJ', 'ÑJ');
      str2=this.replaceAll(str2,'MT', 'NT');
      str2=this.replaceAll(str2,'MD', 'ND');
      str2=this.replaceAll(str2,'Mt', 'nt');
      str2=this.replaceAll(str2,'Md', 'nd');
      str2=this.replaceAll(str2,'Mp', 'mp');
      str2=this.replaceAll(str2,'Mb', 'mb');
      let convertedText = this.replaceAll(this.strConvertToTeluguAll(str2), String.fromCharCode(3133), 'ऽ');
      convertedText = this.replaceAll(convertedText, String.fromCharCode(3075), 'ः');
      return convertedText;
    
  }

  getStringInTelugu(str2:string):string {

    this.curLang=0;

    return this.strConvertToTeluguAll(str2);
  
}


  strConvertToTeluguAll(str1:string):string{

    str1 = '£' + str1;
    let sRetString: string = '';
    let telugu_arr = str1.split('`');
    
    let bConvert:boolean = true;

    for (let i = 0; telugu_arr[i]; i++) {

      if(telugu_arr[i].length>0)
      {
        if(bConvert){
          sRetString += this.strGetTeluguString(telugu_arr[i]);
        }
        else{
          sRetString += telugu_arr[i];
        }
      }
      
      bConvert= !bConvert;
    }
    sRetString = sRetString.substring(1);

    return sRetString;
  }



  private strGetTeluguString(str1:string):string{
    str1 = this.findandReplaceChars(str1);
    let telugu_arr = str1.split('');
    let teluguWord: string = '';
    let sTempWord:string = '';
    
    for (let i = 0; telugu_arr[i]; i++) {
      if(this.bIsTeluguChar(telugu_arr[i])){
        sTempWord += telugu_arr[i];       
        
      }
      else{
        let teluguLetters:string[] = this.strGetSplitOnAchulu(sTempWord);
        for(let j = 0; teluguLetters[j]; j++)
        {
          teluguWord += this.getTeluguLetter(teluguLetters[j]);
        }
        sTempWord = '';
        teluguWord+=telugu_arr[i];
      }
    } 
    
    let teluguLetters:string[] = this.strGetSplitOnAchulu(sTempWord);
    for(let j = 0; teluguLetters[j]; j++)
    {

      teluguWord += this.getTeluguLetter(teluguLetters[j]);
    }
    return teluguWord;
  }

  private getTeluguLetter(str1:string):string{
    
    let strReturn:string = '';
    if(str1.length == 1){
      
      if(this.bIsAchchu(str1))
      {
        return this.getPureAchchu(str1);
      }
    }
    let ltrs_arr = str1.split('');
    if(!this.bIsAchchuForHallu(ltrs_arr[ltrs_arr.length-1]))
    {
      ltrs_arr.push('^')
    }
    for (let i = 0; i<ltrs_arr.length-1; i++) {
      if(i>0){
        let iNmbrJoinHallu:number = 3149;
        if(this.curLang==1){iNmbrJoinHallu = 2381;}
        strReturn += String.fromCharCode(iNmbrJoinHallu);
      }
      strReturn += this.getHallu(ltrs_arr[i]);
    }
    if(ltrs_arr[ltrs_arr.length-1]!='a')
    {
      strReturn += this.getAchchuForHallu(ltrs_arr[ltrs_arr.length-1]);
    }

    return strReturn;
  }

  private bIsAchchuForHallu(str1:string):boolean{
    let teluguAchchus: string[] = ['a', 'A', 'i', 'I', 'u', 'U', 'R', 'F', 'z', 'Z', 'e', 'E', 'Y', 'o', 'O', 'W', '^'];
    return teluguAchchus.indexOf(str1) > -1 
  }


  private bIsAchchu(str1:string):boolean{
    let teluguAchchus: string[] = ['a', 'A', 'i', 'I', 'u', 'U', 'R', 'F', 'z', 'Z', 'e', 'E', 'Y', 'o', 'O', 'W', 'M', 'Ĥ', 'x', 'X', 'q', 'Q', 'V'];
    return teluguAchchus.indexOf(str1) > -1 
  }

  private getPureAchchu(str1:string):string{
    let teluguAchchus: string[] = ['a', 'A', 'i', 'I', 'u', 'U', 'R', 'F', 'z', 'Z', 'e', 'E', 'Y', 'o', 'O', 'W', 'M', 'Ĥ', 'x', 'X', 'q', 'Q', 'V'];
    let teluguAchuNbrs: number[] = [3077, 3078, 3079, 3080, 3081, 3082, 3083, 3168, 3084, 3169, 3086, 3087, 3088, 3090, 3091, 3092, 3074, 3075, 3073, 3133, 2386, 2385,7386];
    if(this.curLang==1){
      teluguAchuNbrs = [2309, 2310, 2311, 2312, 2313, 2314, 2315, 2400, 2316, 2401, 2318, 2319, 2320, 2322, 2323, 2324, 2306, 3075, 3073, 3133, 2386, 2385, 7386];
    }
    return String.fromCharCode(teluguAchuNbrs[teluguAchchus.indexOf(str1)]);
  }

  private getAchchuForHallu(str1:string):string{
    let teluguAchchus: string[] = ['A', 'i', 'I', 'u', 'U', 'R', 'F', 'z', 'Z', 'e', 'E', 'Y', 'o', 'O', 'W', '^'];
    let teluguAchuNbrs: number[] = [3134, 3135, 3136, 3137, 3138, 3139, 3140, 3170, 3171, 3142, 3143, 3144, 3146, 3147, 3148, 3149];
    let nbrCorrect: number = 0;
    if(this.curLang==1){
      nbrCorrect =-768;
    }
    let extrString: string = "";
    if(str1=='^')
    {
      extrString = String.fromCharCode(8204);
    }
    
    return String.fromCharCode(teluguAchuNbrs[teluguAchchus.indexOf(str1)]+nbrCorrect)+extrString;
  }

  private getHallu(str1:string):string{
    let teluguHallus: string[] = ['k', 'K', 'g', 'G', 'Á', 'c', 'Ç', 'C', 'j', 'Ĵ', 'J', 'Ñ', 'T', 'Ŧ', 'D', 'Ð', 'N', 't', 'ť', 'd', 'đ', 'n', 'p', 'P', 'b', 'B', 'm', 'y', 'r', 'l', 'v', 'S', 'Ś', 's', 'H', 'L', 'Ŕ'];
    let teluguHalluNbrs: number[] = [3093, 3094, 3095, 3096, 3097, 3098, 3160, 3099, 3100, 3161, 3101, 3102, 3103, 3104, 3105, 3106, 3107, 3108, 3109, 3110, 3111, 3112, 3114, 3115, 3116, 3117, 3118, 3119, 3120, 3122, 3125, 3126, 3127, 3128, 3129, 3123, 3121];
    let nbrCorrect: number = 0;
    if(this.curLang==1){
      nbrCorrect =-768;
    }
    return String.fromCharCode(teluguHalluNbrs[teluguHallus.indexOf(str1)]+nbrCorrect);
  }


  private bIsTeluguChar(str1:string):boolean{
    let teluguChars: string[] = ['a', 'A', 'i', 'I', 'u', 'U', 'R', 'F', 'z', 'Z', 'e', 'E', 'Y', 'o', 'O', 'W', 'M', 'Ĥ', 'k', 'K', 'g', 'G', 'Á', 'c', 'Ç', 'C', 'j', 'Ĵ', 'J', 'Ñ', 'T', 'Ŧ', 'D', 'Ð', 'N', 't', 'ť', 'd', 'đ', 'n', 'p', 'P', 'b', 'B', 'm', 'y', 'r', 'l', 'v', 'S', 'Ś', 's', 'H', 'L', 'Ŕ', '^', 'x', 'X', 'q', 'Q', 'V'];
    return teluguChars.indexOf(str1) > -1 
  }
  private strGetSplitOnAchulu(str1:string):string[]{
    let str2: string = str1;
    str2=this.replaceAll(str2,'a', 'a ');
    str2=this.replaceAll(str2,'A', 'A ');
    str2=this.replaceAll(str2,'i', 'i ');
    str2=this.replaceAll(str2,'I', 'I ');
    str2=this.replaceAll(str2,'u', 'u ');
    str2=this.replaceAll(str2,'U', 'U ');
    str2=this.replaceAll(str2,'R', 'R ');
    str2=this.replaceAll(str2,'F', 'F ');
    str2=this.replaceAll(str2,'z', 'z ');
    str2=this.replaceAll(str2,'Z', 'Z ');
    str2=this.replaceAll(str2,'e', 'e ');
    str2=this.replaceAll(str2,'E', 'E ');
    str2=this.replaceAll(str2,'Y', 'Y ');
    str2=this.replaceAll(str2,'o', 'o ');
    str2=this.replaceAll(str2,'O', 'O ');
    str2=this.replaceAll(str2,'W', 'W ');
    str2=this.replaceAll(str2,'^', '^ ');
    str2=this.replaceAll(str2,'M', 'M ');
    str2=this.replaceAll(str2,'Ĥ', 'Ĥ ');
    str2=this.replaceAll(str2,'x', 'x ');
    str2=this.replaceAll(str2,'X', 'X ');
    str2=this.replaceAll(str2,'q', 'q ');
    str2=this.replaceAll(str2,'Q', 'Q ');
    str2=this.replaceAll(str2,'V', 'V ');

    return str2.split(' ');
  }

  private findandReplaceChars(str1:string):string{
    let str2: string = str1;
    str2=this.replaceAll(str2, 'aa', 'A');		
    str2=this.replaceAll(str2, 'ee', 'I');	
    str2=this.replaceAll(str2, 'ii', 'I');	
    str2=this.replaceAll(str2, 'uu', 'U');	
    str2=this.replaceAll(str2, 'oo', 'U');	
    str2=this.replaceAll(str2, 'Ru', 'F');	
    str2=this.replaceAll(str2, 'zu', 'Z');	
    str2=this.replaceAll(str2, 'ea', 'E');	
    str2=this.replaceAll(str2, 'ai', 'Y');	
    str2=this.replaceAll(str2, 'oe', 'O');	
    str2=this.replaceAll(str2, 'ou', 'W');	
    str2=this.replaceAll(str2, 'au', 'W');
    str2=this.replaceAll(str2, '@h', 'Ĥ');	
    str2=this.replaceAll(str2, 'kh', 'K');	
    str2=this.replaceAll(str2, 'gh', 'G');	
    str2=this.replaceAll(str2, '~m', 'Á');	
    str2=this.replaceAll(str2, 'ch', 'c');
    str2=this.replaceAll(str2, '~c', 'Ç');	
    str2=this.replaceAll(str2, 'Ch', 'C');
    str2=this.replaceAll(str2, '~j', 'Ĵ');		
    str2=this.replaceAll(str2, '~n', 'Ñ');	
    str2=this.replaceAll(str2, 'Th', 'Ŧ');	
    str2=this.replaceAll(str2, 'Dh', 'Ð');	
    str2=this.replaceAll(str2, 'th', 'ť');	
    str2=this.replaceAll(str2, 'dh', 'đ');	
    str2=this.replaceAll(str2, 'f', 'P');	
    str2=this.replaceAll(str2, 'ph', 'P');
    str2=this.replaceAll(str2, 'bh', 'B');	
    str2=this.replaceAll(str2, 'w', 'v');	
    str2=this.replaceAll(str2, 'sh', 'Ś');	
    str2=this.replaceAll(str2, 'lh', 'L');	
    str2=this.replaceAll(str2, '~r', 'Ŕ');
    str2=this.replaceAll(str2, 'h', 'H');
    return str2;
  }

  replaceAll(str1: string, strFind: string, strRep: string):string{
    return str1.split(strFind).join(strRep);
  }
}
