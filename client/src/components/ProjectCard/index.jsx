import React from 'react';
import './styles.scss';

const projectCard = (props) => {
  return (
    <div className='card'>
      <div className='info'>
        <div className='title'>
          <p>{props.title}</p>
        </div>
        <hr />
        <div className='description'>
          <p>{props.shortDescription}</p>
        </div>
        <hr />
        <div className='footer'>footer</div>
      </div>
    </div>
  );
};

export default projectCard;
