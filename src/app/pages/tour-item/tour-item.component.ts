import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITour } from '../../models/tour';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import { NearestToursComponent } from './nearest-tours/nearest-tours.component';



@Component({
  selector: 'app-tour-item',
  imports: [ButtonModule, CommonModule, CardModule, RouterLink, NearestToursComponent],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss'
})
export class TourItemComponent implements OnInit {
  tourId: string;
  tour: ITour;


  constructor(
    private tourService: ToursService, 
    private route: ActivatedRoute,
  private router: Router,
  private location: Location) { }

  ngOnInit(): void {
   this.tourId = this.route.snapshot.paramMap.get('id');
      console.log('tourId', this.tourId)
      this.tourService.getTourById(this.tourId).subscribe((tour)=> {
        this.tour = tour;
    
  })
        
  }
  onTourChanges(ev: ITour):void {
    this.tour = ev;
    this.location.replaceState('tours/tour/'+this.tour.id)


  initOrder(ev: Event): void {
      this.router.navigate(['/tours/order', this.tour.id])
    }
  }
 
  }