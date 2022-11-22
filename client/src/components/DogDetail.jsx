import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDogDetail } from '../actions';
import style from './DogDetail.module.css';

export default function DogDetail(props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogDetail(props.match.params.id));
        return()=>{
            dispatch(getDogDetail(""))
        };
    }, [dispatch]);

    const details = useSelector((state) => state.detail);

    return (
        <div className={style.main_container}>
            <Link to="/home">
                <button className={style.button_home}>Home</button>
            </Link>
            <div className={style.sub_container}>
                {
                    details ?
                    <div className={style.container_elements}>
                        <div className={style.image_container}>
                            <img src={details.image} alt="img not found"/>
                        </div>

                        <div className={style.right_container}>
                            <h1>{details.name}</h1>
                            <h3>{`Height: ${details.height && details.height[0]} - ${details.height && details.height[1]} cm.`}</h3>
                            <h3>{`Weight: ${details.weight && details.weight[0]} - ${details.weight && details.weight[1]} kg.`}</h3>
                            <h3>{"Life Span: " + details.life_span}</h3>
                            <div>
                                <h3>Temperaments:</h3>
                                    <ul className={style.list_container}>
                                    {details.temperaments && details.temperaments[0].name 
                                    ? details.temperaments.map(el => <li key={el.name}>{el.name}</li>)
                                    : details.temperaments && details.temperaments.map(el => <li>{el}</li>)}
                                    </ul>
                            </div>
                        </div>
                    </div>
                    : <p>Loading...</p>
                }
            </div>
        </div>
    )
};



// {/* <div>
// <img src={details.image} alt={`imagen de ${details.name}`}/>
// </div>

// <div>
// <h1>{details.name}</h1>
// <h3>{`Height: ${details.height && details.height[0]} - ${details.height && details.height[1]} cm.`}</h3>
// <h3>{`Weight: ${details.weight && details.weight[0]} - ${details.weight && details.weight[1]} kg.`}</h3>
// <h3>{`Lifespan: ${details.life_span}`}</h3>
// <div>
//     <h3>Temperaments</h3>
//     <p>{details.temperaments}</p>
//     {/* <ul>
//         {temperamentDog.map(t => <li key={t}>{t}</li>)}
//     </ul> */}
// </div>
// </div> */}