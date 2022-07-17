import React from 'react'
import '../styles/Image.css'

export default function Image({img}) {
  return (
    <div style={{
      position:'relative'
    }}>
      <img src={img} alt={img} />
      {/* <button
      style={{
        position:'absolute',
        top:0,
        left:0,
        height:25,
        width:25,
      }}>+</button> */}
    </div>
  )
}
