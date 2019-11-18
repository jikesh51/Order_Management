import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';


const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'login', component: LoginComponent},
  {path: 'edit-order/:id', component: EditOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
