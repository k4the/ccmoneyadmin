import { Auth } from './auth.model';

export class AuthMapper {
  constructor() {}

  mapFromJson(json: any): Auth {
    const auth = {
      id: json._id,
      email: json.email,
      password: json.password
    };
    return new Auth(auth);
  }

  mapToJson(auth: Auth): any {
    return {
      _id: auth.id ? auth.id : null,
      email: auth.email,
      password: auth.password
    };
  }
}
