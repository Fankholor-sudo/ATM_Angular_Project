import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/database.service';
import { LocalStorageService } from 'src/app/storage/local-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  constructor(
    public formbuilder: FormBuilder,
    private router: Router,
    private databaseService: DatabaseService,
    private toastController: ToastController,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.signinForm = this.createForm()
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
    });
    toast.present();
  }

  signinForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  validationLoginMessage = {
    email: [
      { type: "required", message: "Please enter your email address." },
      { type: "pattern", message: "The email address entered is Incorrect. Try again." }
    ],
    password: [
      { type: "required", message: "Please enter your password." },
      { type: "minlength", message: "The password must be at least 8 characters or more." }
    ]
  }

  createForm() {
    return this.formbuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
    });
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  onSubmit() {
    const payload = {
      Email: this.signinForm.value.email,
      Password: this.signinForm.value.password,
    }

    this.databaseService.signIn(payload)
      .subscribe({
        next: (res) => {
          this.presentToast('Welcome to the online ATM.')
          this.localStorageService.setItem('client', res.data[0])
          this.router.navigate(['/home']);
        },
        error: async (error) => {
          if (error.status === 400) {
            this.presentToast('Incorrect login details.')
          }
          else this.presentToast('Network error, please try again later.')
        }
      });
  }

}
