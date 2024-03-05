# ATM_Angular_Project

#### Created: 2023
#### Angular Project

<!-- TABLE OF CONTENTS -->
### Table of Contents
<ol>
  <li>
    <a href="#about-the-project">About The Project</a>
  </li>
  <li>
    <a href="#getting-started">Getting Started</a>
    <ul>
      <li><a href="#features">Features</a></li>
      <li><a href="#installation">Installation</a></li>
    </ul>
  </li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
</ol>


### About The Project

Welcome to the ATM_Project, this bank simulation app is built with Angular (TypeScript)
for the frontend, Node.js and Express for the backend, and SQLLite3 as the database. 
This project aims to provide users with a comprehensive bank simulation experience, 
allowing them to perform various transactions, view balances, and manage their accounts seamlessly.

## Getting Started
#### Connecting Artisans with Remote Jobs
#### Web app, Android and IOS App

### Features
* <b>User Authentication:</b> Secure sign-up and login functionalities for users.
* <b>Account Management:</b> Users can view all active accounts registered under their profile.
* <b>Transaction History:</b> Access a detailed transaction history for each account.
* <b>Deposit and Withdrawal:</b> Perform financial transactions, including depositing and withdrawing money.
* <b>Money Transfer:</b> Transfer funds between different accounts.
* <b>Real-time Balances:</b> View real-time balances for all active accounts.


### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/Fankholor-sudo/ATM_Angular_Project.git
   ```
2. Frontend Setup::
   * Navigate to the `frontend` directory.
   * Install dependencies:
   ```sh
   npm install
   ```
   
   ```sh
   npm install -g @ionic/cli
   ```

   ```sh
   npm i @capacitor/core
   ```
   ```sh
   npm i -D @capacitor/cli
   ```
3. Initialise Capacitor:
   ```sh
   npx cap init
   ```
4. Install Android and iOS platforms:
   ```sh
   npm i @capacitor/android @capacitor/ios
   ```
5. Add Android and iOS:
   ```sh
   npx cap add android
   ```
   ```sh
   npx cap add ios
   ```
6. Sync web code to native project:
   ```sh
   npx cap sync
   ```
7. Run Ios:
   ```sh
   ionic capacitor run ios --livereload --external
   ```
8. Run Android:
   ```sh
   ionic capacitor run android -l --external
   ```
9. Run on web:
   ```sh
   ionic serve
   ```
10. Backend Setup:
  * Navigate to the backend directory.
  * Install dependencies:
     ```sh
     npm install node@latest
     ```
     ```sh
     npm install express, sqlite3
     ```
     ```sh
     npm install
     ```
11. Database Configuration:
  * Set up the SQLLite3 database.
  * Execute the SQL scripts in the `database` directory to create the necessary tables.
12. Run the Backend:
     ```sh
     npm run start
     ```
  
<p align="right">(<a href="#top">back to top</a>)</p>

### Usage

1. Sign up or log in to access the bank simulation.
2. View all active accounts registered under your profile.
3. Perform transactions, including deposits, withdrawals, and fund transfers.
4. Access a detailed transaction history for each account.
5. View real-time balances for all active accounts.

<!-- CONTRIBUTING -->

### Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/`)
3. Commit your Changes (`git commit -m 'Add some '`)
4. Push to the Branch (`git push origin feature/`)
5. Open a Pull Request

<!-- LICENSE -->

### License
<p>This project is licensed under the <a href="https://opensource.org/license/ecl-1-0/">MIT License.</a></p>


- []()

<p align="right">(<a href="#top">back to top</a>)</p>



