import React, { useState, useEffect } from 'react'
// @material-ui/core components
import { makeStyles, Grid, Card, FormControl, TextField, FormHelperText, Select, InputLabel, MenuItem, Button } from "@material-ui/core";

import axios from 'axios'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

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

const INITIAL_VIDEO = {
    mediaUrl: '',
    title: '',
    description: '',
    category: ''
}


export default function addVideo() {
    const router = useRouter()

    const classes = useStyles();
    const [video, setVideo] = useState(INITIAL_VIDEO)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    function handleChange(e) {
        const { name, value } = e.target
        setVideo(prevState => ({ ...prevState, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setLoading(true)
            setErrorMsg('')
            const url = `${baseUrl}/api/video`
            const { mediaUrl, title, description, category } = video
            const payload = { mediaUrl, title, description, category }
            const token = cookie.get('token')
            const headers = { headers: { Authorization: token } }
            const newVideo = await axios.post(url, payload, headers)
            router.push(`/video?_id=${newVideo.data._id}`)
            setVideo(INITIAL_VIDEO)
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
            <Card raised style={{ width: "50%", minWidth: "270px", maxWidth: "490px", padding: "2rem", margin: "2rem 0" }}>
                <form autoComplete="on" >
                    <FormControl
                        fullWidth
                    >
                        <FormHelperText>
                            Enter the embed LINK only... do not include styling or options
                        </FormHelperText>
                        <FormHelperText>
                            ( i.e. https://www.youtube.com/embed/sj1wOnelTNk )
                        </FormHelperText>
                        <TextField
                            label="Embed URL link"
                            className={classes.dialogInput}
                            aria-describedby="mediaUrl"
                            type="text"
                            name="mediaUrl"
                            value={video.mediaUrl}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Video Title"
                            className={classes.dialogInput}
                            aria-describedby="title"
                            type="text"
                            name="title"
                            value={video.title}
                            onChange={handleChange}
                            required
                        />
                    </FormControl>
                    <br />
                    <FormControl
                        fullWidth
                    >
                        <TextField
                            label="Description"
                            className={classes.dialogInput}
                            aria-label="minimum height"
                            rows={8}
                            placeholder="Enter a description of the video"
                            name="description"
                            value={video.description}
                            onChange={handleChange}
                            style={{ margin: "1rem 0 0" }}
                            variant="outlined"
                            multiline
                        />
                    </FormControl>
                    <br />
                    <InputLabel id="demo-simple-select-label" style={{ margin: "1rem 0 0" }}>Category</InputLabel>
                    <Select
                        autoWidth={true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="category"
                        value={video.category}
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
                        Submit Video
                    </Button>
                </form>

            </Card>

        </Grid>
    );
}
