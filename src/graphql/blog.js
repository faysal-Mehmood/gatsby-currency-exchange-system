import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function Blogapi() {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          sort: { fields: frontmatter___date, order: DESC }
          filter: { frontmatter: { slug: { eq: "blog_page" } } }
        ) {
          nodes {
            frontmatter {
              image
              summary
              title
              date
              blog_post
              category
              author_name
              category_language
            }
          }
        }
      }
    `
  )

  return data
}
