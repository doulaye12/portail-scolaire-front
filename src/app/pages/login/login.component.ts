import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  hasError = false
  isSubmitted = false
  errorMessage = ""
  constructor(private router:Router, private formBuilder:FormBuilder, private authService:AuthService){

  }
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]

    })
  }
  onSubmit() {
    this.errorMessage = ""
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        (response:any) => {
        if(response.success){
          this.router.navigateByUrl("/dashboard")
        }},
        (error) => {
          this.errorMessage = error.error.message
          this.hasError = true
        }
      )   
    }
   
  }

}
