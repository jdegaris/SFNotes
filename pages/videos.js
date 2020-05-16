import React from 'react'
import { makeStyles, Grid, Card, Switch, Paper, Slide, FormControlLabel, Button } from '@material-ui/core'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        flexGrow: 1,
        margin: "2rem 1rem",
        minHeight: 200,
        cursor: "pointer"
    },
}));

function Videos({ videos }) {
    const classes = useStyles();
    const router = useRouter()
    const cat = router.query.cat

    const filteredVideos = videos.filter(video => video.category == cat)

    return (
        <>
            <h1 style={{ marginLeft: "2rem" }}>{cat} Training Videos</h1>
            <Grid container justify="center" style={{ marginLeft: "2rem" }}>
                {filteredVideos.length === 0 ? (
                    <h1>No Videos Have Been Posted</h1>
                ) : (
                        filteredVideos.map(video => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card
                                    className={classes.root}
                                    onClick={() => router.push(`/video?_id=${video._id}`)}
                                >
                                    <Grid container direction="column" style={{ padding: "1rem" }}>
                                        <Grid item className={classes.title} >
                                            <h2>{video.title}</h2>
                                        </Grid>
                                        <Grid item className={classes.title}>
                                            {video.description}
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))
                    )}

                {}
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
