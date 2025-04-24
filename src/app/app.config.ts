import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { config } from 'rxjs';
import { ConfigService } from './services/config.service';
import { MessageService } from 'primeng/api';
import { errorInterceptor } from './shared/components/interceptors/error.interceptor';

function initializeApp(config: ConfigService) {
  return config.loadObservable();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        },
        translation: {
          dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
          monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          dayNamesMin: ['ПН', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
          clear:'Очистить',
          today: 'Текущая дата'
                }
    }),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideAppInitializer(()=>initializeApp(inject(ConfigService))),
    MessageService
      ]
};
