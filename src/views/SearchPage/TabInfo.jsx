import React from "react";
import axios from "axios";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


import CastList from "views/MoviePage/CastList.jsx";
import SectionImageList from "views/Components/Sections/SectionImageList.jsx";

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pageNo: 1,
      pageType: null,//can be movie,tv or person
      query: '',
      results: [],
    };
  }
  async componentWillMount() {
    if(this.props.pageType){
        const res = await axios.get(`https://api.themoviedb.org/3/search/${this.props.pageType}?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=${this.state.pageNo}&query=${encodeURI(this.props.query)}`);
        this.setState({
            query: this.props.query,
            pageType:this.props.pageType,
            results: res.data.results,
        });
    }
  }
  render() {
    console.log('render tabInfo', this);
    const { classes } = this.props;
    return (
        <div className={classNames(classes.main, classes.mainRaised)}>
            {this.state.pageType && this.state.pageType === 'person' && this.state.results.length > 0 &&
            <CastList data={this.state.results} urlPrefix={`${this.props.apiConfig.images.secure_base_url}${this.props.apiConfig.images.poster_sizes[2]}`}/>
            }
          
            {this.state.pageType && this.state.pageType !== 'person' && this.state.results.length > 0 &&
            <SectionImageList data={this.state.results} urlPrefix={`${this.props.apiConfig.images.secure_base_url}${this.props.apiConfig.images.poster_sizes[2]}`}/>
            }
        </div>
    );
  }
}

export default withStyles({})(SearchPage);
