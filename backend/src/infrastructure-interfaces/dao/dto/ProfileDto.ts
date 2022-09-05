export class ProfileDto {
  name: String;
  gender: 'M' | 'G' | 'None';
  age: number;

  constructor(name: String, gender: 'M' | 'G' | 'None', age: number) {
    this.name = name;
    this.gender = gender;
    this.age = age;
  }
}
