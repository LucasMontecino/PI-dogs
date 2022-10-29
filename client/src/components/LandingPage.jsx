import React from 'react';
import { Link } from 'react-router-dom';
import style from "./LandingPage.module.css";

export default function LandingPage(){
    return (
        <div className={style.showcase}>
            <div className={style.container}>
                <h1>Welcome To PI Dogs</h1>
                <Link to='/home'>
                    <button>Get Started</button>
                </Link>
            </div>
        </div>
    )
};

