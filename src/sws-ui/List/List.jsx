import React from "react"
import classNames from "classnames"

const List = ({
  className,
  type = "ol",
  privacy_policy_eight,
  privacy_policy_elleven,
  privacy_policy_five,
  privacy_policy_four,
  privacy_policy_nine,
  privacy_policy_one,
  privacy_policy_page_title,
  privacy_policy_seven,
  privacy_policy_six,
  privacy_policy_ten,
  privacy_policy_three,
  privacy_policy_twelve,
  privacy_policy_two,
}) => {
  const ListElement = type

  const classes = classNames(
    "list",
    type === "ol" ? "list--ordered" : "list--unordered",
    className
  )

  return (
    <ListElement className={classes}>
      <li>
        <p>{privacy_policy_one}</p>
      </li>
      <li>
        <p>{privacy_policy_two}</p>
      </li>
      <li>
        <p>{privacy_policy_three}</p>
      </li>
      <li>
        <p>{privacy_policy_four}</p>
      </li>
      <li>
        <p>{privacy_policy_five}</p>
      </li>
      <li>
        <p>{privacy_policy_six}</p>
      </li>
      <li>
        <p>{privacy_policy_seven}</p>
      </li>
      <li>
        <p>{privacy_policy_eight}</p>
      </li>
      <li>
        <p>{privacy_policy_nine}</p>
      </li>
      <li>
        <p>{privacy_policy_ten}</p>
      </li>
      <li>
        <p>{privacy_policy_elleven}</p>
      </li>
      <li>
        <p>{privacy_policy_twelve}</p>
      </li>
    </ListElement>
  )
}

export default List
