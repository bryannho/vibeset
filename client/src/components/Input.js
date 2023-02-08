import React, { useRef, useState } from "react";
import { availableGenres} from "./Utils"
import axios from "axios";


export default function Input({props}) {
    const lengthRef = useRef()
    const genreRef = useRef()
    const nameRef = useRef()
    const [length, setLength] = useState(0)
    const [genres, setGenres] = useState('')
    const [name, setName] = useState('')
    const [checkpointExports, setCheckpointExports] = useState([])
    const [checkpoints, setCheckpoints] = useState([
        { location: 0, vibeLevel: -1 },
        { location: 1, vibeLevel: -1 },
        { location: 2, vibeLevel: -1 },
        { location: 3, vibeLevel: -1 },
        { location: 4, vibeLevel: -1 },
        { location: 5, vibeLevel: -1 },
        { location: 6, vibeLevel: -1 },
        { location: 7, vibeLevel: -1 },
        { location: 8, vibeLevel: -1 },
        { location: 9, vibeLevel: -1 },
        { location: 10, vibeLevel: -1 }
    ])

    const makePlaylist = (input) => {
        axios
            .post('http://localhost:9000/generate', {
                input
            })
            .then((res) => {
                console.log('Success: ', res)
                props.pull({
                    generated: true,
                    playlistURL: res.data.playlistURL
                })
            })
            .catch((err) => {
                console.log('Error: ', err)
            })
    }

    const submitInput = (e) => {
        e.preventDefault()
        
        makePlaylist({
            accessToken: props.accessToken,
            name: name,
            length: length,
            genres: genres,
            checkpoints: checkpointExports
        })
        console.log('Token', props.accessToken)
    }

    const changeLength = () => {
        const l = (+lengthRef.current.value)
        setLength(l)
    }

    const changeGenres = () => {
        const genreString = genreRef.current.value
        const genreArr = genreString.toLowerCase().split(/[, ]+/)
        const validGenres = genreArr.filter(item => availableGenres.includes(item))
        let newGenres = ''
        validGenres.forEach((item) => {
            newGenres += item + ','
        })
        setGenres(newGenres.slice(0, -1))
    }

    const changeName = () => {
        const nameString = nameRef.current.value
        setName(nameString)
    }

    const changeCheckpoints = (val, index) => {
        let temp = checkpoints.map(i=>i);
        temp[index] = {
            location: index,
            vibeLevel: (+val.target.value)
        };
        setCheckpoints(temp);
        temp = temp.filter((checkpoint) => {
            return checkpoint.vibeLevel >= 1 && checkpoint.vibeLevel <= 10
        })
        setCheckpointExports(temp)
    }

    return (
        <>
            <form class="container">
                <fieldset>
                    <label for="name">
                        Enter a name for the playlist:
                        <input type="text" onChange={changeName} ref={nameRef} placeholder="Bryan's Vibeset" required></input>
                    </label>
                </fieldset>
                <fieldset>
                    <div class="grid">
                        <label for="length">
                            Length:
                            <input type="number" onChange={changeLength} ref={lengthRef} placeholder="0 mins" min="0" max="360" required></input>
                        </label>
                        <label for="genres">
                            Genres:
                            <input type="text" onChange={changeGenres} ref={genreRef} placeholder="hip-hop, r-n-b, house" required></input>
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Enter your vibe levels (1-10):</label>
                    <div class="grid text-center">
                        {checkpoints.map((value, index) => {
                            if(index === 0) {
                                return <div><input key={index} onChange={(val) => {changeCheckpoints(val, index)}} type="number" min="1" max="10" placeholder="1" required/>Start</div>
                            }
                            else if(index ===10) {
                                return <div><input key={index} onChange={(val) => {changeCheckpoints(val, index)}} type="number" min="1" max="10" placeholder="10" required/>End</div>
                            }
                            else {
                                return <div><input key={index} onChange={(val) => {changeCheckpoints(val, index)}} type="number" min="1" max="10" default="-1"/>{index}</div>
                            }
                        })}
                    </div>
                </fieldset>
                <button type="submit" onClick={submitInput}>Generate</button>
            </form>
        </>
    )
}