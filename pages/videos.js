import React, { useState } from 'react'
import { makeStyles, Grid, Card, Switch, Paper, Slide, FormControlLabel, Button } from '@material-ui/core'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        flexGrow: 1,
        margin: "2rem 1rem",
        minHeight: 200
    }
}));

function Videos({ videos }) {
    const classes = useStyles();
    const router = useRouter()
    const cat = router.query.cat

    const filteredVideos = videos.filter(video => video.category == cat)
    console.log(filteredVideos);
    return (
        <>
            <h1 style={{ marginLeft: "2rem" }}>{cat} Training Videos</h1>
            <Grid container justify="center" style={{ marginLeft: "2rem" }}>

                {filteredVideos.map(video => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card
                            className={classes.root}
                            onClick={() => router.push(`/video?_id=${video._id}`)}
                        >
                            <Grid container direction="column">
                                <Grid item>
                                    {video.title}
                                </Grid>
                                <Grid item>
                                    {video.description}
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>


        </>
    )
}

Videos.getInitialProps = async () => {
    // fetch data
    const url = `${baseUrl}/api/videos`
    const response = await axios.get(url)
    // return response data as an object
    return { videos: response.data }
    // this object will be merged with existing groups

}

export default Videos;
