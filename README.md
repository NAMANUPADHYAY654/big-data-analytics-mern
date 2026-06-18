# Big Data Analytics MERN Dashboard

![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)

> **🚀 Live Production Deployment:** [https://frontend-phi-tawny-45.vercel.app](https://frontend-phi-tawny-45.vercel.app)

A massive, feature-rich Big Data Analytics platform built using the MERN stack (MongoDB, Express, React, Node.js) and Vite.

## 🌟 Key Features

*   **Interactive Sidebar Navigation:** Seamlessly switch between the Overview, Sales Analytics, and Raw Data Engine views.
*   **Client-Side Big Data Engine:** Generates and processes 5,000 highly realistic transaction records locally to simulate massive data scale without database latency.
*   **Dynamic Time Filtering:** Filter the entire dashboard by "Last 7 Days", "Last 30 Days", "1 Year", or "All Time" with real-time chart animations.
*   **Raw Data Table:** A paginated, searchable data grid to inspect individual events.
*   **CSV Export:** Instantly export the filtered raw data to a fully formatted, Excel-compatible CSV file directly from the browser.
*   **Advanced Visualizations:** Utilizing Recharts to render Area Charts (Revenue Trends), Bar Charts (Category Sales), and Pie Charts (Device Usage).

## 🛠️ Technology Stack

*   **Frontend:** React, Vite, TailwindCSS, Recharts, Lucide-React
*   **Deployment:** Vercel (Serverless / Static)

## 🚀 Running Locally

To run this project on your local machine:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/NAMANUPADHYAY654/big-data-analytics-mern.git
    cd big-data-analytics-mern
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.
