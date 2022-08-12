import { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import ModalDel from "./ModalDel";
import { Button, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Edit, Favorite, FavoriteBorder } from "@mui/icons-material";

type Props = {
  movie: any,
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
          <Fragment>
            <ModalDel 
              movie={movie}
              handleDelete={handleDelete}
            />
          </Fragment>
        }
        title={movie.title}
      />
      <CardContent>
        <IconButton
          onClick={() => toggleIsFavorite(+movie.id)}
        >
          {movie.isFavorite ? <Favorite /> : <FavoriteBorder /> }
        </IconButton>
        <IconButton
          onClick={() => navigate(`/update/${movie.id}`)}
        >
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
