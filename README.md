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
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Logo/
│   │   ├── PageTitle/
│   │   └── LoginLink/
│   ├── molecules/
│   │   └── FormField/
│   ├── organisms/
│   │   └── RegisterForm/
│   └── templates/
│       └── RegisterLayout/
├── features/
│   └── auth/
│       └── authSlice.js
├── pages/
│   └── RegisterPage.js
├── services/
│   └── api.js
├── store/
│   └── store.js
├── App.js
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
