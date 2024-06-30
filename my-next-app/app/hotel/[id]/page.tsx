"use client"

import Image from 'next/image';

import "../../styles/hotel.css"
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function hotel() {
  const [data,setData] = useState<any>([])
  const pathname = usePathname()
  const id = pathname.slice(pathname.length-1)
  const router = useRouter();
  const toHotelrooms = (id:number)=>{
    router.push(`/rooms/${id}`)
  }

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/hotels/getone/${id}`).then((res)=>{
      setData(res.data)
      console.log(res.data)
     
      
    }).catch(err=>{console.log(err)})
  },[])
  
  return (
<body>
  
<nav id="navBar" className='navbar-white'>
<Image className="logo" src="/img/travel.jpg" width={100} height={100} alt="dtg" quality={75} priority={false}/>
<ul className='nav-links'>
    <li><a href="#" className="active">Home</a></li>
    <li><a href="#" className="active">contact us</a></li>
    <li><a href="#" className="active">online packages</a></li>
</ul>
<div className="toggle-container">
          <div className="toggle-option active">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/globe--v1.png" alt="Globe" />
          </div>
          <div className="toggle-option">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png" alt="User" />
          </div>
        </div>
</nav>

<div className="container2">
 
  <div className="search-bar">
    <div id='for'>
<div className='location-input'>
  <label >location </label>
  <input type="text" placeholder='where are you going ?' />

</div>
<div>
  <label >  Check In </label>
  <input type="text" placeholder='Add Date ?' />

</div>
<div>
  <label >  Geust </label>
  <input type="text" placeholder='Add Guest ?' />

</div>
<button > <Image id='im' src="/img/search.png" alt='image house' width={20} height={20} /></button>
    </div>
  </div>


</div>

<div className='container'>

<div className='list-container'>
<div className="left-col">
  <p>200+ Options</p>
  <h1>Recomended PlacesIn San Francisco</h1>
  {data.map((el: any) => (
              <div onClick={()=>{toHotelrooms(el.id)}} className='house' key={el.id}>
                <div className="house-img" >
                  <img src={el.image}  width={330} height={200} alt="" />
                </div>
                <div className="house-info">
                  <p>{el.name}</p>
                  
                  <p>in french</p>
                  <br /><div> {el.stars} <i> <Image src="/img/star.png" alt='image house' width={20} height={20} /></i></div>
                 
                  
                </div>
              </div>
            ))}


  
  
</div>
<div className='right-col'>
<div className="sidebar">
  <h2>select Filters</h2>
  <h3>Property type</h3>
  <div className="filter">
    <input type="checkbox" /> <p>House</p><span>(0)</span>
  </div>

  <div className="filter">
    <input type="checkbox" /> <p>Hostel</p><span>(0)</span>
  </div>
  
   <div className="filter">
    <input type="checkbox" /> <p>Flat</p><span>(0)</span>
  </div>
  
   <div className="filter">
    <input type="checkbox" /> <p>Villa</p><span>(0)</span>
  </div>
  
   <div className="filter">
    <input type="checkbox" /> <p>Guest suite</p><span>(0)</span>
  </div>
 
</div>

</div>
</div>



<div className="pagination">
<Image className='arroo' src="/img/arrow.png" alt='arrow' width={15} height={20} />
  <span className='curreent'>1</span>
  <Image id='rightarro' className='arroo' src="/img/arrow.png" alt='arrow' width={15} height={20} />

</div>


<div className='footer'>
<a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
<a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
<a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
<a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
<a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
<hr />
<p>Copyright 2021, Easy tutorials</p>
</div>
</div>



</body>

     
    
  );
}