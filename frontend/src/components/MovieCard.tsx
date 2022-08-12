import { useNavigate } from 'react-router-dom';
import ModalDel from "./ModalDel";
import { Button, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Edit, Favorite, FavoriteBorder } from "@mui/icons-material";
import { IMovie } from "../models/Movie";

type Props = {
  movie: IMovie,
  toggleIsFavorite: (id: number) => void
  handleDelete: (id: number) => void
}

const MovieCard = (props: Props) => {
  const navigate = useNavigate();  
  const { movie, toggleIsFavorite, handleDelete } = props

  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <ModalDel 
            movie={movie}
            handleDelete={handleDelete}
          />
        }
        title={movie.title}
      />
      <CardContent>
        <IconButton onClick={() => toggleIsFavorite(movie.id as number)}>
          {movie.isFavorite ? <Favorite /> : <FavoriteBorder /> }
        </IconButton>
        <IconButton onClick={() => navigate(`/update/${movie.id}`)}>
          <Edit />
        </IconButton>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/details/${movie.id}`)}
        >
          Details
        </Button>
      </CardContent>
    </Card>
  )
}

export default MovieCard;
