import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CprComponent } from './cpr/cpr.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'lista',
    component: CprComponent
  }
 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
