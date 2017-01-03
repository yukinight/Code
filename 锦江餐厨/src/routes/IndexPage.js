import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.css';
import BottomPanel from '../components/bottomPanel/bottomPanel'

function IndexPage() {
  return (
    <div>
      <BottomPanel />
      5555
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
