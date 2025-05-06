import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToursService } from '../../services/tours.service';
import { ITour } from '../../models/tours';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker, DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { UserService } from '../../services/user.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [
    RouterLink, 
    ReactiveFormsModule, 
    InputNumberModule, 
    InputTextModule, 
    DatePickerModule, 
    ButtonModule,
    NgTemplateOutlet],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit{
 tourId: string = null;
  tour: ITour; 
  userForm: FormGroup;
  userFormFiledsArr = 
  [{label: 'Имя',  placeHolder: 'Введите имя', control: 'firstName'},
    {label: 'Фамилия',  placeHolder: 'Введите фамилию', control: 'lastName'},
    {label: 'Номер карты',  placeHolder: 'Введите номер карты', control: 'cardNumber'},
    {label: 'Возраст',  placeHolder: 'Введите возраст', control: 'age'},
    {label: 'День рождения',  placeHolder: 'Введите День рождения', control: 'birthDate'},
    {label: 'Гражданство',  placeHolder: 'Введите гражданство', control: 'citizenship'}
   ]


  constructor(private tourService:ToursService,
    private userService:UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(this.tourId).subscribe((tour)=>{
      this.tour = tour;
    })

    //reactive form
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cardNumber: new FormControl(''),
      birthDate: new FormControl(''),
      age: new FormControl(''),
      citizenship: new FormControl(''),
    
    })
  }
initOrder():void {
    const userLogin = this.userService.getUser().login;
    const personalDate = this.userForm.getRawValue();
    const postObj = {
     userLogin,
    tourId:this.tourId,
    personalDate: [personalDate]
    }
    this.tourService.postOrder(postObj).subscribe();

  }
 }
