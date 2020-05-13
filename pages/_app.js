import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Layout from '../components/_App/Layout'

import App from "next/app";
import axios from 'axios'
import { parseCookies, destroyCookie } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import Router from "next/router";


class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const { token } = parseCookies(ctx)

        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        if (!token) {
            const isProtectedRoute = ctx.pathname === '/addFlashcard' || ctx.pathname === '/addVideo'
            if (isProtectedRoute) {
                redirectUser(ctx, '/login')
            }
        } else {
            try {
                const payload = { headers: { Authorization: token } }
                const url = `${baseUrl}/api/account`
                const response = await axios.get(url, payload)
                const user = response.data
                // If user is authenticated but not an author, then redirect from 'create page
                const isNotPermitted = !(user) && ctx.pathname === '/publish'
                if (isNotPermitted) {
                    redirectUser(ctx, '/')
                }
                pageProps.user = user
            } catch (err) {
                console.error("Error getting current user. ", err)
                // Throw out invalid token
                destroyCookie(ctx, 'token')
                // Redirect to login page
                redirectUser(ctx, '/login')
            }
        }
        return { pageProps }
    }

    componentDidMount() {
        window.addEventListener('storage', this.syncLogout)
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    syncLogout = e => {
        if (e.key === 'logout') {
            Router.push('/login')
        }
    }


    render() {

        const { Component, pageProps } = this.props;
        return (
            <>
                <CssBaseline />
                <ThemeProvider theme={theme}>
                    <Layout {...pageProps}>
                        <main style={{
                            flexGrow: 1,
                            paddingLeft: theme.spacing(6),
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                padding: theme.spacing(0, 1),
                                // necessary for content to be below app bar
                                ...theme.mixins.toolbar,
                            }} />
                            <Component {...pageProps} />

                        </main>
                    </Layout>
                </ThemeProvider>
            </>
        );
    }
}

export default MyApp;




