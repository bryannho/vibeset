const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Spotify API Credentials Setup');
console.log('This script will help you create a .env file with your Spotify API credentials.');
console.log('Please find your Client ID and Client Secret from the Spotify Developer Dashboard (https://developer.spotify.com/dashboard).');
console.log('---');

rl.question('Enter your Spotify Client ID: ', (clientId) => {
  // Trim whitespace from clientId
  const trimmedClientId = clientId.trim();
  if (!trimmedClientId) {
    console.error('Error: Spotify Client ID cannot be empty.');
    rl.close();
    return;
  }

  rl.question('Enter your Spotify Client Secret: ', (clientSecret) => {
    // Trim whitespace from clientSecret
    const trimmedClientSecret = clientSecret.trim();
    if (!trimmedClientSecret) {
      console.error('Error: Spotify Client Secret cannot be empty.');
      rl.close();
      return;
    }

    const envContent = `SPOTIFY_CLIENT_ID=${trimmedClientId}
SPOTIFY_CLIENT_SECRET=${trimmedClientSecret}
# Optional: You can also define your redirect URI here if it differs from the default in login.js
# Example: REDIRECT_URI=http://localhost:3000/your-callback-path
`;

    const envPath = path.join(__dirname, '.env');

    fs.writeFile(envPath, envContent, (err) => {
      if (err) {
        console.error('Error writing .env file:', err);
      } else {
        console.log('---');
        console.log('.env file created successfully in the "api" directory!');
        console.log(`File path: ${envPath}`);
        console.log('---');
        console.log('IMPORTANT: If you are using version control (like Git), ensure that the .env file is listed in your .gitignore file to prevent committing your secrets.');
      }
      rl.close();
    });
  });
});

rl.on('close', () => {
  // This event is triggered when rl.close() is called.
  // process.exit(0) is implicitly handled by Node.js when rl is closed and no more async operations are pending.
  console.log('Setup script finished.');
});
