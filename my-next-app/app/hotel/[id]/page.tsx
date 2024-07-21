"use client"
import Image from 'next/image';
import "../../styles/hotel.css"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authcontex/Authcontex';



export default function Hotel() {
  const [data, setData] = useState<any>([]);
  const [allData, setAllData] = useState<any>([]); 
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const router = useRouter();
  const [ref, setRef] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { token } = useAuth();
  const { logOut } = useAuth();
  const items = 5;
  const [current, setCurrent] = useState(1);
  const NbPage = Math.ceil(data.length / items); 
  const handleNextPage = () => {
  if (current < NbPage) {
    setCurrent(current + 1);
  }
};
 const handlePrevPage = () => {
  if (current > 1) {
    setCurrent(current - 1);
  }
};
const startIndex = (current - 1) * items;
const endIndex = startIndex + items;
const DataPerPage = data.slice(startIndex, endIndex); 
const toHotelRooms = (id: number) => {
  localStorage.setItem("idhotel", JSON.stringify(id))
  router.push(`/rooms/${id}`);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const falter = (value: string) => {
    console.log(value);
    if (value === "all") {
      setData(allData);
    } else {
      const filtered = allData.filter((hotel: any) => hotel.type === value);
      setData(filtered);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/hotels/getone/${id}`).then((res) => {
      setData(res.data);
      setAllData(res.data); 
      console.log(res.data);
    }).catch(err => { console.log(err) });
  }, [ref]);

  return (
  
    <div>
     <nav id="mainNavigation" className='navbar-light'>
  <Image className="brandLogo" src="/img/logotr.png" width={120} height={120} alt="dtg" quality={75} priority={false} />
  <ul className='navigationLinks'>
    <li><a href="/" className="linkActive">Home</a></li>
    <li><a href="/contactus" className="linkActive">Contact Us</a></li>
  </ul>
  {!token ? (
    <a href="/auth" className="signupButton">
      Register Now
    </a>
  ) : (
    <div className="toggleGroup">
      <div className="toggleItem active">
        <img
          className="notificationIcon"
          src="https://th.bing.com/th/id/OIP.EkL3E_EYbt08OV84-Dm2GwAAAA?rs=1&pid=ImgDetMain"
          alt="notification"
        />
      </div>
      <div className="toggleItem" onClick={toggleDropdown}>
        <img
          className="userIcon"
          src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
          alt="User"
        />
      </div>
      {dropdownOpen && (
        <div className="dropdownContent">
          <ul>
            <li>
              <a href="/editprofile">Edit Profile</a>
            </li>
            <li>
              <a href="/auth" onClick={() => { logOut() }}>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )}
</nav>


      <div className="container2">
        
      </div>

      <div className='container'>
        <div className='list-container'>
        <div className="hotel-card-container">
      <div className='list-container'>
        <div className="left-col">
          <p>{data.length}+ Options</p>
          <h1>Recommended Places</h1>
          {DataPerPage.map((el: any) => (
            <div onClick={() => { toHotelRooms(el.id) }} className='house' key={el.id} style={{ cursor: "pointer" }}>
              <div className="hotel-card">
                <div className="hotel-card-img">
                  <img src={el.image} alt={el.name} width={330} height={200} />
                  <button className="favorite-btn"></button>
                </div>
                <div className="hotel-card-info">
                  <h2>{el.name}</h2>
                  <div className="hotel-rating">
                    <span className="stars">{"★".repeat(el.stars)}</span>
                  </div>
                  <div className="hotel-description">
                    {el.description}
                  </div>
                  <h3> <b>{el.nightPrice} dt</b></h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
          <div className='right-col'>
             <div className="sidebar">
           <h2>Select Filters</h2>
           <h3>Property Type</h3>
             <div className="filter">
    <button title="Add New"
    className="group cursor-pointer outline-none hover:rotate-90 duration-300" type="button" value={"house"} onClick={() => falter("house")}><svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke-width="1.5"
    ></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg></button><span> house</span>
              </div>
              <div className="filter">
                <button title="Add New"
  className="group cursor-pointer outline-none hover:rotate-90 duration-300" type="button" value={"hostel"} onClick={() => falter("hostel")}><svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke-width="1.5"
    ></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg></button><span> hostel</span>
              </div>
              <div className="filter">
                <button title="Add New"
  className="group cursor-pointer outline-none hover:rotate-90 duration-300" type="button" value={"hotel"} onClick={() => falter("hotel")}><svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke-width="1.5"
    ></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg></button><span> hotel</span>
              </div>
              <div className="filter">
                <button title="Add New"
  className="group cursor-pointer outline-none hover:rotate-90 duration-300" type="button" value={"villa"} onClick={() => falter("villa")}><svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke-width="1.5"
    ></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg></button><span> villa</span>
              </div>
              <div className="filter">
                <button title="Add New"
  className="group cursor-pointer outline-none hover:rotate-90 duration-300" type="button" value={"all"} onClick={() => falter("all")}><svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
  >
    <path
      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
      stroke-width="1.5"
    ></path>
    <path d="M8 12H16" stroke-width="1.5"></path>
    <path d="M12 16V8" stroke-width="1.5"></path>
  </svg></button><span> view all</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pagination">
          
          <Image className='arroo' src="/img/arrow.png" alt='arrow' width={15} height={20} onClick={handlePrevPage} style={{ cursor: 'pointer' }} />
         
        
         <span className='curreent'>{current}</span>
         
          <Image id='rightarro' className='arroo' src="/img/arrow.png" alt='arrow' width={15} height={20} onClick={handleNextPage} style={{ cursor: 'pointer' }}/>
        </div>

        <div className='footer'>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <hr />
          <p>Copyright 2021</p>
          <div className="footer-info">
            <p>Contact us: <a href="mailto:info@bookingagency.com">info@bookingagency.com</a></p>
            <p>Phone: +123 456 7890</p>
            <p>Address: 123 Booking St., City, Country</p>
          </div>
        </div>
      </div>
    </div>
  );
}
