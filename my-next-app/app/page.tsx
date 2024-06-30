"use client"


import React, { useEffect, useState } from "react";
import "./styles/home.css"
import axios from "axios";
import Image from 'next/image';
import { useAuth } from "./context/authcontex/Authcontex";
import { useRouter } from 'next/navigation';
export default function home (){
  const { logOut } = useAuth();
    const { user } = useAuth();
    const {token}=useAuth()
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const[destination,setdestination]=useState<any>([])
    const router = useRouter();

    const toHotel = (id:number)=>{
      router.push(`/hotel/${id}`)
    }
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };



    useEffect(()=>{
      axios.get("http://localhost:8080/api/destination/getall").then((resp)=>{
        setdestination(resp.data)
      }).catch((err)=>{
        console.log(err)
      }) 
    
    },[])

    return (<body>

     <div className="header">

     <nav id="navBar" className='navbar-white'>
    <Image className="logo" src="/img/logotr.png" width={120} height={120} alt="dtg" quality={75} priority={false}/>
    <ul className='nav-links'>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/contactus" className="active">Contact Us</a></li>
      
    </ul>
    {!token ? (
            <a href="/auth" className="register-btn">
             
              Register Now
            </a>
          ) : (
            <div className="toggle-container">
              <div className="toggle-option active">
                <img
                  className="noti"
                  src="https://th.bing.com/th/id/OIP.EkL3E_EYbt08OV84-Dm2GwAAAA?rs=1&pid=ImgDetMain"
                  alt="notification"
                />
              </div>
              <div className="toggle-option" onClick={toggleDropdown}>
                <img
                  className="usee"
                  src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
                  alt="User"
                />
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <a href="/editprofile">Edit Profile</a>
                    </li>
                   
                    <li>
                      <a href="/auth" onClick={()=>{logOut()}}>Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
    </nav>
<div className="container">
<h1>Find Your Next Stay</h1>
<div className="search-bar">
    <div id="for">
        <div className="location-input">
            <label >Location</label>
            <input type="text" placeholder="Where are you going?" />
        </div>
        <div>
            <label >Check in</label>
            <input type="text" placeholder="Add date" />
        </div>
        <div>
            <label >Check out</label>
            <input type="text" placeholder="Add date" />
        </div>
        <div>
            <label >Guest</label>
            <input type="text" placeholder=" Add Guest" />
        </div>
        <button> <Image  src="/img/search.png" width={20} height={20} alt="dtg" style={{marginTop:5 , marginLeft:7}} /></button>
    </div>
</div>
</div>
  </div>
  <div className="container">
<h2 className="sub-title">Exclusives</h2>
<div className="exclusives">
{destination.map((el:any,index:number)=>{
return(
<div onClick={()=>{toHotel(el.id)}}>
{/* <Image  src="/img/image-1.png" width={220} height={120} style={{borderRadius:10}} alt="dtg"  /> */}
<img src={el.image}  width={220} height={120} style={{borderRadius:10}} alt="place"  />
<span>
    <h3 >{el.name}</h3>
    <p>{el.flag} $250</p>
</span>
</div>


)})}
   
    
</div>

<h2 className="sub-title">Trending Places</h2>
<div className="tranding">

    <div>
    <Image  src="/img/dubai.png" width={230} height={280}style={{borderRadius:10}}  alt="dtg"  />
    <h3>Dubai</h3>
    </div>
    <div>
    <Image  src="/img/new-york.png" width={230} height={280}style={{borderRadius:10}}  alt="dtg"  />
    <h3>New York</h3>
    </div>
    <div>
    <Image  src="/img/paris.png" width={230} height={280}style={{borderRadius:10}}  alt="dtg"  />
    <h3>Paris</h3>
    </div>
    <div>
    <Image  src="/img/new-delhi.png" width={230} height={280}style={{borderRadius:10}}  alt="dtg"  />
    <h3>New Delhi</h3>
    </div>
    <div>
    <Image  src="/img/new-delhi.png" width={230} height={280}style={{borderRadius:10}}  alt="dtg"  />
    <h3>New Delhi</h3>
    </div>
    
</div>

<div className="cta">
    <h3> Sharing <br /> is Earning Now</h3>
    <p>Great opportunity to make money by <br /> sharing your extra space.</p>
    <a href="" className="cta-btn">know More</a>
</div>

<h2 className="sub-title">Travellers Stories</h2>

<div className="stories">
    <div>
    <Image  src="/img/story-1.png" width={350} height={400}style={{borderRadius:10}}  alt="dtg"  />
    <p>Popular European countries with  a budget of just $10,000</p>
    </div>
    <div>
    <Image  src="/img/story-2.png" width={350} height={400}style={{borderRadius:10}}  alt="dtg"  />
    <p>Popular European countries with  a budget of just $10,000</p>
    </div>
    <div>
    <Image  src="/img/story-3.png" width={350} height={400}style={{borderRadius:10}}  alt="dtg"  />
    <p>Popular European countries with  a budget of just $10,000</p>
    </div>
    
</div>

<a href="#" className="start-btn"> Start making money</a>
 
 <div className="about-msg">
    <h2>About my website</h2>
    <p>
    we believe that travel is more than just visiting new places—it's 
    about creating unforgettable memories,
     experiencing diverse cultures,
     and discovering the beauty of our world. 
     Whether you're seeking a serene beach escape,
      an adventurous mountain trek,
     or an immersive cultural journey, we're here to help you plan the perfect trip.
    </p>
 </div>
  </div>






            </body>
      );
    
    
}