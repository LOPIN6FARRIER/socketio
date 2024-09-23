import { Routes,RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const routes: Routes = [
  {path: ':group', component: AppComponent},
  {path: '', component: AppComponent},
  {path:'test', component: AppComponent}
];
