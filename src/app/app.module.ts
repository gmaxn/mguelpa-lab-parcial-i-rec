import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { SigninComponent } from './routes/signin/signin.component';
import { TopNavComponent } from './components/layout/top-nav/top-nav.component';
import { SideNavComponent } from './components/layout/side-nav/side-nav.component';
import { SpinnerComponent } from './components/layout/spinner/spinner.component';
import { SignInFormComponent } from './routes/signin/sign-in-form/sign-in-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RepartidorNewComponent } from './routes/repartidor-new/repartidor-new.component';
import { CountryGridComponent } from './routes/repartidor-new/country-grid/country-grid.component';
import { RepartidorDetailsComponent } from './routes/repartidor-details/repartidor-details.component';
import { RepartidorGridComponent } from './routes/repartidor-details/repartidor-grid/repartidor-grid.component';
import { RepartidorInfoComponent } from './routes/repartidor-details/repartidor-info/repartidor-info.component';
import { RepartidorOrigenComponent } from './routes/repartidor-details/repartidor-origen/repartidor-origen.component';
import { SalenPizzasComponent } from './routes/salen-pizzas/salen-pizzas.component';
import { PizzaNewFormComponent } from './routes/salen-pizzas/pizza-new-form/pizza-new-form.component';
import { PizzaEditFormComponent } from './routes/salen-pizzas/pizza-edit-form/pizza-edit-form.component';
import { PizzaDeleteFormComponent } from './routes/salen-pizzas/pizza-delete-form/pizza-delete-form.component';
import { PizzasGridComponent } from './routes/salen-pizzas/pizzas-grid/pizzas-grid.component';
import { GestionarComponent } from './routes/gestionar/gestionar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    TopNavComponent,
    SideNavComponent,
    SpinnerComponent,
    SignInFormComponent,
    RepartidorNewComponent,
    CountryGridComponent,
    RepartidorDetailsComponent,
    RepartidorGridComponent,
    RepartidorInfoComponent,
    RepartidorOrigenComponent,
    SalenPizzasComponent,
    PizzaNewFormComponent,
    PizzaEditFormComponent,
    PizzaDeleteFormComponent,
    PizzasGridComponent,
    GestionarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
