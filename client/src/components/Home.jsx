import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../actions';
import { Link } from 'react-router-dom';
import DogCard from './DogCard';
import Paginate from './Paginate';

export default function Home(){
    const dispatch = useDispatch();

    const allDogs = useSelector((state) => state.dogs);
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
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getDogs());
    };

    return (
        <div>
            <Link to='/dogs'>Create New Dog</Link>
            <h1>Welcome, this is API DOGS</h1>
            <button onClick={e => {handleClick(e)}}>Reload All Dogs...</button>

            <div>
                <select>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <select>
                    <option value="all">All</option>
                </select>
                <select>
                    <option value="All">All</option>
                    <option value="api">Api</option>
                    <option value="created">Created</option>
                </select>
                
                <Paginate 
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginate={paginate}
                />

                {
                    currentDogs && currentDogs.map( (el) => {
                        return (
                            <fragment>
                                <Link to={ "/home/" + el.id }>
                                    <DogCard name={el.name} image={el.image} temperament={el.temperaments} weight={el.weight} key={el.id} />
                                </Link>
                            </fragment>
                        )
                    })
                };

            </div>
        </div>
    ); 
};