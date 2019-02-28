import React from "react";
import axios from 'axios';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import MovieDescription from 'views/MoviePage/MovieDescription';
import SectionCarousel from "views/Components/Sections/SectionCarousel.jsx";
import CastList from "views/MoviePage/CastList.jsx";

import moviePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
// queries to be made : 1. get details 2. get movie credits 3. get popular
const styles = {
  heading:{
    backgroundColor: 'black',
    color: 'white',
    align: 'center',
  }
};
class MoviePage extends React.Component {
  constructor() {
    super();
    this.state = {
      movieId: null,
      movieDetails: {},
      credits: {},
      similarMovies: [],
      apiConfig: {},
    };
  }
  async componentWillMount() {
    if(this.props.match.params.movieId){
      const resDetails = await axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      const resCredits = await axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/credits?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      const resSimilar = await axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}/similar?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      const resConfig = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      this.setState({
        movieId: this.props.match.params.movieId,
        movieDetails: resDetails.data,
        credits: resCredits.data,
        similarMovies: resSimilar.data.results,
        apiConfig: resConfig.data,
      });
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    console.log('this.props single movie page', this);
    return (
      <div>
        <Header
          color="transparent"
          brand="Movies and Chill"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
        {this.state.apiConfig.images && <MovieDescription details={this.state.movieDetails} movieImage={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[2]}${this.state.movieDetails.poster_path}`}/>}
          {this.state.apiConfig.images && this.state.credits.cast.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black", color: 'white'}}>Cast</h2>
            </div>
            <CastList data={this.state.credits.cast} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[2]}`}/>
          </div>}
          {this.state.apiConfig.images && this.state.credits.crew.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black", color: 'white'}}>Crew</h2>
            </div>
            <CastList data={this.state.credits.crew} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[2]}`}/>
          </div>}
          {this.state.apiConfig.images && this.state.similarMovies.length > 0 && <div>
            <div className={classes.title}>
            <h2 style={{backgroundColor: "black", color: 'white'}}>Related movies</h2>
          </div>
            <SectionCarousel data={this.state.similarMovies} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[4]}`}/>}
            </div>}
        <Footer />Now playing in theatres near you
      </div>
    );
  }
}

export default withStyles(moviePageStyle)(MoviePage);
