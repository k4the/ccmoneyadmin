import { User } from './user.model';

export class UserMapper {
  constructor() {}

  mapFromJson(json: any): User {
    const user = {
      id: json._id,
      email: json.email
    };
    return new User(user);
  }

  mapToJson(user: User): any {
    return {
      _id: user.id ? user.id : null,
      email: user.email
    };
  }
}
