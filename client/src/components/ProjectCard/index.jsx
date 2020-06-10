import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const projectCard = (props) => {
  return (
    <Link to={`/project/${props._id}`}>
      <div className='card'>
        <div className='info'>
          <div className='title'>
            <p>{props.title}</p>
          </div>
          <hr />
          <div className='description'>
            <p className='limit'>{props.shortDescription}</p>
          </div>
          <hr />
          <div className='footer'>footer</div>
        </div>
      </div>
    </Link>
  );
};

export default projectCard;
