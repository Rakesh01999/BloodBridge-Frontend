# 🩸**BloodBridge(BBMS)**
## **Blood Bank Management System**

**BloodBridge** is a web-based Blood Bank Management System designed to manage and streamline blood donations, requests, and inventories efficiently. The system supports users( donor, patient) and admin roles, providing secure authentication, request approval workflows, and detailed reporting.

### **BloodBridge-Backend:**[Server-Side](https://github.com/Rakesh01999/BloodBridge-Backend/tree/rakesh)

## **Table of Contents**
- [Overview](#overview)
- [Live Link](#live-link)
- [Features](#features)
- [Technologies & Packages](#technologies--packages)
- [Installation](#installation)
- [Usage](#usage)
- [Contact Info](#contact-info)

---

## **Overview**

The BloodBridge Management System (BBMS) allows donors and patients to interact seamlessly with the platform for blood donations and requests, while administrators manage and monitor the blood inventory. The system offers secure login, intuitive dashboards, and smooth workflows for approving blood donations and requests. The admin role also has full control over user management and inventory updates.

---

## **Live Link**

Check out the live version of BloodBridge (BBMS):

**[BloodBridge Live](https://bloodbridge-bloodbank.web.app)**

---

## **Features**

### **Admin**
- Create, view, update, and delete donor and patient profiles.
- Manage blood group stocks and approve or reject blood donation and request submissions.
- Dashboard shows blood group stock levels, donor and patient counts, and the status of blood requests.

### **User (Donor & Patient)**
- Check donation and request history with statuses (Pending, Approved, Rejected).
- Submit and track donation requests.
- View the status of blood requests (Pending, Approved, Rejected).
- Track request history from the dashboard.

### **Other Features**
- JWT Authentication with role-based access.
- Role-specific dashboards (Admin, Donor, Patient).
- Real-time status updates for blood donations and requests.
- Responsive UI with modern design using Tailwind CSS and DaisyUI.
- Integration with React Query for data fetching and state management.

---

## **Technologies & Packages**

### **Frontend:**
- **React.js** - Frontend framework for building the user interface.
- **Tailwind CSS** & **DaisyUI** - For styling and building responsive, component-based UIs.
- **React Helmet Async** - Manage the document head for dynamic page titles.
- **SweetAlert2** - For beautiful, responsive modals and alerts.
- **React Icons** - To integrate icons such as delete (trash) icons.
- **React Query** - For handling server state management and asynchronous data fetching.

### **Backend:**
- **Node.js** - JavaScript runtime for the backend.
- **Express.js** - Web framework for building APIs.
- **MongoDB** - Database used for storing user information and blood donation data.
- **JWT (JSON Web Tokens)** - For authentication and securing endpoints.
---

## **Installation**

Follow these instructions to set up the project on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/username/BloodBridge-BBMS.git
   cd BloodBridge-BBMS
   ```

2. **Install dependencies for both the frontend and backend:**

   ```bash
   # Navigate to frontend folder
   cd frontend
   npm install

   # Navigate to backend folder
   cd backend
   npm install
   ```

3. **Create an `.env` file in both the frontend and backend folders:**

   Example `.env` for frontend:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

   Example `.env` for backend:
   ```
   PORT=5000
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the application:**

   ```bash
   # In the frontend folder
   npm start

   # In the backend folder
   npm run dev
   ```

---

## **Usage**

After installing and setting up the environment variables, you can start using the BBMS application by visiting `http://localhost:3000` in your browser.

### **Admin Login:**
- The admin can log in using the superuser credentials set in the backend database.
- Admin functionalities include managing blood requests and donations, user profiles, and blood inventory.

### **Donor/Patient Registration:**
- Users can sign up as either a donor or patient.
- Donors can submit donation requests and view history, while patients can request blood.


---

## **Contact Info**

For any queries or contributions, feel free to contact:

- **Name**: Rakesh Biswas
- **Email**: rbiswas01999@gmail.com
