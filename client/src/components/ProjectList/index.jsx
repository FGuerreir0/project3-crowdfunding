import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import formatDate from './../../helper/formatDate';

const ProjectsList = (props) => {
  return (
    <div>
      {props.projects.map((project) => (
        <div key={project._id}>
          <div>
            <img src={project.coverPictureUrl} alt={project.title} />
            <div className='project_dateCreator'>
              <small>Created by: {project.creator.username}</small>
              <small>Date:{formatDate(project.updatedDate)}</small>
            </div>
          </div>
          <div className='project_information'>
            <h2>{project.title}</h2>
            <p>{project.shortDescription}</p>
            <p>Show ProgressBar</p>
          </div>
          <div className='anchor_style'>
            <Link to={`/project/${project._id}`}>Read more here</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
