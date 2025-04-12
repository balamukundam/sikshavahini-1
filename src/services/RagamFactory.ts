
// Define available instrument types
export type RagamName = "" | "Malahari" | "Suddha Saveri" | "Mohanam" | "Kalyani" | "Saveri" | "Kamboji" | "Arabhi" | "Anandabhairavi" | "Sri" | "Bhairavi";

//rdetails:
  export interface RagamProps{
    name: string,
    melakarta: number,
    Arohana: string,
    Avarohan: string,

  }

export class RagamFactory {
  // This method returns a specific type of synth based on the `type` parameter
  static getRagamDetails(rname: RagamName): RagamProps {
    switch (rname) {
      case "Malahari":
        return {
          name: rname,
          melakarta: 15,
          Arohana: "S R1 M1 P D1 S+",
          Avarohan: "S+ D1 P M1 G3 R1 S",      
        }
      case "Suddha Saveri":
        return {
          name: rname,
          melakarta: 29,
          Arohana: "S R2 M1 P D2 S+",
          Avarohan: "S+ D2 P M1 R2 S",      
        }
      case "Mohanam":
        return {
          name: rname,
          melakarta: 28,
          Arohana: "S R2 G3 P D2 S+",
          Avarohan: "S+ D2 P G3 R2 S",      
        }
      case "Kalyani":
        return {
          name: rname,
          melakarta: 65,
          Arohana: "S R2 G3 M2 P D2 N3 S+",
          Avarohan: "S+ N3 D2 P M2 G3 R2 S",      
        }
      case "Saveri":
        return {
          name: rname,
          melakarta: 15,
          Arohana: "S R1 M1 P D1 S+",
          Avarohan: "S+ N3 D1 P M1 G3 R1 S",      
        }
      case "Kamboji":
        return {
          name: rname,
          melakarta: 28,
          Arohana: "S R2 G3 M1 P D2 S+",
          Avarohan: "S+ N2 D2 P M1 G3 R2 S N3- P- D2- S",      
        }
      case "Arabhi":
        return {
          name: rname,
          melakarta: 29,
          Arohana: "S R2 M1 P D2 S+",
          Avarohan: "S+ N3 D2 P M1 G3 R2 S",      
        }
      case "Anandabhairavi":
        return {
          name: rname,
          melakarta: 20,
          Arohana: "S G2 R2 G2 M1 P D2 S+",
          Avarohan: "S+ N2 D2 P M1 G2 R2 S",      
        }
      case "Sri":
        return {
          name: rname,
          melakarta: 22,
          Arohana: "S R2 M1 P N2 S+",
          Avarohan: "S+ N2 P D2 N2 P M1 R2 G2 R2 S",      
        }
      case "Bhairavi":
        return {
          name: rname,
          melakarta: 20,
          Arohana: "S R2 G2 M1 P D2 N2 S+",
          Avarohan: "S+ N2 D1 P M1 G2 R2 S",                
      }

      default:
        throw new Error(`Ragam ${rname} not implemented`);

    }
  }
}
