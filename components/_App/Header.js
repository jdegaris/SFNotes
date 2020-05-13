import React, { useState } from 'react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { Grid, Typography, AppBar, Toolbar, Button, IconButton, Hidden, CssBaseline, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'


import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LaunchIcon from '@material-ui/icons/Launch';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import VideoCallIcon from '@material-ui/icons/VideoCall';

import { handleLogout } from '../../utils/auth'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        textDecoration: "none",
        color: "rgba(243, 48, 38, 1)",
        fontFamily: 'Fredoka One',
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        backgroundColor: "rgba(0, 60, 114, 1)"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },


}));

function Header({ user }) {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter()

    const [open, setOpen] = React.useState(false);
    const isUser = user && user.role === 'user'
    const isAuthor = user && user.role === 'author'
    const isUserOrAuthor = isUser || isAuthor

    function isActive(route) {
        return route === router.pathname
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Salesforce Notes
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon style={{ color: 'white' }} />}
                    </IconButton>
                </div>
                <Divider />
                <Grid container style={{ backgroundColor: "rgba(0, 60, 114, 1)", color: 'white', height: '100%' }}>
                    <List style={{ backgroundColor: "rgba(0, 60, 114, 1)", color: 'white', height: '100%' }}>
                        {['FlashCards', 'Videos', 'Add Question', 'Add Video'].map((text, index) => {
                            const icons = [<LibraryBooksIcon />, <VideoLibraryIcon />, <ContactSupportIcon />, <VideoCallIcon />]
                            return (
                                (
                                    <ListItem button key={text}>
                                        <ListItemIcon style={{ color: 'white' }}>
                                            {icons[index]}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                )
                            )
                        })}
                    </List>
                </Grid>
                <Divider />
            </Drawer>
        </div>
    )

}

export default Header;
