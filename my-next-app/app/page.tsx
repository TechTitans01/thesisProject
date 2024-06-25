"use client"
import Image from "next/image";
import "./styles/home.css"
import { useEffect, useState } from "react"
import axios from "axios";

export default function Home() {
  const [hotel, sethotel] = useState<any[]>([])
  useEffect(() =>{
    axios.get("http://localhost:3000/hotels").then((res) => {
      console.log(res.data)
      sethotel(res.data)
      console.log(hotel)

    }
  )
  .catch((err) => {
    console.log(err)
  })
 
  })


  return (
    
    <div className="styles.container">
      <header className="styles.header">
        <Image src="/images/logo.png" alt="Acenda Logo" width={100} height={50} />
        <nav> 
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <div className="searchBar">
          <h1>Good Morning!</h1>
          <p>Explore beautiful places in the world with Acenda</p>
          <div className="searchForm">
            <input type="text" placeholder="Location" />
            <input type="date" placeholder="Check-in" />
            <input type="date" placeholder="Check-out" />
            <button>Search</button>
          </div>
        </div>
        <section className="inspiration">
          <h2>Inspiration for your next trip</h2>
          <div className="cards">
            <div className="card">Paris</div>
            <div className="card">Rome</div>
            <div className="card">London</div>
            <div className="card">Barcelona</div>
          </div>
        </section>
        <section className="partners">
          <h2>Our Partners</h2>
          <div className="partnerLogos">
            <span>Capytale</span>
            <span>Silverstay</span>
            <span>Hideaway</span>
            <span>Earthly</span>
            <span>The Nook</span>
          </div>
        </section>
        <section className="topBookNow">
          <h2>Top Book Now</h2>
          <div className="cards">
            <div className="card">Location 1</div>
            <div className="card">Location 2</div>
            <div className="card">Location 3</div>
            <div className="card">Location 4</div>
          </div>
        </section>
        <footer className="footer">
          <p>&copy; 2024 Acenda. All rights reserved.</p>
        </footer>
    </div>
  );
}