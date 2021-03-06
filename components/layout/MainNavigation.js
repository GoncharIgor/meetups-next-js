import Link from 'next/link';
import classes from './MainNavigation.module.scss';

function MainNavigation() {

    return (
        <header className={classes.header}>
            <Link href='/'>React Meetups</Link>
            <nav>
                <ul>
                    <li>
                        <Link href='/'>All Meetups</Link>
                    </li>
                    <li>
                        <Link href='/new-meetup'>Add New Meetup</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
