import { AsyncPipe, JsonPipe, LowerCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, JsonPipe, LowerCasePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList {

  
  private http = inject(HttpClient);

  userOne = this.http.get<any>('https://jsonplaceholder.typicode.com/users/1');

  userList = this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');

  userListSignal = toSignal(this.userList, { initialValue: [] });

}
