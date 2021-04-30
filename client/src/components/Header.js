import React from 'react'
import { AppBar, Toolbar, makeStyles, Typography } from '@material-ui/core';
import styles from '../styles'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(styles)

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position='relative' className={classes.header}>
    <Toolbar>
      <MenuIcon className={classes.menuicon}/>
      <Typography variant='h5'>SDI Library</Typography>
    </Toolbar>
  </AppBar>
  )
}
