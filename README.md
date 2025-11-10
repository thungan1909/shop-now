# 🛍️ E-Commerce Application (Assignment)

A modern React + TypeScript e-commerce web app built with DummyJSON API.  
Users can log in, browse products, add to cart, and complete a simulated checkout.

---

## 🧠 Technical Stack

- React + TypeScript
- Tailwind CSS + Framer Motion + Shadcn/UI
- React Hook Form + Zod
- React Router DOM
- DummyJSON API ([https://dummyjson.com](https://dummyjson.com))

## ✅ Feature Checklist (Based on Requirements)

### **1. Login**

| Feature                                        | Status |
| ---------------------------------------------- | ------ |
| Implement user authentication                  | ✅     |
| JWT token management                           | ✅     |
| Redirect to product page after login           | ✅     |
| Protect cart page for authenticated users only | ✅     |

---

### **2. Product List**

| Feature                       | Status |
| ----------------------------- | ------ |
| Display product list          | ✅     |
| Infinite scroll (20 per load) | ✅     |
| Search products by name       | ✅     |
| “Add to Cart” button          | ✅     |

---

### **3. Shopping Cart**

| Feature                             | Status |
| ----------------------------------- | ------ |
| Add products to cart                | ✅     |
| View cart per logged-in user        | ✅     |
| Adjust quantity                     | ✅     |
| Remove items                        | ✅     |
| Calculate total amount              | ✅     |
| Empty cart illustration & modern UI | ✅     |

---

### **4. Checkout Form (Simulation)**

| Feature                                                  | Status             |
| -------------------------------------------------------- | ------------------ | --- |
| Shipping information (name, phone, email, address, note) | ✅                 |
| Payment method selection (Card / PayPal)                 | ✅                 |
| Card details input (number, expiry, CVV)                 | ✅                 |
| Auto-format card number (`1234-5678-9012-3456`)          | ✅                 |
| Expiry date regex validation (`/^(0[1-9]                 | 1[0-2])\/\d{2}$/`) | ✅  |
| CVV max length 3                                         | ✅                 |
| Real-time field validation with Zod                      | ✅                 |
| Order summary display                                    | ✅                 |
| Simulated order completion flow                          | ✅                 |
| PUT /users/{id} to save address                          | ✅                 |
| DELETE /carts/{id} to clear cart                         | ✅                 |
| Order confirmation screen (animated)                     | ✅                 |

---

### **5. UI / UX**

| Feature                                           | Status |
| ------------------------------------------------- | ------ |
| Tailwind CSS styling                              | ✅     |
| Modern design with rounded corners, shadows       | ✅     |
| Responsive layout                                 | ✅     |
| Framer Motion animations                          | ✅     |
| Empty & success state illustrations               | ✅     |
| Consistent button design (rounded, hover effects) | ✅     |

---

### **6. Error & Loading Handling**

| Feature                                     | Status |
| ------------------------------------------- | ------ |
| Loading states for API requests             | ✅     |
| Error fallback messages                     | ✅     |
| Graceful handling for DummyJSON limitations | ✅     |

---

### **7. Code Quality**

| Feature                       | Status |
| ----------------------------- | ------ |
| TypeScript with strong typing | ✅     |
| Zod schema validation         | ✅     |
| Modular folder structure      | ✅     |
| Reusable components           | ✅     |
| React Hook Form integration   | ✅     |

---

### **8. Bonus / Optional**

| Feature                        | Status      |
| ------------------------------ | ----------- |
| Deployment (Vercel / Netlify)  | ⚙️ Optional |
| Product detail modal / preview | ⚙️ Optional |
| Wishlist simulation            | ⚙️ Optional |

---

---

## 🧩 Folder Structure

src/
├── assets/
├── components/
│ ├── atoms/
│ ├── molecules/
│ └── organisms/
├── hooks/
├── pages/
├── routers/
├── schemas/
├── services/
├── types/
└── App.tsx

---

## ⚙️ How to Run

```bash
# Clone repository
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app

# Install dependencies
npm install

# Start dev server
npm run devs
```
