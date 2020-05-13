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
    firstName: '',
    lastName: '',
    email: '',
    password1: '',
    password2: '',
}


export default function register() {
    const classes = useStyles();
    const [user, setUser] = useState(INITIAL_USER)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const isUser = Object.values(user).every(el => Boolean(el))
        isUser ? setDisabled(false) : setDisabled(true)
    }, [user])

    function handleChange(e) {
        const { name, value } = e.target
        setUser(prevState => ({ ...prevState, [name]: value }))
    }

    async function handleRegisterSubmit(e) {
        e.preventDefault()
        if (user.password1 === user.password2) {
            try {
                // make request to signup user
                setLoading(true)
                setErrorMsg('')
                const url = `${baseUrl}/api/signup`
                const payload = { ...user }
                const response = await axios.post(url, payload)
                handleLogin(response.data)
            } catch (err) {
                catchErrors(err, setErrorMsg)
            } finally {
                setLoading(false)
            }
        } else {
            setLoading(false)
            setErrorMsg('Passwords do not match. Please try again.')
            setTimeout(() => {
                setErrorMsg('')
            }, 3000)
        }
    }

    return (
        <Grid
            container
            justify="center"
        >
            <Card raised style={{ width: "50%", minWidth: "220px", maxWidth: "490px", padding: "2rem", margin: "1.8rem 0" }}>
                <form autoComplete="on">
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <FormControl
                            fullWidth
                            className={classes.dialogInput}
                        >
                            <TextField className={classes.inputColor}
                                label="First name"
                                aria-describedby="firstName"
                                type="text"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                        <br />
                        <FormControl
                            fullWidth
                            className={classes.dialogInput}
                        >
                            <TextField className={classes.inputColor}
                                label="Last Name"
                                aria-describedby="lastName"
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                        <br />
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
                                name="password1"
                                value={user.password1}
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
                                label="Confirm Password"
                                name="password2"
                                aria-describedby="password"
                                type="password"
                                value={user.password2}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleRegisterSubmit}
                        disabled={disabled}
                        style={{ marginTop: "2rem" }}
                    >
                        Sign Up!
                                </Button>
                </form>

            </Card>

        </Grid>
    );
}
