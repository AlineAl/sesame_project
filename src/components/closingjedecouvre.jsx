import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import axios from 'axios';
import imageClosing from '../images/nagy-arnold-X_IvVDuHvDQ-unsplash.jpg';

function Closingjedecouvre() {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState(null);
    
    useEffect(() => {
        GetArticlesDecouvre();
    },[])

    function GetArticlesDecouvre() {
        axios.get('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-decouvres?populate=*')
        .then((response) => {
            console.log(response)
            setArticles(response.data.data);
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error)
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

            <div className="page-closing">
                <section className="first-part-closing">
                    <div>
                        <h2>Je découvre</h2>
                        <img src={imageClosing} alt="image d'arbrisseau"  />
                    </div>
                    <div className="list-closing">
                        <div className="cadre-white"></div>
                        <ul>
                        {
                            isLoading ? 'Loading...' : articles.map(article => 
                            <a href={`#${article.attributes.titleDecouvre}`}>
                                <li key={article.id}>{article.attributes.titleDecouvre}</li>
                            </a>)
                        }
                        </ul>
                    </div>
                </section>

                <section className="articles-closing">
                    {
                        isLoading ? 'Loading...' : articles.map((article) => 
                        <Link to={`/jedecouvre/${article.id}`}>
                            <li key={article.id}>
                            <p className="date-academie">{article.attributes.dateDecouvre}</p>
                                <h3 id={article.attributes.titleDecouvre}>{article.attributes.titleDecouvre}</h3>
                                <img id='img-decouvre' src={article.attributes.imageDecouvre.data[0].attributes.url} alt="image qui illustre le détail de l'article" />
                                <ReactMarkdown className="markdown-academie">{article.attributes.contentDecouvre}</ReactMarkdown>
                            </li>
                        </Link>)
                    } 
                </section>                
            </div>

        </div>
    )
}

export default Closingjedecouvre;
