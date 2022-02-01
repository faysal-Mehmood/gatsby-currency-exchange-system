import React from "react"
import "src/css/pages/_blog-page.scss"

import NewsApi from "../graphql/news"
import {
  Heading,
  BlogFeature,
  Container,
  Layout,
  SEO,
  Image,
  LinkHandler,
} from "src/sws-ui"
import ReactMarkdown from "react-markdown"
const BlogPage = ({
  image,

  title,
  date,
  news_article,

  author_name,
}) => {
  if (!!date) {
    var date_stamp = new Date(date)
    console.log(date_stamp)
    var convertime = date_stamp.toDateString()
  }

  const NewsApidata = NewsApi()

  return (
    <Layout>
      <SEO title="Blog Page" />

      <Container gridTemplateRows="8">
        <Heading
          size="2"
          col="col-2-11 col-md-1-12"
          row="row-1"
          className="blog-title"
          style={{ marginTop: "50px" }}
        >
          {title}
        </Heading>
        <div className="col-2-11 col-md-1-12 row-2 blog__meta">
          <span className="blog__meta--date">{convertime}</span>
          <span className="blog__meta--author">
            By <LinkHandler>{author_name}</LinkHandler>
          </span>
        </div>
        <Image
          src={image.split("/")[image.split("/").length - 1]}
          className="blog-feature__image"
          col="col-2-11 col-md-1-12"
          row="row-3"
        />

        <div className="col-2-11 col-md-1-12 row-4 blog__contents">
          <ReactMarkdown source={news_article} />
        </div>
        <div className="related__articles col-2-11 col-md-1-12 row-5">
          <Heading size="2" className="blog-title">
            Related Articles
          </Heading>
        </div>
        {NewsApidata.allMarkdownRemark.nodes.map((data, counter) => {
          return (
            <>
              {counter < 2 && (
                <BlogFeature
                  category="event"
                  isBlogPost
                  heading={data.frontmatter.title}
                  content={data.frontmatter.summary}
                  col={
                    counter == 0
                      ? "col-2-6 col-md-center"
                      : "col-7-11 col-md-center"
                  }
                  row="row-6 row-md-7"
                  image={
                    data.frontmatter.image.split("/")[
                      data.frontmatter.image.split("/").length - 1
                    ]
                  }
                  detailpagelink={
                    "/news/" + data.frontmatter.title.replace(/\s/g, "_")
                  }
                ></BlogFeature>
              )}
            </>
          )
        })}
      </Container>
    </Layout>
  )
}
export default BlogPage
