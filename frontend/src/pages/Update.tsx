import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import MovieEdit from "../components/MovieEdit";
import { Typography } from "@mui/material";

const Update = () => {
  const { id } = useParams<{ id: string }>(); 
  const { datas, error, loading } = useFetch("http://127.0.0.1:8000/api/movie/"+id, false);
  
  return (
    <Fragment>
      {loading && <Typography textAlign="center" variant="h5">Chargement...</Typography>}
      {error && <Typography textAlign="center" variant="h5">{error}</Typography>}
      <MovieEdit movie={datas} id={id} />
    </Fragment>
  )
}

export default Update;
