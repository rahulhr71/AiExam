import React from 'react'
import { useEffect, useState } from 'react'
export default function DemoPage() {
    const wd=getScreenWidth()
    console.log(wd)
    return (
        <div>
            <p className='bg-red-700 text-white animate-ping'>demo</p>
        </div>
    )
}

function getScreenWidth() {
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        const onchange = () => setWidth(window.innerWidth)
        return () => window.removeEventListener('resize', onchange)
    }, [])
    return width;
}
