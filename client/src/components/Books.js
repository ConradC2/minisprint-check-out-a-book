import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    margin: '10px',
    borderRadius: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

});

export default function SimpleCard({book, handleCheckInCheckOut}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
      <ListItem className={classes.card}>
        <ListItemText>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {book.title} by {book.author}  - ISBN: {book.isbn}   
        </Typography>
        <Typography variant="body2" component="p">
        Status: {book.isCheckedOut ? `Out DueDate: ${book.due_date} Checked Out to: UserID: ${book.userId} ` : 'In'  } 
        </Typography>
       </ListItemText>
      <ListItemIcon >
         <Button  variant="contained" color="primary" data-bookid={book.id} onClick={handleCheckInCheckOut}>{book.isCheckedOut ? 'Check In' : 'Check Out'}</Button>

      </ListItemIcon>


      </ListItem>

  );
}
