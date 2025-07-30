import React from 'react'
import { useEffect,useState } from 'react'
export default function DemoPage() {
  return (
    <div>
      demo
    </div>
  )
}

function getScreenWidth(){
    const [width,setWidth]=useState(window.innerWidth)
        useEffect(()=>{
            
                const onchange=()=>setWidth(window.innerWidth)
                return ()=>window.removeEventListener('resize',onchange)
        

        },[])
    return width;
    }
