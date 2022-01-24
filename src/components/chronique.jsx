import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import carouselImage from '../images/ana-frantz-azRS34AdaaM-unsplash.jpg';
import articlePrincipal from '../images/xps-8pb7Hq539Zw-unsplash.jpg';
import articleDetails from '../images/devin-avery-BRVqq2uak4E-unsplash.jpg';

function Chronique() {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const [articleChronique, setArticleChronique] = useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {data} = axios.post('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-chroniques', {
                data: {
                    titleChronique: articleChronique.titleChronique,
                    contentChronique: articleChronique.contentChronique,               
                }
                })
                console.log(data);
        } catch(error) {
            console.log(error);
        }
    }
    
    const handleChange = ({ currentTarget }) => {
        const {name, value} = currentTarget;
        setArticleChronique({
            ...articleChronique,
            [name]: value,
        })
    } 
    
    useEffect(() => {
        GetArticlesChronique();
    },[])

    function GetArticlesChronique() {
        axios.get('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-chroniques')
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

            <div className="chronique">
                <section className="chronique-first-part">
                    <div className="card-article-principal">
                        <h1>Chronicle Lifestyle</h1>
                        <img src={articlePrincipal} alt="image qui illustre le dernier article" />
                    </div>
                    <hr className="display-hr" />

                    {/* HORIZONTAL CAROUSEL */}
                    <div className="horizontal-carousel-chronique">
                        {
                            isLoading ? "Loading..." :
                            <Carousel className="cards-vertical-carousel">
                            {articles.map((article) => 
                                <a href={`#${article.attributes.titleChronique}`}>
                                    <div className="card-vertical" id="card-vertical-2">
                                        <div>
                                            <img className="img-vertical-carousel" src={carouselImage} alt="" />
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
                                            <img className="img-vertical-carousel" src={carouselImage} alt="" />
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

                <form onSubmit={handleSubmit}>
                    <label>Titre</label>
                    <input type="text" id="titleChronique" name="titleChronique" onChange={handleChange} />
                    <label>Contenu</label>
                    <textarea type="text" id="contentChronique" name="contentChronique" onChange={handleChange} />
                    <input type="submit" value="Envoyer" class="submit-form" />
                </form>

                {
                    isLoading ? "Loading..." : 
                    articles.map((article) =>
                    <Link to={`/chronique/${article.id}`}>
                        <section className="article-details">
                            <h3 id={article.attributes.titleChronique}>{article.attributes.titleChronique}</h3>
                            <img src={articleDetails} alt="image qui illustre le détail de l'article" />
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
