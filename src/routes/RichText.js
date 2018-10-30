import React from 'react';
import { connect } from 'dva';
import RichText from './RichText/index';

function RichTextPage() {
  return (
    <RichText/>
  );
}

export default connect()(RichTextPage);