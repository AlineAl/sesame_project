import React, { useState } from 'react';
import { Link } from "react-router-dom";
import backgroundForm from '../images/annie-spratt-8mqOw4DBBSg-unsplash.jpg';

function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(name && message) {
            sendFeedback("template_vzh3tje", {
                name,
                email,
                message,
            });            
        } else {
            alert('error');
        }
    };

    /* IF FORM VALID SEND OR NOT */
    const sendFeedback = (templateId, variables) => {
        window.emailjs
            .send("gmail", templateId, variables)
            .then((res) => {
                setName("");
                setEmail("");
                setMessage("");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const displaySelectClosing = async () => {
        let select = document.querySelector(".select-navbar");

        if(select.style.display === "inline-block") {
            select.style.display = "none";
        } else {
            select.style.display = "inline-block";
        }
    }

    const displayListNavBarMedia = async () => {
        let navBarMedia = document.querySelector(".list-navbar-media");
        
        if(navBarMedia.style.display === "block") {
            navBarMedia.style.display = "none";
        } else {
            navBarMedia.style.display = "block";
        }
    }

    return (
        <div>
            <nav>
                <div className="navbar">
                    <div className="logo-sesame">
                        <Link to="/home"><h1>Sésame œuvre-toi</h1></Link>
                    </div>
                    <div className="icon-navbar" onClick={displayListNavBarMedia}>
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
                <div className="list-navbar-media">
                    <ul>
                        <Link to="/apropos"><li className="list-navbar-media-1">À propos</li></Link>
                        <Link to="/academie"><li className="list-navbar-media-2">J'ouvre les portes de l'académie</li></Link>
                        <Link to="/jedecouvre"><li className="list-navbar-media-3">Je découvre</li></Link>
                        <Link to="/chronique"><li className="list-navbar-media-4">Chronique lifestyle</li></Link>
                        <Link to="/oeuvretoi"><li className="list-navbar-media-5">Oeuvre-toi</li></Link>
                        <Link to="/contact"><li className="list-navbar-media-6">Contact</li></Link>
                    </ul>              
                </div>
                <div className="navbar-desktop">
                    <div className="logo-sesame">
                        <Link to="/home"><h1>Sésame œuvre-toi</h1></Link>
                    </div>
                    <div>
                        <ul>
                            <Link to="/apropos"><li>À propos</li></Link>
                            <div>
                                <li id="closing-list-nav" onClick={displaySelectClosing}>Closing ▿</li>
                                <div className="select-navbar">
                                    <ul name="closings" id="closings">
                                        <Link to="/academie"><li>J'ouvre les portes de l'académie</li></Link>
                                        <Link to="/jedecouvre"><li>Je découvre</li></Link>
                                    </ul>
                                </div>
                            </div>
                            <Link to="/chronique"><li>Chronique lifestyle</li></Link>
                            <Link to="/oeuvretoi"><li>Oeuvre-toi</li></Link>
                            <Link to="/contact"><li>Contact</li></Link>
                        </ul>                    
                    </div>                    
                </div>
            </nav>

            <div className="contact-page">
                <section className="firstpart-contact">
                <div>
                    <h2>Lorem ipsum dolor sit</h2>
                </div>
                <div className="display-flex-contact">
                    <div>
                        <i class="fas fa-calendar-alt"></i>
                        <p>Lorem ipsum dolor sit amet</p>                   
                    </div>
                    <div>
                    <i class="fab fa-instagram"></i>
                        <p>Lorem ipsum dolor sit amet</p>                   
                    </div>
                    <div>
                        <i class="fas fa-envelope-open-text"></i>
                        <p>Lorem ipsum dolor sit amet</p>                   
                    </div>                    
                </div>
                </section>

                <section id="form-contact-landing-page" className="form-contact-landing">
                    <div>
                        <img src={backgroundForm} alt="fond-formulaire-contact" />
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="form-landing">
                            <p>Contactez-moi</p>
                            <input type="text" name="name" id="name" placeholder="Votre nom" onChange={(e) => setName(e.target.value)} value={name} autoComplete="off" />
                            <input type="text" name="email" id="email" placeholder="Votre email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="off" />
                            <textarea name="message" id="message" cols="30" rows="10" placeholder="Votre message" onChange={(e) => setMessage(e.target.value)} value={message} />
                            <input className="button-contact-landing" type="submit" value="Envoyer" />
                        </form>             
                    </div> 
                </section>                
            </div>

        </div>
    )
}

export default ContactPage;
