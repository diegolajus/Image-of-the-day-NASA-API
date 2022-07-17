import React from 'react'

export default function Videos({videos}) {
  console.log(videos)
  return (
    <div className='videos-container'>
    {
    videos.map(function(item, i){
    return  <iframe
    width="350"
    height="190"
    src={`https://www.youtube.com/embed/${item}`}
    frameBorder="0"
    key={i}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube"
    />;
    })
    }
    </div>
  )
}
