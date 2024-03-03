import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login.component').then(
        component => component.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./views/register/register.component').then(
        component => component.RegisterComponent
      ),
  },
];
