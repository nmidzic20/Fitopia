import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
const url = `${apiUrl}api/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(url).pipe(
      tap((data) => {
        console.log('getUser: ' + JSON.stringify(data));
      })
    );
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${url}/${id}`).pipe(
      tap((data) => {
        console.log('getUser: ' + JSON.stringify(data));
      })
    );
  }

  addUser(user: IUser) {
    return this.http.post<IUser>(url, user);
  }

  updateUser(user: IUser) {
    return this.http.put<IUser>(`${url}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<IUser>(`${url}/${id}`);
  }
}
