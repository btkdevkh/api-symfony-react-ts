import { Grid, Typography, Card, CardHeader, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`http://127.0.0.1:8000/api/movie/${id}`, false, 'GET');

  return (
    <Grid item xs={12} lg={6} mx="auto">
      {loading && <Typography textAlign="center" variant="h5">Chargement...</Typography>}
      {error && <Typography textAlign="center" variant="h5">{error}</Typography>}
      {data && (
        <Card elevation={3}>
          <CardHeader
            title={data.title}
            subheader={`Directeur/trice: ${data.director}`}
          />
          <CardContent>
            <Typography>
              Année de sortie: {data.releaseDate?.split('-').reverse().join('/')}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Grid>
  )
}

export default Details;
