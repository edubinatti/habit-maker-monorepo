import { AsyncPipe, JsonPipe, LowerCasePipe } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, JsonPipe, LowerCasePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList {

  
  private readonly userService = inject(UserService);

  userId = signal(1);
  // getUser = toSignal(this.userService.getUsers(1), { initialValue: []});
  user = httpResource(() => `https://jsonplaceholder.typicode.com/users/${this.userId()}`);

  userList = this.userService.getUsers();

  userListSignal = toSignal(this.userService.getUsers(), { initialValue: [] });

  findUser(id: number){
    this.userId.set(id);
    console.log('click findUser:', this.userId());
  }

}
