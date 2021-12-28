import {MongoClient, ObjectId} from 'mongodb';
import MeetupDetail from "../components/meetups/MeetupDetail";
import Head from "next/head";

const MeetupDetails = (props) => {

    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}/>
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    );
};

// this f() is needed when you use getStaticProps() inside [dynamic] pages
// it'll be run before getStaticProps()
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://igorgo:testpass@cluster0.80g4m.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { // 1-st param - filter criteria. 2-nd param - what fields to grab
        _id: 1 // we are getting only IDs from DB
    }).toArray();

    await client.close();

    return {
        fallback: false, // fallback: false - means we have listed ALL the supported paths params IDs. 404 - for not existing url param
        // if fallback: true, - not 404 for not existing url param, but next.js will try to generate page with not existing param value on a fly
        // fallback: true - good for PRE-GENERATING the most visited pages, and giving possibility for server to generate less visited ones

        paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
        /*
        if we are manually whitelisting needed param values
        [{
            params: {
                meetupId: 'm1'
            }
        }]*/
    }
}

export async function getStaticProps(context) {
    // to get meetupId - useRouter() hook can be only used inside the Component, but not in the getStaticProps() f()
    // then we need to use "context"

    const meetupId = context.params.meetupId; // meetupId - from file name

    const client = await MongoClient.connect('mongodb+srv://igorgo:testpass@cluster0.80g4m.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)}); // mongoDb ID - is not string, but Object. we need to convert it
    const updatedSelectedMeetup = {...selectedMeetup, _id: selectedMeetup._id.toString()};

    await client.close();

    return {
        props: {
            meetupData: updatedSelectedMeetup
        },
    }
}

export default MeetupDetails;
