export class DataRow {
    name: string;
    age: number;
    textArray: string[];
  
    constructor(name: string, age: number, textArray: string[]) {
      this.name = name;
      this.age = age;
      this.textArray = textArray;
    }
  
    getDescription(): string {
      return `${this.name} is ${this.age} years old.`;
    }
  
    addText(newText: string): void {
      this.textArray.push(newText);
    }
  }