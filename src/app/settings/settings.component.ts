import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [ButtonModule, RouterOutlet, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
menuItems = [
  {path: 'statistic',
   label: 'Статистика'
  },
  {path: 'change-password',
    label: 'Смена пароля'
   }
]
}
