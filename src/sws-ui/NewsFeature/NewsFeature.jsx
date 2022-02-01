import React from "react"
import { LinkHandler, Image, Heading } from "src/sws-ui"
import classNames from "classnames"

const NewsFeature = ({
  newspagelink,
  heading,
  content,
  col,
  row,
  date,
  category,
  image,
}) => {
  const classes = classNames("news-feature", col, row)

  const descriptionClasses = classNames("news-feature__description")

  return (
    <section className={classes}>
      <div className="news-feature__image">
        <Image src={image} />
      </div>
      <div className={descriptionClasses}>
        <p className="news-feature__date">{date}</p>
        <Heading size={2}>{heading}</Heading>
        <p>{content}</p>
        <LinkHandler linkUrl={typeof window !== 'undefined' && window.location.href.includes('/THI') ? `/THI${newspagelink}`: `/ENG${newspagelink}`} arrow={true}>
          Read More
        </LinkHandler>
      </div>
    </section>
  )
}

export default NewsFeature
