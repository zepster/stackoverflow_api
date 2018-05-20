import React from 'react';

const Info = (props) => (
  <div>
    <ul>
      <li>Имя создателя вопроса: {props.ownerName}</li>
      <li>Рейтинг создателя вопроса: {props.ownerReputation}</li>
      <li>Количество просмотров: {props.viewCount}</li>
    </ul>
  </div>
)

export default Info;
