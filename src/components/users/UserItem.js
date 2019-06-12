import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ user }) => {
  const { login, avatar_url, html_url } = user;

  return (
    <div className="card text-center">
      <img
        className="round-img"
        src={avatar_url}
        style={{ width: 60 }}
        alt="avatar" />
      <h3>{login}</h3>
      <div>
        <a className="btn btn-dark btn-sm my-1" href={html_url}>
          More
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
