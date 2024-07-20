"use client"
import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import Image from 'next/image';
const socket = io('http://localhost:8080'); 
import axios from 'axios';
import {
  Container,
  Grid,
  Box,
  Typography,
  CardMedia,
  Divider,
  Avatar,
  Button,
  TextField,
  Menu,
  MenuItem
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WifiIcon from "@mui/icons-material/Wifi";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import StarIcon from "@mui/icons-material/Star";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import Map from "../map";
import "../../styles/oneroom.css";
import Weather from "../weather";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/authcontex/Authcontex";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const property = {
  title: "india Getaway",
  location: "Delhi, IN",
  images: [
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
  ],
  details: {
    guests: "4-6 guests",
    type: "Entire Home",
    beds: "5 Beds",
    baths: "3 Baths",
    amenities: ["Wifi", "Kitchen", "Free Parking"],
  },
  price: 325,
  rating: 5.0,
  reviews: [
    {
      user: "John Doe",
      date: "March 2023",
      comment: "Great place to stay, very clean and close to everything.",
      avatar: "https://via.placeholder.com/40",
    },
    {
      user: "Jane Smith",
      date: "April 2023",
      comment: "Lovely home with all the amenities we needed.",
      avatar: "https://via.placeholder.com/40",
    },
  ],
};

