import { makeStyles, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, IconButton, Link } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CodeIcon from '@material-ui/icons/Code';
import BuildIcon from '@material-ui/icons/Build';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';

import { useRouter } from 'next/router'

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

function VideoList({ categories }) {
    const classes = useStyles();
    const router = useRouter()

    return (
        <Grid container justify="center">
            {categories.map((category, index) => (
                <Grid item item xs={10} sm={6} md={4} key={index} >
                    <Grid
                        container
                        justify="space-around"
                        alignItems="center"
                    >
                        <Card raised className={classes.root} onClick={() => router.push(`/videos?cat=${category}`)} style={{ cursor: "pointer" }}>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                style={{ height: 200, textAlign: "center", fontSize: "1.2rem" }}
                            >
                                <div fontSize="3rem" ></div>
                                <div style={{ fontSize: "3rem", }}>
                                    <PersonalVideoIcon fontSize="inherit" />
                                </div>
                                {category} Videos
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )

}

export default VideoList;