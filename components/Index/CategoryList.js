import { makeStyles, Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, IconButton, Link } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CodeIcon from '@material-ui/icons/Code';
import BuildIcon from '@material-ui/icons/Build';

import { useRouter } from 'next/router'
import baseUrl from '../../utils/baseUrl'

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

function CategoryList({ flashcards, categories }) {
    const classes = useStyles();
    const router = useRouter();

    const icons = [
        <BuildIcon fontSize='inherit' />,
        <CodeIcon fontSize='inherit' />,
        <SupervisedUserCircleIcon fontSize='inherit' />
    ]
    return (
        <Grid container justify="center">
            {categories.map((category, index) => (
                <Grid item item xs={10} sm={6} md={4} key={index} >
                    <Grid
                        container
                        justify="space-around"
                        alignItems="center"
                    >
                        <Card raised className={classes.root} onClick={() => router.push(`/flashcard?cat=${category}`)} style={{ cursor: "pointer" }}>
                            <Grid container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                style={{ height: 200, textAlign: "center", fontSize: "1.2rem" }}
                            >
                                <div style={{ fontSize: "3rem" }}>{icons[index]}</div>
                                <div>{category} Flashcards</div>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

CategoryList.getInitialProps = async () => {
    // fetch data
    const url = `${baseUrl}/api/flashcards`
    console.log(baseUrl);
    const response = await axios.get(url)
    // return response data as an object
    return { flashcards: response.data }
    // this object will be merged with existing groups
}

export default CategoryList;