# Haiilo-advocacy

### How to start the project locally:

- Step 0: Clone the project and open a terminal window in the cloned directory
- Step 1: `npm install`
- _Step 1.1 (OPTIONAL): If you want seed/mocked data for testing, just edit the `src/index.tsx` by uncommenting the_ `line 14: // resetDatabase();` 
- Step 2: `npm start` (it will open the browser on http://localhost:3000/)

_Note 1: If you did Step 1.1, an alert should pop-up after a few seconds saying_ 
`Database reset and populated successfully!`, _now you need to comment back the_
`line 14: // resetDatabase();` _and refresh your browser window._

_Note 2: If you want to run the unit tests, simply run `npm run test` in the terminal window._

### Node version used: `v18.18.1`

***

### Some details about the implemented project

- The project does not have a login/register implemented as it was out of the scope. It assumes the logged in user
is the user with email `alexiialin96@gmail.com`. The current user can create posts and comment on any post, and can only
delete his posts/comments. 
- I used `localStorage` with `setTimeouts` to simulate back-end calls to an API.

***

### Don't want to run the project locally? [Watch a demo video on YouTube](https://www.youtube.com/watch?v=1-FBDqKNS34)
