import {useRouter} from 'next/router';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandler () {
    // push() - programmatic navigation. Works the same as <Link> component
    router.push(`/${props.id}`);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;

// router.push vs <Link>
// router.push('/push') behaves similarly to window.location. It does not create a <a> tag - not good for SEO
// <Link> will create a <a> tag
// You should be using <Link> throughout all your website,
// and use router.push for places where you need redirect in order to retain the behaviour of a Single Page App
