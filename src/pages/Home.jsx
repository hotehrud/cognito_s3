import React from 'react';

import 'styles/home.scss';
import s3Icon from 'assets/images/s3.png';
import cognitoIcon from 'assets/images/cognito.png';

const Home = () => {
  return (
    <>
      <h1>Storage Management with User</h1>

      <div className="card">
        <div className="card_header">
          <h3>Demo</h3>
        </div>
        <ul className="requirement">
          <li>public/* - Everybody can access the files in the Public folder</li>
          <li>
            private/USER_ID/* - Only authorized user can access the files in the Private folder
          </li>
        </ul>
      </div>

      <div className="card">
        <div className="card_header">
          <h3>Access to User level folders using Amazon S3 and Cognito</h3>
        </div>
        <div className="skill_box">
          <figure>
            <img src={cognitoIcon} alt="cognito" />
            <figcaption>Cognito</figcaption>
          </figure>

          <strong>+</strong>

          <figure>
            <img src={s3Icon} alt="s3" />
            <figcaption>S3</figcaption>
          </figure>
        </div>
      </div>

      <div className="card">
        <div className="card_header">
          <h3>Requirement, AWS Services</h3>
        </div>
        <ul className="requirement">
          <li>S3</li>
          <li>Cognito</li>
          <li>IAM</li>
        </ul>
      </div>

      <div className="card">
        <div className="card_header">
          <h3>S3 Bucket has a structure like this</h3>
        </div>
        <pre>
          {`
      ┬  
      ├ public
          ┬ 
          ├ *.png
      ├ private
          ┬ 
          ├ {identityId of user}
              ┬ 
              ├ *.png
      `}
        </pre>
      </div>

      <div className="card">
        <div className="card_header">
          <h3>Requirement</h3>
        </div>
        <ul className="requirement">
          <li>Creating s3 for upload-files</li>
          <li>Creating cognito for user-management</li>
          <li>Setting policy for S3 bucket for authorized users</li>
          <li>Setting policy for S3 bucket for unauthorized users</li>
          <li>You need to modify config file => src/config/s3.js</li>
        </ul>
      </div>
    </>
  );
};

export default Home;
