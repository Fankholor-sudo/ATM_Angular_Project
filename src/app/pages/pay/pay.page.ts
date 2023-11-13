import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage {
  beneficiaryName!: string;
  beneficiarySurname!: string;
  accountNumber!: number;
  selectedFromAccount!: {
    AccountType: string,
    AccountID: string,
    Balance: number,
  };
  amount!: number;
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
    if (!this.selectedFromAccount?.AccountType || !this?.beneficiaryName ||
      !this?.beneficiarySurname || !this?.accountNumber || !this?.amount ||
      this?.amount <= 0 || this?.amount >= this.selectedFromAccount?.Balance) {
      this.presentToast('Please enter valid details.');
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
      header: 'Confirm Payment',
      message: `Are you sure you want to pay R${this.amount} from ${this.selectedFromAccount.AccountType} to ${this.beneficiaryName} ${this.beneficiarySurname} (${this.accountNumber})?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel-btn'
        },
        {
          text: 'Pay',
          handler: () => this.pay(),
          cssClass: 'confirm-btn'
        },
      ],
    });
    await alert.present();
  }

  async pay() {
    if (this.selectedFromAccount?.AccountType && this?.beneficiaryName && this?.beneficiarySurname && this?.accountNumber && this?.amount > 0 && this?.amount <= this.selectedFromAccount?.Balance) {
      this.selectedFromAccount.Balance -= this.amount;

      this.onPay()
    } else {
      console.log('Invalid payment or insufficient funds.');
    }
  }

  onPay = () => {
    var payload = {
      Name: this.beneficiaryName,
      Surname: this.beneficiarySurname,
      AccountNumber: this.accountNumber,
      FromAccountID: this.selectedFromAccount.AccountID,
      Amount: this.amount,
    }

    this.databaseService.payment(payload)
      .subscribe({
        next: (res) => {
          this.presentToast(`R${this.amount} Payed from ${this.selectedFromAccount.AccountType} to ${this.beneficiaryName} ${this.beneficiarySurname} (${this.accountNumber}). 
          \n\nNew Balance: R${this.selectedFromAccount.Balance}`);

          this.router.navigate(['/home']);
        },
        error: async (error) => {
          if (error.status === 400) {
            this.presentToast('Payment was unsuccessful.')
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
