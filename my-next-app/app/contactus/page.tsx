"use client"


import React, { useState } from "react";
import "../styles/contactus.css"
export default function ContactForm  (){
    return (
        <div className="contactContainer">
              <div className="videoContainer">
            <video className="backgroundVideo" autoPlay muted loop>
              <source src="https://cdn.pixabay.com/video/2019/04/23/23011-332483109_large.mp4" type="video/mp4" />
              Contact Us
            </video>
          </div>
          <div className="contentWrapper">
            <div className="contactDetails">
              <h2>Let's talk with us</h2>
              <p>
                Questions, comments, or suggestions? Simply fill in the form and we will be in touch shortly.
              </p>
              <address>
                <p>1055 Arthur ave Elk Groot, 67,<br />
                New Palmas South Carolina.</p>
                <p>+1 234 678 9108 99</p>
                <p>Contact@moralizer.com</p>
              </address>
            </div>
            <div className="formContainer">
              <h2>Contact Us</h2>
              <form className="contactForm">
                <div className="inputGroup">
                  <input type="text" name="firstName" placeholder="First Name*" required />
                  <input type="text" name="lastName" placeholder="Last Name*" required />
                </div>
                <input type="email" name="email" placeholder="Email*" required />
                <input type="tel" name="phone" placeholder="Phone Number*" required />
                <textarea name="message" placeholder="Your message..." required></textarea>
                <button type="submit" className="submitButton">Send Message</button>
              </form>
            </div>
          </div>
        
        </div>
      );
    }
    
    //   return (
    //     <div className="contactContainer">
    //         <div className="videoContainer">
    //         <video className="backgroundVideo" autoPlay muted loop>
    //           <source src="" type="video/mp4" />
    //           Your browser does not support the video tag.
    //         </video>
    //       </div>
    //       <div className="contactDetails">
    //         <h2>Let's talk with us</h2>
    //         <p>
    //           Questions, comments, or suggestions? Simply fill in the form and we will be in touch shortly.
    //         </p>
    //         <address>
    //           <p>1055 Arthur ave Elk Groot, 67,<br />
    //           New Palmas South Carolina.</p>
    //           <p>+1 234 678 9108 99</p>
    //           <p>Contact@moralizer.com</p>
    //         </address>
    //       </div>
          
    //       <div className="formContainer">
    //         <h2>Contact Us</h2>
    //         <form className="contactForm">
    //           <div className="inputGroup">
    //             <input type="text" name="firstName" placeholder="First Name*" required />
    //             <input type="text" name="lastName" placeholder="Last Name*" required />
    //           </div>
    //           <input type="email" name="email" placeholder="Email*" required />
    //           <input type="tel" name="phone" placeholder="Phone Number*" required />
    //           <textarea name="message" placeholder="Your message..." required></textarea>
    //           <button type="submit" className="submitButton">Send Message</button>
    //         </form>
    //       </div>
    //     </div>
    //   );
    // }
    
