import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <h3>No match found</h3>
      <Link to="/">Get Quote</Link>
    </div>
  );
};

export default NoMatch;
