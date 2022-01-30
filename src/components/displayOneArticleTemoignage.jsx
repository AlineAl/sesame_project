import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import imageTemoignage from '../images/karina-vargas-J7hCnavj7QE-unsplash.jpg';

function DisplayOneArticleTemoignage() {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const GetOneArticleTemoignage = async () => {
        try {
            axios.get(`https://sesameoeuvretoiadmin.herokuapp.com/api/temoignages/${id}?populate=*`)
            .then((response) => {
                console.log(response.data.data);
                setArticle(response.data.data);
                setIsLoading(false);
            })
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetOneArticleTemoignage();
    },[])

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
                        <Link to="/"><h1>Sésame œuvre-toi</h1></Link>
                    </div>
                    <div className="icon-navbar" onClick={displayListNavBarMedia}>
                        <i class="fas fa-bars"></i>
                    </div>
                </div>
                <div className="list-navbar-media">
                    <ul>
                        <li className="list-navbar-media-1"><Link to="/apropos">À propos</Link></li>
                        <li className="list-navbar-media-2"><Link to="/academie">J'ouvre les portes de l'académie</Link></li>
                        <li className="list-navbar-media-3"><Link to="/jedecouvre">Je découvre</Link></li>
                        <li className="list-navbar-media-4"><Link to="/chronique">Chronique lifestyle</Link></li>
                        <li className="list-navbar-media-5"><Link to="/oeuvretoi">Oeuvre-toi</Link></li>
                        <li className="list-navbar-media-6"><Link to="/contact">Contact</Link></li>
                    </ul>              
                </div>
                <div className="navbar-desktop">
                    <div className="logo-sesame">
                        <Link to="/"><h1>Sésame œuvre-toi</h1></Link>
                    </div>
                    <div>
                        <ul>
                            <Link to="/apropos"><li>À propos</li></Link>
                            <div>
                                <li id="closing-list-nav" onClick={displaySelectClosing}>Closing ▿</li>
                                <div className="select-navbar">
                                    <ul name="closings" id="closings">
                                        <li><Link to="/academie">J'ouvre les portes de l'académie</Link></li>
                                        <li><Link to="/jedecouvre">Je découvre</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <li><Link to="/chronique">Chronique lifestyle</Link></li>
                            <li><Link to="/oeuvretoi">Oeuvre-toi</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>                    
                    </div>
                </div>
            </nav>
            <section className="container-find-one">
                {
                    isLoading ? 'Loading...' :
                    <div className="text-find-one" id="text-one-temoin">
                        <img src={imageTemoignage} alt="arbre de vie témoignages" />
                        <ReactMarkdown>{article.attributes.contentTemoignage}</ReactMarkdown>         
                    </div>
                }
            </section>
        </div>
    )
}

export default DisplayOneArticleTemoignage;
