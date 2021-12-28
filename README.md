## KEy benefits:
- SEO
- Server-side rendering: renders HTML draft first, then rehydtares the page with JS code, adding logics
- providing initial HTML - is super fast: HTML is cheaper than JS
- server capabilities: possibility to interact with DB and file system
- file-based routing

## css modules
Uses css modules by default:
A CSS Module is a CSS file in which all class names and animation names are scoped locally

```javascript
import styles from "./style.css";
// import { className } from "./style.css";

element.innerHTML = '<div class="' + styles.className + '">';
```

## Initial Rendering
Next JS returns static HTML - the result of first components rendering
So, if you have useEffect() hook that makes call to BE, then no server data will be rendered in the html
Thus, static <ul> will be rendered, but will all its missing <li> tags

Solutions:
- static generation (preferable to use) - every time we have changes on BE - we need to re-build the app and re-deploy it. 
Good when pages seldom updated - e.g: personal blog
- Server-side rendering

## API routes
next.js will take all files inside "pages/api" and will transform it to "api" routes
they will be targetted by requests and will both: receive and return JSONs
