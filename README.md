# TalentQuest – Global Internship Connect

TalentQuest is a globally-accessible, AI-powered platform helping students and fresh graduates from anywhere to discover and win internships worldwide. It offers state-of-the-art readiness assessment, personalized preparation, and seamless global application tools.

## Key Features

*   **Global Internship Discovery & Aggregation:** Automatically scrapes and aggregates IT internships worldwide, with filters for visa sponsorship, remote/in-office, location, skills, and more.
*   **Conversational AI Mentor ("Aria"):** Guides students through onboarding, profile building, and internship search with personalized recommendations.
*   **Internship Readiness Passport:** Analyzes a student's profile to generate a dynamic, AI-scored “readiness passport,” visualizing their eligibility for global roles.
*   **Interview Simulator:** An interactive AI-powered practice engine for live coding, system design, technical quizzes, and behavioral interviews.
*   **Application Toolkit & Tracking:** Tools to create, submit, and track internship applications globally, with multilingual document support.
*   **Resource Hub:** A collection of guides and tips for international internship processes.

## Tech Stack

*   **Frontend:** React Native (without Expo), TypeScript, Tailwind CSS
*   **Backend:** Node.js (Express), MongoDB
*   **AI/ML:** Placeholder for Hugging Face models, Google Cloud NLP
*   **Authentication:** Firebase Authentication

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd talentquest
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `packages/server` directory and add the following:
    ```
    MONGODB_URI=<your-mongodb-connection-string>
    FIREBASE_PROJECT_ID=<your-firebase-project-id>
    FIREBASE_PRIVATE_KEY=<your-firebase-private-key>
    FIREBASE_CLIENT_EMAIL=<your-firebase-client-email>
    ```

4.  **Seed the database:**
    ```bash
    yarn workspace server seed
    ```

## Running the App

1.  **Start the backend server:**
    ```bash
    yarn workspace server dev
    ```

2.  **Start the Metro bundler:**
    ```bash
    yarn workspace mobile start &
    ```

3.  **Run the mobile app:**
    ```bash
    # For Android
    yarn workspace mobile android

    # For iOS
    yarn workspace mobile ios
    ```
