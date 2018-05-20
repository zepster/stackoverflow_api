import React from 'react';
import cn from 'classnames';

import './index.css'

const Header = props => (
  <div className={cn('header', { 'header--active': props.active })}>
    <div className='header__title'>
      {props.title}
    </div>
    <div className='header__action'>
        <span className='score'>{props.score}</span>
        {props.actions}
    </div>
  </div>
)

export default Header;
