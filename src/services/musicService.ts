export class musicService {

    private _baseNoteNbr: number;
    private _melaNbr: number;

    private rBase: number = 1;
    private gBase: number = 4;
    private mBase: number = 5;
    private dBase: number = 8;
    private nBase: number = 11;

    private noteNbrsArray : number[] = [];
    private noteTextsArray: string[] = [];



    constructor(baseNoteNbr?: number, melaNbr?: number) { 
        this._baseNoteNbr = baseNoteNbr? baseNoteNbr : 60; 
        this._melaNbr = melaNbr? melaNbr : 15;
        this.calculateDefaults()}

    setBaseNoteNbr(baseNoteNbr: number){
        this._baseNoteNbr = baseNoteNbr;
    }

    setMelaNbr(melaNbr: number){
        this._melaNbr = melaNbr;
        this.calculateDefaults();
    }

    calculateDefaults(){
        let Radd = 0;
        let Gadd = 0;
        let Madd = 5;
        let Dadd = 0;
        let Nadd = 0;
        let melanumber36: number = this._melaNbr;
        if (melanumber36 > 36) {
          melanumber36 = melanumber36 - 36;
          Madd = 6;
        }
        let melaBy6 = Math.ceil(melanumber36 / 6);
        let melaRem6 = melanumber36 % 6;
  
        switch (melaBy6) {
          case 1:
            Radd = 1;
            Gadd = 2;
            break;
          case 2:
            Radd = 1;
            Gadd = 3;
            break;
          case 3:
            Radd = 1;
            Gadd = 4;
            break;
          case 4:
            Radd = 2;
            Gadd = 3;
            break;
          case 5:
            Radd = 2;
            Gadd = 4;
            break;
          case 6:
            Radd = 3;
            Gadd = 4;
            break;
        }
        switch (melaRem6) {
          case 1:
            Dadd = 8;
            Nadd = 9;
            break;
          case 2:
            Dadd = 8;
            Nadd = 10;
            break;
          case 3:
            Dadd = 8;
            Nadd = 11;
            break;
          case 4:
            Dadd = 9;
            Nadd = 10;
            break;
          case 5:
            Dadd = 9;
            Nadd = 11;
            break;
          case 0:
            Dadd = 10;
            Nadd = 11;
            break;
        }
        this.rBase = Radd;
        this.gBase = Gadd;
        this.mBase = Madd;
        this.dBase = Dadd;
        this.nBase = Nadd;  
    }

    getNoteNbr(note: string): number {
        let returnNumber = this._baseNoteNbr;
        let bAdd = 0;
        if (note.includes('+')) {
          bAdd += 12;
          note = note.replace('+', '');
        }
        if (note.includes('-')) {
          bAdd -= 12;
          note = note.replace('-', '');
        }


        switch (note) {
            case ';':
                returnNumber = 0;
                break;
            case 'S':
                break;
            case 'R':
                returnNumber += this.rBase;
                break;
            case 'G':
                returnNumber += this.gBase;
                break;
            case 'M':
                returnNumber += this.mBase;
                break;
            case 'P':
                returnNumber += 7;
                break;
            case 'D':
                returnNumber += this.dBase;
                break;
            case 'N':
                returnNumber += this.nBase;
                break;
            case 'R1':
                returnNumber += 1;
                break;
            case 'R2':
                returnNumber += 2;
                break;
            case 'R3':
                returnNumber += 3;
                break;

            case 'G1':
                returnNumber += 2;
                break;
            case 'G2':
                returnNumber += 3;
                break;
            case 'G3':
                returnNumber += 4;
                break;

            case 'M1':
                returnNumber += 5;
                break;
            case 'M2':
                returnNumber += 6;
                break;
                
            case 'D1':
                returnNumber += 8;
                break;
            case 'D2':
                returnNumber += 9;
                break;
            case 'D3':
                returnNumber += 10;
                break;

            case 'N1':
                returnNumber += 9;
                break;
            case 'N2':
                returnNumber += 10;
                break;
            case 'N3':
                returnNumber += 11;
                break;
        }
        return returnNumber + bAdd;
    }

    getNotesRaw = (musicNotes: string) => {
        let notesRaw: string[] = [];
        let noteText = "";
    
        musicNotes.split("").forEach((char: string) => {
          if (
            char == "S" ||
            char == "R" ||
            char == "G" ||
            char == "M" ||
            char == "P" ||
            char == "D" ||
            char == "N" ||
            char == ";"
          ) {
            if (noteText !== "") {
                notesRaw.push(
                noteText.trim(),
              );
            }
            noteText = "";
          }
          noteText += char;
        });
        if (noteText !== "") {
            notesRaw.push(noteText.trim()
            );
        }
        this.noteNbrsArray = [];
        this.noteTextsArray = [];
        
        notesRaw.forEach((noteRaw: string) => {
            this.noteNbrsArray.push(this.getNoteNbr(noteRaw));
            this.noteTextsArray.push(this.getNoteText(noteRaw));
        })
      };
    
    getNoteNbrsArray() : number[] {
      return this.noteNbrsArray
    }
    getNoteTextArray() : string[] {
      return this.noteTextsArray
    }

    getNoteText(noteRaw: string) : string{
        if(noteRaw == ";") return ";";
        let sNote = noteRaw[0]
        if (
            sNote == "S" ||
            sNote == "R" ||
            sNote == "G" ||
            sNote == "M" ||
            sNote == "P" ||
            sNote == "D" ||
            sNote == "N" 
          ){
            let remainText = noteRaw.slice(1);
            if (remainText.includes('+')) {
                sNote += "\u0307";
                remainText = remainText.replace('+', '');
            }
            if (remainText.includes('-')) {
                sNote += "\u0323";
                remainText = remainText.replace('-', '');
            }
            return sNote+remainText;
        }
        return '';
      };

 



 /*   getNotes = (musicNotes: string): any[] => {
        let eventNotes: any[] = [];
        let previousNoteNbr = -1;
        let noteText = "";
    
        musicNotes.split("").forEach((char: string) => {
          if (
            char == "S" ||
            char == "R" ||
            char == "G" ||
            char == "M" ||
            char == "P" ||
            char == "D" ||
            char == "N" ||
            char == ";"
          ) {
            if (previousNoteNbr != -1) {
              eventNotes.push({
                note: previousNoteNbr,
                noteText: noteText,
              });
            }
            previousNoteNbr = -1;
          }
          let Radd = 0;
          let Gadd = 0;
          let Madd = 5;
          let Dadd = 0;
          let Nadd = 0;
          let melanumber36: number = musicSettings.melakarta;
          if (melanumber36 > 36) {
            melanumber36 = melanumber36 - 36;
            Madd = 6;
          }
          let melaBy6 = Math.ceil(melanumber36 / 6);
          let melaRem6 = melanumber36 % 6;
    
          switch (melaBy6) {
            case 1:
              Radd = 1;
              Gadd = 2;
              break;
            case 2:
              Radd = 1;
              Gadd = 3;
              break;
            case 3:
              Radd = 1;
              Gadd = 4;
              break;
            case 4:
              Radd = 2;
              Gadd = 3;
              break;
            case 5:
              Radd = 2;
              Gadd = 4;
              break;
            case 6:
              Radd = 3;
              Gadd = 4;
              break;
          }
          switch (melaRem6) {
            case 1:
              Dadd = 8;
              Nadd = 9;
              break;
            case 2:
              Dadd = 8;
              Nadd = 10;
              break;
            case 3:
              Dadd = 8;
              Nadd = 11;
              break;
            case 4:
              Dadd = 9;
              Nadd = 10;
              break;
            case 5:
              Dadd = 9;
              Nadd = 11;
              break;
            case 0:
              Dadd = 10;
              Nadd = 11;
              break;
          }
    
          switch (char) {
            case "S":
              previousNoteNbr = baseNbr;
              noteText = char;
              break;
            case "R":
              previousNoteNbr = baseNbr + Radd;
              noteText = char;
              break;
            case "G":
              previousNoteNbr = baseNbr + Gadd;
              noteText = char;
              break;
            case "M":
              previousNoteNbr = baseNbr + Madd;
              noteText = char;
              break;
            case "P":
              previousNoteNbr = baseNbr + 7;
              noteText = char;
              break;
            case "D":
              previousNoteNbr = baseNbr + Dadd;
              noteText = char;
              break;
            case "N":
              previousNoteNbr = baseNbr + Nadd;
              noteText = char;
              break;
            case ";":
              previousNoteNbr = 0;
              noteText = char;
              break;
    
            case "-":
              previousNoteNbr = previousNoteNbr - 12;
              noteText = noteText + "\u0323";
              break;
            case "+":
              previousNoteNbr = previousNoteNbr + 12;
              noteText = noteText + "\u0307";
              break;
          }
        });
        if (previousNoteNbr != -1) {
          eventNotes.push({
            note: previousNoteNbr,
            noteText: noteText,
          });
        }
        return eventNotes;
      };
*/

    

}