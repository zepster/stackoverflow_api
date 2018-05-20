import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import './index.css'

const VoteButton = (props) => (
  <div onClick={e => e.stopPropagation()} className='vote-button'>
    <ul className='vote-button--group'>
      <li>
        <Icon type="up" onClick={props.onUp}/>
      </li>
      <li>
        <Icon type="down" onClick={props.onDown}/>
      </li>
    </ul>
  </div>
)

VoteButton.propTypes = {
  onUp: PropTypes.func,
  onDown: PropTypes.func
};

export default VoteButton;
