import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import axios from 'axios';
import imageClosing from '../images/nagy-arnold-X_IvVDuHvDQ-unsplash.jpg';
import quotesClosing from '../images/”.png';
import imageTemoignage from '../images/karina-vargas-J7hCnavj7QE-unsplash.jpg';
import Carousel from 'react-elastic-carousel';


function ClosingAcademie() {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState(null);
    const [temoignages, setTemoignages] = useState(null);
  
    useEffect(() => {
        GetArticlesClosingAcademie();
    },[])

    function GetArticlesClosingAcademie() {
        const axiosRequest1 = axios.get('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-academies?populate=*');
        const axiosRequest2 = axios.get('https://sesameoeuvretoiadmin.herokuapp.com/api/temoignages');
        axios.all([axiosRequest1, axiosRequest2])
        .then(axios.spread(function(data1, data2) {
            setArticles(data1.data.data);
            setTemoignages(data2.data.data);
            setIsLoading(false);
            console.log(data1.data.data[0]);
            console.log(data1.data.data[0].attributes.imageAcademie.data[0].attributes.url);
            // console.log(data2.data.data[0].attributes.contentTemoignage);
        }))
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
                    <div className="img-title-closing">
                        <h2>J’ouvre les portes de l’académie</h2>
                        <img src={imageClosing} alt="image d'arbrisseau" id="image-academie" />
                    </div>
                    <div className="list-closing-academie">
                        <div className="cadre-white"></div>
                        <ul>
                        {
                            isLoading ? 'Loading...' : articles.map(article => 
                            <a href={`#${article.attributes.titleAcademie}`}>
                                <li key={article.id}>{article.attributes.titleAcademie}</li>
                            </a>)
                        }
                            <a href="#temoignages"><li>Témoignages</li></a>
                        </ul>
                    </div>
                </section>

                <section className="articles-closing">
                    <ul>
                        {
                            isLoading ? 'Loading...' : articles.map((article) => 
                            <Link to={`/academie/${article.id}`}>
                                <li key={article.id}>
                                    <p className="date-academie">{article.attributes.dateAcademie}</p>
                                    <h3 id={article.attributes.titleAcademie}>{article.attributes.titleAcademie}</h3>
                                    <img id="img-academie-article" src={"https://sesameoeuvretoiadmin.herokuapp.com" + article.attributes.imageAcademie.data[0].attributes.url} alt="image qui illustre le détail de l'article" />
                                    <ReactMarkdown className="markdown-academie">{article.attributes.contentAcademie}</ReactMarkdown>
                                </li>
                            </Link>)
                        }                                 
                    </ul>
                </section>

                <section className="temoignages" id="temoignages">
                    <h3>Témoignages</h3>
                    <div className="display-flex-temoignage">
                        <div>
                            <img src={imageTemoignage} className="img-temoignage" alt="image temoignage chemin" />
                        </div>
                        <div className="display-temoignages">
                            <img src={quotesClosing} id="img-quotes" alt="image guillemets" />
                            {
                                isLoading ? 'Loading...' : <Carousel className="carousel-temoignages">{temoignages.map(temoignage => <Link to={`/temoignage/${temoignage.id}`}><p key={temoignage.id}>{temoignage.attributes.contentTemoignage}</p></Link>)}</Carousel>
                            }                                
                        </div>
                    </div>
                </section>             
            </div>        
        </div>
    )
}

export default ClosingAcademie;
