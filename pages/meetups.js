import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import Head from 'next/head';
import {Fragment} from "react";

import keys from "../config/keys";
import {getServerSidePropsPrivate} from "../helpers/PrivatePageHelper";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!'
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/African_bush_elephants_%28Loxodonta_africana%29_female_with_six-week-old_baby.jpg',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!'
  }
];


const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>NextJS React Meetups</title>
        <meta name='description' content='Browse a huge list of meetups'/>
      </Head>
      <MeetupList meetups={props.meetups}/>
    </Fragment>
  );
};

/*export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    keys.mongoURI
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}*/

export async function getServerSideProps(context) {
  //return getServerSidePropsPrivate(context)
  // fetch data from an API

  const retObj = getServerSidePropsPrivate(context);
  if ((await retObj).redirect) {
    return retObj;
  }

  const client = await MongoClient.connect(
    keys.mongoURI
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  await client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    }
  };
}

export default HomePage;
