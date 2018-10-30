import React from 'react';
import { connect } from 'dva';
import LoginPanel from './Login/LoginPanel';

function LoginPage() {

  return (
    <LoginPanel/>
  );
}

/*const mapPropsToState = (state) => {
  console.log(state, '状态');
  return {
    username: state.admin.username,
    password: state.admin.password,
    code: state.admin.code,
  }
};*/

export default connect()(LoginPage);
