# Track My Money

**Track My Money** is a React-based Vite application designed to help users efficiently track their daily expenses and manage their financial data. The application provides an intuitive and user-friendly interface, along with a comprehensive set of features to monitor income, expenses, and transactions. Below is a detailed overview of the features implemented in this project.

## Features

### 1. **User Authentication**

- **User Login**: Secure login functionality for registered users.
- **User Registration**: Allows new users to register and create an account.
- **Reset Password**: Users can request a password reset via email. A secure reset link will be sent, allowing them to set a new password.
- **Password**: Passwords will be encrypted using a one-way hashing method.

### 2. **Dashboard**

- **Current Balance**: Displays the user’s current balance at a glance.
- **Income and Expenses**:
  - Current Month’s Income and Expenses.
  - Last Month’s Income and Expenses.
  - Income and Expenses for the Last Three Months.
- **Cumulative Data**:
  - Total Income.
  - Total Expenses.
- **Pie Chart**: Visual representation of cumulative income and expenses.
- **Recent Transactions**: Displays the last 5 transactions on the home screen.

### 3. **Transaction Management**

- **Add Transactions**:
  - Add income or expense transactions.
  - Supports custom categories for transactions.
- **View Transactions**:
  - **Edit Transactions**: Modify existing transaction details.
  - **Delete Transactions**: Remove unwanted transactions.
  - **Search Transactions**: Quickly find specific transactions.
  - **Search by Category**: Search transactions by category.
  - **Sort Transactions**: Sort transactions based on criteria like category, date, or type.
  - **Export Transactions**: Export Transactions in PDF format.

### 4. **Charts**

- **Bar Chart**:
  - Displays income and expenses for the last 12 months.

### 5. **Profile Management**

- **Edit Profile**: Update user profile details, including personal information and password.
- **Add Profile Picture**: Users can upload and update their profile picture.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/track-my-money.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd track-my-money
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the application**:

   ```bash
   npm run dev
   ```

5. **Open the application**:
   Visit `http://localhost:3000` in your browser.

## Technologies Used

- **Frontend**: React, Vite
- **State Management**: Redux Toolkit
- **Charts**: recharts
- **Styling**: CSS/SCSS, Bootstrap
- **Authentication**: Custom implementation
- **Backend**: JSON Server
- **Dependencies**: axios, formik, jspdf, jspdf-autotable, react-data-table-componenet, react-router-dom, bcryptjs, react-simple-captcha, yup.
- **Features**: PWA (Progressive Web App) support.

## Folder Structure

```
track-my-money/
├── public/
├── src/
|   ├── app/
│   │   ├── store.js
|   ├── assests/
│   │   ├── fonts/
│   │   ├── styles/
│   ├── components/
│   │   ├── TopNav.jsx
│   │   ├── SideNav.jsx
│   │   ├── Footer.jsx
│   │   └── Heading.jsx
│   ├── customeHooks/
|   ├── Features/
│   ├── pages /
│   │   ├── AddTransaction.jsx
│   │   ├── Charts.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Error.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── ViewTransactions.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

- Note: For brevity, only main folder structure are displayed. Additional components and files are included in the folder but not listed here.

## Future Enhancements

- Add notifications or reminders for bill payments.
- Implement dark mode for better user experience.

## Contribution

Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Track My Money** - Empowering you to take control of your finances!
