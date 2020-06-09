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
              <div>
                <small>Created by: {project.creator.username}</small>
                <small>Date:{project.updatedDate}</small>
              </div>
            </div>
            <div>
              <h2>{project.title}</h2>
              <p>{project.shortDescription}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectsList;
