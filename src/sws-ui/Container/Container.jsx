import React from "react"
import classNames from "classnames"

const Container = ({ gridTemplateRows, maxWidth, className, children }) => {
  const classes = classNames("container", className)

  return <main className={classes}>{children}</main>
}

export default Container
