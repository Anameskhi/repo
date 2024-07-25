import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgToastModule],
  template: '<router-outlet>, <ng-toast></ng-toast>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cloudonix_app';
}
