import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
        console.log('this.props.data',this.props);
        const images = this.props.data.map((tile)=>{
            return (<GridListTile key={tile.title} className="imgFullWidth" className="imgFullHeight">
                <img src={`${that.props.urlPrefix}${tile.poster_path}`} alt={tile.title} />
                <GridListTileBar
                title={tile.title}
                classes={{
                    root: classes.titleBar,
                    title: classes.title,
                }}
                // actionIcon={
                //     <IconButton>
                //     <StarBorderIcon className={classes.title} />
                //     </IconButton>
                // }
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
  