const Page: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null] >([null, null]);
  const [comments, setComments] = useState<any>([]);
  const [newComment, setNewComment] = useState('');
  const [data, setData] = useState<any>({});
  const [use, setuser ] = useState<any>({});
  const [array, setArray] = useState<any>([]);
  const [oneHotel,setonehotel] = useState<any>({});
  const [idhotel,setidhotel] = useState<any>(localStorage.getItem("idhotel"))
   const [ref,setref]=useState<any>(false)
  const { user } = useAuth();
  const { token } = useAuth();
  const [userr,set]=useState<any>(JSON.parse(localStorage?.getItem("user")||"{}"))
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const toChat = (id:number)=>{
    router.push(`/chatroom/${id}`)
  }

  const seeprofile = (id:number)=>{
    router.push(`/profilefreind/${id}`)
  }


 var x=""
 var y=0
  const [anchorEl, setAnchorEl] = useState<number>(-1);

  const handleClick = (id:number) => {
    
    
    setAnchorEl(id);
  };

  const handleClose = () => {
    setAnchorEl(-1);
  };

  const pathname = usePathname();
  const id = pathname.split('/')[2]
  const { logOut } = useAuth();
 
  const [guests, setGuests] = useState('');


 
  const roomid = pathname.slice(pathname.lastIndexOf('/') + 1);
  const handleDateChange = (newDateRange: [Date | null, Date | null]) => {
    setDateRange(newDateRange);
  };

  useEffect(() => {

    
    axios.get(`http://localhost:8080/api/user/getone/${userr.id}`)
      .then((resp) => {
        
      setuser(resp.data);
     
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8080/rooms/${id}`).then((res) => {
      setData(res.data);
      
    }).catch(err => { console.log(err) });
  }, []);

  useEffect(()=>{
   axios.get(`http://localhost:8080/api/hotels/getonehotel/${idhotel}`).then((res)=>{
    console.log(res.data)
    setonehotel(res.data)
   }).catch((err)=>{console.log(err)})
  },[])

  useEffect(() => {
    axios.get(`http://localhost:8080/commentaires/room/${id}`).then((res) => {
      setComments(res.data);
    }).catch(err => { console.log(err) });
  }, []);

  const commenti = () => {
    axios.post(`http://localhost:8080/commentaires/${id}/${userr.id}`, {
      text: newComment,
      date: "12/10/2024",
      name:use.username,
      image:use.image
    }).then((res) => {
      console.log(res);
      setref(!ref)
      setNewComment('');


    }).catch((error) => { console.log(error) });
  };


  useEffect(() => {
    console.log('neww',roomid)
    axios.get(`http://localhost:8080/commentaires/room/${id}`).then((res) => {
      
      setComments(res.data);
    }).catch(err => { console.log(err) });
  }, [ref]);


  const  calculateDateDifference=(checkIn:string, checkOut:string) =>{
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
        days += previousMonth;
    }
    if (months>=1) {
      days=days+months*30
    }
    if (months===0) {
      months=1
    }
     x=`${months}/${days+1}`
     y=days+(months*30)+1
     return x
  }

  const handleConfirmBooking = async () => {
    
    const bookingDetails = {
      start:calculateDateDifference(dateRange[0].toISOString().split('T')[0],dateRange[1].toISOString().split('T')[0]) ,
          end: dateRange[1].toISOString().split('T')[0],
          guests: parseInt(guests, 10),
          status: 'pending',
          userId: userr.id,
          roomId:parseInt (roomid),
          totalPrice:parseInt(oneHotel.nightPrice)*y
        }
        console.log(bookingDetails);
        
    try {
      const response = await axios.post('http://localhost:8080/bookings/', {
        bookingDetails,
      });
console.log(response.data);

      if (response.data) {
        console.log('Booking confirmed:', response.data.message);

        socket.emit('sendNotification', {
          content: `User ${userr.id} confirmed a booking: ${bookingDetails}`,
          userId:userr.id,
          adminId: 1, 
        });
        Swal.fire({
          icon: 'success',
          title: 'Booking Created',
          text: 'Your booking is created and awaiting confirmation.',
        });
        console.log('Booking added successfully:', response.data);
        setDateRange([null, null]);
        setGuests('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error creating your booking. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error confirming booking:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please provide the missing informations before confirming the booking!',
      })
    }
  };


  return (<>
 <nav id="navBar" className='navbar-white'>
        <Image className="logo" src="/img/logotr.png" width={120} height={120} alt="dtg" quality={75} priority={false} />
        <ul className='nav-links'>
          <li><a href="/"  className="active">Home</a></li>
          <li><a href="/contactus"  className="active">Contact Us</a></li>
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
                    <a href="/editprofile" >Edit Profile</a>
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



    <Container>


      <div className="house-details">
<div className="house-title">
  <h1> <span className="stars">{"★".repeat(3)}</span>{data.description}</h1>
    <div className="row">
      <div>
      
      </div>
      <div>
      
      </div>
    </div>
</div>
<div className="gallery">
  <div className="gallery-img-1">
    <img src={data.image1} alt="house" /></div>
  <div><img src={data.image2} alt="house" /></div>
  <div><img src={data.image3} alt="house" /></div>
  <div><img src={data.image4} alt="house" /></div>
  <div><img src={data.image5} alt="house" /></div>
</div>
</div>
      <Box my={4}>
   <Grid container spacing={2} my={2}>
          <Grid item xs={12} md={8}>
            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Entire rental unit
              </Typography>
              {/* <Typography variant="body1" gutterBottom>
                {data.guests} Guest · {data.beds} Beds · {data.baths} Baths
              </Typography> */}
            </Box>

            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
              <Typography gutterBottom>
                This property is located in the heart of Bordeaux, offering convenient access to
                local attractions and public transportation.
              </Typography>
              <Typography gutterBottom>
                Check-in and check-out times are flexible upon request, subject to availability.
              </Typography>
              <Typography gutterBottom>
                For any inquiries or special requests, please contact us directly.
              </Typography>
            </Box>

            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                What this place offers
              </Typography>
              <Grid container spacing={2}>
                {property.details.amenities.map((amenity, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box display="flex" alignItems="center">
                      {amenity === "Wifi" && <WifiIcon style={{ color: "#3F51B5" }} />}
                      {amenity === "Kitchen" && <KitchenIcon style={{ color: "#4CAF50" }} />}
                      {amenity === "Free Parking" && (
                        <LocalParkingIcon style={{ color: "#FFC107" }} />
                      )}
                      <Typography variant="body1" ml={1}>
                        {amenity}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Things to know
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    House Rules
                  </Typography>
                  <Typography gutterBottom>Check-in: After 3:00 PM</Typography>
                  <Typography gutterBottom>Checkout: 11:00 AM</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Health & Safety
                  </Typography>
                  <Typography gutterBottom>Enhanced cleaning process</Typography>
                  <Typography gutterBottom>Social distancing enforced</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle1" gutterBottom>
                    Cancellation policy
                  </Typography>
                  <Typography gutterBottom>Free cancellation for 48 hours</Typography>
                  <Typography gutterBottom>Partial refund before check-in</Typography>
                </Grid>
              </Grid>
            </Box>

            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Date Range
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangeCalendar onChange={handleDateChange} />
              </LocalizationProvider>
            </Box>

            <div style={{ margin: '16px 0' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        5.0 <span style={{ fontSize: 'small', color: '#FFC107' }}>★</span> • {comments.length} reviews
      </div>

      {comments.map((review:any, index:any) => (
        <div key={index} style={{ margin: '16px 0', cursor: 'pointer' }} onClick={()=>{handleClick(review.id)}}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <img 
                src={review.image} 
                alt="avatar" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}
              />
              {anchorEl===review.id && (
                <div 
                  style={{
                    position: 'absolute', 
                    backgroundColor: 'white', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1
                  }}
                >
                  <div 
                    onClick={() => { handleClose(); seeprofile(review.userId); }} 
                    style={{ padding: '8px', cursor: 'pointer' }}
                  >
                    Profile
                  </div>
                  <div 
                    onClick={() => { toChat( review.userId); }} 
                    style={{ padding: '8px', cursor: 'pointer' }}
                  >
                    Send message
                  </div>
                </div>
              )}
            </div>

            <div style={{ flex: 1, marginLeft: '8px' }}>
              <div style={{ fontWeight: 'bold' }}>{review.name} </div>
              <div style={{ fontSize: '12px', color: 'gray' }}>{review.date}</div>
            </div>
          </div>
          <div style={{ marginTop: '8px' }}>{review.text}</div>
          <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />
        </div>
      ))}
    </div>
  


            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Add a Comment
              </Typography>
              <div>
                <TextField
                  fullWidth
                  label="Comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  margin="normal"
                  multiline
                  rows={4}
                />
                <Button onClick={() => commenti()} variant="contained" color="primary" type="submit">
                
                  Submit
                </Button>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Booking
              </Typography>
              <TextField
                fullWidth
                label="Guests"
                margin="normal"
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Button onClick={handleConfirmBooking} variant="contained" color="primary" fullWidth>
                Rent
              </Button>
              <Box my={2}>
                <Typography variant="body1">Price: ${oneHotel.nightPrice} per night</Typography>
                <Typography variant="body2" color="textSecondary">
                  Taxes and fees are included
                </Typography>
              </Box>
            </Box>

            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <Map location={property.location} />
            </Box>

            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Weather
              </Typography>
              <Weather location={property.location} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  );
};

export default Page;
