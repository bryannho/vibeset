# vibeset

## Project Overview

vibeset is a full-stack web application designed to enhance your music listening experience by creating highly customized Spotify playlists. The application empowers users to generate playlists tailored to specific needs, whether it's for a workout, a study session, or just vibing.

### Key Features

*   **Duration-Based Playlists:** Specify the desired length of your playlist, and vibeset will curate tracks to fit that duration.
*   **Genre Customization:** Select your preferred music genres to ensure the playlist aligns with your taste.
*   **Energy Level Checkpoints:** Define the desired energy level (e.g., low, medium, high) at different points throughout the playlist, creating a dynamic listening journey.

### Technology Stack

*   **Frontend:** React
*   **Backend:** Node.js with Express.js framework
*   **External API:** Spotify API for accessing music data and playlist creation.

## Setup and Installation

### General Prerequisites

*   **Node.js:** Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/). npm (Node Package Manager) is usually included with Node.js. Alternatively, you can use Yarn.

### API Setup

1.  **Navigate to the API directory:**
    ```bash
    cd api
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Spotify API Credentials:**
    *   This application requires you to use your own Spotify Developer credentials. You can obtain these from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) by creating a new application.
    *   Once you have your `clientId` and `clientSecret`, you need to configure them for the API. This project uses a setup script to help you create an environment file (`.env`) for this purpose.
    *   In your terminal, ensure you are in the `api` directory (you should be if you followed step 1).
    *   Run the setup script:
        ```bash
        node setup_env.js
        ```
    *   The script will prompt you to enter your Spotify Client ID and Client Secret.
    *   Upon successful completion, it will create an `.env` file in the `api` directory containing your credentials.
    *   This `.env` file is already listed in `api/.gitignore`, so your sensitive credentials will not be committed to version control. The application is configured to automatically load these variables when it starts.

4.  **Start the API server:**
    ```bash
    npm start
    ```
    Alternatively, you can run:
    ```bash
    node ./bin/www
    ```
    The API server will typically run on `http://localhost:9000`.

### Client Setup

1.  **Navigate to the Client directory (from the project root):**
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the client development server:**
    ```bash
    npm start
    ```
    The client application will usually open automatically in your browser at `http://localhost:3000`.

## Usage

This section describes how to use vibeset to create your customized Spotify playlists once the setup and installation are complete and both the API and client servers are running.

1.  **Accessing the Application:**
    *   Open your web browser and navigate to `http://localhost:3000` (or the port your client server is running on, as indicated when you started it).

2.  **Authentication:**
    *   The first step is to log in with your Spotify account. Click the "Login with Spotify" button. You will be redirected to Spotify's authentication page.
    *   Grant the necessary permissions for vibeset to access your Spotify account details and manage your playlists.

3.  **Playlist Customization:**
    Once logged in, you will be presented with a form to define your playlist parameters:
    *   **Playlist Name:** Enter a name for your new playlist (e.g., "Morning Focus Mix", "Workout Power Hour").
    *   **Desired Duration:** Specify the total length of the playlist in minutes (e.g., 60 for a one-hour playlist).
    *   **Seed Genres:** Input a list of genres that will form the basis of your playlist. These should typically be entered as a comma-separated list (e.g., "electronic, deep-house, chillhop"). The application uses these genres to find suitable tracks.
    *   **Energy Checkpoints:** This innovative feature allows you to control the musical energy flow throughout your playlist.
        *   You can define multiple checkpoints, each representing a percentage of the total playlist duration (e.g., 0% for the beginning, 50% for the middle, 100% for the end).
        *   For each checkpoint, you set a desired energy level (e.g., low, medium, high).
        *   For example, you might want low energy at the start (0%), high energy in the middle (50%), and then a calming, low energy towards the end (100%). Vibeset will then attempt to select tracks that match this energy curve.

4.  **Generation:**
    *   After filling in all the customization details, click the "Generate Playlist" button (or a similarly named button).
    *   The application will then communicate with the Spotify API to find tracks matching your criteria and build the playlist. This might take a few moments.

5.  **Accessing the Playlist:**
    *   Upon successful generation, the application will typically display a confirmation message and provide a direct link to the newly created playlist on Spotify.
    *   The playlist will also automatically appear in your Spotify account, accessible from any device where you use Spotify.

## API Endpoints (Overview)

The backend API provides several endpoints to handle authentication and playlist generation. Here's a brief overview:

*   **`GET /login`**:
    *   Purpose: Initiates the Spotify OAuth 2.0 authorization code flow. Redirects the user to Spotify's login page.
*   **`POST /login/complete`**:
    *   Purpose: Handles the callback from Spotify after the user authorizes the application. Exchanges the authorization code for an access token and refresh token.
*   **`POST /login/refresh`**:
    *   Purpose: Refreshes an expired Spotify access token using a valid refresh token.
*   **`POST /generate`**:
    *   Purpose: The core endpoint for creating a customized Spotify playlist. Accepts user inputs such as playlist name, duration, seed genres, and energy checkpoints.
