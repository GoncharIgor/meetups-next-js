import Head from 'next/head'; // like react-helmet
import {MongoClient} from 'mongodb';
// if you import any package that will be used ONLY in getStaticProps() or getServerSideProps()
// then this package won't be a part of client-side js bundle
import MeetupList from "../components/meetups/MeetupList";

// props - passed from getStaticProps() f()
const HomePage = (props) => {
    /*
    If we use this approach, the resulted HTML will be rendered without BE data
    BE data will be sent on the 2-nd component render. It will be not visible by SEO
    solution - to use getStaticProps() f()

    const [loadedMeetups, setLoadedMeetups] = useState([]);

     useEffect(() => {
         // http request to BE to fetch data
         setLoadedMeetups(MOCK_MEETUPS);
     }, []);
     */

    return (
        <>
            <Head>
                <title>JS Meetups</title>
                <meta name="description" content="Check the available JS meetups in Europe"/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </>
    );
};

/*
this f() sends data to static HTML, after data was received from BE.
It will result HTML, that sent to client, to also have data from BE on initial rendering
getStaticProps - reserved f() name
this f() works only in PAGE component files (in "pages" folder), not in other components in "components" folder
next.js will execute this f() during pre-rendering process, thus it won't directly call "HomePage" component f()
it will call "getStaticProps", before calling component f()
this code is not executed on the server, but during the build process
*/
export async function getStaticProps() {
    // we could use http request to BE to fetch data. This code runs on the server
    // But it also means, that http request to server is not needed, because getStaticProps() is already running on server
    // thus - we can directly get data, without http request to server

    const client = await MongoClient.connect('mongodb+srv://igorgo:testpass@cluster0.80g4m.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray(); // find all docs in the collection
    await client.close();

    return {
        // props - the props, that will be received in HomePage component
        props: {
            // meetups.map(meetup => ({})) // ({}) - return an object
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString() // _id - is the way MongoDb auto-generates IDs
            }))
        },
        revalidate: 10 // - unlocking the feature: Incremental static generation.
        // 10 - number of seconds next.js will wait until it regenerates this page when server receives request for this page
        // thus, this page will not be generated only once during build process, but will be generated every 10 seconds
        // it means - our data on UI will be never older than 10 secs
    }
}

export default HomePage;


// if we want not to regenerate page every number of seconds, but to do it every time on request
// on contrary to getStaticProps(), this f() will not be run during build process
// but on the server, after the deployment
// pros - page is being re-generated on each request
// cons - it takes time to generate page
// good when your data changes a couple of times per second; or you need access to request object, for example for auth
// in all other cases - use getStaticProps(), because it just gets static HTML from CDN, that's fast
/*
export async function getServerSideProps(context) {
    // http request to BE to fetch data. This code runs on the server

    // you have access to the incoming request
    const request = context.req;
    const response = context.res;

    return {
        // props - the props, that will be received in HomePage component
        props: {
            meetups: MOCK_MEETUPS
        },
    }
}*/
