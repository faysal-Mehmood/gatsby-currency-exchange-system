import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function Blogapi() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { slug: { eq: "news_page" } } }
        ) {
          nodes {
            frontmatter {
              image
              summary
              title
              date
              news_article
              category_language
              author_name
            }
          }
        }
      }
    `
  )

  return data
}
