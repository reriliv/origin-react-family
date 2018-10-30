import React from 'react';
import {connect} from 'dva';
import Manage from './Manage/Manage';

const ManagePage = () => {
  return (
    <Manage/>
  );
}

export default connect()(ManagePage);
