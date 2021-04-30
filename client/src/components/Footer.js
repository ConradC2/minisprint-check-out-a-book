import React from 'react'
import { Typography, makeStyles } from '@material-ui/core';
import styles from '../styles'

const useStyles = makeStyles(styles)

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
    <Typography variant='h5' align='center'>
      footer text
    </Typography>
  </div>
  )
}
