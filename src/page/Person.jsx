import { Card, CardContent, CircularProgress, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 600,
    width: '100%'
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Person() {
  const pathName = window.location.pathname.split('').splice(8).join('')
  const [person, setPerson] = useState({})
  const [loader, setLoader] = useState(true)
  const [homeworld, setHomeworld] = useState()
  const [vehicles, setVehicles] = useState([])
  const [films, setFilms] = useState([])
  useEffect(async() => {
    const req = await (await fetch(`https://swapi.dev/api/people/${pathName}`)).json()
    setPerson(req)
    setHomeworld(await (await fetch(req.homeworld)).json())
    req.films.map(async item => {
      const filmReq = await (await fetch(item)).json()
      setFilms(prev => [...prev, filmReq.title])
    })
    if(req.vehicles.length) {
      req.vehicles.map(async item => {
        const vehiclesReq = await (await fetch(item)).json()
        setVehicles(prev => [...prev, {name: vehiclesReq.name, model: vehiclesReq.model}])
      }) 
    } else {
      setVehicles(['n/a'])
    }
  
    setLoader(false)
  }, [])


  const classes = useStyles();
  
  return (
    <div className={classes.wrap}>
      {
        loader
        ? <CircularProgress />
        : <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                <strong>Birth year</strong> : {person.birth_year}
              </Typography>
              <Typography variant="h5" component="h2">
                {person.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                <strong>Gender:</strong> {person.gender}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Height:</strong> {person.height}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Mass:</strong> {person.mass}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Hair color:</strong> {person.hair_color}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Skin color:</strong> {person.skin_color}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Eye color:</strong> {person.eye_color}
              </Typography>
              <Typography variant="body2" component="p">
                <strong>Homeworld:</strong> {homeworld.name}
              </Typography>
              <Typography variant="body2" component="div">
                <strong>Films:</strong> 
                {
                  films.length === 0
                  ? <CircularProgress />
                  : films.map((item, i)=> <span key={i}>{item},</span>)
                }
              </Typography>
              <Typography variant="body2" component="div">
                <strong>Vehicles:</strong> 
                {
                  vehicles.length === 0
                  ? <CircularProgress />
                  : vehicles[0] === 'n/a'
                    ? <p>n/a</p>
                    : vehicles.map((item, i) => <span key={i}><br/><strong>Name:</strong> {item.name}, <strong>Model:</strong>{item.model}</span>)
                }
              </Typography>
            </CardContent>
          </Card>
        }
    </div>
  )
}
