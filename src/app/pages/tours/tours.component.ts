import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule } from 'primeng/card'
import { ActivatedRoute, Router } from '@angular/router';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IFilterTypeLogic, ILocation, ITour } from '../../models/tours';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HighlightActiveDirective } from '../../shared/directives/highlight-active.directive';
import { isValid } from 'date-fns';
import { find, map, Subject, Subscription, switchAll, switchMap, takeUntil } from 'rxjs';
import { DialogModule } from 'primeng/dialog';

import { Location } from '@angular/common';
import { MapComponent } from '../../shared/components/map/map.component';
import { BasketService } from '../../services/basket.service';
import { IWeatherCurrent, IWeatherResponce } from '../../models/map';


@Component({
  selector: 'app-tours',
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    SearchPipe,
    FormsModule,
    HighlightActiveDirective,
    MapComponent,
    DialogModule,
  

],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss'
})


export class ToursComponent implements OnInit, OnDestroy {
  tours: ITour[] = [];
  toursStore: ITour[] = [];
 subscription: Subscription;
 typeTourFilter:IFilterTypeLogic = {key: 'all'};
 dateTourFilter:Date;
destroyer = new Subject<boolean>();
showModal = false;
location: ILocation = null;
selectedTour: ITour = null;
weatherData: any =null;


  constructor(
    private toursService: ToursService,
    private route: ActivatedRoute,
    private router: Router,
    private basketService: BasketService ) {}

  ngOnInit(): void {
  

    //Types
  this.subscription = this.toursService.tourType$.pipe(
  takeUntil(this.destroyer)
  ).subscribe((tour) => {
      console.log('tour', tour)
      switch (tour.key) {

        case 'group':
            this.tours = this.toursStore.filter((el) => el.type === 'group')
        break;
        case 'single':
          this.tours = this.toursStore.filter((el) => el.type === 'single')
        break;
        case 'all':
          this.tours = [...this.toursStore];
        break;
          }
        
      });
    //this.typeTourFilter = tour;
    //this.initTourFilterLogic();

  
    

      //Date
  this.toursService.tourDate$.pipe(
    takeUntil(this.destroyer)
  ).subscribe((date) => {

      console.log('****date', date);
   //this.initTourFilterLogic();
     //if (date = null) {
      this.tours = this.toursStore.filter((tour)=>{
     if (NaN) {
      return this.tours=this.toursStore;
     }

       else if (isValid (new Date(tour.date))) {

          const tourDate = new Date(tour.date).setHours(0, 0, 0, 0);
          console.log('****tourDate', tourDate)
          const calendarDate = new Date(date).setHours(0, 0, 0);
          console.log('****calendarDate', calendarDate)
          return tourDate === calendarDate;
        }else {
          return false;
        }
  }
);}
      
  // }
  )
  

  


  console.log('ActivatedRoute', this.route)
    this.toursService.getTours().subscribe((data) => {
      if (Array.isArray(data)) {
        this.tours = data;
        this.toursStore = [...data];
      }
    },(err) => {
      console.log('***', err)
    }
  );
  
  }

ngOnDestroy(): void {
  this.destroyer.next(true);
  this.destroyer.complete();

}

  goToTour(item: any): void {

    this.router.navigate(['tour', item.id], { relativeTo: this.route });
  }

  searchTour(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const targetValue = target.value;
    this.tours = this.toursService.searchTours(this.toursStore, targetValue);
  }

  selectActive(index: number):void {
    console.log('index', index)
    const targetTour = this.tours.find((tour, i) => i === index);
    if (targetTour) {
      this.goToTour(targetTour);
    }
  }

  getCountryDetail(ev: Event, code:string, tour:ITour): void {
    ev.stopPropagation();
    this.toursService.getCountryByCode(code).subscribe((data) => {
      
        if (data) {
        const countrieInfo = data.countrieData;
        console.log('countryInfo', countrieInfo);
        
        this.location = {lat: countrieInfo.latlng[0], lng: countrieInfo.latlng[1]};
        this.selectedTour=tour;
     
        this.weatherData = data.weatherData;
        
         this.showModal = true;
      }
    });

  }
 DeleteTourById(ev: Event): void {
   this.toursService.deleteTourById(null).subscribe(() => {
        // Обновляем список туров
    this.toursStore = [...this.toursStore];
  })
}
         //   this.selectedTour = tour;
 initTourFilterLogic(): void {

    if (this.typeTourFilter) {
      switch (this.typeTourFilter.key) {

        case 'group':
          this.tours = this.toursStore.filter((el) => el.type === 'group')
          break;
      case 'single':
        this.tours = this.toursStore.filter((el) => el.type === 'single')
      break;
      case 'all':
        this.tours = [...this.toursStore];
      break;
        }
      }
    }

  removeTour (ev:Event, tour :ITour): void {
      ev.stopPropagation();
      this.toursService.deleteTourById(tour?.id).subscribe()
    }

    setItemToBasket(ev:Event, item: ITour): void {
      ev.stopPropagation();
      this.basketService.setItemToBasket(item);
    }
  
  removeItemFromBasket(ev:Event, item: ITour): void {
    ev.stopPropagation();
    this.basketService.removeItemFromBasket(item);
  }

  addBasket(ev:Event, item: ITour) {
    ev.stopPropagation();
    this.basketService.addBasket();
  }

    }
