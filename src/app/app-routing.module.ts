import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { RepartidorDetailsComponent } from './routes/repartidor-details/repartidor-details.component';
import { RepartidorNewComponent } from './routes/repartidor-new/repartidor-new.component';
import { SalenPizzasComponent } from './routes/salen-pizzas/salen-pizzas.component';
import { SigninComponent } from './routes/signin/signin.component';
import { AdminGuardService } from './services/admin-guard.service';
import { UserGuardService } from './services/user-guard.service';

const routes: Routes = [
  { path: 'bienvenida', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'repartidor/alta', component: RepartidorNewComponent, canActivate: [UserGuardService] },
  { path: 'repartidor/detalle', component: RepartidorDetailsComponent, canActivate: [UserGuardService] },
  { path: 'salen/pizzas', component: SalenPizzasComponent, canActivate: [AdminGuardService] },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
