// you can put _middleware.js file to any pages directory, to scope the MW:
// it'll run MW f() only for that pages, that are in the scoped directoryv

// runs on before every page
// will run on server side. e.g. - console.log() will be printed in server logs
export function middleware(req, event) {
    const authToken = req.headers['Authorization'];
    if(authToken) {
        console.log(`User is logged in with this token: ${authToken}`);
    }
}

// Benefit of MV f() - MW is hosted on Vercel Edge f()s
// it means that BE code is deployed closer to the end user, instead of being deployed only on 1 centralized server
