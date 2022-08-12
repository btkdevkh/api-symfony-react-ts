import { KeyboardArrowRight } from '@mui/icons-material';
import { Alert, AlertTitle, Button, Checkbox, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFetch } from '../hooks/useFetch';
import { makeStyles } from '@mui/styles'
import { IMovie } from '../models/Movie';

// CSS custom styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block !important',
  },
  title: {
    padding: 10,
    background: '#71a0c8',
    borderRadius: 5
  },
  form: {
    maxWidth: 500,
    margin: 'auto'
  }
});

type Props = {
  movie: IMovie
}

const MovieEdit = ({ movie }: Props) => {  
  const classes = useStyles();
  const navigate = useNavigate();  

  const { datas, updateData, error } = useFetch(`http://127.0.0.1:8000/api/movie/${movie && movie.id}`, false, "PUT");  

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!title || !director || !releaseDate) {
      console.log("Empty");
    } else {
      // Formated date
      const releaseDateFormated = releaseDate.split('-').reverse().join('/');  
      
      // Construct movie object
      const movie: IMovie = { 
        title, 
        director, 
        releaseDate: releaseDateFormated, 
        isFavorite
      };

      updateData(movie);
    }
  }

  useEffect(() => {
    if(movie) {
      const { title, director, releaseDate, isFavorite } = movie;

      setTitle(title);
      setDirector(director);
      setReleaseDate(releaseDate as string);
      setIsFavorite(isFavorite);
    }

    if(datas) navigate('/movies');
  }, [movie, datas, navigate])

  return (
    <div className={classes.form}>
      {error && <Typography textAlign="center" variant="h5">{error}</Typography>}
      <Typography
        variant="h6"
        component="h2"
        align="center"
        gutterBottom
        color="textSecondary"
        className={classes.title}
        style={{ marginBottom: '15px', color: '#fff' }}
      >
        Modifier un film
      </Typography>

      <form 
        noValidate 
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Titre"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          name="title"
          value={title ? title : ""}
          error={false}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Directeur/Directrice"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          name="director"
          value={director ? director : ""}
          error={false}
          onChange={(e) => setDirector(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          type="date"
          label="Date de sortie"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          name="releaseDate"
          value={releaseDate ? releaseDate : ""}
          error={false}
          onChange={(e) => setReleaseDate(e.target.value)}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl 
          className={classes.field} 
          style={{ marginBottom: '20px' }}
        >
          <FormLabel>Film Favorie ?</FormLabel>
          <Checkbox
            checked={isFavorite ? isFavorite : false}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
        </FormControl>
        
        <Button
          type='submit'
          color="primary"
          variant="contained"
          style={{ padding: 15 }}
          endIcon={<KeyboardArrowRight />}
        >
          Modifier
        </Button>
      </form>
      {
        error && (
          <Stack sx={{ width: '100%' }} spacing={2} my={2}>
            <Alert severity="error">
              <AlertTitle><strong></strong></AlertTitle>
            </Alert>
          </Stack>
        )
      }
    </div>
  )
}

export default MovieEdit;
