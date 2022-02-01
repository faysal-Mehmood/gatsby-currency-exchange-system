import React from "react"
import { Highlight, Image } from "src/sws-ui"
import classNames from "classnames"
// import { ReactSVG } from 'react-svg'

import greatRates from "src/images/icons/great-rates.png"
import secure from "src/images/icons/secure.png"
import noHiddenFee from "src/images/icons/no-hidden-fee.png"

const Features = ({
  items,
  row,
  app_feature_description_one,
  app_feature_description_two,
  app_feature_description_three,
  app_feature_heading_one,
  app_feature_heading_three,
  app_feature_heading_two,
  app_feature_image_one,
  app_feature_image_three,
  app_feature_image_two,
}) => {
  const classes = classNames("features", "col-center col-sm-center", row)

  return (
    <section className={classes}>
      <div className="features__content">
        <div className="features__item" key={1 + 6}>
          <div className="features__icon">
            <img
              className="features__icon"
              src={require("../../../static/assets/" +
                app_feature_image_one.split("/")[
                  app_feature_image_one.split("/").length - 1
                ])}
            ></img>
          </div>
          <Highlight key={1} heading={app_feature_heading_one}>
            <p>{app_feature_description_one}</p>
          </Highlight>
        </div>
        <div className="features__item" key={1 + 6}>
          <div className="features__icon">
            <img
              className="features__icon"
              src={require("../../../static/assets/" +
                app_feature_image_two.split("/")[
                  app_feature_image_two.split("/").length - 1
                ])}
            ></img>
          </div>
          <Highlight key={1} heading={app_feature_heading_two}>
            <p>{app_feature_description_two}</p>
          </Highlight>
        </div>
        <div className="features__item" key={1 + 6}>
          <div className="features__icon">
            <img
              className="features__icon"
              src={require("../../../static/assets/" +
                app_feature_image_three.split("/")[
                  app_feature_image_three.split("/").length - 1
                ])}
            ></img>
          </div>
          <Highlight key={1} heading={app_feature_heading_three}>
            <p>{app_feature_description_three}</p>
          </Highlight>
        </div>
      </div>
    </section>
  )
}

export default Features
