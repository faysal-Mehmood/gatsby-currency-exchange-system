import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function Contactapi() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { slug: { eq: "contact_page" } } }
        ) {
          nodes {
            frontmatter {
              title
              visit
              email
              chat
              line
              description
            }
          }
        }
      }
    `
  )

  return data
}
