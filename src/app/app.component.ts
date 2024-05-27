import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeroesComponent } from "./heroes/heroes.component";

import { MatButtonModule } from '@angular/material/button';
import { MessagesComponent } from './components/messages/messages.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HeroesComponent, MessagesComponent, RouterLink, MatButtonModule]
})
export class AppComponent {
  title = 'Tour of Heroes';
}
