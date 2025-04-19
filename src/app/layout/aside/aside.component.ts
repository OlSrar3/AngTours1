import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToursService } from '../../services/tours.service';

@Component({
  selector: 'app-aside',
  imports: [
    DatePickerModule, 
    FormsModule, 
    ButtonModule, 
    CheckboxModule, 
    InputTextModule,
    SelectModule
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit {
 
  private tourService = inject(ToursService);

  date: Date = null;

  selectedType: any = null;

  tourTypes = 
  [
   { key: 'single' , label:'Одиночный'},
   { key: 'group' , label:'Групповой'},
   { key: 'all' , label:'Все'},
  ]
  ngOnInit(): void {
    this.selectedType = this.tourTypes.find((type)=> type.key === 'all');
  }

 changeTourType(ev: SelectChangeEvent): void {
   this.tourService.initChangeTourType(this.selectedType); 
  }
changeDate(ev:Date): void {
  console.log('date', ev)
   this.tourService.initChangeTourDate(ev);
}

clearDate(ev:Event): void {
console.log('date', ev)
  this.tourService.clearDateTour();
}
}
