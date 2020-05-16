import React, { useState } from 'react'
import { makeStyles, Grid, Card, Switch, Paper, Slide, FormControlLabel, Button } from '@material-ui/core'

import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        minHeight: "40vh",
        marginTop: "2rem",
        fontSize: '2rem'
    },
    wrapper: {
        width: "100%",
        padding: "2rem 1rem"
    },
    paper: {
        zIndex: 1,
        position: 'relative',
        margin: theme.spacing(1),
        width: "66.66%",
        padding: "2rem"
    },

}));

function FlashcardPage({ flashcard, cat }) {
    const [checked, setChecked] = useState(false);

    const classes = useStyles();
    const router = useRouter();

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const handleNewQuestion = () => {
        setChecked(false)
        router.push(`/flashcard?cat=${cat}`)
    };

    return (
        <>
            <Grid container>
                <Grid container justify="center">
                    <Grid item xs={10} md={6}>
                        {!flashcard ? (
                            <h1>No Flashcards Have Been Posted For This Certification</h1>
                        ) : (
                                <Card
                                    className={classes.root}
                                >
                                    <Grid container direction="column" justify="center" alignItems="center" style={{ padding: "2rem" }}>
                                        <Grid item>
                                            {flashcard.question}
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel
                                                control={<Switch checked={checked} onChange={handleChange} />}
                                                label="Show Answer"
                                            />
                                        </Grid>
                                        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                                            <Paper elevation={4} className={classes.paper}>
                                                <Grid container direction="column" alignItems="center">
                                                    <Grid item>
                                                        {flashcard.answer}
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={handleNewQuestion}
                                                        >
                                                            Next Question
                                                </Button>
                                                    </Grid>
                                                </Grid>


                                            </Paper>

                                        </Slide>
                                    </Grid>
                                </Card>
                            )}
                    </Grid>
                </Grid>
            </Grid>

        </>
    )
}

export default FlashcardPage;
