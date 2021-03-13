import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function TestComponent() {

    const [value, setValue] = useState("Loading...")

    useEffect(() => {
        (async function() {
            const {data} = await axios.get('/test-endpoint')            
            setValue(data.data)
        })()        
    }, [])

    return (
        <div>
            {value}
        </div>
    )
}
