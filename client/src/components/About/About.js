import React from 'react'
import "./About.css"

const About = () => {
  return (
    <div >
      <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="box about w3-animate-opacity">
                <img src="./images/saket.jpeg" alt="saket" />
                <h1>Saket Aryan</h1>
                <p>Hey! This is me Saket. I'm a professional and passionate code copier.</p>
                <p>99.99%</p>
            </div>
            
            <div className="box about w3-animate-opacity">
                <h4>Connect With Me</h4>
                <a href="https://www.linkedin.com/in/saket-aryan-131356237/"><i className="fa-brands fa-linkedin fa-2x"></i></a>
                <a href="https://github.com/whysosaket/"><i className="fa-brands fa-github fa-2x"></i></a>
                <a href="https://www.instagram.com/saketaryann/"><i className="fa-brands fa-instagram fa-2x"></i></a>
                <a href="https://twitter.com/whysosaket"><i className="fa-brands fa-twitter fa-2x"></i></a>
                <a href="https://www.facebook.com/saket.aryan"><i className="fa-brands fa-facebook fa-2x"></i></a>
            </div>
          </div>
          <div className="carousel-item">
            <div className="box about w3-animate-opacity">
                <img src="./images/akshat.jpeg" alt="akshat" />
                <h1>Akshat Kumar</h1>
                <p>Hey there peeps! I'm Akshat. I'm a pro googler. </p>
                <p>In this project I handled some frontend and UI part of the project. Despite being pro googler I can't fix bugs :-(</p>
                <p><img src="./images/right.jpg" alt="right" className='right'/>Right? Right?</p>
            </div>
            
            <div className="box about w3-animate-opacity">
                <h4>Connect With Me</h4>
                <a href="https://www.linkedin.com/in/akshat-kumar-707183238/"><i className="fa-brands fa-linkedin fa-2x"></i></a>
                <a href="https://github.com/Akshatk871"><i className="fa-brands fa-github fa-2x"></i></a>
                <a href="https://www.instagram.com/akshat_.kumar/"><i className="fa-brands fa-instagram fa-2x"></i></a>
                <a href="https://twitter.com/akshat_kr871"><i className="fa-brands fa-twitter fa-2x"></i></a>
                <a href="https://www.facebook.com/akshat.ghosh871/"><i className="fa-brands fa-facebook fa-2x"></i></a>
            </div>
          </div>
          <div className="carousel-item">
            <div className="box about w3-animate-opacity">
                <img src="./images/harshit.jpg" alt="harshit"/>
                <h1>Kumar Harshit</h1>
                <p>Hey, this is Harshit.I am learning web development.</p>
                <p>In this project I have implemented some frontend.</p>
                <p><img src="./images/right.jpg" alt="right" className='right'/>Right? Right?</p>
            </div>
            
            <div className="box about w3-animate-opacity">
                <h4>Connect With Me</h4>
                <a href="https://www.linkedin.com/in/kumar-harshit-273174254"><i className="fa-brands fa-linkedin fa-2x"></i></a>
                <a href="https://github.com/Kumar-Harshit223"><i className="fa-brands fa-github fa-2x"></i></a>
                <a href="https://www.instagram.com/_harshit__22.3/"><i className="fa-brands fa-instagram fa-2x"></i></a>
                <a href="https://twitter.com/Harshit_22_3/"><i className="fa-brands fa-twitter fa-2x"></i></a>
                <a href="https://www.facebook.com/harshitkumar.kh.3"><i className="fa-brands fa-facebook fa-2x"></i></a>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default About