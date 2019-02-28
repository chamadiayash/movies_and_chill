import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    paddingLeft: '20px',
    paddingRight: '20px',
    maxHeight:'auto',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});
// onClick={() => that.callURL(`/movie/${tile.id}`)} 
class CastList extends React.Component {
    callURL(url) {
        console.log('called functions', url, this);
        this.history.push(url);
    }
    render() {
        const { classes } = this.props;
        const that = this;
        const images = this.props.data.map((tile)=>{
            return (<GridListTile key={tile.id} style={{cursor: 'pointer'}}>
                <img src={`${that.props.urlPrefix}${tile.profile_path}`} alt={tile.name} />
                <GridListTileBar
                title={tile.name}
                classes={{
                    root: classes.titleBar,
                    title: classes.title,
                }}
                // actionIcon={
                //     <IconButton>
                //     </IconButton>
                // }
                />
            </GridListTile>);
        });
        return (
            <div className={classes.root}>
            <GridList className={classes.gridList} cols={6} spacing={4}>
                {images}
            </GridList>
            </div>
        );
    }
}
  
export default withStyles(styles)(CastList);
  