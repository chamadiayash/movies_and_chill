import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import CastList from "views/MoviePage/CastList.jsx";
import SectionImageList from "views/Components/Sections/SectionImageList.jsx";



import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      id: null,
      details: {},
      credits: {},
      popularOthers: [],
      apiConfig: {},
    };
  }
  async componentWillMount() {
    if(this.props.match.params.profileId){
      const resDetails = await axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.profileId}?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      const resCredits = await axios.get(`https://api.themoviedb.org/3/person/${this.props.match.params.profileId}/combined_credits?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      const respopularOthers = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      const resConfig = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      this.setState({
        id: this.props.match.params.profileId,
        details: resDetails.data,
        credits: resCredits.data,
        popularOthers: respopularOthers.data.results,
        apiConfig: resConfig.data,
      });
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    console.log('profile render', this.state, this.props);
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
        <div className={classNames(classes.main, classes.mainRaised)}>
        {this.state.apiConfig.images && 
              <GridContainer>
                <GridItem xs={12} sm={4} md={2} className={classes.itemGrid}>
                <Card plain>
                  <img src={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[2]}${this.state.details.profile_path}`} alt="..." className={imageClasses} />
                  <CardBody><h4 className={classes.cardTitle}>
                    {this.state.details.name}
                    <br />
                    <small className={classes.smallTitle}>{`Born on ${this.state.details.birthday}. Known for ${this.state.details.known_for_department.toLowerCase()}`}</small>
                  </h4>
                  </CardBody>
                  <CardFooter className={classes.justifyCenter}>
                    {this.state.homepage && <Link to={this.state.homepage}>
                    <Button
                      justIcon
                      color="transparent"
                      className={classes.margin5}
                      href={this.state.homepage}
                    >
                      <i className={classes.socials + " fas fa-address-book"} />
                    </Button></Link>}
                  </CardFooter>
              </Card>
                </GridItem>
                <GridItem xs={12} sm={8} md={10} className={classes.itemGrid}>
                  
                    <p className={classes.description}>
                      {this.state.details.biography}
                    </p>
          
                </GridItem>
                </GridContainer>
          }

          {this.state.apiConfig.images && this.state.credits.cast.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black", color: 'white'}}>Cast Credits</h2>
            </div>
          <SectionImageList data={this.state.credits.cast} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[2]}`}/>
          </div>}
          {this.state.apiConfig.images && this.state.credits.crew.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black", color: 'white'}}>Crew Credits</h2>
            </div>
          <SectionImageList data={this.state.credits.crew} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[2]}`}/>
          </div>}
        
        </div>
        {this.state.apiConfig.images && this.state.popularOthers.length > 0 && <div>
            <div className={classes.title}>
              <h2 style={{backgroundColor: "black", color: 'white'}}>Other popular people on the network</h2>
            </div>
          <CastList data={this.state.popularOthers} urlPrefix={`${this.state.apiConfig.images.secure_base_url}${this.state.apiConfig.images.poster_sizes[2]}`}/>
          </div>}
        <Footer />
      </div>
    );
  }popular
}

export default withStyles(profilePageStyle)(ProfilePage);
