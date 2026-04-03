# Siridhanyalu App - E-commerce Millet Store

A modern, high-performance e-commerce web application for a millet store, built with React and Vite. It provides a seamless shopping experience for millets like Arikalu, Udalu, Korralu, and Andukorralu with premium aesthetics and smooth animations.

## 🌟 Features

- **Storefront & Product Catalog**: Bilingual product names (English and Telugu), multiple quantity selections (1/2kg, 1kg, 5kg), and flash sales.
- **Dynamic UX/UI**: Minimalist, aesthetic design matching the millets theme. Features smart dark/light mode toggles, scrolling effects, and animated interactive elements.
- **Robust Authentication**: Fully functioning local storage-backed user login and registration system.
- **Cart & Wishlist**: Persistent cart and wishlist states across sessions.
- **Multi-step Checkout Flow**: Professional checkout experience with a clickable progress bar, shipping/billing info collection, and mock payment gateway integration.
- **Advanced Order Management**: Dynamic shipping fees (free first delivery, flat fee afterwards) and a dedicated Orders history page for past transactions.
- **Post-Purchase Experience**: Detailed, thematic digital receipts and order confirmations.
- **Custom Notifications**: Replaced native browser alerts with custom, cohesive, animated validation UI components.
- **Content Sections**: Included Benefit cards, educational articles, blogs, and an "About Us" section regarding the health benefits of millets.

## 💻 Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router v7
- **Build Tool**: Vite (powered by `@vitejs/plugin-react`)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: `clsx` and `tailwind-merge` for scalable class management

## 🚀 Things Needed to Be Known

### Prerequisites
Make sure you have Node.js installed on your system.

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```

### Important Notes
- **State Management**: Authentication, shopping cart, wishlist, and user order history are persisted locally utilizing the browser's `localStorage`.
- **Payment Gateway**: The checkout utilizes a mock payment integration demonstrating the flow logic. No actual transactions occur.
- **Environment**: Ensure to test all functionalities within modern browsers to completely experience the Framer Motion animations.
