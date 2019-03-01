import React from "react";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import TabInfo from "views/SearchPage/TabInfo.jsx";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      tabId: 0,
      apiConfig: {},
    };
  }
  async componentWillMount() {
    if(this.props.match.params.searchQuery){
      const resConfig = await axios.get(`https://api.themoviedb.org/3/configuration?api_key=8be76478d5b6af2c6626817549c30df5&language=en-US&page=1`);
      this.setState({
        query: this.props.match.params.searchQuery,
        apiConfig: resConfig.data,
      });
    }
  }
  handleTabChange = (event, value) => {
    this.setState({ tabId: value });
  };
  render() {
    console.log('render search', this);
    const { classes, ...rest } = this.props;
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
        {/* <Paper className={classes.root}> */}
          <Tabs
            value={this.state.tabId}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Movies"/>
            {/* <Tab label="TV" /> */}
            <Tab label="People" />
          </Tabs>

          {this.state.query && this.state.tabId === 0 && <TabContainer><TabInfo
                pageType='movie'
                query={this.state.query}
                apiConfig={this.state.apiConfig}
              />
          </TabContainer>}
          {this.state.query && this.state.tabId === 1 && <TabContainer><TabInfo
              pageType='tv'
              query={this.state.query}
              apiConfig={this.state.apiConfig}
            />
          </TabContainer>}
          {this.state.query && this.state.tabId === 2 && <TabContainer><TabInfo
              pageType='person'
              query={this.state.query}
              apiConfig={this.state.apiConfig}
            />
          </TabContainer>}
      {/* </Paper> */}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(SearchPage);
