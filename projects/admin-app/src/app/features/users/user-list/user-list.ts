import { AsyncPipe, JsonPipe, LowerCasePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  imports: [AsyncPipe, JsonPipe, LowerCasePipe],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserList {

  private readonly userService = inject(UserService);

  userId = signal(1);
  user = httpResource<any | undefined>(() => `https://jsonplaceholder.typicode.com/users/${this.userId()}`);

  userList = this.userService.getUsers();

  userListSignal = toSignal(this.userService.getUsers(), { initialValue: [] });

  findUser(id: number) {
    this.userId.set(id);
  }

  resetUser() {
    this.userId.set(1);  
  }

  previousUser() {
    this.userId.update(value => value - 1);  
  }

  nextUser() {
    this.userId.update(value => value + 1);  
  }

}
