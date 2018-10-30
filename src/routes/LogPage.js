import React from 'react';
import {connect} from 'dva';
import Log from './Log/Log';

const LogPage = () => {
  return (
    <Log/>
  );
}

export default connect()(LogPage);
