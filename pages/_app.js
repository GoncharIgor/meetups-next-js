// Problem that this file solves - necessity of adding "Layout" component with shared navigation
// to all other pages, that can be a lot
// This file acts as the Application Root component, that affects all pages components

// acts the same as: "wrapPageElement" in Gatsby "gatsby-browser.js"

import '../styles/globals.css'
import Layout from "../components/layout/Layout";

function MyApp({Component, pageProps}) {
    // <Component> - at the end will be our page Component, for each of the pages
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
