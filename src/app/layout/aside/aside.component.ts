import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToursService } from '../../services/tours.service';
import { ISelectedType, ITourTypes } from '../../models/tours';


@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [
    DatePickerModule, 
    FormsModule, 
    ButtonModule, 
    CheckboxModule, 
    InputTextModule,
    SelectModule,
    Checkbox
  ],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit {
 
  private tourService = inject(ToursService);

  date: Date = null;

  selectedType: ISelectedType = null;

  tourTypes:  Array<ITourTypes> =
  [
   { key: 'single' , label:'Одиночный'},
   { key: 'group' , label:'Групповой'},
   { key: 'all' , label:'Все'},
  ];
   
  checked: boolean = false;
   
  ngOnInit(): void {
    this.selectedType = this.tourTypes.find((type)=> type.key === 'all');
  }

 changeTourType(ev: SelectChangeEvent): void {
   this.tourService.initChangeTourType(this.selectedType); 
   console.log('selectedType', this.selectedType)
  }
changeDate(ev:Date): void {
  console.log('ev', ev)
   this.tourService.initChangeTourDate(ev);
}

clearDate(ev:Event): void {
console.log('oi', ev)
  this.tourService.clearDateTour(null);
}
}
