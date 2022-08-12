import { DeleteOutline } from '@mui/icons-material';
import { Backdrop, Box, Button, Fade, IconButton, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { IMovie } from '../models/Movie';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid steelblue',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center' as 'center'
};

const btnStyle = {
  margin: 2
}

type Props = {
  movie: IMovie,
  handleDelete: (id: number) => void
}

const ModalDel = ({ movie, handleDelete }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <DeleteOutline />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Voulez-vous supprimer le film {movie.title} ?
            </Typography>
            <Button
              sx={btnStyle} 
              variant="contained" 
              onClick={() => {
                handleDelete(movie.id as number);
                handleClose();
              }}
            >
              Oui
            </Button>
            <Button 
              variant="contained" 
              onClick={handleClose}
            >
              Non
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalDel;
