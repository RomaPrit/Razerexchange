import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { AMLComponent } from './pages/aml/aml.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FaqComponent } from './pages/faq/faq.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path:'payment', component:PaymentsComponent},
  {path:'aml', component:AMLComponent},
  {path:'contacts', component:ContactsComponent},
  {path:'faq', component:FaqComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
