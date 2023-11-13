import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage {

  constructor(
    private router: Router,
    private databaseService: DatabaseService,
    private toastController: ToastController,
  ) { }

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }
  transactions: any[] = [];

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
    });
    toast.present();
  }

  getTransactions = () => {
    this.databaseService.getTransactions()
      .subscribe({
        next: (res) => {
          this.transactions = res.data;
        },
        error: async (error) => {
          if (error.status === 400) {
            this.presentToast('There are no transactions available.')
          }
          else this.presentToast('Network error, please try again later.')
        }
      });
  }

  ionViewWillEnter() {
    this.getTransactions()
  }

}
