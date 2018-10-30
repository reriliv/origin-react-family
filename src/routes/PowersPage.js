import React from 'react';
import {connect} from 'dva';
import Powers from './Powers/Powers';

const PowersPage = () => {
  return (
   <Powers></Powers>
  );
}

export default connect()(PowersPage);
