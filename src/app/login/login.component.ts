import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  
  constructor(
   private router:Router,
  ) { }

  ngOnInit(): void {
  }
  username:string="";
  pass:string="";

  login(formulario:NgForm){
    if(this.username=="admin" && this.pass=="admin"){
        this.router.navigate(['/cpr']);
    }
  }
}
