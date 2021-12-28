// Next.js allows omitting importing of "import React from 'react';"

import Link from 'next/link';
// Link - prevents browser defaults of sending a request to server and fully reloading page, loosing state
// with Next.js Link - app performs as SPA (it looks in ulr like we switched pages, but in reality - we are in the same page)

const NewsPage = () => {
    return (
        <>
            <h1>News</h1>
            <ul>
                <li>
                    <Link href="/news/next-js">Next JS</Link>
                </li>
                <li><a href="/news/vue">Vue</a></li>
                <li>Svelte</li>
            </ul>
        </>
    );
};

export default NewsPage;
