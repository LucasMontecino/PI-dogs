import React from 'react';
import style from './Paginate.module.css';

export default function Paginate({dogsPerPage, allDogs, paginate}){
    const pageNumbers = [];

    for(let i=0; i < Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i + 1);
    };

    return(
        <nav className={style.navbar}>
            <ul className={style.ul_container}>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        <li className={style.li_container} onClick={() => paginate(number)} key={number}>
                            <button type='button'>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};

