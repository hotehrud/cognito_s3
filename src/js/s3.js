import AWS from 'aws-sdk';
import { Storage } from 'aws-amplify';
import aws from 'js/amplify';

class Tower {
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Tower();
    return this.instance;
  }

  constructor() {
    this.aws = aws;
    this.storage = Storage;
    this.s3 = new AWS.S3();
  }

  async signIn(userData) {
    const res = await this.aws.signIn(userData);
    return res;
  }

  async signUp(userData) {
    const res = await this.aws.signUp(userData);
    return res.code === 200 ? res.datas : res;
  }

  signOut() {
    this.aws.signOut();
  }

  async loginStatus() {
    const { code, datas } = await this.aws.loggedIn();
    return code === 200 ? datas : null;
  }

  // Method Name|Request Params|Need authentication|callback
  async bridge(kind, params, needAuth = true, callback) {
    if (needAuth) {
      const loginStatus = await this.loginStatus();
      if (!loginStatus && window.location.href.indexOf('login') < 0) {
        this.aws.signOut();
        return false;
      }
    }

    this.s3 = new AWS.S3();
    let result = true;
    switch (kind) {
      case 'getUserData':
        result = this.aws.getUserData();
        break;
      case 'getList':
        result = await this.getList(params);
        break;
      case 'upload':
        result = await this.upload(params, callback);
        break;
      case 'getObject':
        result = await this.getObject(params);
        break;
      default:
        break;
    }
    return result;
  }

  getList(params) {
    return new Promise((resolve, reject) => {
      const { path, level } = params;
      this.storage
        .list(path, { level })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getObject({ key, level }) {
    return new Promise((resolve, reject) => {
      this.storage
        .get(key, {
          level
        })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  upload({ path, body, contentType, level }, cb) {
    return new Promise((resolve, reject) => {
      this.storage
        .put(path, body, {
          level,
          contentType,
          progressCallback(progress) {
            cb(progress.loaded / progress.total);
          }
        })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default Tower.getInstance();
