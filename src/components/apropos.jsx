import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import imgPropos from '../images/nishaan-ahmed-mDQM7TmmcD4-unsplash.jpg';

function Apropos() {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState(null);
    const [articleApropos, setArticleApropos] = useState({});

    
    const handleChangeApropos = ({ currentTarget }) => {
        const {name, value} = currentTarget;
        setArticleApropos({
            ...articleApropos,
            [name]: value,
        })
    } 
    
    const handleSubmitApropos = async (event) => {
        event.preventDefault();

        try {
            const { data } = axios.post('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-apropos', {
                data: {
                    titleApropos: articleApropos.titleApropos,
                    contentApropos: articleApropos.contentApropos,              
                }
                })
                console.log(data);
        } catch(error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        GetArticlesApropos();
    },[])

    function GetArticlesApropos() {
        axios.get('https://sesameoeuvretoiadmin.herokuapp.com/api/articles-apropos')
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

            <section className="page-a-propos">
                <div>
                    <h1>À propos de moi</h1>
                    <img src={imgPropos} alt="" />                    
                </div>
                {
                    isLoading ? 'Loading...' :
                    articles.map((article) =>
                    <Link to={`/apropos/${article.id}`}>
                        <div className="text-apropos">
                            <h2>{article.attributes.titleApropos}</h2>
                            <p>{article.attributes.contentApropos}</p>             
                        </div>
                    </Link>
                    )
                }
            </section>
            <form onSubmit={handleSubmitApropos}>
            <label>Titre</label>
                <input type="text" id="titleApropos" name="titleApropos" onChange={handleChangeApropos} />
                <label>Contenu</label>
                <textarea type="text" id="contentApropos" name="contentApropos" onChange={handleChangeApropos} />
                <input type="submit" value="Envoyer" class="submit-form" />
            </form>
        </div>
    )
}

export default Apropos;
