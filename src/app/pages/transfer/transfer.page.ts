import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.page.html',
  styleUrls: ['./transfer.page.scss'],
})
export class TransferPage {
  selectedFromAccount!: {
    AccountType: string,
    AccountID: string,
    Balance: number,
  };
  selectedToAccount!: {
    AccountType: string,
    AccountID: string,
    Balance: number,
  };
  transferAmount!: number;
  accounts: any[] = []

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private databaseService: DatabaseService,
  ) { }

  navigateToHomePage() {
    this.router.navigate(['/home']);
  }

  showConfirmation() {
    if (!this.selectedFromAccount?.AccountType ||
      !this.selectedToAccount?.AccountType ||
      this.selectedFromAccount?.AccountType == this.selectedToAccount?.AccountType ||
      !this?.transferAmount || this?.transferAmount <= 0 ||
      this?.transferAmount >= this.selectedFromAccount?.Balance) {
      this.presentToast('Please select accounts and enter a valid amount.');
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
      header: 'Confirm Transfer',
      message: `Are you sure you want to transfer R${this.transferAmount} from ${this.selectedFromAccount.AccountType} to ${this.selectedToAccount.AccountType}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Transfer',
          handler: () => this.transfer(),
        },
      ],
    });
    await alert.present();
  }

  async transfer() {
    if (this.selectedFromAccount?.AccountType &&
      this.selectedToAccount?.AccountType && this?.transferAmount > 0 &&
      this?.transferAmount <= this.selectedFromAccount?.Balance) {
      this.selectedFromAccount.Balance -= this.transferAmount;
      this.selectedToAccount.Balance += this.transferAmount;

      this.onTransfer()
    } else {
      console.log('Invalid transfer or insufficient funds.');
    }
  }

  onTransfer() {
    const payload = {
      FromAccountID: this.selectedFromAccount.AccountID,
      ToAccountID: this.selectedToAccount.AccountID,
      Amount: this.transferAmount,
    }

    this.databaseService.transfer(payload)
      .subscribe({
        next: (res) => {
          this.presentToast(`Transferred R${this.transferAmount} from ${this.selectedFromAccount.AccountType} 
          to ${this.selectedToAccount.AccountType}.\n\nNew Balance: R${this.selectedFromAccount.Balance}`);

          this.router.navigate(['/home']);
        },
        error: async (error) => {
          if (error.status === 400) {
            this.presentToast('The transfer was unsuccessful.')
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
