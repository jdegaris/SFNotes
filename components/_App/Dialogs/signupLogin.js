import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { makeStyles, FormGroup, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        backgroundColor: "white"
    },
    modal: {
        position: "absolute",
        width: "104vw",
        height: "100vh",
        zIndex: "10",
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
    },
    userForm: {

        width: "50%",

        zIndex: "100"
    },
}));



function Modal({ setModal, option }) {
    const router = useRouter()
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.modal}>
            <form className={classes.root} noValidate autoComplete="on">

                {/* {option === 'signup' ? (
                    <>
                        <FormControl>
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input id="my-input" aria-describedby="email" />
                            <FormHelperText id="email">We'll never share your email.</FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" aria-describedby="password" type="password" />
                        </FormControl>
                    </>
                ) : (
                        <>
                            <FormControl className={classes.userForm}>
                                <InputLabel htmlFor="email">Email address</InputLabel>
                                <Input id="my-input" aria-describedby="email" />
                                <FormHelperText id="email">We'll never share your email.</FormHelperText>

                                <InputLabel htmlFor="password">Email address</InputLabel>
                                <Input id="password" aria-describedby="password" />
                                <FormHelperText id="email">We'll never share your email.</FormHelperText>
                            </FormControl>
                        </>
                    )} */}

            </form>
        </div>
    )

}

export default Modal;
