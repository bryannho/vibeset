import React from "react";

export default function Output({playlistURL}) {
    return (
    <>  
        <body>
            <main class="container">
                <hgroup>
                    <h2>Playlist Created!</h2>
                    <h3>Check your Spotify or view your playlist here:</h3>
                </hgroup>
                <a role="button" href={playlistURL} target="_blank" rel="noopener noreferrer">View on Spotify</a>
            </main>
        </body>
    </>
    )
}