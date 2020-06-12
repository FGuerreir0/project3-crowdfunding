import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import formatDate from './../../helper/formatDate';
import ProgressBar from './../../components/ProgressBar';

const ProjectsList = (props) => {
  console.log(props);
  let loaded = false;
  if (props.projects.length > 0) loaded = true;
  console.log(props.projects);
  return (
    <>
      {loaded && (
        <div className='overflow-hidden'>
          <div className='rounded projectCardLine shadow-lg my-2'>
            {props.projects.map((project) => (
              <div key={project._id} className='projectCardHome'>
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
                <div className='projectCardInformation px-6 py-4'>
                  <h2 className='font-bold text-xl mb-2'>{project.title}</h2>
                  <div className='projectDescriptionHome'>
                    <p className='text-base limitLines lineHe mb-5 mt-5 text-grey-darker'>
                      {project.shortDescription}
                    </p>
                  </div>

                  {(project.needs.money.total && (
                    <div>
                      <ProgressBar project={project} />
                    </div>
                  )) ||
                    ''}
                </div>
                <div className='px-6 py-4'>#{project.category}</div>

                {props.user && (
                  <div className='bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 border border-blue-700 rounded'>
                    <Link to={`/project/${project._id}`}>Find out more</Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {!loaded && (
        <div className='w-full mt-20 '>
          <img
            className='object-contain h-48 w-full mb-20 ...'
            src={process.env.PUBLIC_URL + '/images/NoResult.png'}
            alt='No result found'
          />
        </div>
      )}
    </>
  );
};

export default ProjectsList;

//ARTUR VERSION
/*
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import formatDate from './../../helper/formatDate';
import ProgressBar from './../../components/ProgressBar';

const ProjectsList = (props) => {
  return (
    <div className='max-w-xs rounded overflow-hidden shadow-lg my-2'>
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
          <div className='project_information px-6 py-4'>
            <h2 className='font-bold text-xl mb-2'>{project.title}</h2>
            <p className='text-base limitLines lineHe mb-5 mt-5 text-grey-darker'>
              {project.shortDescription}
            </p>
            {project.needs.money.total && (
              <div>
                <ProgressBar project={project} />
              </div>
            )}
          </div>
          <div className='px-6 py-4'>#{project.category}</div>
          <div className='bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 border border-blue-700 rounded'>
            {props.user && <Link to={`/project/${project._id}`}>Find out more</Link>}
          </div>
          <hr className='mt-8 mb-8 border-1 border-gray-400'></hr>
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;*/
