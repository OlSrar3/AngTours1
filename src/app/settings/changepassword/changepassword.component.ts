import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { IUserRegister } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-change-password',
  imports: [NgClass, FormsModule,ButtonModule, CheckboxModule, InputTextModule, ToastModule, Toast],
  providers: [MessageService],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
password:string;
newPassword: string;
repeatPassword: string;

constructor(private userService:UserService,
  private messageService: MessageService){}

 
  onChange(ev:Event): void {
    console.log('ev', ev);
    const postObj= {password: this.password} as IUserRegister;
    this.userService.registerUser(postObj).subscribe(
      ()=>{
        this.initToast('success', 'Пароль сохранен');
      },
     ()=>{
      this.initToast('error', 'Ошибка');
    }
    )

}
initToast(type: 'error' | 'success', text: string):void {
  this.messageService.add({ severity: type, detail: text, life: 3000}) 
}
}
