import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import {
  IBucket,
  IDataset,
  IFitnessData,
  IMessage,
  IPoint,
} from '../models/FitnessData';

import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
const url = `${apiUrl}api/users`;
const fitnessUrl = `${apiUrl}api`;

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

  async getFitnessData() {
    let zaglavlje = new Headers();
    zaglavlje.set('Accept', 'application/json');

    let urlFitness = `${fitnessUrl}/fitness-data`;
    let odgovor = (await fetch(urlFitness, {
      method: 'GET',
      headers: zaglavlje,
    })) as Response;
    let podaci = await odgovor.text();
    console.log(podaci);
    let fitnessData = JSON.parse(podaci) as IFitnessData;
    let steps =
      fitnessData.message.bucket[fitnessData.message.bucket.length - 1]
        .dataset[0].point[0].value[0].intVal;
    let stepsArray: number[] = [];
    fitnessData.message.bucket.forEach((element) => {
      let s = element.dataset[0].point[0].value[0].intVal;
      console.log(s);
      stepsArray.push(s);
    });
    return stepsArray;
  }
}
