import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import articlePrincipal from '../images/xps-8pb7Hq539Zw-unsplash.jpg';

function Chronique() {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        GetArticlesChronique();
    },[])

    function GetArticlesChronique() {
        axios.get('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-chroniques?populate=*')
        .then((response) => {
            setIsLoading(false);
            setArticles(response.data.data);
            // console.log(response.data.data)
            // console.log(response.data.data[0].attributes.imageChronique.data[0].attributes.url)
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

            <div className="chronique">
                <section className="chronique-first-part">
                    <div className="card-article-principal">
                        <h1>Chronicle Lifestyle</h1>
                        <img src={articlePrincipal} alt="image qui illustre le dernier article" />
                    </div>

                    {/* HORIZONTAL CAROUSEL */}
                    <div className="horizontal-carousel-chronique">
                        {
                            isLoading ? "Loading..." :
                            <Carousel className="cards-vertical-carousel">
                            {articles.map((article) => 
                                <a href={`#${article.attributes.titleChronique}`}>
                                    <div className="card-vertical" id="card-vertical-2">
                                        <div>
                                        {(article.attributes.imageChronique.data) === null ? '' : <img className="img-vertical-carousel" src={article.attributes.imageChronique.data[0].attributes.url} alt="" />}
                                        </div>
                                        <div className="text-vertical">
                                            <h3>{article.attributes.titleChronique}</h3>
                                            <ReactMarkdown>{article.attributes.contentChronique}</ReactMarkdown>
                                        </div>
                                    </div>
                                </a>
                            )}
                            </Carousel>                     
                        }
                    </div>

                    {/* VERTICAL CAROUSEL */}
                    <div className="vertical-carousel-chronique">
                        {
                            isLoading ? "Loading..." :
                            <Carousel verticalMode itemsToShow={3} className="cards-vertical-carousel">
                                {articles.map((article) =>
                                <a href={`#${article.attributes.titleChronique}`}>
                                    <div key={article.id} className="card-vertical" id="card-vertical-2">
                                        <div>
                                        {(article.attributes.imageChronique.data) === null ? '' : <img className="img-vertical-carousel" src={article.attributes.imageChronique.data[0].attributes.url} alt="" />}
                                        </div>
                                        <div className="text-vertical">
                                            <h3>{article.attributes.titleChronique}</h3>
                                            <p>{article.attributes.contentChronique}</p>
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
                    articles.map((article, i) =>
                    <Link to={`/chronique/${article.id}`}>
                        <section className="article-details">
                            <p className="date-chronique">{article.attributes.dateChronique}</p>
                            <h3 id={article.attributes.titleChronique}>{article.attributes.titleChronique}</h3>
                            {(article.attributes.imageChronique.data) === null ? '' : <img src={article.attributes.imageChronique.data[0].attributes.url} alt="image qui illustre le détail de l'article" />}
                            <ReactMarkdown>{article.attributes.contentChronique}</ReactMarkdown>
                        </section>
                    </Link>
                    ) 
                }
            </div>
        </div>
    )
}

export default Chronique;
