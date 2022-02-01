import React from "react"
import { Button, Heading } from "src/sws-ui"
import classNames from "classnames"

import image from "src/images/people/blog/a-young-girl-listens-to-a-music-or-podcast-while-traveling-in-a-train.png"

const BlogCards = ({
  heading,
  content,
  cards,
  row,
  to,
  blog_description_one,
  blog_description_three,
  blog_description_two,
  blog_heading_one,
  blog_heading_three,
  blog_heading_two,
  blog_image_one,
  blog_image_two,
  blog_link_one,
  blog_link_three,
  blog_image_three,
  blog_main_title,
  blog_link_two,
}) => {
  const classes = classNames("blog-cards", "col-full col-sm-full", row)

  return (
    <section className={classes}>
      <div className="blog-cards__wrapper">
        <Heading size={2}>{blog_main_title}</Heading>
        <p>{content}</p>

        <div className="blog-cards__cards">
          <div className="blog-card">
            <img
              className="blog-cards__image"
              src={require("../../../static/assets/" +
                blog_image_one.split("/")[
                  blog_image_one.split("/").length - 1
                ])}
              alt="a-young-girl-listens-to-a-music-or-podcast-while-traveling-in-a-train"
            />
            <Heading size={3}>{blog_heading_one}</Heading>
            <p>{blog_description_one}</p>
            <Button arrow to={blog_link_one} />
          </div>

          <div className="blog-card">
            <img
              className="blog-cards__image"
              src={require("../../../static/assets/" +
                blog_image_two.split("/")[
                  blog_image_two.split("/").length - 1
                ])}
              alt="a-young-girl-listens-to-a-music-or-podcast-while-traveling-in-a-train"
            />
            <Heading size={3}>{blog_heading_two}</Heading>
            <p>{blog_description_two}</p>
            <Button arrow to={blog_link_two} />
          </div>

          <div className="blog-card">
            <img
              className="blog-cards__image"
              src={require("../../../static/assets/" +
                blog_image_three.split("/")[
                  blog_image_three.split("/").length - 1
                ])}
              alt="a-young-girl-listens-to-a-music-or-podcast-while-traveling-in-a-train"
            />
            <Heading size={3}>{blog_heading_three}</Heading>
            <p>{blog_description_three}</p>
            <Button arrow to={blog_link_three} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogCards
