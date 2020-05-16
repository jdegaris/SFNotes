import React, { useState, useEffect } from 'react'
// @material-ui/core components
import { makeStyles, Grid, Card, FormControl, TextField, FormHelperText, Select, InputLabel, MenuItem, Button } from "@material-ui/core";

import axios from 'axios'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'

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

const INITIAL_FLASHCARD = {
    question: '',
    answer: '',
    category: 'Platform App Builder'
}


export default function addFlashcard() {
    const router = useRouter()

    const classes = useStyles();
    const [flashcard, setFlashcard] = useState(INITIAL_FLASHCARD)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    function handleChange(e) {
        const { name, value } = e.target
        setFlashcard(prevState => ({ ...prevState, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            setErrorMsg('')
            const url = `${baseUrl}/api/flashcard`
            const { question, answer, category } = flashcard
            const payload = { question, answer, category }
            const token = cookie.get('token')
            const headers = { headers: { Authorization: token } }
            const newFlashcard = await axios.post(url, payload, headers)
            setFlashcard(INITIAL_FLASHCARD)
            setSuccess(true)
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
            <Card raised style={{
                width: "50%", minWidth: "270px", maxWidth: "490px", padding: "2rem", margin: "2rem 0"
            }}>
                < form autoComplete="on" >
                    <FormControl
                        fullWidth
                    >
                        <FormHelperText>
                            Please use 5 underscores ( _ ) to represent a blank space in the question
                        </FormHelperText>
                        <TextField
                            label="Question..."
                            className={classes.dialogInput}
                            rows={5}
                            placeholder="Enter the question..."
                            name="question"
                            value={flashcard.question}
                            onChange={handleChange}
                            style={{ margin: "1rem 0 0" }}
                            variant="outlined"
                            multiline
                            required
                        />
                    </FormControl>
                    <br />
                    <FormControl
                        fullWidth
                    >
                        <TextField
                            label="Answer..."
                            className={classes.dialogInput}
                            rows={5}
                            placeholder="Enter the answer..."
                            name="answer"
                            value={flashcard.answer}
                            onChange={handleChange}
                            style={{ margin: "1rem 0 0" }}
                            variant="outlined"
                            multiline
                            required
                        />
                    </FormControl>
                    <br />
                    <InputLabel id="demo-simple-select-label" style={{ margin: "1rem 0 0" }}>Category</InputLabel>
                    <Select
                        autoWidth={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"
                        value={flashcard.category}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                    >
                        <MenuItem value="Platform App Builder">Platform App Builder</MenuItem>
                        <MenuItem value="Platform Developer I">Platform Developer I</MenuItem>
                        <MenuItem value="Administrator">Administrator</MenuItem>
                    </Select>
                    <br />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                        style={{ marginTop: "2rem" }}
                    >
                        Submit Flashcard
        </Button>
                </form>

            </Card>

        </Grid >
    );
}
