## Key benefits:
- SEO
- Server-side rendering: renders HTML draft first, then rehydtares the page with JS code, adding logics
- providing initial HTML - is super fast: HTML is cheaper than JS
- server capabilities: possibility to interact with DB and file system
- file-based routing

## Under the hood - Architecture:
- Rust compiler instead of JS one (it replaces Babel) - 17x times faster than Babel. To convert TS and JSX to plain JS
- uses http streaming (like websocket, but comparable to walkie talkie - 1 way direction at a time) for serverComponents (progressive SSR). For server component - you indicate `server` in comp. name
- Bundler - Turbopack (beta) is an incremental bundler optimized for JS and TS, written in Rust, and built into Next.js.
- Out of the box, with no configuration, Next.js compiles CSS using PostCSS.

## Server component
Are always rendered on the server. These are likely components that are fetching some data from your backend
Whenever these components need to be rerendered, they are refetched from the server and merged into the existing, client-side React component tree. 
What's cool about this is client state is preserved even though we're refetching parts of the view from the server.

- Comp. is rendered on the server and being sent to client
- client is aware about the server components
- since component is on server, it can make DB or file system calls
- since HTML result is returned, and not JS - it means we can safely store credentials on the server
- better performance (CPU and network)
- if some 3-rp party os needed only in server component - this library won't be delivered to client

## New features in v.12:
- supports in `next.config.js`: concurrentFeatures and serverComponents
- Lazy Loading
- modules import by url (from CDN), instead of npm:
`import axios from 'https://...'`
- or import images from url:
`import logo from 'https://...'`

## SSG vs SSR
- getStaticProps - for SSG
- getServerSideProps - for SSR

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

## Images optimization


# Styles management
1. global css:
   
Cons:
- unscoped and hard to maintain. Solution - BEM approach.
- Big not optimized bundle

2. css modules
   
Uses css modules by default:
A CSS Module is a CSS file in which all class names and animation names are scoped locally and used in individual component

```javascript
import styles from "./component.module.css";
// import { className } from "./component.module.css";

element.innerHTML = '<div class="' + styles.className + '">';
```

For css re-usage from another module:
    
in your Home.module.css file:
```css
.component-class {
    composes: header-color from "AnotherModule.module.css"
}
```

3. Preprocessor
`npm i sass`

4. css-in-js
- styled components lib
- emotion lib
- next-js <style jsx> with string literal

Benefit: 
- you can pass dynamic variables in styles
- styles are scoped to the component

```jsx
<style jsx>
    {`
       h1 {
         color: ${colorValueFromComponent};
       }
    `}
</style>
<nav>
    <h1>Title</h1>
</nav>
```

5. utility class library:
- Tailwind
- Windy CSS

6. CSS framework:
- Bootstrap
- Materialize
- Bulma

Pros: 
- prebuilt component
- collection of styles

To use:
1. `npm i bootstrap`
2. `import 'bootstrap/dist/css/bootstrap.css'` in your component

cons:
- large bundle size


7. component library:
- React Bootstrap
- Material UI
- Mantine
