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

            <section>
                {
                    isLoading ? 'Loading...' :
                    articles.map((article) =>
                    <div className="page-a-propos">
                        <div>
                            <h1>À propos de moi</h1>
                            {article.attributes.imageApropos.data === null ? '' : <img src={article.attributes.imageApropos.data[0].attributes.url} alt="image qui illustre le détail de l'article" />}                  
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
