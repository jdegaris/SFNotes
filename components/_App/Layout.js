import Head from "next/head";
import Header from "./Header";
// import HeadContent from "./HeadContent";

function Layout({ children, user }) {
    return (
        <>
            <Head>
                {/* <HeadContent /> */}
                <title>OMG!</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
                /> />
                {/* Stylesheets */}
                <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
                <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" type="text/css" href="/static/styles.css" />
            </Head>
            <Header user={user} />
            {children}
        </>
    );
}

export default Layout;
