
import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)


  function searchMovies() {
    fetch(`https://www.omdbapi.com/?apikey=bd2e9ae2&s=${searchTerm}`)
      .then(data => data.json())
      .then(data => {
        if (data.Error) setError(data.Error)
        else {
          setMovies(data.Search)
          setError(null)
        }
      })
  }
  console.log(movies)
  console.log(error)
  return (
    <div>
      {/* Do not remove the main div */}
      <form action="">
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={searchMovies} >Search</button>
      </form>
      {
        error ?
          <h1 className="error" >Invalid movie name. Please try again.</h1>
          :
          <ul>
            {
              movies.map(movie => {
                return (
                  <li key={movie.imdbID} >
                    <h2>{movie.Title} {movie.Year}</h2>
                    <img src={movie.Poster} alt="" />
                  </li>
                )
              })
            }
          </ul>
      }
    </div>
  )
}

export default App
