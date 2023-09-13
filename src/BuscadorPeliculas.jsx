import { useState } from "react"


export const BuscadorPeliculas = () => {

    const urlBase = `https://api.themoviedb.org/3/search/movie`;
    const API_KEY = `49e97756cf86356fc76bd8eb8dcab680`;

    const[busqueda,setBusqueda]=useState('');
    const[peliculas,setPeliculas]=useState([]);

    const handleOnInputChange = (e)=>{
        setBusqueda(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        fetchPeliculas();
        console.log(busqueda)
    }

    const fetchPeliculas = async()=>{
        try{
            const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json();
            setPeliculas(data.results)
            console.log(data)

        }
        catch(error){
            console.log(`A ocurrido un error:${error}`)
        }
    }

  return (
    <div className="container">        
      <h1 className="title">BuscadorPeliculas</h1>

      <form onSubmit={handleSubmit}>
      <input 
        type='text'
        placeholder="ingrese pelicula"
        value={busqueda}
        onChange={handleOnInputChange}
      />
        <button className='search-button' type='submit' >Buscar </button> 
        </form>

        <div className='movie-list'>
            {peliculas.map(( pelicula ) => (
                <div key={pelicula.id} className='movie-card'>
                   <h2>{pelicula.title}</h2>
                   <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />  
                   <p>{pelicula.overview}</p>
                   <img src={`https://image.tmdb.org/t/p/w500${pelicula.backdrop_path}`} alt={pelicula.title} />  
                 </div>
           ))}
        </div>
      

    </div>
  )
}
