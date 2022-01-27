import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Apropos() {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState(null);
 
    useEffect(() => {
        GetArticlesApropos();
    },[])

    function GetArticlesApropos() {
        axios.get('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-apropos?populate=*')
        .then((data) => {
            setArticles(data.data.data);
            console.log(data.data.data);
            setIsLoading(false);
        })
        .catch(error => {
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
        <div className="container-page-apropos">
            <nav id="navbar">
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
                        <Link to="/apropos"><li className="list-navbar-media-1">À propos</li></Link>
                        <Link to="/academie"><li className="list-navbar-media-2">J'ouvre les portes de l'académie</li></Link>
                        <Link to="/jedecouvre"><li className="list-navbar-media-3">Je découvre</li></Link>
                        <Link to="/chronique"><li className="list-navbar-media-4">Chronique lifestyle</li></Link>
                        <Link to="/oeuvretoi"><li className="list-navbar-media-5">Oeuvre-toi</li></Link>
                        <Link to="/contact"><li className="list-navbar-media-6">Contact</li></Link>
                    </ul>              
                </div>
                <div className="navbar-desktop" id="navbar">
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

            <section>
                {
                    isLoading ? 'Loading...' :
                    articles.map((article) =>
                    <div className="page-a-propos">
                        <div>
                            <h1>À propos de moi</h1>
                            <img src={article.attributes.imageApropos.data[0].attributes.url} alt="image qui illustre le détail de l'article" />                   
                        </div>
                        <div className="text-apropos">
                            <h2>{article.attributes.titleApropos}</h2>
                            <p>{article.attributes.contentApropos}</p>             
                        </div>
                    </div>
                    )
                }
            </section>
        </div>
    )
}

export default Apropos;
