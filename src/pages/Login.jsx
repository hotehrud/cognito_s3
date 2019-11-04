import React, { useState, useEffect, useRef } from 'react';
import aws from 'js/s3';
import _ from 'lodash';
import 'styles/login.scss';

const Login = ({ history }) => {
  const [loginMessage, updateLoginMessage] = useState('');
  const [loginType, setLoginType] = useState(true);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    repassword: ''
  });
  const submitBtn = useRef();

  const onChange = e => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      const el = e.target;
      if (el.tagName === 'INPUT') {
        if (el.value) {
          const inputs = el.form.getElementsByTagName('input');
          const len = inputs.length;
          let currentIndex;
          for (let i = 0; i < len; i += 1) {
            if (inputs[i] === el) {
              currentIndex = i;
              break;
            }
          }
          const nextIndex = currentIndex < len - 1 ? currentIndex + 1 : currentIndex;
          inputs[nextIndex].focus();
        }
      }
      el.form.querySelector('.form_btn').click();
    }
  };

  const toggleEvent = () => {
    setLoginType(!loginType);
  };

  const signUp = async () => {
    await aws.signUp({
      username: inputs.username,
      password: inputs.password
    });
    updateLoginMessage('you need to confirm the email');
  };
  const signIn = async () => {
    const { message, datas } = await aws.signIn({
      username: inputs.username,
      password: inputs.password
    });
    if (!datas) {
      updateLoginMessage(message);
    } else {
      window.location.href = '/';
    }
  };

  useEffect(() => {
    const loggedIn = async () => {
      const user = await aws.loginStatus();
      if (user) {
        history.push('/');
      }
    };

    loggedIn();
  }, []);

  return (
    <div className="login_container">
      {loginType ? (
        <form>
          <h2>Sign in</h2>
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            type="text"
            name="username"
            placeholder="id"
            autoComplete="username"
          />
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            type="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
          />
          <p className="text_alert">{loginMessage}</p>
          <button onClick={signIn} ref={submitBtn} type="button" className="form_btn btn_comm">
            login
          </button>
          <p className="message">
            Not registered?
            <button onClick={toggleEvent} type="button">
              Create an account
            </button>
          </p>
        </form>
      ) : (
        <form>
          <h2>Sign up</h2>
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            type="text"
            name="username"
            placeholder="id"
            autoComplete="username"
          />
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            type="password"
            name="password"
            placeholder="password"
            autoComplete="new-password"
          />
          <input
            onChange={onChange}
            onKeyDown={onKeyDown}
            type="password"
            name="repassword"
            placeholder="confirm"
            autoComplete="new-password"
          />
          <p className="text_alert">{loginMessage}</p>
          <button onClick={signUp} ref={submitBtn} type="button" className="form_btn btn_comm">
            create
          </button>

          <p className="message">
            Already registered?
            <button onClick={toggleEvent} type="button">
              Sign In
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
