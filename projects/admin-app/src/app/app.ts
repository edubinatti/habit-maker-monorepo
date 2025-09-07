import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserList } from "./features/users/user-list/user-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('admin-app');
}
