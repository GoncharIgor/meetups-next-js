import NewMeetupForm from "../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import Head from "next/head";

const NewMeetupPage = () => {
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        // in next.js, we may use fetch() not only in browser, but on server side code also
        // we may use axios here
        // we are sending request to the same domain server
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        // console.log(data); // res from BE: {message: 'New meetup added'}
        await router.replace('/'); // "replace" instead of "push" - make sure we can't use BACK button
    }

    return (
        <>
            <Head>
                <title>Add New Meetup</title>
                <meta name="description" content="Add your new JS meetup"/>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </>
    );
};

export default NewMeetupPage;
