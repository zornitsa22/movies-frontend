import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MoviesDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_SERVER_BASE_URL}/api/movies/${id}`)
    .then(res => setMovie(res.data))
    .catch(error => setError(error.response?.data?.message));
    }, []);
    const handleDelete = () =>{
    axios
    .delete(`${import.meta.env.VITE_SERVER_BASE_URL}/api/movies/${id}`)
    .then(res => navigate(`/`))
    .catch(error => console.log(error));
    };

  return (
    <div>
      {error && <p>{error}</p>}
      {movie && (
        <>
          <h2>{movie.title}</h2>
          <p>Director: {movie.director}</p>
          <p>Year: {movie.year}</p>
          <Link to={`/movies/${id}/update`}>Update Movie</Link>
          <button onClick={handleDelete}>Delete Movie</button>
        </>
      )}
    </div>
  );
};
export default MoviesDetails;