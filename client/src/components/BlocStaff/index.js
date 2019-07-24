import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const movieByIdStyle = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '28%',
    boxShadow: '1px 1px 10px rgba(0,0,0, 0.2)',
    padding: '1rem',
    marginTop: '1rem',
    marginLeft: '1rem'
  },
  profileInfos: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '100%',
    border: '1px solid #f1c40f'
  },
  id: {
    margin: '1rem 0',
    fontSize: '1.5rem',
  },
  moreProfile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nationality: {
    fontSize: '.9rem',
  },
  birthdate: {
    fontSize: '.9rem',
  },
  moreInfos: {
      marginTop: '1rem',
  },
  biography: {},
}))

const BlockStaff = ({staff}) => {
    const classes = movieByIdStyle();

    return (
        <div className={classes.container}>
            <div className={classes.profileInfos}>
                <img className={classes.avatar} />
                <h2 className={classes.id}>{`${staff.firstname} ${staff.lastname}`}</h2>
                <div className={classes.moreProfile}>
                    <p className={classes.nationality}>Nationality : {staff.nationality}</p>
                    <p className={classes.birthdate}>Birthdate : {staff.birthday}</p>
                </div>
            </div>
            <div className={classes.moreInfos}>
                <p className={classes.biography}>
                    Bio : {staff.biography}
                </p>
            </div>
        </div>
    )
}

export default BlockStaff;
