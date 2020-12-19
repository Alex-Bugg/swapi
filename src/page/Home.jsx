import React from 'react'
import {  Button,
          Card,
          CardActions,
          CircularProgress,
          CardContent,
          IconButton,
          makeStyles,
          Typography} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minWidth: 280,
  },
});

export default function Home({characters, loader }) {
  const classes = useStyles()

  

  return (
    <div className="cards_wrap">
      {
        loader
        ? <CircularProgress />
        : characters.length !== 0
        ? characters.map((item, i) =>
         <Card key={i} className={classes.root}>
           <CardContent>
             <Typography variant="h5" component="h2">
               {item.name}
             </Typography>
             <Typography color="textSecondary">
               {item.gender}
             </Typography>
             <Typography component="p">
             </Typography>
           </CardContent>
           <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
             <Link to={`/person/${item.url.split('').splice(28).join('')}`} className="linkPerson">Learn More</Link>
           </CardActions>
         </Card>)
        : <p>Try again</p>
      }
    </div>
  )
}
