# Secure Password Manager (Zero Vault)

> **Status:** 🟢 Completed (v1.0.0)
>
> A secure, AES-256 encrypted password vault built with React, TypeScript, and Tailwind CSS.
> Features zero-knowledge architecture, biometric-ready auth, and a beautiful glassmorphism UI.

![Vault Preview](https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600&h=400)

## Table of Contents

- [Intro](#intro)
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installing and Running](#installing-and-running)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Intro

**Secure Password Manager** allows you to securely store, manage, and generate credentials directly from your browser. It follows a "Zero-Knowledge" architecture, meaning your master password never leaves your device.

## About

This project was built as part of a **7-Day Sprint** to demonstrate modern frontend capabilities, security best practices, and advanced React patterns. It is designed to be a personal, offline-first vault handling sensitive data with industry-standard encryption standards (AES-256).

It runs entirely client-side (for this version), ensuring that your secrets remain under your control.

## Features

- **Zero-Knowledge Architecture:** No server-side storage of unencrypted data.
- **AES-256 Encryption:** All vault entries are encrypted before storage.
- **Biometric-Ready Auth:** Mocked implementation ready for WebAuthn integration.
- **Dynamic Theming:**
    - Light / Dark Mode support.
    - 6 Accent Color presets (Violet, Blue, Emerald, Amber, Rose, Cyan).
- **Smart Password Generator:**
    - Customizable length (8-32 chars).
    - Options for Uppercase, Numbers, and Symbols.
    - Real-time Strength Meter.
- **CRUD Operations:**
    - Add, Edit, and Delete credentials.
    - "Favorite" entries for quick access.
    - One-click Copy-to-Clipboard with toast notifications.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.

## Tech Stack

- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Context API
- **Testing:** [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/)

## Installing and Running

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/secure-password-manager.git
    cd secure-password-manager
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate static files in the `dist` directory, ready to be deployed to Vercel, Netlify, or AWS S3.

### 🧪 Running Tests

We use a modern testing stack to ensure reliability and security.

*   **Test Runner:** [Vitest](https://vitest.dev/) (Blazing fast, Vite-native)
*   **Assertions:** [React Testing Library](https://testing-library.com/) (Component testing)
*   **Environment:** jsdom (Browser simulation)

#### Execute Unit Tests
Run the full test suite to verify cryptographic utilities and core logic:

```bash
npm test
```

#### What's Tested?
*   **Crypto Utils:** Verifies that password generation obeys length and character rules.
*   **Strength Meter:** Ensures the strength calculation algorithm is accurate.
*   **Validation:** Checks that security constraints are enforced.

## Usage

### 1. Initial Unlock
*   **Default Master Password:** `1234`
*   Enter this password to decrypt the vault. If you enter it incorrectly, the vault remains sealed.

### 2. Dashboard
*   **View Entries:** Scroll through your stored credentials.
*   **Search**: Filter by Website or Username using the top search bar.
*   **Add Entry:** Click the **+** button or "Add Entry" to create a new credential.
*   **Actions:** Hover over an entry to:
    *   👁️ Reveal Password
    *   📋 Copy Password
    *   ✏️ Edit Entry
    *   🗑️ Delete Entry

### 3. Password Generator
*   Navigate to the **Generator** tab via the sidebar.
*   Adjust sliders and toggles to create a secure password.
*   Click **Copy** or **Refresh** to get a new one.

### 4. Customization
*   Go to **Settings**.
*   Toggle between Light/Dark mode.
*   Select your preferred Accent Color to match your style.

## Project Structure

```bash
```bash
src/
├── components/           # Reusable UI Components
│   ├── Navigation.tsx    # Sidebar/Mobile Menu associated logic
│   ├── VaultItem.tsx     # Individual password entry card
│   └── EntryModal.tsx    # Add/Edit form using Dialog
├── context/              # Global State Management (React Context)
│   ├── AuthContext.tsx   # Master Password & Unlock State
│   ├── VaultContext.tsx  # CRUD operations & Encryption logic
│   └── ThemeContext.tsx  # Dark/Light mode & Accent colors
├── data/                 # Static Data & Types
│   └── mock.ts           # Initial seed data (if any)
├── pages/                # Application Views
│   ├── Dashboard.tsx     # Main Vault View
│   ├── Generator.tsx     # Password Generator Tool
│   ├── Settings.tsx      # App Preferences
│   └── Unlock.tsx        # Login Screen
├── utils/                # Core Logic Modules
│   ├── crypto.ts         # AES-256 Encryption/Decryption wrappers
│   └── generator.ts      # Password generation algorithm
├── tests/                # Unit & Integration Tests
│   ├── setup.ts          # Vitest environment configuration
│   └── generator.test.ts # Tests for generator utility
├── App.tsx               # Main Router & Provider composition
└── main.tsx              # Application Entry Point
```

## Troubleshooting

### "Vite command not found"
Ensure you have installed dependencies correctly:
```bash
npm install
```

### "Styles are missing"
Make sure Tailwind CSS is generating styles. Check if `index.css` contains the Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### "Linting Errors"
The project uses strict ESLint rules. You can try to fix autofixable errors with:
```bash
npm run lint -- --fix
```

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

**Copyright © 2026 Secure Password Manager Contributors.**
where 