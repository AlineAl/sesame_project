import React, { useState } from 'react';
import { Link } from "react-router-dom";
import headerImage from '../images/yoal-desurmont-jqgsM3B9Fpo-unsplash.jpg';
import headerPhoto from '../images/tamara-bellis-kyg5fvluhxw-unsplash 2.png';
import firstPhoto from '../images/julius-drost-ttm_4U63b90-unsplash.jpg';
import backgroundForm from '../images/rodion-kutsaev-049M_crau5k-unsplash.jpg';
import imgFooter from '../images/—Pngtree—cartoon character happy group of_6728410.png';

function Landingpage() {
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

            <header style={{backgroundImage: `url(${headerImage})`}}>
                <div className="text-header">
                    <h2>Réinventez votre vie</h2>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    <button>En savoir plus</button>
                </div>
                <div>
                    <img src={headerPhoto} alt="photo-femme-header" />
                    <div className="cadre-img-header"></div>
                </div>
            </header>

            <section id="first-part-landing-page" className="first-part-landing-page">
                <div className="p-firstpart-1">
                    <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit ”</p>
                </div>
                <div className="img-first-photo">
                    <img src={firstPhoto} alt="photo-fleur-orangée" />
                </div>
                <div className="p-firstpart-2">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </p>
                </div>
            </section>

            <hr className="hr-display"/>

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

            <footer className="footer">
                <div className="address-footer">
                <img src={imgFooter} alt="image-footer-trois-personnages" className="img-media-footer" />
                    <h3 className="title-footer">Sésame œuvre-toi</h3>
                    <p>1 rue de la Victoire</p>
                    <p>75000 PARIS</p>
                    <p className="num-footer">0234567876</p>
                </div>
                <div className="img-media">
                    <img src={imgFooter} alt="image-footer-trois-personnages" />
                    <h3 className="mentions-footer">MENTIONS LÉGALES</h3>
                    <p className="copyright-footer">© Site créé par Aline Leroy | 2021</p>                    
                </div>
                <div>
                    <h3>Suivez-moi</h3>
                    <a href="#"><i class="fab fa-instagram"></i></a>                    
                </div>
            </footer>
        </div>
    )
}



export default Landingpage;
