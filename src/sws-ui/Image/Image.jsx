import React from "react"
import classNames from "classnames"
import { useStaticQuery, graphql } from "gatsby"
import { default as GatsbyImage } from "gatsby-image"

const Image = ({ src, row, col }) => {
  const classes = classNames(row, col)

  const images = useStaticQuery(graphql`
    query {
      allImages: allFile(filter: { relativePath: { regex: ".*/" } }) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(maxWidth: 558, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const image = images.allImages.edges.find(n => {
    return n.node.relativePath.includes(src)
  })
  if (!image) return null

  return (
    <GatsbyImage
      className={classes}
      fluid={image.node.childImageSharp.fluid}
      placeholderStyle={{
        filter: "blur(15px)",
      }}
      style={{
        width: "inherit",
      }}
      imgStyle={{
        height: "inherit",
        width: "100%",
        top: "auto",
        bottom: 0,
        // top: '50%',
        // transform: 'translateY(-50%)',
      }}
    />
  )
}

export default Image
