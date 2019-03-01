import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const styles = {
  card: {
    minWidth: 275,
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
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
      <GridContainer>
      <GridItem sm={12} md={6} lg={3}><img
        src={props.movieImage}
        alt="..."
        className={
        classes.imgRaised +
        " " +
        classes.imgRounded +
        " " +
        classes.imgFluid
        }
        />
      </GridItem>
      <GridItem sm={12} md={6} lg={9}>
        <h3>
        {props.details.title}
        </h3>
        <br/>
        {props.details.overview}
        </GridItem>
      </GridContainer>
      </CardContent>
      <CardActions>
        <Button size="small">Watch Trailer</Button>
        <Button size="small">Visit!!</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
