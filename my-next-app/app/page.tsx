"use client"


import React, { useEffect, useState } from "react";
import "./styles/home.css"
import "./styles/hotel.css" 
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
    const [famee, setfamee] = useState<string>("");
    const [trending, setTrending] = useState<any>([]);
    const [filteredTrending, setFilteredTrending] = useState<any>([]);

    const toHotel = (id:number)=>{
      router.push(`/hotel/${id}`)
    }
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(()=>{
      


      axios.get(`http://localhost:8080/api/destination/getall`).then((res)=>{
        setdestination(res.data)
        setTrending(res.data);
        const filtered = res.data.filter((dest: any) => dest.fame === "trending"); 
        setFilteredTrending(filtered);
      }).catch(error=>{console.error(error)})


      }, []) 



    const falter = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(event.target.value);
      console.log(value);
      const filtered = trending.filter((dest: any) => dest.fame === value);
      setFilteredTrending(filtered);
    };



    return (<div>

     <div className="header">

     <nav id="navBar" className='navbar-white'>
    {/* <Image className="logo" src="/img/logotr.png" width={120} height={120} alt="dtg" quality={75} priority={false}/> */}
    <ul className='nav-links'>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/contactus" className="active">Contact Us</a></li>
        {/* <input type="text" /> */}
      
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
<div onClick={()=>{toHotel(el.id)}} style={{cursor:"pointer"}}>
{/* {<img src={el.flag} width={25} height={25} alt="" />
<Image  src="/img/image-1.png" width={220} height={120} style={{borderRadius:10}} alt="dtg"  /> 
<img src={el.image}  width={220} height={120} style={{borderRadius:10}} alt="place"  />
<span>
    <h3 >{el.name}</h3>
    <p>$250</p>
</span>
</div> } */}

<div className="hotel-card">
                <div className="hotel-card-img">
                  <img src={el.image} alt={el.name} width={330} height={200} />
                </div>
                <div className="hotel-card-info">
                  <h2>{el.name}</h2>
                  <div className="hotel-description">
                    {el.description}
                  </div>
                </div>
              </div>
            </div>

)})}
   
    
</div>

<h2 className="sub-title">Trending Places</h2>
<div className="trending">
          {filteredTrending.map((dest: any) => (
            <div key={dest.id}>
              <img src={dest.image} width={230} height={280} style={{ borderRadius: 10 }} alt="dtg" />
              <h3>{dest.name}</h3>
            </div>
          ))}
        </div>

<div className="cta">
    <h3> Sharing <br /> is Earning Now</h3>
    <p>Great opportunity to make money by <br /> sharing your extra space.</p>
    <a href="/contactus" className="cta-btn">Contatct Us</a>
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

<a href="#" className="start-btn"> Start Now</a>
 
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






            </div>
      );
    
    
}