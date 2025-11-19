# TalentQuest – Global Swipe-to-Apply Internship Platform

**Tagline:** *“Discover. Swipe. Apply. Track. Your global career journey starts here.”*

## Goal

A completely free, mobile-first internship discovery app for IT students and fresh graduates, focused on international and visa-sponsored positions. The platform uses **swipe-to-apply** for internships, auto-applies for users, and tracks every application—without any cost, paid APIs, or premium dependencies.

## Key Features

-   **Global Internship Aggregator (Web Scraping Engine):** Hand-written, modular web scraping scripts pull internship listings from a curated list of international job boards.
-   **Swipe-to-Apply Internships:** A Tinder-style UI for browsing internships. A right swipe triggers an automated application process, including AI-generated cover letters.
-   **AI-powered Profile & Application Document Builder:** A guided onboarding flow builds a rich student profile used to automatically generate resumes and cover letters using free Hugging Face models.
-   **Application Tracker & Status Dashboard:** Tracks all submitted applications, including status, reminders, and communications.
-   **Interview Simulator:** An AI-powered virtual interview simulator for various formats, using free Hugging Face models.
-   **Resource & Guidance Hub (Free):** A collection of guides, tips, and templates for the international internship search.

## Tech Stack Constraints

-   **Frontend:** React Native (no Expo), TypeScript, Tailwind CSS
-   **Backend:** Node.js (Express), MongoDB
-   **Web Scraping:** Hand-written scripts (e.g., Puppeteer, Playwright)
-   **AI Models:** Free Hugging Face models
-   **Authentication:** Firebase Authentication (free tier)

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
    Create a `.env` file in `packages/server` and add the required Firebase and MongoDB credentials.
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
