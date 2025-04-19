import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourItemComponent } from './pages/tour-item/tour-item.component';
import { authGuard } from './shared/guards/auth.guard';
import { StatisticComponent } from './settings/statistic/statistic.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { OrderComponent } from './pages/order/order.component';


export const routes: Routes = [
    {path: 'auth', component: AuthComponent},
    { path: '',   redirectTo: '/auth', pathMatch: 'full'},
    {path: 'tours',
      canActivate: [authGuard],
       component: LayoutComponent,
    children: [
      {path: '', component: ToursComponent, data: {showAside: true}},
      {path:'tour/:id', component: TourItemComponent},
      {path:'tour', redirectTo:'', pathMatch:"full"
        
      },
      {path: 'settings',
    canActivate: [authGuard],
    component: SettingsComponent,
    children:[
     
      {path: 'change-password', component: ChangepasswordComponent},
      {path: 'statistic', component: StatisticComponent, data:{showAside: true}},
    ]
  },
  {path: 'order/:id',
    canActivate: [authGuard],
    component: OrderComponent,
      },
   ]   },
   
  ,
  { path: '**', redirectTo: '/auth', pathMatch: 'full' },
];