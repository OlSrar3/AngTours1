import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, forkJoin, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { API } from '../shared/api';
import { Coords, ICountriesResponseItem, ITour, ITourComponent } from '../models/tour';
import { isDate } from 'date-fns';
import { MapService } from './map.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  private tourTypeSubject = new Subject<any>();
  readonly tourType$ = this.tourTypeSubject.asObservable();

  private tourDateSubject = new Subject<Date>();
  readonly tourDate$ = this.tourDateSubject.asObservable();

  private tourAllSubject = new Subject<any>();
  readonly tourTour$ = this.tourAllSubject.asObservable();
  
  constructor(private http:HttpClient, private mapService:MapService, private loaderService: LoaderService) { }

getTours(): Observable<ITour[]> {

  // set loader
this.loaderService.setLoader(true);

const countries = this.http.get<ICountriesResponseItem[]>(API.countries);
const tours = this.http.get<ITourComponent>(API.tours);
const testObservable = of(1).pipe(
  delay(4000)
);


return forkJoin<[ICountriesResponseItem[], ITourComponent]>([ countries, tours]).pipe(
  delay(1000),
  map((data)=> {
console.log ('data', data);

      let toursWithCountries = [] as ITour[];
      const toursArr = data[1].tours;
      const countriesMap = new Map();

      data[0].forEach(country => {
        countriesMap.set(country.iso_code2, country);
      });

      if (Array.isArray(toursArr)) {
        console.log('***toursArr', toursArr)
        toursWithCountries = toursArr.map((tour)=> {
          return {
            ...tour,
            country: countriesMap.get(tour.code) || null
          }
        });
      }
        return toursWithCountries;
      
    }),
  tap((data) => {
      //hide loader
      this.loaderService.setLoader(false);
    }, (err)=> {
      this.loaderService.setLoader(false)
    }),
   catchError((err) =>{
      console.log('err', err)
      
      return of(null);
    })
  ) 
}

getTourById(id?:string): Observable<ITour> {
  const path = API.tour+'/'+id;
  return this.http.get<ITour>(`${API.tour}/${id}`);
}

 getNearestTourByLocationId(id:string):Observable<ITour[]>{
  return this.http.get<ITour[]>(API.nearestTours, {
    params: {locationIdd: id}
  });
 }

searchTours(tours:ITour[], value: string): ITour[] {
  if (Array.isArray(tours)) {
    return tours.filter((tour) => {

      if (tour && typeof tour.name === 'string') {
        return tour.name.toLowerCase().includes(value.toLowerCase());
      } else {
        return false;
      }
    });
  } else {
    return [];
  }
}

initChangeTourType(val:any): void {
  this.tourTypeSubject.next(val);
}

initChangeTourDate(val:Date): void{
  this.tourDateSubject.next(val);
}

/*clearTourDate(val:Date): void{
  this.tourDateSubject.clear(val);
}*/

getCountryByCode(code: string): Observable<any> {
  
  return this.http.get<Coords[]>(API.countryByCode, {params: {codes: code}}).pipe(
//send new data
map((countrieDataArr) => countrieDataArr[0]),

//send new Obversable
switchMap((countrieData) => {
  console.log('countrieData',countrieData)
  const coords = {lat: countrieData.latlng[0], lng: countrieData.latlng[1]};

  // new Observable

  return this.mapService.getWeather(coords).pipe(

    map((weatherResponce) => {
      const current = weatherResponce.current;
      const hourly = weatherResponce.hourly;

      const weatherData = {
        isDay: current.is_day,
        snowfall:current.snowfall,
        rain: current.rain,
        currentWeather:hourly.tempreture_2m[15]
      };

      console.log('weatherData', weatherData)
      return {countrieData, weatherData}

    })
  )

}),
  
)
}

}

