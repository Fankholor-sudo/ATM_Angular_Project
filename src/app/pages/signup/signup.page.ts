import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { DatabaseService } from 'src/app/services/database.service';
import { LocalStorageService } from 'src/app/storage/local-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(
    public formbuilder: FormBuilder,
    private router: Router,
    private databaseService: DatabaseService,
    private toastController: ToastController,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.signupForm = this.createForm()
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
    });
    toast.present();
  }

  signupForm = new FormGroup({
    Name: new FormControl(''),
    Surname: new FormControl(''),
    Email: new FormControl(''),
    IDNumber: new FormControl(''),
    Password: new FormControl(''),
    retype_password: new FormControl(''),
  })

  createForm() {
    return this.formbuilder.group({
      Name: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      Surname: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      Email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]],
      IDNumber: ['', [
        Validators.required,
        Validators.minLength(13)
      ]],
      Password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      retype_password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
    });
  }

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }

  onSubmit() {
    console.warn(this.signupForm.value);

    const payload = {
      Name: this.signupForm.value.Name,
      Surname: this.signupForm.value.Surname,
      IDNumber: this.signupForm.value.IDNumber,
      Email: this.signupForm.value.Email,
      Password: this.signupForm.value.Password,
    }

    this.databaseService.signUp(payload)
      .subscribe({
        next: (res) => {
          this.presentToast('Welcome to the online ATM.')
          this.localStorageService.setItem('client', res.data[0])
          this.router.navigate(['/home']);
        },
        error: async (error) => {
          if (error.status === 400) {
            this.presentToast('Please fill all the required fields.')
          }
          else this.presentToast('Network error, please try again later.')
        }
      });
  }
}
