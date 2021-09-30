// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// import { User } from '../_models/user';

// @Injectable({ providedIn: 'root' })
// export class UserService {
//   constructor(private http: HttpClient) { }

//   register(user: User) {
//       return this.http.post(`auth/register`, user);
//   }

// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private User: User = new User();

  constructor(private http: HttpClient) { }

  register(user: User) {
      return this.http.post(`auth/register`, user);
  }

  add(User: User) {
    return this.http.post(`usermanagement/add`, User);
  }

  update(id: any, User: any) {
    return this.http.post(`usermanagement/update/${id}`, User);
  }

  delete(id: any, User: User) {
    return this.http.post(`usermanagement/delete/${id}`, User);
  }

  getAllUser() {
    return this.http.get(`usermanagement/getAllUser`);
  }

  setData(item: any) {
    this.User = item;
  }

  getData() {
    return this.User;
  }

}
