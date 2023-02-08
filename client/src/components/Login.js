import { useEffect, useState } from "react";
import axios from "axios";
const cors = require('cors');
const querystring = require('querystring');


const client_id = ''; // Your client id
const client_secret = ''; // Your secret
const redirect_uri = 'http://localhost:3000'; // Your redirect uri
const scope = 'user-read-private user-read-email user-library-read playlist-modify-public';


export default function Login() {
    const authLink = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: 'http://localhost:3000'
    })

    return (
        <>
            <body>
                <main className="container">
                    <h1>Welcome to Vibeset.</h1>
                    <a role="button" href={authLink}>Login with Spotify</a>
                </main>
            </body>
        </>
        
    
    )
}