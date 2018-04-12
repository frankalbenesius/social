# Social

This is a social media experiment.

It was scaffolded using create-react-app.

## Available Commands:

* `npm start` starts the development server
* `npm build` bundles the app into static files for production
* `npm test` runs tests... we will figure out what tests we find important later
* `npm eject` don't do this... ejects from the create-react-app environment

## To run locally:

1.  Clone repository.
1.  Install dependencies using `npm install` or `yarn install`.
1.  Create a `.env` environment variables file to store Firestore project information.
1.  Start the development server with `npm start` or `yarn start`.

## Notes about Firestore:
The easiest thing you can do to connect to Firestore is ask Frank for the environment variables from his Firestore instance. It has the authentication methods and Security Rules (which aren't trivial) in place already. We'll need to figure out a better way to share this kind of Firestore management in the future.

If you want to create your own Firestore project to test this project locally, I'd recommend turning on email authentication with email-link signin. Then, create a `.env` file that matches the provided `.env.example` using the variables your own Firestore project will provide. Lastly, you can turn off all security rules for your Firestore instance. That's probably easier then trying to guess as to what the one I'm using is doing.

I am pretty new to this stuff so let me know if I'm being a dummy.
