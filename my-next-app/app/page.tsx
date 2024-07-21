"use client"

import React, { useEffect, useState } from "react";
import "./styles/home.css"
import axios from "axios";
import Image from 'next/image';
import { useAuth } from "./context/authcontex/Authcontex";
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  }));

export default function Home() {
  const { logOut } = useAuth();
  const { user } = useAuth();
  const { token } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [destination, setDestination] = useState<any>([]);
  const router = useRouter();
  const [trending, setTrending] = useState<any>([]);
  const [filteredTrending, setFilteredTrending] = useState<any>([]);
  const [Storie, setStorie] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState<File | any>(null);
  const [refresh, setRefresh]= useState<boolean>(true)
  const [storyText, setStoryText] = useState('');
  const [userr, setUserr] = useState<any>(JSON.parse(localStorage?.getItem("user")||"{}"))
  const [use, setuser ] = useState<any>({});
  const [night, setnight ] = useState<number>(0);
  const [month, setmonth ] = useState<number>(0);
  const [guest, setguest] = useState<string>('');
  const [desId,setdesid] = useState<string>('');
  const [totalbooks, settotalbooks] =useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [inn, setin] = useState<string>('');  
  const [out, setout] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const handleClickOpen = (story: any) => {
    setSelectedStory(story);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStory(null);
  };

  
  const handleAddStoryClick = () => {
    setShowForm(true);
  };
 var x="";

  const toHotel = (id: number) => {
    router.push(`/hotel/${id}`)
    localStorage.setItem("iddestin",JSON.stringify(id))
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
    x=`${months}+months+${days}+days+with+${guest}+guest` 
    axios.get(`http://localhost:8080/api/destination/getonebyname/${location}`).then((res) => {
        setdesid(res.data.id) 
        console.log(res.data);
        router.push(`/search/${res.data.id}/${x}`)
        localStorage.setItem("namedestinbyserch",JSON.stringify(res.data.id))
      }).catch((err) => {
      console.log(err);
      
      })
    console.log(x);
    

}


  useEffect(() => {
  
    axios.get(`http://localhost:8080/api/destination/getall`).then((res) => {
      setDestination(res.data);
      setTrending(res.data);
      const filtered = res.data.filter((dest: any) => dest.fame === "trending");
      setFilteredTrending(filtered);
    }).catch(error => { console.error(error) })
    axios.get(`http://localhost:8080/api/user/getone/${userr.id}`)
    .then((resp) => {
      console.log("heyoad",resp.data);
    setuser(resp.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, [])
  

  useEffect(() => {
    axios.get("http://localhost:8080/api/stories/getall").then((res) => {
    
      console.log(inn);
      setStorie(res.data);
    }).catch((err) => {
      console.error(err)
    });
  
  }, [refresh])

  const addstories = () =>{
    axios.post('http://localhost:8080/api/stories/addStory',{
      text:storyText,
      image: imageUrl,
      userId: use.id,
      userName: use.username,
      userImage: use.image
    }).then((res) =>{
      setRefresh(!refresh)

    }).catch(() => {
      console.error("Failed to add story");
      console.log("gfch",userr);
      
    });
  }
  // const falter = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = parseInt(event.target.value);
  //   const filtered = trending.filter((dest: any) => dest.fame === value);
  //   setFilteredTrending(filtered);
  // };
  const uploadImage = () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "travel agency");
    axios
      .post("https://api.cloudinary.com/v1_1/dcyeimdps/image/upload", form)
      .then((result) => {
        setImageUrl(result.data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="header">
      <nav id="navBar" className='custom-navbar'>
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
              <a href="/auth" onClick={() => { logOut() }}>Logout</a>
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
                <label>Location</label>
                <input type="text" placeholder="Where are you going?" onChange={(e)=>{setLocation(e.target.value)}}/>
              </div>
              <div>
                <label>Check in</label>
                <input type="date" placeholder="Add date"onChange={(e)=>{setin(e.target.value)}} />
              </div>
              <div>
                <label>Check out</label>
                <input type="date" placeholder="Add date" onChange={(e)=>{setout(e.target.value)}} />
              </div>
              <div>
                <label>Guest</label>
                <input type="text" placeholder="Add Guest"  onChange={(e)=>{setguest(e.target.value)}}/>
              </div>
              <button>
                <Image src="/img/search.png" width={20} height={20} alt="dtg" style={{ marginTop: 5, marginLeft: 7 }} onClick={()=>{calculateDateDifference(inn,out)}}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="sub-title">Exclusives</h2>
        <div className="exclusives">
          {destination.map((el: any, index: number) => (
            <div key={index}>
              <img src={el.flag} width={25} height={25} alt="" /> 
              <img src={el.image} width={220} height={120} alt="place"  onClick={() => { toHotel(el.id) }} style={{ cursor: "pointer" , borderRadius: 10 }} />
              <span>
              
              </span>
            </div>
          ))}
        </div>
        <h2 className="sub-title">Trending Places</h2>
        <div className="trending">
          {filteredTrending.map((dest: any) => (
            <div key={dest.id} onClick={() => { toHotel(dest.id) }} style={{ cursor: "pointer" }}>
              <img src={dest.image} width={230} height={280} style={{ borderRadius: 10 }} alt="dtg" />
              <h3>{dest.name}</h3>
            </div>
          ))}
        </div>
        <div className="cta">
          <h3>Sharing <br /> is Earning Now</h3>
          <p>Great opportunity to make money by <br /> sharing your extra space.</p>
          <a href="/contactus" className="cta-btn">Contact Us</a>
        </div>
        <h2 className="sub-title">Travellers Stories</h2>
        <div className="stories">
          {Storie.map((el: any, index: number) => (
            <div className="user-container" key={index}>
              <div className="image-container">
                <img className="user-image" src={el.image} alt="No photo available" />
                <div className="button-overlay">
                  <button className="see-story-button" onClick={() => handleClickOpen(el)}>
                    See Story
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="estories" onClick={handleAddStoryClick} style={{ cursor: 'pointer' }}>
            <img src="https://img.freepik.com/vecteurs-libre/vecteur-typographie-coup-pinceau-symbole-plus_53876-166821.jpg" width={250} height={300} style={{ borderRadius: 10 }} alt="dtg" />
            <p className="ps">Add your story</p>
          </div>
          {showForm && (
            <div className="story-form">
              <div className="att">
                <div className="upload-photo">
                  <input
                    type="text"
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    placeholder="Story Text"
                  />
                  <div>
                    <img src={imageUrl || "https://cdn-icons-png.flaticon.com/512/5904/5904483.png"} alt="story" width={50} height={30} />
                  </div>
                  <input
                    id="fileInput"
                    className="addProduct-file-input"
                    type="file"
                    onChange={(e: any) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                  <button
                    className="addProduct-button addProduct-upload-button"
                    type="button"
                    onClick={() => {
                      document.getElementById("fileInput")?.click();
                    }}
                  >
                    Select story
                  </button>
                  <button onClick={() => uploadImage()}>Upload New Photo</button>
                </div>
                <button type="submit" onClick={() => { addstories() }}>Submit</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="about-msg">
          <h2>About my website</h2>
          <p>
            We believe that travel is more than just visiting new places—it's
            about creating unforgettable memories,
            experiencing diverse cultures,
            and discovering the beauty of our world.
            Whether you're seeking a serene beach escape,
            an adventurous mountain trek,
            or an immersive cultural journey, we're here to help you plan the perfect trip.
          </p>
        </div>
      </div>
       {selectedStory && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {selectedStory.userName}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {selectedStory.text}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </div>
  );
}