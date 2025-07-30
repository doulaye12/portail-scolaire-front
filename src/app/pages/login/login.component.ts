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
      this.authService.login(this.loginForm.value).subscribe({
        next: (response:any) => {
        if(response.success){
          if (response.role === "administrateur") {
            this.router.navigateByUrl("/dashboard/admin");
          } else if (response.role === "enseignant") {
            this.router.navigateByUrl("/dashboard/enseignant");
          } else if (response.role === "eleve") {
            this.router.navigateByUrl("/dashboard/eleve");
          }
        }},
        error: (error) => {
          this.errorMessage = error.error.message
          this.hasError = true
        }
      })   
    }
   
  }

}
