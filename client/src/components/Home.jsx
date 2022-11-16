import React from 'react';
import style from './Home.module.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCreated, getDogs, orderByName, orderByWeight, getTemperaments, filterDogsByTemperaments } from '../actions';
import { Link } from 'react-router-dom';
import DogCard from './DogCard';
import Paginate from './Paginate';
import SearchBar from './SearchBar';

export default function Home(){
    const dispatch = useDispatch();
    // este es el arreglo del estado con todos los perros OBVIAMENTE!!!
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments)
    
    const [order, setOrder] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    const handleFilterTemperaments = (e) => {
        e.preventDefault();
        dispatch(filterDogsByTemperaments(e.target.value));
        setCurrentPage(1);
    };

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     dispatch(getDogs());
    // };

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    };

    const handleWeight = (e) => {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setOrder(`Ordered ${e.target.value}`);
    };

    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <header className={style.header}>
                <div className={style.header_container_left}></div>
                    <Link to="/">
                        <div className={style.logo}>Dogs PI</div>
                    </Link>

                    {/* <button onClick={e => {handleClick(e)}} className={style.button_reload}>Reload All Dogs...</button> */}

                    <div className={style.header_left}>

                        <SearchBar setCurrentPage={setCurrentPage}/>

                        <div className={style.container_filters}>
                            <select onChange={e => handleSort(e)}>
                                <option disabled selected defaultValue>Alphabetical order</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>

                            <select onChange={e => handleWeight(e)}>
                                <option disabled selected defaultValue>Filter by weigth</option>
                                <option value="max_weight">Max</option>
                                <option value="min_weight">Min</option>
                            </select>

                            <select onChange={e => handleFilterTemperaments(e)}>
                                <option disabled selected defaultValue>Temperaments</option>
                                <option value="All">All Temperaments</option>
                                {
                                    allTemperaments?.map(temp => (
                                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                                    ))
                                }
                            </select>

                            <select onChange={e => handleFilterCreated(e)}>
                                <option disabled selected defaultValue>Api/Created Filter</option>
                                <option value="All">All</option>
                                <option value="api">Api</option>
                                <option value="created">Created</option>
                            </select>
                        </div>
                        
                    </div>           
                    
                    <div className={style.header_right}>
                        <Link to='/dog'>
                            <button className={style.create_dog}>Create New Dog</button>
                        </Link>
                    </div>  

            </header>
            <hr/>
            <div className={style.main_container}>
                <div className={style.container_cards}>
                {
                    currentDogs && currentDogs.map((el) => {
                        // console.log(currentDogs);
                        return (
                            <div className={style.container_card} key={el.id}>
                                <Link to={"/home/" + el.id}>
                                    <DogCard 
                                    name={el.name}
                                    image={el.image} 
                                    temperament={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments} 
                                    weight={el.weight} 
                                    key={el.id} />
                                </Link>
                            </div>
                        )
                    })
                }
                </div>
                <div className={style.paginate}>
                    <Paginate 
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginate={paginate}
                    />
                </div>
                
            </div>
            <footer className={style.footer}>
                <p>Lucas Montecino &copy; 2022 - Todos los derechos reservados</p>
            </footer>
        </>
    ); 
};