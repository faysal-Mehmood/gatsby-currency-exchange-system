import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function useSiteMetadat() {
  const site = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          nodes {
            frontmatter {
              slug
              title
              link_text
              image
              heading
              description
              button_text
            }
          }
        }
      }
    `
  )
  console.log(site)
  return site
}
