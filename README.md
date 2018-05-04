# Social

This is a social media experiment.

It was scaffolded using create-react-app.

## TODO:
- Clean up the code. Particularly around the profile components.
- Add better css. It's functional now, but the styling could be far more meaningful.

## Available Commands:

* `npm run dev` starts the development server
* `npm run build` bundles the app into static files for production
* `npm test` runs tests... there are none yet
* `npm eject` don't do this... ejects from the create-react-app environment
* `npm start` serves the `build` folder using the `server.js` express server. We have to deploy using this server (and not a static file server) so that client-side routing works as expected.

## To run locally:

1.  Clone repository.
1.  Install dependencies using `npm install` or `yarn install`.
1.  Create a `.env` environment variables file to store Firestore project information. See below for more info.
1.  Start the development server with `npm run dev` or `yarn dev`.

## Notes about Firestore:

If you want to create your own Firestore project to test this project locally, I'd recommend you first turn on email authentication with email-link signin. Then, create a `.env` file that matches the provided `.env.example` using the variables your own Firestore project will provide. Then you'll need to use the firebase CLI to deploy the security rules and firebase functions included in this project. That's a pretty loose set of directions so let me know if you need assistance.
