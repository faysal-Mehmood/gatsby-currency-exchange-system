import React from "react"
import { LinkHandler, Image, Heading } from "src/sws-ui"

import classNames from "classnames"

const BlogFeature = ({
  detailpagelink,
  heading,
  content,
  col,
  row,
  category,
  image,
  isBlogPost,
}) => {
  const classes = classNames("blog-feature", col, row)

  const descriptionClasses = classNames(
    "blog-feature__description",
    `blog-feature__description--${category.toLowerCase()}`
  )

  const categoryClasses = classNames(
    "blog-feature__cat",
    `blog-feature__cat--${category.toLowerCase()}`
  )

  return (
    <section className={classes}>
      <Image src={image} className="blog-feature__image" />
      <div className={descriptionClasses}>
        <Heading size={2}>{heading}</Heading>
        <p>{content}</p>
        <LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/THI') ? `/THI${detailpagelink}`: `/ENG${detailpagelink}`} arrow={true} className="link">
          Read More
        </LinkHandler>
      </div>
      {!isBlogPost && (
        <div className="blog-feature__meta">
          <LinkHandler
            to=""
            linkText={category}
            className={categoryClasses}
          ></LinkHandler>
        </div>
      )}
    </section>
  )
}

export default BlogFeature
