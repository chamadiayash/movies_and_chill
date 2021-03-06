import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});
class SectionImageList extends React.Component {
    render() {
        const { classes } = this.props;
        const that = this;
        const images = this.props.data.map((tile)=>{
            return (<GridListTile key={tile.id} style={{cursor: 'pointer'}}>
                <Link to={`/movie/${tile.id}`}><img src={`${that.props.urlPrefix}${tile.poster_path}`} alt={tile.title} />
                </Link>
                <GridListTileBar
                title={tile.title}
                classes={{
                    root: classes.titleBar,
                    title: classes.title,
                }}
                />
            </GridListTile>);
        });
        return (
            <div className={classes.root}>
            <GridList className={classes.gridList} cols={4} spacing={4}>
                {images}
            </GridList>
            </div>
        );
    }
}
  
export default withStyles(styles)(SectionImageList);
  