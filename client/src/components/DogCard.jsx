import React from 'react';
import style from './DogCard.module.css';

export default function DogCard({ image, name, temperament, weight }){
    return (
        <div className={style.main_container}>
            <div className={style.image_container}>
                <img className={style.img} src={image} alt="img not found"/>
            </div>
            <h2>{name}</h2>
            <div className={style.temperaments_container}>
                {
                temperament.map((temps) => <h5 key={temps+Math.random}>{temps}</h5>)
                }
            </div>
            <h5 className={style.weight_container}>{`Weight: ${weight[0]} - ${weight[1]} kg.`}</h5>
        </div>
    );
};