# TalentQuest

TalentQuest is a gamified, mobile-first recruitment app for tech students and early-career graduates.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/talentquest.git
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

## Running the app

1.  **Start the backend server:**
    ```bash
    yarn workspace server dev
    ```

2.  **Start the mobile app:**
    ```bash
    yarn workspace mobile start
    ```

    Then, run the app on your desired platform:
    ```bash
    yarn workspace mobile android
    ```
    or
    ```bash
    yarn workspace mobile ios
    ```
