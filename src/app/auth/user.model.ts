export class User {
  email: string;
  id: string;

  constructor(json: any) {
    this.email = json.email;
    this.id = json.id;
  }
}
