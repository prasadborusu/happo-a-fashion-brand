# Happo E-Commerce Suite

A modern, responsive e-commerce application built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog** - Browse fashion items with ratings and reviews
- 💳 **Order System** - Place orders with customer details  
- 📧 **Email Notifications** - Automatic order confirmation emails via EmailJS
- 💰 **Indian Rupee Pricing** - All prices displayed in INR
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal speed

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Email Service**: EmailJS
- **UI Components**: Radix UI (shadcn/ui)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   git clone <your-repo-url>
   cd happo-e-commerce-suite

2. Install dependencies:
   npm install

3. Set up environment variables:
   Create a .env file with your EmailJS credentials:
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id  
   VITE_EMAILJS_PUBLIC_KEY=your_public_key

4. Start the development server:
   npm run dev

5. Open http://localhost:8080 in your browser.

## EmailJS Setup

1. Create an account at https://www.emailjs.com/
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - {{to_name}} - Customer's name
   - {{product_name}} - Product name
   - {{product_price}} - Price in INR
   - {{customer_name}} - Customer's name
   - {{customer_email}} - Customer's email
   - {{customer_phone}} - Customer's phone
   - {{customer_address}} - Customer's address
   - {{order_date}} - Order date
4. Set the recipient email in your EmailJS template settings
5. Update the .env file with your credentials

## Available Scripts

- npm run dev - Start development server
- npm run build - Build for production
- npm run preview - Preview production build
- npm run lint - Run ESLint
- npm run test - Run tests
