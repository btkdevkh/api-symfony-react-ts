import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { IMovie } from "../models/Movie";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "./MovieCard";

type Props = {
  favoriteMovie: boolean
}

const MoviesList = ({ favoriteMovie }: Props) => {
  const [url, setUrl] = useState('http://127.0.0.1:8000/api/movie/')
  const [method, setMethod] = useState('GET')
  const { loading, error, datas, updateData, deleteData } = useFetch(url, favoriteMovie, method);  

  // Toggle isFavorite
  const toggleIsFavorite = async (id: number) => {
    const found = datas?.find(x => x.id === id)
    
    if(found) {
      const updatedMovie = {
        title: found.title,
        director: found.director,
        releaseDate: found.releaseDate && found.releaseDate.split('-').reverse().join('/'),
        isFavorite: !found.isFavorite
      }      

      setUrl(`http://127.0.0.1:8000/api/movie/${id}`);
      setMethod('PUT')
      updateData(updatedMovie);
    }
  }

  // Delete movie
  const handleDelete = (id: number) => {  
    setUrl(`http://127.0.0.1:8000/api/movie/${id}`)
    setMethod("DELETE");
    deleteData();
  }

  useEffect(() => {
    if(datas) {
      setUrl('http://127.0.0.1:8000/api/movie/')
      setMethod('GET');
    }
  }, [datas])

  return (
    <Grid container spacing={1}>
      {loading && <Typography mx='auto' variant="h5">Chargement...</Typography>}
      {error && <Typography mx='auto' variant="h5">{error}</Typography>}
      {datas && datas.length > 0 && datas.map((movie: IMovie) => (
        <Grid item key={movie.id} xs={12} sm={12} md={6} lg={4} mx="auto">
          <MovieCard 
            movie={movie} 
            toggleIsFavorite={toggleIsFavorite}
            handleDelete={handleDelete}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default MoviesList;
