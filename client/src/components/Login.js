import { useEffect, useState } from "react";
import axios from "axios";
const cors = require('cors');
const querystring = require('querystring');


const client_id = 'c506328cd1044bbc890fe260bcfe4eeb'; // Your client id
const client_secret = 'd18b425514bc4ad5b287718c4faff4b3'; // Your secret
const redirect_uri = 'http://localhost:9000/login/callback'; // Your redirect uri
const scope = 'user-read-private user-read-email user-library-read playlist-modify-public';


export default function Login() {
    const authLink = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: 'http://localhost:3000'
    })
    /*
    const getAuth = () => {
        axios.get('http://localhost:9000/login/complete')
        .then(res => {
            console.log(res)
        })
    }
    */
    return (
        <>
            <head><link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css"></link></head>
            <body>
                <main class="container">
                    <a role="button" href={authLink}>Login with Spotify</a>
                </main>
            </body>
            
        </>
    )
}