import React from "react"
import { Fab } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import PropTypes from 'prop-types';

const LikeTownButton =
  ({ className, isObservable, sizeType = "medium", addHandler = f => f, removeHandler = f => f }) => (
    <Fab onClick={isObservable ? removeHandler : addHandler}
         aria-label="Remove from observables"
         color="primary"
         size={sizeType}
         className={className}>
      {isObservable ? <Favorite/> : <FavoriteBorder/>}
    </Fab>
  );

LikeTownButton.propTypes = {
  className: PropTypes.string.isRequired,
  isObservable: PropTypes.bool.isRequired,
  sizeType: PropTypes.string,
  addHandler: PropTypes.func,
  removeHandler: PropTypes.func
};

export default LikeTownButton;