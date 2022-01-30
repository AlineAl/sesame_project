import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';


function DisplayOneArticleAcademie() {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const GetOneArticleAcademie = async () => {
        try {
            axios.get(`https://sesameoeuvretoiadmin.herokuapp.com/api/articles-academies/${id}?populate=*`)
            .then((response) => {
                console.log(response.data.data);
                console.log(response.data.data.attributes.contentAcademie)
                setArticle(response.data.data);
                setIsLoading(false);
            })
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetOneArticleAcademie();
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
                <div className="text-find-one">
                    <p className="date-academie">{article.attributes.dateAcademie}</p>
                    {(article.attributes.imageAcademie.data) === null ? '' : <img id="img-academie-article" src={article.attributes.imageAcademie.data[0].attributes.url} alt="image qui illustre le détail de l'article" />}
                    <h2>{article.attributes.titleAcademie}</h2>
                    <ReactMarkdown>{article.attributes.contentAcademie}</ReactMarkdown>                  
                </div>
                }
            </section>
        </div>
    )
}

export default DisplayOneArticleAcademie;