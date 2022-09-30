import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;

// For multiple layouts:
// https://nextjs.org/docs/basic-features/layouts#per-page-layouts
// add a property "getLayout" to your page (in "pages" folder)
