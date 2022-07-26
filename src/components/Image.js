import React from 'react'

export default function Image({img}) {
  return (
    <div style={{
      position:'relative',
      color:'transparent'
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
