import React from "react"
import News from "../dynamicPages/news-page"

export default function NewsTemplate({ pageContext }) {
  const data = pageContext.alldata.frontmatter
  return (
    data && (
      <News
        image={data.image}
        summary={data.summary}
        title={data.title}
        date={data.date}
        news_article={data.news_article}
        author_name={data.author_name}
      />
    )
  )
}
