import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import axios from 'axios';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

import Search from "@material-ui/icons/Search";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import SectionCarousel from "views/Components/Sections/SectionCarousel.jsx";
import SectionImageList from "views/Components/Sections/SectionImageList.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
// import ProductSection from "./Sections/ProductSection.jsx";
import TeamSection from "./Sections/TeamSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";

const dashboardRoutes = [];
/*
queries to be made : 
1. get weekly trending TRENDING
Get Now Playing
Get Popular
Get Top Rated
Get Upcoming
*/
class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      nowPlaying: [],
      popular: [],
      topRated: [],
      upcoming: [],
      apiConfig: {},
    };
  }
  async componentWillMount() {
    let newState = {};
    const res1 = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`)
    newState.nowPlaying = res1.data.results;
    const res2 = await axios.get(` https://api.themoviedb.org/3/movie/popular?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`)
    newState.popular = res2.data.results;
    const res3 = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`)
    newState.topRated = res3.data.results;
    const res4 = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`)
    newState.upcoming = res4.data.results;
    const res5 = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`)
    newState.apiConfig = res5.data;
    this.setState(newState);
  }
  render() {
    console.log('this.state', this.state);
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Movies and Chill"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Be a part of the magic with us!!</h1>
                <h4>
                  Search your favoruite movies on the go. Be a part of the largest entertainment community online.
                </h4>
                <br />
                <div>
                  <Button justIcon round color="white">
                    <Search className={classes.searchIcon} />
                  </Button>
                  <CustomInput
                    white
                    inputRootCustomClasses={classes.inputRootCustomClasses}
                    formControlProps={{
                      className: classes.formControl
                    }}
                    inputProps={{
                      placeholder: "Search",
                      inputProps: {
                        "aria-label": "Search",
                        className: classes.searchInput
                      }
                    }}
                  />
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
          {this.state.apiConfig.images && this.state.nowPlaying.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black"}}>Now playing in theatres near you</h2>
            </div>
            <SectionCarousel data={this.state.nowPlaying} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[1]}`}/>
          </div>}
          {this.state.apiConfig.images && this.state.topRated.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black"}}>Top Rated</h2>
            </div>
            <SectionImageList data={this.state.topRated} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[0]}`}/>
          </div>}
          {this.state.apiConfig.images && this.state.popular.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black"}}>Popular</h2>
            </div>
          <SectionImageList data={this.state.popular} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[0]}`}/>
          </div>}
          {this.state.apiConfig.images && this.state.upcoming.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black"}}>Upcoming</h2>
            </div>
            <SectionImageList data={this.state.upcoming} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[0]}`}/>
          </div>}
            <TeamSection />
            <WorkSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
