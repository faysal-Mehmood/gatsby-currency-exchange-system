import React from "react"
import "src/css/pages/_news.scss"
import NewsApi from "../../graphql/news"
import {
  Heading,
  NewsFeature,
  Container,
  Layout,
  SEO,

} from "src/sws-ui"

const News = () => {
  const NewsApidata1 = NewsApi()
  var NewsApidata = NewsApidata1.allMarkdownRemark.nodes.filter((data) => data.frontmatter.category_language === 'Thi');
  return (
    <Layout>
      <SEO title="News" />
      <Container gridTemplateRows="8">
        <Heading
          size="2"
          col="col-2-11 col-md-1-12"
          row="row-1"
          className="blog-title"
          style={{ marginTop: "50px" }}
        >
          News
        </Heading>
        <p className="news__subheading col-2-11 col-md-1-12 row-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis
          donec et odio pellentesque diam. Sit amet est placerat in{" "}
        </p>
        {NewsApidata.map((data, counter) => {
          var date_stamp = new Date(data.frontmatter.date)

          var convertime = date_stamp.toDateString()

          return (
            <NewsFeature
              col="col-2-11 col-md-1-12"
              newspagelink={
                "/news/" + data.frontmatter.title.replace(/\s/g, "_")
              }
              row={"row-" + counter + 1}
              date={convertime}
              heading={data.frontmatter.title}
              content={data.frontmatter.summary}
              image={
                data.frontmatter.image.split("/")[
                  data.frontmatter.image.split("/").length - 1
                ]
              }
            />
          )
        })}
      </Container>
    </Layout>
  )
}
export default News
