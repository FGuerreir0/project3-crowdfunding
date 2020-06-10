import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import formatDate from './../../helper/formatDate';
import ProgressBar from './../../components/ProgressBar';

const ProjectsList = (props) => {
  return (
    <div className='mr-16 ml-16'>
      {props.projects.map((project) => (
        <div key={project._id}>
          <div>
            <img
              className='object-cover h-48 w-full ...'
              src={project.coverPictureUrl}
              alt={project.title}
            />
            <div className='project_dateCreator'>
              <small>
                <strong>Created by: </strong>
                {project.creator.username}
              </small>
              <small>
                <strong>Date: </strong>
                {formatDate(project.updatedDate)}
              </small>
            </div>
          </div>
          <div className='project_information'>
            <h2 className='text-3xl'>{project.title}</h2>
            <p className='text-base limitLines'>{project.shortDescription}</p>
            {project.needs.money.total && (
              <div>
                <ProgressBar project={project} />
              </div>
            )}
          </div>
          <div className='anchor_style'>
            <Link to={`/project/${project._id}`}>Read more here</Link>
          </div>
          <hr className='mt-8 mb-8 border-1 border-gray-400'></hr>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;
