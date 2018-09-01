// export interface Auth {
//   email: string;
//   password: string;
//   id: string;
// }

export class Auth {
  email: string;
  password: string;
  id?: string;

  constructor(json: any) {
    this.email = json.email;
    this.password = json.password;
    this.id = json.id;
  }
}
