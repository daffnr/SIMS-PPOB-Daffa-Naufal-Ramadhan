# SIMS PPOB

## Fitur

- Struktur Atomic Design (Atoms, Molecules, Organisms, Templates, Pages)
- State Management dengan Redux Toolkit
- Halaman Login, Register, Dashboard, Top up, Transaction, Akun
- Responsive design
- Dashboard dengan data real-time

## Struktur Project

```
src/
├── components/
│   ├── atoms/
│   │   ├── Avatar/
│   │   ├── BalanceCard/
│   │   ├── BannerCard/
│   │   ├── Button/
│   │   ├── DefaultAvatar/
│   │   ├── Input/
│   │   ├── LoginButton/
│   │   ├── LoginLink/
│   │   ├── LoginPageTitle/
│   │   ├── Logo/
│   │   ├── PageTitle/
│   │   ├── RegisterLink/
│   │   └── ServiceCard/
│   ├── molecules/
│   │   ├── BannerSlider/
│   │   ├── FormField/
│   │   └── ServiceGrid/
│   ├── organisms/
│   │   ├── Dashboard/
│   │   ├── LoginForm/
│   │   └── RegisterForm/
│   └── templates/
│       ├── LoginLayout/
│       └── RegisterLayout/
├── features/
│   ├── auth/
│   │   └── authSlice.js
│   └── dashboard/
│       └── dashboardSlice.js
├── pages/
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── PaymentPage.js
│   ├── ProfilePage.js
│   ├── RegisterPage.js
│   ├── TopUpPage.js
│   └── TransactionPage.js
├── services/
│   └── api.js
├── store/
│   └── store.js
├── App.js
├── index.css
└── index.js
```

## Instalasi

1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan development server:
   ```bash
   npm start
   ```

## Teknologi yang Digunakan

- React 18
- Redux Toolkit
- Styled Components
- React Router DOM
