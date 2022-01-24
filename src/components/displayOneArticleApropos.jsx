import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DisplayOneArticleApropos() {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const GetOneArticleApropos = async () => {
        try {
            axios.get(`http://localhost:1337/api/articles-apropos/${id}`)
            .then((response) => {
                console.log(response.data.data);
                setArticle(response.data.data);
                setIsLoading(false);
            })
        } catch(error) {
            console.log(error);
        }
    }

    const deleteOneArticleApropos = async () => {
        try {
            axios.delete(`http://localhost:1337/api/articles-apropos/${id}`)
            window.location.href="http://localhost:3000/apropos";
            alert('Votre article a bien été supprimé');
        } catch(error) {
            console.log(error);
        }
    }

    const updateOneArticleApropos = async () => {
        try {
            const { data } = axios.put(`http://localhost:1337/api/articles-apropos/${id}`, {
                data: {
                    titleApropos: article.titleApropos,
                    contentApropos: article.contentApropos,              
                }
            })
            console.log(data);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetOneArticleApropos();
    },[])

    const handleChange = ({ currentTarget }) => {
        const {name, value} = currentTarget;
        setArticle({
            ...article,
            [name]: value,
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

            <section className="container-find-one">
                {
                    isLoading ? 'Loading...' :
                    <form method="put" onSubmit={updateOneArticleApropos}>
                        <input type="text" id="titleApropos" name="titleApropos" placeholder={article.attributes.titleApropos} onChange={handleChange} />
                        <textarea type="text" name="contentApropos" id="contentApropos" placeholder={article.attributes.contentApropos} onChange={handleChange} />
                        <input type="submit" value="Envoyer" class="submit-form" />
                    </form> 
                }
                {
                    isLoading ? 'Loading...' :
                <div className="text-find-one">
                    <div className="title-cross-update">
                        <h2>{article.attributes.titleApropos}</h2>
                        <i onClick={() => deleteOneArticleApropos(article.id)} id="delete-button" class="fas fa-times"></i>
                        <i id="update-button" class="fas fa-pen"></i>
                    </div>
                    <p>{article.attributes.contentApropos}</p>                  
                </div>
                }
            </section>           
        </div>
    )
}

export default DisplayOneArticleApropos;