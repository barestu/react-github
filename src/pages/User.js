import React, { Fragment, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../components/layout/Spinner';
import Repos from '../components/repos/Repos';
import GithubContext from '../context/github/githubContext';

const UserPage = (props) => {
  const { match } = props;
  const {
    user,
    getUser,
    repos,
    getUserRepos,
    isLoading,
  } = useContext(GithubContext);

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    hireable,
    avatar_url,
    name,
    location,
    bio,
    html_url,
    login,
    company,
    blog,
    followers,
    following,
    public_repos,
    public_gists,
  } = user;

  if (isLoading) return <Spinner />;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light">Back To Search</Link>
      Hireable: {' '}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}

      <div className="card grid-2">
        <div className="all-center">
          <img
            className="round-img"
            src={avatar_url}
            style={{ width: 150 }}
            alt="Avatar"
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a className="btn btn-dark my-1" href={html_url}>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>

      <Repos repos={repos} />
    </Fragment>
  );
};

UserPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default UserPage;
