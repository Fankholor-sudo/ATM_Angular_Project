import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private databaseService: DatabaseService,
  ) {}

  accounts: any[] = [];

  async showOptions() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Log Out',
          role: 'destructive',
          icon: 'log-out',
          handler: () => {
            this.navigateToSignin();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  navigateToWithdrawalPage() {
    this.router.navigate(['/withdraw']);
  }
  navigateToTransferPage() {
    this.router.navigate(['/transfer']);
  }
  navigateToPaymentPage() {
    this.router.navigate(['/pay']);
  }
  navigateToTransactionsPage() {
    this.router.navigate(['/transactions']);
  }
  navigateToSignin() {
    this.router.navigate(['/signin']);
  }


  AccountsFn = () => {
    this.databaseService.getAccounts()
      .subscribe({
        next: (res) => {
          this.accounts = res?.data || [];
          this.databaseService.setAccountsData(res?.data)
        },
        error: async (error) => {
          if (error.status === 400) {
            console.log('This client has no registered accounts.')
          }
          else console.log('Network error, please try again later.')
        }
      });
  }

  ionViewWillEnter() {
    this.AccountsFn()
  }
}
