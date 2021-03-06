import './App.css';

import LandingPage from './components/landingpage';
import ContactPage from './components/contactpage';
import APropos from './components/apropos';
import ChroniquePage from './components/chronique';
import ClosingDecouvre from './components/closingjedecouvre';
import ClosingAcademie from './components/closingacademie';
import OeuvreToi from './components/oeuvretoi';
import OneArticleAcademie from './components/displayOneArticleAcademie';
import OneArticleDecouvre from './components/displayOneArticleDecouvre';
import OneArticleChronique from './components/displayOneArticleChronique';
import OneArticleTemoignage from './components/displayOneArticleTemoignage';
import OneArticleOeuvre from './components/displayOneArticleOeuvreToi';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/apropos" element={<APropos />}></Route>
          <Route path="/chronique" element={<ChroniquePage />}></Route>
          <Route path="/chronique/:id" element={<OneArticleChronique />}></Route>
          <Route path="/jedecouvre" element={<ClosingDecouvre />}></Route>
          <Route path="/jedecouvre/:id" element={<OneArticleDecouvre />}></Route>
          <Route path="/academie" element={<ClosingAcademie />}></Route>
          <Route path="/academie/:id" element={<OneArticleAcademie />}></Route>
          <Route path="/temoignage/:id" element={<OneArticleTemoignage />}></Route>
          <Route path="/oeuvretoi" element={<OeuvreToi />}></Route>
          <Route path="/oeuvretoi/:id" element={<OneArticleOeuvre />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
