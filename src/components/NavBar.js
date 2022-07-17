import React from 'react'
import {Navbar, Container, Offcanvas} from 'react-bootstrap'
export default function NavBar({videos}) {
  return (
    <div >
    {[false].map((expand) => (
    <Navbar  key={expand} bg="dark" expand={expand} className="mb-3">
      <Container  fluid>
        <Navbar.Toggle style={{backgroundColor:'white'}} aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
            </Offcanvas.Title >
            <h3>Related Videos</h3>
          </Offcanvas.Header>
          <Offcanvas.Body >
            <div>

    {
    videos.map(function(item, i){
    return  <iframe
    style={{
      marginTop:'75px',
      marginBottom:'75px',
      display:'flex',
      flexDirection:'column',
    }}
    width="350"
    height="180"
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
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  ))}

   

    </div>
  )
}
