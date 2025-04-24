import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, model, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { NgOptimizedImage } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { fromEvent, Subscription } from 'rxjs';
import { ITour } from '../../../models/tours';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'app-nearest-tours',
  imports: [
    GalleriaModule, 
    NgOptimizedImage, 
    ButtonModule, 
    CardModule, 
    InputGroupModule, 
    InputGroupAddonModule, 
    InputTextModule
  ],
  templateUrl: './nearest-tours.component.html',
  styleUrl: './nearest-tours.component.scss'
})
export class NearestToursComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
@Input() tourNearest:ITour = null;
@Output() onTourChange = new EventEmitter<ITour>();

@ViewChild('searchInput') searchInput: ElementRef

tourService = inject(ToursService);
toursArr = model<ITour[]>([]);
toursArrCopy = model<ITour[]>([]);
activeLocationId: string;
subscription: Subscription;

ngOnInit(): void {

}

ngOnChanges(changes: SimpleChanges): void {
  console.log('changes', changes)
const tour = changes['tourNearest']?.currentValue as ITour;

  if (tour?.locationId && this.activeLocationId !== tour?.locationId) {
    this.activeLocationId = tour?.locationId;
    this.tourService.getNearestTourByLocationId(this.activeLocationId).subscribe((data) => {
    this.toursArr.set(data);
    this.toursArrCopy.set(data);
    });
    
  }
}
ngAfterViewInit(): void {
  console.log('searchInput afterView', this.searchInput)
  const eventObservable = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input')
  this.subscription = eventObservable.subscribe((ev)=>{
    const inputTargetVlue = (ev.target as HTMLInputElement).value;
 console.log('inputTargetVlue', inputTargetVlue, this.toursArr())
if (inputTargetVlue === '') {
  this.toursArr.set(this.toursArrCopy());
} else {
  const newTours = this.tourService.searchTours(this.toursArrCopy(), inputTargetVlue);
  this.toursArr.set(newTours);
}
 });
}
ngOnDestroy():void {
  this.subscription.unsubscribe();

}
activeIndexChange(index: number){
console.log('index', index);
const tours = this.toursArr();
const activeTour = tours.find((el, i) => i === index);

this.onTourChange.emit(activeTour);
}
}