*   **`GET /testAPI`**:
    *   Purpose: A simple utility endpoint to confirm that the API server is running and responding to requests.

## Running Tests

### Client-Side Tests

The client-side application (React) includes a suite of tests using React Testing Library. These tests focus on rendering components correctly and verifying user interactions.

1.  **Navigate to the client directory (from the project root):**
    ```bash
    cd client
    ```
2.  **Run the tests:**
    ```bash
    npm test
    ```
    This command will launch the test runner in interactive watch mode.

### API-Side Tests

Currently, there is no dedicated automated test script (e.g., `npm test`) configured for the API.

*   **Manual Testing:** You can perform manual testing of the API endpoints using tools like Postman, Insomnia, or cURL. This involves sending requests to the various endpoints (e.g., `/login`, `/generate`) and verifying the responses after starting the API server (`cd api && npm start`).
*   **Integration Testing via Client:** The client application also serves as a form of integration test for the API, as its functionality relies on successful API interactions.

Adding a dedicated test suite with a test runner (like Jest or Mocha with Supertest) for the API would be a valuable future enhancement and contribution to the project.

## How It Works (High-Level)

vibeset intelligently crafts your playlists by following these key steps:

1.  **Spotify Authentication:**
    *   The application uses Spotify's secure OAuth 2.0 protocol. This allows you to log in with your Spotify credentials and grant vibeset permission to access your music data and create playlists on your behalf, without vibeset ever seeing your password.

2.  **Track Discovery:**
    *   Once authenticated, vibeset fetches an initial pool of tracks from Spotify. This selection is based on the "seed genres" you provide during playlist customization.

3.  **"VibeLevel" Calculation:**
    *   For each discovered track, the system retrieves its detailed audio features from Spotify. These features include metrics like `energy` (how intense and active a track feels), `danceability` (how suitable it is for dancing), `valence` (musical positiveness), and `loudness`.
    *   A custom heuristic algorithm then processes these audio features to compute a single "vibeLevel" score for each track. This score quantifies the overall mood and energy of the song.
    *   These vibeLevels are subsequently normalized (scaled to a standard range) to allow for consistent comparison and sorting across all tracks, regardless of their original feature values.

4.  **Playlist Structuring with Checkpoints:**
    *   The core of the customization lies in the "Energy Checkpoints." When you define checkpoints (e.g., "at 0% of the playlist, I want low energy; at 50%, high energy; at 100%, medium energy"), you're essentially creating an energy map for your playlist.
    *   vibeset divides the total desired playlist duration into segments according to these checkpoints.
    *   It then intelligently selects tracks whose normalized vibeLevels match the energy you've specified for each segment. The system aims to create smooth transitions between these energy levels, ordering tracks to follow your desired vibe progression.

5.  **Playlist Creation:**
    *   After selecting and ordering tracks to fit the specified duration and energy checkpoints, vibeset makes a final call to the Spotify API.
    *   This action creates a brand new playlist directly in your Spotify account, populated with the carefully curated tracks. You can then access and enjoy this playlist like any other.

## Future Enhancements

vibeset is a project with many exciting possibilities for growth. Here are some potential ideas for future development:

*   **Advanced Track Filtering:** Allow users to exclude specific artists or tracks, or even filter by explicit content.
*   **Playlist Presets:** Implement functionality to save and load playlist generation settings (duration, genres, energy checkpoints) as presets for quick reuse.
*   **User Accounts & History:** Introduce user accounts to save a history of generated playlists and perhaps personal preferences.
*   **Expanded "Vibe" Metrics:** Incorporate a wider range of Spotify audio features (e.g., acousticness, instrumentalness, liveness, speechiness, tempo) into the "vibeLevel" calculation for more nuanced results.
*   **Refined UI/UX:** Continuously improve the user interface and experience, perhaps with more visual feedback during playlist generation or more intuitive input methods.
*   **Comprehensive API Test Suite:** Develop a formal, automated test suite for the backend API to ensure robustness and facilitate easier refactoring (as mentioned in "Running Tests").
*   **Dynamic Checkpoint Suggestions:** Offer intelligent suggestions for energy checkpoints based on selected genres or playlist purpose.

## Contributing

Contributions to vibeset are highly welcome! Whether you have ideas for new features, bug fixes, or improvements to the existing codebase, your input is valuable.

*   **Issues:** Feel free to open an issue on the project's repository if you find a bug, have a suggestion, or want to discuss a potential change.
*   **Pull Requests:** If you'd like to contribute code, please fork the repository and submit a pull request with your changes.
    *   For minor fixes, direct pull requests are generally fine.
    *   For major features or changes, it's advisable to open an issue to discuss your plans first. This helps ensure that your contribution aligns with the project's goals and avoids duplicated effort.
*   **Coding Style:** While no strict linting rules are enforced yet, please try to maintain a clear and consistent coding style that aligns with the existing code. Add comments where necessary to explain complex logic.

We look forward to seeing your contributions!
