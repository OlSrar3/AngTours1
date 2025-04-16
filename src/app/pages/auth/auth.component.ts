import { Component } from '@angular/core';
import { RegistrationComponent } from "./registration/registration.component";
import { AuthorizationComponent } from "./authorization/authorization.component";

@Component({
  selector: 'app-auth',
  imports: [RegistrationComponent, AuthorizationComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
