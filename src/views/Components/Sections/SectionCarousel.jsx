import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import { container } from "assets/jss/material-kit-react.jsx";
import Card from "components/Card/Card.jsx";

class SectionCarousel extends React.Component {
  render() {
    const { classes } = this.props;
    const settings = {...this.props.settings, ...{
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    }};
    const images = [];
    this.props.data.forEach(eachImg => {
      images.push(<div key={eachImg.poster_path}>
        <a href={'https://www.google.com'}><img
          src={`${this.props.urlPrefix}${eachImg.poster_path}`}
          className="slick-image"
        /></a>
        <div className="slick-caption">
          <h4>
            {eachImg.title}
          </h4>
        </div>
      </div>);
    });
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
              <Card carousel>
                <Carousel {...settings}>
                  {images}
                </Carousel>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles({
  section: {
    padding: "70px 0"
  },
  container,
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important"
  }
})(SectionCarousel);
