//src/polyfills.ts
(window as any).global = window; // Fix for 'global is not defined' error in Angular 16+


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
