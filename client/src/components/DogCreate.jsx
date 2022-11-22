import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postDog, getTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import style from './DogCreate.module.css';

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "Name is required, it should not contain numbers"
    }; 
    if(!input.min_height || !input.max_height){
        errors.height = "Height is required"
    }; 
    if(!input.min_weight || !input.max_weight){
        errors.weight = "Weight is required"
    }; 
    if(!input.life_span){
        errors.life_span = "Lifespan is required"
    };

    return errors;
};

export default function DogCreate(){
    const dispatch = useDispatch();
    const history = useHistory();

    const temperaments = useSelector((state) => state.temperaments);

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: []
    });

    useEffect(() => {
        if(input.name.length>0 && input.min_height.length>0 && input.max_height.length>0 && input.min_weight.length>0 && input.max_weight.length>0) setButton(false);
        else setButton(true)
    }, [input, setButton]);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleSelect = (e) => {
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            });
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(input));
        alert("New Dog created succesfully!");
        setInput({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperament: []
        });
        history.push('/home');
    };

    const handleDelete = (el) => {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    };

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    return (
        <div className={style.main_wrapper}>
            <div className={style.container}>
                <Link to="/home">
                    <button className={style.button_home}>Go Home</button>
                </Link>
                <h1>Create your Dog !</h1>

                <form id="form" onSubmit={e => handleSubmit(e)} className={style.form}>
                    <div className={style.name_container}>
                        <input
                        className={style.input_name}
                        type="text" value={input.name} name="name"
                        onChange={e => handleChange(e)} placeholder="Name..." />
                    </div>
                    <div className={style.error_form}>
                        {errors.name && (<p>{errors.name}</p>)}
                    </div>

                    <div className={style.height_container}>
                        <div className={style.min_height}></div>
                            <input
                            type="text" value={input.min_height} name="min_height"
                            onChange={e => handleChange(e)} placeholder="Min height..."/>
                        </div>
                        <div className={style.max_height}>
                            <input
                            type="text" value={input.max_height} name="max_height"
                            onChange={e => handleChange(e)} placeholder="Max height..."/>
                        </div>
                    <div className={style.error_form}>
                        {errors.height && (<p>{errors.height}</p>)}
                    </div>

                    <div className={style.weight_container}>
                        <div className={style.min_weight}>
                            <input
                            type="text" value={input.min_weight} name="min_weight"
                            onChange={e => handleChange(e)} placeholder="Min weight..."/>
                        </div>
                        <div className={style.max_weight}>
                            <input
                            type="text" value={input.max_weight} name="max_weight"
                            onChange={e => handleChange(e)} placeholder="Max weight..."/>
                        </div>
                    </div>
                    <div className={style.error_form}>
                        {errors.weight && (<p>{errors.weight}</p>)}
                    </div>
                    
                    <div className={style.life_span}>
                        <input type="text" 
                        autoComplete="off" name="life_span" 
                        value={input.life_span} onChange={(e) => handleChange(e)}
                        placeholder="Lifespan..." />
                    </div>
                    <div className={style.error_form}>
                        {errors.life_span && (<p>{errors.life_span}</p>)}
                    </div>


                    <div className={style.image_container}>
                        <input
                        type="text" autoComplete="off" value={input.image} name="image"
                        placeholder="Image url..."
                        onChange={e => handleChange(e)}/>
                    </div>

                    <div>
                        <select onChange={e => handleSelect(e)} className={style.select_temperaments}>
                            <option disabled selected>Temperaments</option>
                            {
                                temperaments.map((temp) => (
                                    <option value={temp.name} key={temp.name+Math.random()} 
                                    className={style.option_temperaments}>
                                        {temp.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className={style.container_button_add}>
                        <button className={style.button_add} disabled={button} type="submit" form="form">Create Dog</button>
                    </div>
                </form>
            
                <div>
                    <div>
                        <h2>Temperaments</h2>
                    </div>

                    <div className={style.container_temperaments}>
                        {input.temperament.map(el => 
                                    <div className={style.element_temperament} key={el} onClick={() => handleDelete(el)}>
                                        <p>{el}</p>
                                    </div>
                                )}
                    </div>
                </div>   
            </div>                   
        </div>
    )
}

