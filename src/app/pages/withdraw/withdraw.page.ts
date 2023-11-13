import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  withdrawAmount!: number;
  selectedAccount!: {
    AccountType: string,
    AccountID: string,
    Balance: number,
  };
  
  accounts: any[] = [];

  showConfirmation() {
    if (!this.selectedAccount?.AccountType || !this?.withdrawAmount || this?.withdrawAmount <= 0 || this?.withdrawAmount >= this.selectedAccount?.Balance) {
      this.presentToast('Please select an account and enter a valid amount.');
      return;
    }

    this.presentConfirmationPopup();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
    });
    toast.present();
  }

  async presentConfirmationPopup() {
    const alert = await this.alertController.create({
      header: 'Confirm Withdrawal',
      message: `Are you sure you want to withdraw R${this.withdrawAmount} from ${this.selectedAccount.AccountType}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-btn'
        },
        {
          text: 'Withdraw',
          handler: () => this.withdraw(),
          cssClass: 'confirm-btn'
        },
      ],
    });

    await alert.present();
  }

  async withdraw() {
    if (this.selectedAccount?.AccountType && this?.withdrawAmount > 0 && this?.withdrawAmount <= this.selectedAccount?.Balance) {
      this.selectedAccount.Balance -= this.withdrawAmount;

      this.onWithdraw()
    } else {
      this.presentToast('Invalid withdrawal amount or insufficient funds.')
      console.log('Invalid withdrawal amount or insufficient funds.');
    }
  }

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }

  onWithdraw() {
    const payload = {
      Amount: this.withdrawAmount,
      AccountID: this.selectedAccount.AccountID,
    }

    this.databaseService.withdraw(payload)
      .subscribe({
        next: (res) => {
          var withdrawText = `Withdrawn R${this.withdrawAmount} from ${this.selectedAccount.AccountType} Account.
          \n\nNew Balance: R${this.selectedAccount.Balance}`

          this.presentToast(withdrawText)

          this.router.navigate(['/home']);
        },
        error: async (error) => {
          if (error.status === 400) {
            this.presentToast('The withdrawal was unsuccessful.')
          }
          else this.presentToast('Network error, please try again later.')
        }
      });
  }
  
  ionViewWillEnter() {
    this.databaseService.getAccounts().subscribe({
      next: (data: any) => {
        this.accounts = data.data;
      },
      error: (error) => {
        console.error('Error fetching accounts:', error);
      }
    });
  }

}
