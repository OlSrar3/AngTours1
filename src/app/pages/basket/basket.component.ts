import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-basket',
  imports: [TableModule, AsyncPipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent { 
  basketItems$ = inject(BasketService).basketStore$;
}
