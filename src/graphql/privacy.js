import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function Privacyyapi() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: { frontmatter: { slug: { eq: "privacy_policy" } } }
        ) {
          nodes {
            frontmatter {
              title
              privacy_policy_content
            }
          }
        }
      }
    `
  )

  return data
}
