import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        axios.post('http://localhost:9000/login/complete', {
            code: code
        }).then(res => {
            console.log('Login Success: ', res.data)
            window.history.pushState({}, null, '/')
            setAccessToken(res.data.access_token)
            setRefreshToken(res.data.refresh_token)
            setExpiresIn(res.data.expiresIn)
        }).catch((err) => {
            window.location = '/'
            console.log('Error: ', err)
        })
    }, [code])
    
    useEffect(() => {
        if(!refreshToken || !expiresIn) return
        console.log(refreshToken)
        const timeout = setTimeout(() => {
            axios.post('http://localhost:9000/login/refresh', {
                refreshToken: refreshToken
            }).then(res => {
                console.log('Refresh Success: ', res.data)
                window.history.pushState({}, null, '/')
                setRefreshToken(res.data.refresh_token)
                setExpiresIn(res.data.expiresIn)
            }).catch((err) => {
                window.location = '/'
                console.log('Error: ', err)
            })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(timeout)
    }, [refreshToken, expiresIn])

    return accessToken
}