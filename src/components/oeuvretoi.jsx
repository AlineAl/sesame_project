import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import carouselImage from '../images/ana-frantz-azRS34AdaaM-unsplash.jpg';
import articleDetails from '../images/devin-avery-BRVqq2uak4E-unsplash.jpg';
import arbreVie from '../images/—Pngtree—celtic life tree decoration pattern_6814309.png';
import principalImage from '../images/stefan-stefancik-QXevDflbl8A-unsplash.jpg';

function Oeuvretoi() {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        GetArticlesOeuvre();
    },[])

    function GetArticlesOeuvre() {
        axios.get('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-oeuvres?populate=*')
        .then((response) => {
            setIsLoading(false);
            setArticles(response.data.data);
            console.log(response.data.data)
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

            <div className="oeuvre-toi">
                <section>
                    <div className="card-article-principal-oeuvre">
                        <div>
                            <h1>Oeuvre-toi</h1>
                            <img className="img-arbre-vie" src={arbreVie} alt="image qui illustre un arbre celtique" />
                        </div>
                        <div className="image-media-oeuvre-toi">
                            <img className="img-photo-oeuvre" src={principalImage} alt="image principale de la page oeuvre-toi" />
                        </div>
                    </div>

                    {/* HORIZONTAL CAROUSEL */}
                    <div className="horizontal-carousel-oeuvre" id="horizontal-carousel-oeuvre">
                        {
                            isLoading ? "Loading..." :
                            <Carousel className="cards-carousel-oeuvre-toi">
                                {articles.map((article) => 
                                    <a href={`#${article.attributes.titleOeuvre}`}>
                                        <div className="card-vertical">
                                            <div>
                                            {(article.attributes.imageOeuvre.data) === null ? '' : <img src={article.attributes.imageOeuvre.data[0].attributes.url} alt="image qui illustre le détail de l'article" />}
                                            </div>
                                            <div className="text-vertical">
                                                <h3>{article.attributes.titleOeuvre}</h3>
                                                <ReactMarkdown>{article.attributes.contentOeuvre}</ReactMarkdown>
                                            </div>
                                        </div>
                                    </a>
                                )}
                            </Carousel>                     
                        }
                    </div>
                </section>

                <hr className="display-hr" />
                <hr className="display-hr-media"/>

                {
                    isLoading ? "Loading..." : 
                    articles.map((article) =>
                    <Link to={`/chronique/${article.id}`}>
                        <section className="oeuvre-article-details">
                            <h3 id={article.attributes.titleOeuvre}>{article.attributes.titleOeuvre}</h3>
                            {(article.attributes.imageOeuvre.data) === null ? '' : <img src={article.attributes.imageOeuvre.data[0].attributes.url} alt="image qui illustre le détail de l'article" />}
                            <ReactMarkdown>{article.attributes.contentOeuvre}</ReactMarkdown>
                        </section>
                    </Link>
                    ) 
                }
            </div>
        </div>
    )
}

export default Oeuvretoi;
