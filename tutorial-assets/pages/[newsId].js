// square brackets "[]" in the file name tells Next.js, that it'll be a dynamic page
// this page will always be loaded on: domain.com/anyParam

import {useRouter} from 'next/router';

const MyComponent = () => {
    const router = useRouter();

    // newsId - param inside file name
    const newsId = router.query.newsId;
    console.log(newsId);

    return (
        <div>
            <h1>News Details</h1>
        </div>
    );
};

export default MyComponent;
