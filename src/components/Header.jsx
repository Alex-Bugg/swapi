import { Avatar, Container, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import React from 'react'
import { Link } from 'react-router-dom'


export default function Header({name,characterChange,picture = ''}) {
  return (
    <header>
      <Container maxWidth="lg">
        <div className="header_wrap">
          <Link className="logo" to="/">
            SWAPI
          </Link>
          <Autocomplete
            onChange={characterChange}
            options={name}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Characters" variant="outlined" />}
          />
          <Avatar src={picture}/>
        </div>
      </Container>
    </header>
  )
}
