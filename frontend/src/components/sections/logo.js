import React from "react";
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';




export function Logo () {
    return 
    <Link  to="/logIn"> <Image
                roundedCircle
                fluid
                src="localAppLogoNew.png"
                alt="localApp"
                width="5%"
            />
            </Link>
    // <Link  to="/logIn"><img src="localAppLogo.png" alt="localApp" ></img></Link>

}