# Storage management with Cognito and S3

#### Access to User level folders using Amazon S3 and Cognito

##### This code example shows you how to implement this scenario.

- [React.js](https://github.com/facebook/react)
- [Amplify.js](https://github.com/aws-amplify/amplify-js)

## 🚀 AWS Services

<ul className="requirement">
  <li><strong>S3</strong> for storage</li>
  <li><strong>Cognito</strong> for user</li>
  <li><strong>IAM</strong> for access policy</li>
</ul>

## 🔥 Scenario

- public/\* - Everybody can access the files in the Public folder
- private/USER_ID/\* - Only authorized user can access the files in the
  <pre>
  S3 Bucket
  ┬  
  ├ public
      ┬ 
      ├ *.png
  ├ private
      ┬ 
      ├ {identityId of user}
          ┬ 
          ├ *.png
  </pre>

## ⚙️ Requirements

<ul className="requirement">
  <li>Creating s3 for upload-files</li>
  <li>Creating cognito for user-management</li>
  <li>Setting policy for S3 bucket for authorized/unauthorized users</li>
  <li>You need to modify config file => src/config/s3.js</li>
</ul>

#### ⭐️ About me

- Author - hotehrud@naver.com
- Manual - https://mygumi.tistory.com/362

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
