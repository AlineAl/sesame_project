import React, {useState} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Link } from "react-router-dom";

function LoginAdmin() {
    const [credentials, setCredentials] = useState({
        identifier: "",
        password: ""
    });

    const loginSubmit = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:1337/api/auth/local', {
            identifier: credentials.identifier,
            password: credentials.password
        })
        .then(response => {
            console.log(response);
            window.localStorage.setItem('authToken', response.data.jwt);
            window.localStorage.setItem('username', response.data.user.username);
            axios.defaults.headers["Authorization"] = "Bearer" + response.data.jwt;
            console.log(isAuthenticated());
        })
        .catch(error => {
            console.log('An error occurred:', error.response);
        });
    }

    function isAuthenticated(){
        const token = window.localStorage.getItem('authToken');

        if(token) {
            const {exp} = jwtDecode(token);
            if(exp * 1000 > new Date().getTime()) {
                return true;
            }
        }
        return false
    }

    isAuthenticated();

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        setCredentials({
            ...credentials,
            [name]: value
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

            <form onSubmit={loginSubmit}>
                <label>Nom</label>
                <input type="text" id="identifier" name="identifier" onChange={handleChange} />
                <label>Mot de passe</label>
                <input type="text" id="password" name="password" onChange={handleChange}/>
                <input type="submit" value="Envoyer" class="submit-form" />
            </form>            
        </div>
    )
}

export default LoginAdmin;
