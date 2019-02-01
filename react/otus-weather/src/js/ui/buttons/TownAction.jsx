import React from "react"
import Fab from '@material-ui/core/es/Fab/Fab';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export default ({ className, isObservable, action, size="medium" }) => (
  <Fab onClick={action}
       aria-label="Remove from observables"
       color="primary"
       size={size}
       className={className}>
    {isObservable ? <Favorite/> : <FavoriteBorder/>}
  </Fab>
);