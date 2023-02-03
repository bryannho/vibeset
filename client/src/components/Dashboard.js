import React, { useState } from "react";
import useAuth from "./useAuth";
import Input from "./Input";
import Output from "./Output";

export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [playlistGenerated, setPlaylistGenerated] = useState(false)
    return (
        <>
            <head><link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css"></link></head>
            <body>
                <main class="container">
                    <h1>Welcome to VibeSet.</h1>
                    {playlistGenerated ? <Output /> : <Input />}
                </main>
            </body>
        </>
    )
}