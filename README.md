# 💰 Web Budget Calculator

A modern web application built with React + Vite to allow users and freelancers to calculate web project budgets interactively.

## 🚀 Features

- ✅ Select from 3 core services: SEO, Ads, and Web Development
- ✅ Customize the number of pages and languages for the Web service
- ✅ Auto-calculated pricing based on selected services
- ✅ Responsive and clean UI using TailwindCSS
- ✅ Help popups for form clarity (pages/languages)
- ✅ Budget generation with client name and contact info
- ✅ LocalStorage persistence
- ✅ View and delete previously generated budgets
- ✅ React Router for multi-page navigation (Welcome ↔ Calculator)

## 🛠️ Technologies Used

- **React** (with TypeScript)
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **React Router DOM** (routing)
- **Lucide React** (icons)

## 📁 Project Structure

```bash
src/
├── assets/ # Backgrounds, icons, and other static files
├── components/
│ └── ServiceCard.tsx # Service selection component with counters
├── pages/
│ ├── Welcome.tsx # Landing page
│ ├── Calculator.tsx # Main calculator form and budget logic
│ └── Budgets.tsx # List of generated budgets
├── styles/
│ └── index.css # Tailwind directives
├── App.tsx # Routes setup
├── main.tsx # App entry point
└── types.ts # Shared type definitions
```
## 🔢 Pricing Logic

- **SEO**: 300 €
- **Ads**: 400 €
- **Web**: 500 € base +  
  `(number of pages + number of languages) * 30 €`

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/web-budget-calculator.git
cd web-budget-calculator

```

2. Install dependencies:

```bash
npm install

```

3. Run the app locally:

```bash
npm run dev

```


## 🧪 Development Tips
All form state is managed using React’s useState.

Budgets are stored in localStorage and synchronized across sessions.

Modals use Tailwind + conditional rendering.

Use the Info icon next to Web service fields to trigger contextual help modals.


## 📌 Future Improvements
Form validation and error handling

Export budgets to PDF

Authentication for persistent user sessions

Backend support for saving budgets online
