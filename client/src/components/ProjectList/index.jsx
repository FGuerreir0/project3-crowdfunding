import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ProjectsList = (props) => {
  return (
    <div>
      {props.projects.map((project) => (
        <Link to={`/project/${project._id}`} key={project._id}>
          <div>
            <div>
              <img src={project.coverPictureUrl} alt={project.title} />
            </div>
            <div className='body'>
              <span>{project.shortDescription}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsList;
