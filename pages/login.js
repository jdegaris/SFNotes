import React, { useState, useEffect } from 'react'
// @material-ui/core components
import { makeStyles, Grid, Card, FormControl, TextField, FormHelperText, Button } from "@material-ui/core";

import axios from 'axios'
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import { handleLogin } from '../utils/auth'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    margin: "2rem 1rem",
    minHeight: 200
  },
  icon: {
    color: "red"
  }
}));

const INITIAL_USER = {
  email: '',
  password: ''
}


export default function login() {
  const classes = useStyles();
  const [user, setUser] = useState(INITIAL_USER)
  const [disabled, setDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setUser(prevState => ({ ...prevState, [name]: value }))
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      setErrorMsg('')
      const url = `${baseUrl}/api/login`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    } catch (err) {
      catchErrors(err, setErrorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid
      container
      justify="center"
    >
      <Card raised style={{ width: "50%", minWidth: "220px", maxWidth: "490px", padding: "2rem", margin: "5rem 0" }}>
        <form autoComplete="on" >
          <FormControl
            fullWidth
          >
            <TextField
              label="Email"
              className={classes.dialogInput}
              aria-describedby="email"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <br />
          <FormControl
            fullWidth
            className={classes.dialogInput}
          >
            <TextField
              label="Password"
              aria-describedby="password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            onClick={handleLoginSubmit}
            style={{ marginTop: "2rem" }}
          >
            Login
        </Button>
        </form>

      </Card>

    </Grid>
  );
}
