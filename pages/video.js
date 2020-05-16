import React, { useState } from 'react'
import { makeStyles, Grid, FormControl, TextField, Button } from '@material-ui/core'

import axios from 'axios'

import baseUrl from '../utils/baseUrl'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "1rem",
    },

}));

const INITIAL_NOTE = {
    notes: '',

}

function Video({ user, video }) {
    const classes = useStyles();

    const [note, setNote] = useState(INITIAL_NOTE)
    const [success, setSuccess] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(true)

    function handleChange(e) {
        const { name, value } = e.target
        setNote(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <>
            <Grid container >
                <Grid container justify="center" >
                    <Grid item md={2} ></Grid>
                    <Grid item xs={12} xl={8} >
                        <iframe className={classes.root} width="100%" height="700" src={video.mediaUrl} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Grid>
                    <Grid item md={2}></Grid>
                    <Grid item xs={12} >
                        <h1 style={{ textAlign: "center", margin: 0 }} >{video.title}</h1>
                    </Grid>
                    {user && (
                        <Grid item xs={12} md={6} lg={6}>
                            <form>
                                <FormControl
                                    fullWidth
                                >
                                    <TextField
                                        label="Take notes..."
                                        className={classes.dialogInput}
                                        aria-label="minimum height"
                                        rows={12}
                                        placeholder="Take notes..."
                                        name="notes"
                                        value={video.notes}
                                        onChange={handleChange}
                                        style={{ margin: "0" }}
                                        variant="outlined"
                                        multiline
                                        required
                                    />
                                </FormControl>
                                <br />

                            </form>
                        </Grid>
                    )}
                </Grid>
            </Grid>

        </>
    )
}

Video.getInitialProps = async ({ query: { _id } }) => {
    const url = `${baseUrl}/api/video`
    const payload = { params: { _id } }
    const response = await axios.get(url, payload)

    return { video: response.data }
}

export default Video;
