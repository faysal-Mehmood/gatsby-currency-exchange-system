import React from "react"
import { Button, Heading } from "src/sws-ui"
import classNames from "classnames"

const Cards = ({
  heading,
  content,
  cards,
  alignCenter = false,
  noBorders = false,
  backgroundColor = "mist",
  size = "third",
  row,
}) => {
  console.log(cards)
  const classes = classNames(
    "cards",
    `cards--${backgroundColor}`,
    `cards--${size}`,
    alignCenter ? "cards--center" : "cards--left",
    noBorders && "cards--no-borders",
    "col-full col-sm-full",
    row
  )

  return (
    <section className={classes}>
      <div className="cards__wrapper">
        <Heading size={2}>{heading}</Heading>

        <p className="cards__content">{content}</p>

        <div className="cards__container">
          {cards.map(data => {
            return data
          })}
        </div>
      </div>
    </section>
  )
}

export default Cards
