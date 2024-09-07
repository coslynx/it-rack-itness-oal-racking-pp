<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
  FitTrack - Fitness Goal Tracking and Sharing
</h1>
<h4 align="center">A web application to simplify fitness goal tracking and achievement sharing.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework used for building the application">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="Frontend technologies used">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend technology used">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-blue" alt="Database used">
  <img src="https://img.shields.io/badge/Authentication-NextAuth.js-blue" alt="Authentication library used">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/FitTrack-MVP?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/FitTrack-MVP?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/FitTrack-MVP?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains the code for a Minimum Viable Product (MVP) of FitTrack, a web application aimed at simplifying fitness goal tracking and achievement sharing. It leverages the power of a modern tech stack: Next.js for frontend development, Node.js for backend functionality, and a PostgreSQL database for data storage. FitTrack offers a user-friendly interface and social features that encourage motivation and community engagement.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **User Authentication**   | Secure user registration and login using email/password or Google Sign-in.                                  |
| 🎯 | **Goal Setting**         | Define personalized fitness goals with specific parameters, such as target weight, workout frequency, or distance. |
| 📈 | **Progress Tracking**     | Track workouts, nutrition, and overall progress towards goals, with detailed visualizations.                    |
| 🤝 | **Social Sharing**       | Share achievements, progress updates, and motivational messages with friends within the app.                   |

## 📂 Structure
```text
FitTrack-MVP
├── app
│   ├── layout
│   │   └── page.js
│   └── page
│       └── index.js
├── components
│   ├── Header.jsx
│   ├── GoalInput.jsx
│   ├── ProgressChart.jsx
│   ├── SocialShareButton.jsx
│   └── Button.jsx
├── lib
│   ├── auth.ts
│   └── api.ts
├── pages
│   ├── api
│   │   ├── auth.ts
│   │   ├── goals.ts
│   │   └── progress.ts
│   ├── _app.tsx
│   ├── index.tsx
│   ├── dashboard.tsx
│   └── login.tsx
├── styles
│   └── global.css
├── config
│   └── next-auth.config.ts
├── middleware
│   └── authentication.ts
├── .env
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js (LTS version recommended)
- npm (or yarn)
- A free Supabase account (for database)

### 🚀 Setup Instructions
1. Clone the repository:
   - `git clone https://github.com/coslynx/FitTrack-MVP.git`
2. Navigate to the FitTrack-MVP directory:
   - `cd FitTrack-MVP`
3. Install dependencies:
   - `npm install`
4. Create a `.env` file in the root directory of the project and add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`:  Your Supabase URL (found in the Supabase dashboard)
   - `NEXT_PUBLIC_SUPABASE_KEY`: Your Supabase API key (found in the Supabase dashboard)
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Your Google Client ID for authentication
   - `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`: Your Google Client Secret for authentication

## 🏗️ Usage
### 🏃‍♂️ Running the FitTrack MVP
1. Start the development server:
   - `npm run dev`
2. Open your browser and navigate to `http://localhost:3000`.

### ⚙️ Configuration
- Adjust configurations in `next.config.js` for deployment settings and optimization.
- Update the `next-auth.config.ts` file for authentication providers.

### 📚 Examples
- **Setting a goal:**
  - Log in to your account.
  - Navigate to the "Goals" section.
  - Enter the desired goal (e.g., "Lose 5 pounds") and specify any relevant parameters (e.g., timeframe, target weight).
  - Click "Add Goal". 
- **Tracking progress:**
  - Log in to your account.
  - Navigate to the "Dashboard" section.
  - Record workouts and nutrition entries for each day.
  - Visualize progress charts for different metrics.
- **Sharing achievements:**
  - Log in to your account.
  - Create a post celebrating your achievements.
  - Share the post with friends who are connected on the platform. 

## 🌐 Hosting
### 🚀 Deployment Instructions
1. **Set up a Supabase database:**
   - Create a new Supabase project.
   - Create tables to store user data, goals, progress, and social interaction data.
   - Set up authentication with Supabase to enable secure user registration and login.
2. **Configure environment variables:**
   - Create a `.env` file in the root directory of the project.
   - Replace the placeholders in the `.env` file with your Supabase URL, API key, and Google authentication credentials.
3. **Deploy the application:**
   - Use Vercel to deploy the application:
     - `vercel` 
   - Use Netlify:
     - `netlify deploy`
   - Use GitHub Pages:
     - Configure a GitHub Actions workflow for automatic deployment.

## 📜 API Documentation
### 🔍 Endpoints
- **GET /api/auth/session**:  Fetches the current user session information.
- **POST /api/goals**: Creates a new fitness goal for the current user.
- **GET /api/goals**:  Retrieves all goals for the current user.
- **PUT /api/goals/:id**: Updates an existing goal.
- **DELETE /api/goals/:id**: Deletes a goal.
- **POST /api/progress**: Logs workout or nutrition data for the current user.
- **GET /api/progress**:  Retrieves the user's progress data.
- **POST /api/social/posts**: Creates a new social post.
- **GET /api/social/posts**: Retrieves social posts.

### 🔒 Authentication
Use JWT tokens for authentication with NextAuth.js.

### 📝 Examples
- **Fetching goals:**
  ```bash
  curl -X GET http://localhost:3000/api/goals -H "Authorization: Bearer [JWT token]"
  ```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors
- **Author Name** - [CosLynx.com](https://coslynx.com)
- **Creator Name** - [CosLynxAI](https://github.com/coslynx)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</div>