# Zero Vault (Secure Password Manager)

A secure, zero-knowledge password manager built with modern web technologies. This project focuses on privacy, security, and a seamless user experience.

![Preview](https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1600&h=400)

## 🚀 Key Features

### Core Vault Functionality
- **Secure Entry Management**: Add, edit, and delete password entries securely.
- **Category Organization**: Organize entries by categories for better accessibility.
- **Favorites System**: Mark important entries as favorites for quick access.
- **Search & Filter**: Real-time search across entries.

### Security Features
- **Zero-Knowledge Architecture**: Your master password never leaves your device.
- **AES-256 Encryption**: Industry-standard encryption for all stored data.
- **Password Generator**: Create strong, unbreakable passwords with customizable options.
- **Clipboard Management**: Secure copy-paste functionality with toast notifications.

### User Experience
- **Dark Glass UI**: Premium glassmorphism design with backdrop blur effects.
- **Dynamic Theming**: Support for Light/Dark modes and multiple accent colors.
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices.
- **Smooth Animations**: High-performance transitions powered by Framer Motion.

## 🛠️ Technology Stack

- **React 19 + TypeScript**: Robust and type-safe component architecture.
- **Vite**: Lightning-fast build tool and development server.
- **Tailwind CSS**: Utility-first styling with a custom theme system.
- **Framer Motion**: smooth and performant UI animations.
- **Lucide React**: Modern, consistent icon library.
- **Wouter**: Lightweight and flexible routing.

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Guru006-Dev/Zero-vault.git
    cd Zero-vault
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🛡️ Security Note

This application implements **client-side encryption** using AES-256. While robust, for production environments, consider additional layers such as:
- Secure cloud backup integration.
- Hardware-backed key storage (WebAuthn).
- PBKDF2/Argon2 for master password hashing.

---

**Copyright © 2026 Zero Vault Contributors.**
