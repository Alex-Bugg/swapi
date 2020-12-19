import './App.css';
import { useEffect, useState } from 'react';
import {Button, Container} from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Person , Home } from './page';
import FacebookLogin from 'react-facebook-login';
import Header from './components/Header';

function App() {
  const [characters, setCharacters] = useState([])
  const [loader, setLoader] = useState(true)
  const [name,setName] = useState([])
  const [nextPage,setNextPage] = useState()
  const [prevPage,setPrevPage] = useState()

  const [isLoggidIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  const [fbName, setFbName] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState('')

  useEffect(async () => {
    const fetchPeople = await (await fetch('https://swapi.dev/api/people')).json()
    setNextPage(fetchPeople.next)
    setPrevPage(fetchPeople.previous)
    setCharacters(fetchPeople.results)
    setLoader(false)
    setName(fetchPeople.results.map(item => {
      return {
        name: item.name,
        url: item.url
      }
    }))
    fetchNames(fetchPeople.next)
  }, [])
  
  const fetchNames = async (url) => {
    if(url) {
      const req = await (await fetch(url)).json()
      const names = req.results.map(item => {
        return {
          name: item.name,
          url: item.url
        }
      })
      setName(prevNames => [...prevNames, ...names])
      if(req.next) {
        fetchNames(req.next)
      }
    } else {
      return null
    }
  }
  
  const characterChange = (e) => {
    const currectName = e.target.innerHTML
    const findName = name.filter(item => item.name === currectName)
    const pathname = findName[0].url.split('').splice(28).join('')
    window.location.pathname = `/person/${pathname}`
  }

  const prev = async () => {
    if(prevPage){
      const fetchPeople = await (await fetch(prevPage)).json()
      setNextPage(fetchPeople.next)
      setPrevPage(fetchPeople.previous)
      setCharacters(fetchPeople.results)
    }
  }

  const next = async () => {
    if(nextPage){
      const fetchPeople = await (await fetch(nextPage)).json()
      setNextPage(fetchPeople.next)
      setPrevPage(fetchPeople.previous)
      setCharacters(fetchPeople.results)
    }
  }

  const componentClicked = () => console.log('click')

  const responseFacebook = response => {
    setIsLoggedIn(true)
    setFbName(response.name)
    setUserId(response.id)
    setEmail(response.email)
    setPicture(response.picture.data.url)
  }

  return (
    <div className="main">
      <Router>
      <Header name={name} characterChange={characterChange} picture={picture}/>
      {
        isLoggidIn
        ? <Container>
        <Switch>
          <Route exact path='/' >
            <Home loader={loader} characters={characters} />
          </Route>
          <Route path='/Person' >
            <Person name={name} />
          </Route>
        </Switch>
        <div className="btn_wrap">
          <Button onClick={prev} style={{'marginRight': 5}} variant="contained">&lArr;</Button>
          <Button onClick={next} variant="contained">&rArr;</Button>
        </div>
      </Container>
      : <div className='wrapper'>
          <FacebookLogin
          appId="729825031279787"
          autoLoad={true}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook} />
        </div>
          }
      </Router>
    </div>
  );
}

export default App;
