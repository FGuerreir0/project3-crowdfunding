import React from 'react';
import './styles.scss';
import ProjectCard from './../ProjectCard';

const horizontalCardList = (props) => {
  return (
    <div className='row'>
      {props.projects.map((project) => {
        return <ProjectCard key={project._id} {...project}></ProjectCard>;
      })}
    </div>
  );
};

export default horizontalCardList;
