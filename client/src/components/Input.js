import React from "react";

export default function Input() {
    return (
        <>
            <form class="container">
                <fieldset>
                    <div class="grid">
                        <label for="length">
                            Length:
                            <input type="number" placeholder="0 mins"></input>
                        </label>
                        <label for="genres">
                            Genres:
                            <input type="text" placeholder="hip-hop, r&b, house"></input>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Enter your vibe levels (0-10):</label>
                    <div class="grid text-center">
                        <div><input type="number" placeholder="0"></input>Start</div>
                        <div><input type="number"></input>1</div>
                        <div><input type="number"></input>2</div>
                        <div><input type="number"></input>3</div>
                        <div><input type="number"></input>4</div>
                        <div><input type="number"></input>5</div>
                        <div><input type="number"></input>6</div>
                        <div><input type="number"></input>7</div>
                        <div><input type="number"></input>8</div>
                        <div><input type="number"></input>9</div>
                        <div><input type="number" placeholder="10"></input>End</div>
                    </div>
                </fieldset>
                <fieldset>
                    <button type="submit">Generate</button>
                </fieldset>
            </form>
        </>
    )
}