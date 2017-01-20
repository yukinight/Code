import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import style from './IndexPage.less';
import BottomPanel from '../components/bottomPanel/bottomPanel';
import SearchBox from '../routes/searchBox';
import ToolBar from '../components/toolBar/toolBar';

function IndexPage() {
  return (
    <div className={style.container}>
      <SearchBox />
      <ToolBar />
      <BottomPanel />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
