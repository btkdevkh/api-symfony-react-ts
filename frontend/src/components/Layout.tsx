import { format } from "date-fns";
import { useNavigate, useLocation } from "react-router";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  createTheme
} from "@mui/material";
import { makeStyles } from '@mui/styles'
import { AddCircle, Favorite, Home, Movie } from '@mui/icons-material'
import { ReactNode } from "react";

// CSS custom styles
const drawerWidth = 210;
const theme = createTheme()
const useStyles = makeStyles(() => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      minHeight: '100vh',
      padding: theme.spacing(3)
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    root: {
      display: "flex"
    },
    active: {
      background: '#f4f4f4 !important'
    },
    title: {
      padding: theme.spacing(2)
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)!important`
    },
    toolbar: {
      marginBottom: 60
    }
  }
});

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: "Accueil",
      icon: <Home color="primary" />,
      path: '/'
    },
    {
      text: "Tous les films",
      icon: <Movie color="primary" />,
      path: '/movies'
    },
    {
      text: "Films favories",
      icon: <Favorite color="primary" />,
      path: '/favorites'
    },
    {
      text: "Ajouter un film",
      icon: <AddCircle color="primary" />,
      path: '/create'
    }
  ]

  return (
    <div className={classes.root}>
      <AppBar
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar>
          <Typography>
            Ajourd'hui, le {format(new Date(), 'do MMM Y')} &copy; sieliMovies
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography 
            variant="h5"
            className={classes.title}
          >
            sieliMovies
          </Typography>
        </div>

        <List>
          {menuItems.map(item => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? classes.active : ""}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

export default Layout;
