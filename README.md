# Mango Range Component Exercise

I started this on CodeSandbox but then project escalated so I crated this repo, that's why there might be some missing commits.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up.

1. Make sure you are using Node v15. You can run ```nvm use``` to set that version or check your local Node version using ```node -v```. If you haven't installed NVM check this link [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm).
2. Make sure you have Yarn. If not run ```npm i -g yarn```.
3. Run ```yarn``` to install dependencies.
4. Run ```yarn start``` to start the React Dev Server.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can go to /exercise1 or /exercise2 to view the end result

### `yarn test`

Runs unit tests.

### `yarn cy:run`

Runs Cypress integration tests. This already runs the React Dev Server and after that the 
Cypress tests so you don't need to run the server by yourself. 

**MAKE SURE you don't have anything else running at port 3000.**

## TODOs
- Try to simplify or abstract logic on the mousemove handler methods. They take a lot of space and are complex.
- Improve styling.
- Ask UI/UX what should happen when the user types a number that is greater than the width of the input.
- Add pipelines!

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
