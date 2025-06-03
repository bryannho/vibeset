const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const axios = require('axios');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require('body-parser');

const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = 'http://localhost:9000/login/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 const generateRandomString = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  
const stateKey = 'spotify_auth_state';

let app = express();

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', function(req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email user-library-read playlist-modify-public';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }), {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
        });
});

app.post('/complete', function(req, res) {
    // haven't tried this
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: client_id,
        clientSecret: client_secret
    })
    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
            res.json({
                access_token: data.body.access_token,
                refresh_token: data.body.refresh_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

app.post('/refresh', function(req, res) {
    console.log('REFRESH TOKEN: ', req.body.refreshToken)
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refreshToken
    })
    spotifyApi
        .refreshAccessToken()
        .then((data) => {
            res.json({
                access_token: data.body.access_token,
                expires_in: data.body.expires_in
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})

module.exports = app;