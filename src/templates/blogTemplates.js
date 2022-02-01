import React from "react"
import Blog from "../dynamicPages/blog-page"

export default function BlogTemplate({ pageContext }) {
  const data = pageContext.alldata.frontmatter
  return (
    data && (
      <Blog
        image={data.image}
        summary={data.summary}
        title={data.title}
        date={data.date}
        blog_post={data.blog_post}
        category={data.category}
        author_name={data.author_name}
      />
    )
  )
}
