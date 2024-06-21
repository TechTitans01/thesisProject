

import "../styles/editprofile.css"
export default function editProfile ()  {
  
    


    
      return (
        <div className="container">
        <div className="profile-sidebar">
          <div className="profile-pic">
            <img src="https://th.bing.com/th/id/R.9edcc6a214dfbd4e899f9d175f114706?rik=1XqL2HLJK%2bvo9Q&pid=ImgRaw&r=0" alt="Profile" />
          </div>
          <div className="upload-photo">
            <button>Upload New Photo</button>
            <p>Upload a new avatar. Larger image will be resized automatically. Maximum upload size is 1 MB</p>
          </div>
          <div className="member-since">
            <p>Member Since: 29 September 2019</p>
          </div>
        </div>
        <div className="profile-edit">
          <h2>Edit Profile</h2>
          <form>
            <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="text" id="username" name="username" />
            </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Current Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">New Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" />
            </div>
            <button type="submit">Update info</button>
          </form>
        </div>
      </div>
    );
      
    };
    