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

| Feature                               | Status |
| ------------------------------------- | ------ |
| Display product list                  | ✅     |
| Infinite scroll (20 per load)         | ✅     |
| Search products by name               | ✅     |
| "Add to Cart" button for each product | ✅     |

---

### **3. Shopping Cart**

| Feature                      | Status |
| ---------------------------- | ------ |
| Add products to cart         | ✅     |
| View cart per logged-in user | ✅     |
| Quantity adjustment          | ✅     |
| Remove items                 | ✅     |
| Calculate total amount       | ✅     |

---

### **4. Checkout Form (Simulation)**

| Feature                                                                                     | Status |
| ------------------------------------------------------------------------------------------- | ------ |
| Shipping information (Recipient, Address,Delivery notes )                                   | ✅     |
| Payment Information (Payment method, Card details, Card number)                             | ✅     |
| Form Validation with Zod                                                                    | ✅     |
| Order Completion Simulation (Display order summary, Confirm final amount, order completion) | ✅     |

---

### **5. Additional Requirements: Error & Loading Handling**

| Feature                         | Status |
| ------------------------------- | ------ |
| Loading states for API requests | ✅     |
|                                 | ✅     |

---

### **6. Code Quality**

| Feature                       | Status |
| ----------------------------- | ------ |
| TypeScript with strong typing | ✅     |
| Zod schema validation         | ✅     |
| Modular folder structure      | ✅     |
| Reusable components           | ✅     |
| React Hook Form integration   | ✅     |

---

### **7. Bonus / Optional**

| Feature                        | Status      |
| ------------------------------ | ----------- |
| Deployment (Vercel / Netlify)  | ⚙️ Optional |
| Product detail modal / preview | ⚙️ Optional |
| Wishlist simulation            | ⚙️ Optional |

---

---

## 📂 Folder Structure

## 📂 Folder Structure

- **src/**
  - **apis/**
  - **assets/**
  - **components/**
    - **atoms/**
    - **molecules/**
  - **constants/**
  - **hooks/**
  - **layout/**
  - **pages/**
  - **routers/**
  - **types/**
    - **auth/**
    - **dtos/**
  - **utils/**
  - **validation/**
  - **App.tsx**

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
