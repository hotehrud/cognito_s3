import Amplify, { Auth } from 'aws-amplify';

import {
  AWS_REGION,
  COGNITO_IDENTITY_POOL_ID,
  COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID,
  BUCKET_NAME
} from 'config/s3';

class AWS {
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new AWS();
    return this.instance;
  }

  constructor() {
    this.auth = Auth;
    Amplify.configure({
      Auth: {
        identityPoolId: COGNITO_IDENTITY_POOL_ID,
        region: AWS_REGION,
        userPoolId: COGNITO_USER_POOL_ID,
        userPoolWebClientId: COGNITO_CLIENT_ID
      },
      Storage: {
        AWSS3: {
          bucket: BUCKET_NAME,
          region: AWS_REGION
        }
      }
    });
  }

  signUp({ username, password }) {
    return new Promise((resolve, reject) => {
      this.auth
        .signUp({
          username,
          password
        })
        .then(result =>
          resolve({
            code: 200,
            datas: result
          })
        )
        .catch(err => reject(err));
    });
  }

  signIn({ username, password }) {
    return new Promise(resolve => {
      this.auth
        .signIn({
          username, // Required, the username
          password // Optional, the password
        })
        .then(result =>
          resolve({
            code: 200,
            datas: result
          })
        )
        .catch(err => resolve(err));
    });
  }

  signOut() {
    // to clean up the cached tokens.
    this.auth.signOut();
  }

  async loggedIn() {
    return new Promise(resolve => {
      this.auth
        .currentAuthenticatedUser()
        .then(result =>
          resolve({
            code: 200,
            datas: result
          })
        )
        .catch(err => resolve(err));
    });
  }
}

export default AWS.getInstance();
