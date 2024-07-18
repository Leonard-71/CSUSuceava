import React from "react";
import "./Footer.scss";

import facebook from "../assets/footer/fb.png";
import instagram from "../assets/footer/instagram.png";
import youtube from "../assets/footer/youtube.png";
import twitter from "../assets/footer/twitter.png";
import telefon from "../assets/footer/telefon.png";
import locatie from "../assets/footer/locatie.png";

const Footer = () => {
  const textFooter = {
    follow: "Follow Us",
    facebook: "Facebook",
    twitter: "Twitter",
    instagram: "Instagram",
    youtube: "YouTube",
    titluContact: "Contact",
    locatie: "Suceava, Romania",
    telefon: "0230522819",
    adresa: 'Adresa',
    telefonText: 'Mobil'
  };
  return (
    <div className="footer">

    <div className="footer two-column-footer">
      <div className="column stanga">
        <div className="about">
          <h2>{textFooter.follow}</h2>
        </div>
        <div className="icons">
          <ul className="ulList">
            <li className="media">
              <a href="https://www.facebook.com/CSUSuceava" alt="">
                <img src={facebook} alt="Facebook" className="fb" />
                <span className="sr-only">{textFooter.facebook}</span>
              </a>
            </li>
            <li className="media">
              <a href="https://twitter.com/usvro/status/328166609933983744">
                <img src={twitter} alt="Twitter" />
                <span className="sr-only">{textFooter.twitter}</span>
              </a>
            </li>
            <li className="media">
              <a href="https://www.instagram.com/csusuceava">
                <img src={instagram} alt="Instagram" />
                <span className="sr-only">{textFooter.instagram}</span>
              </a>
            </li>
            <li className="media">
              <a href="https://www.youtube.com/channel/UCoQXPQ1UNKKcbmiCKx7UcRA">
                <img src={youtube} alt="YouTube" className="yt" />
                <span className="sr-only">{textFooter.youtube}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="column dreapta">
        <h2>{textFooter.titluContact}</h2>

        <div class="contact-details-home">
          <div class="contact-image-home">
            <img src={locatie} alt="Imagine contact" />
          </div>
          <div class="contact-text-home">
            <div class="address-line-principal">{textFooter.adresa}</div>
            <div class="address-line-home">{textFooter.locatie}</div>
          </div>
        </div>

        <div class="contact-details-home">
          <div class="contact-image-home">
            <img src={telefon} alt="Imagine contact" />
          </div>
          <div class="contact-text-home">
            <div class="address-line-principal">{textFooter.telefonText}</div>
            <div class="address-line-home">{textFooter.telefon}</div>
          </div>
        </div>



      </div>

     
    </div>
    <h6>Copyright ©Cyberrules</h6>
    </div>
  );
};

export default Footer;
