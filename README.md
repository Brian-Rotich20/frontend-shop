# 🛍️ E-Commerce Frontend (Next.js + Tailwind CSS)

This is the frontend for a fully-featured e-commerce platform, built with **Next.js (App Router)**, **Tailwind CSS**, and powered by a **Django REST API backend**.

It includes a modern, mobile-first UI with authentication, product display, reviews, cart, checkout, and payment integrations (Stripe, PayPal, and Lipa na M-Pesa).

---

## ✨ Features

- ⚡ Fast, SSR-enabled frontend using Next.js App Router
- 🔐 Authentication with **NextAuth.js**
- 📦 Products, categories, product detail pages
- 🛒 Add to Cart, update quantity, remove items
- 🧾 Checkout page with billing info
- 💳 Payments via:
  - Stripe
  - PayPal
  - Lipa na M-Pesa (via Safaricom Daraja API)
- ✅ Order confirmation page
- 📜 Product reviews with rating breakdown
- 🔍 Search and filter support
- 🔁 Similar products section
- 📱 Mobile responsive
- 🎨 Built using **Tailwind CSS** and **shadcn/ui**

---

## 🧱 Tech Stack

| Area           | Tech                         |
|----------------|------------------------------|
| Framework      | Next.js (App Router)         |
| Styling        | Tailwind CSS + shadcn/ui     |
| State Mgmt     | useContext, useReducer       |
| Auth           | NextAuth.js (JWT-based)      |
| API Layer      | Axios                        |
| Fonts          | Google Fonts (e.g., Montserrat) |
| Images         | Cloudinary (via backend)     |
| Toasts         | React Hot Toast              |

---

## 🛠️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/Brian-Rotich20/frontend-shop-repo.git

