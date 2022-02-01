import React from "react"
import BlogApi from "../../graphql/blog"
import { Tabs, Tab } from "react-bootstrap"
import { Heading, BlogFeature, Container, Layout, SEO } from "src/sws-ui"

const BlogLandingPage = () => {
  const BlogApidata1 = BlogApi()
  var BlogApidata = BlogApidata1.allMarkdownRemark.nodes.filter((data) => data.frontmatter.category_language === 'Thi');

  const most_recent_blog =
    BlogApidata.length > 0 &&
    BlogApidata[0]

  
  return (
    <Layout>
      <SEO title="Blog" />
      <Container gridTemplateRows="8">
        <Heading
          size="2"
          col="col-1-9"
          row="row-1"
          className="blog-title"
          style={{ marginTop: "50px" }}
        >
          Blog
        </Heading>
        <BlogFeature
          heading={most_recent_blog.frontmatter.title}
          content={most_recent_blog.frontmatter.summary}
          col="col-1-8 col-md-center"
          row="row-2 row-md-2"
          category={most_recent_blog.frontmatter.category}
          image={
            most_recent_blog.frontmatter.image.split("/")[
              most_recent_blog.frontmatter.image.split("/").length - 1
            ]
          }
          detailpagelink={
            "/blogs/" + most_recent_blog.frontmatter.title.replace(/\s/g, "_")
          }
        ></BlogFeature>
        <div className="row-5 col-1-12">
          <Tabs defaultActiveKey="Culture" id="uncontrolled-tab-example">
            <Tab eventKey="Culture" title="Culture">
              {BlogApidata.map((data, counter) => {
                return (
                  <>
                    {data.frontmatter.category.toLowerCase() == "culture" && (
                      <BlogFeature
                        heading={data.frontmatter.title}
                        content={data.frontmatter.summary}
                        col="col-1-2 col-md-center"
                        row="row-4 row-md-7"
                        category={data.frontmatter.category}
                        image={
                          data.frontmatter.image.split("/")[
                            data.frontmatter.image.split("/").length - 1
                          ]
                        }
                        detailpagelink={
                          "/blogs/" + data.frontmatter.title.replace(/\s/g, "_")
                        }
                      ></BlogFeature>
                    )}
                  </>
                )
              })}
            </Tab>
            <Tab eventKey="Event" title="Event">
              <>
                {BlogApidata.map((data, counter) => {
                  return (
                    <>
                      {data.frontmatter.category.toLowerCase() == "event" && (
                        <BlogFeature
                          heading={data.frontmatter.title}
                          content={data.frontmatter.summary}
                          col="col-2-5 col-md-center"
                          row="row-4 row-md-7"
                          category={data.frontmatter.category}
                          image={
                            data.frontmatter.image.split("/")[
                              data.frontmatter.image.split("/").length - 1
                            ]
                          }
                          detailpagelink={
                            "/blogs/" +
                            data.frontmatter.title.replace(/\s/g, "_")
                          }
                        ></BlogFeature>
                      )}
                    </>
                  )
                })}
              </>
            </Tab>
            <Tab eventKey="Company" title="Company">
              <>
                {BlogApidata.map((data, counter) => {
                  return (
                    <>
                      {data.frontmatter.category.toLowerCase() == "company" && (
                        <BlogFeature
                          heading={data.frontmatter.title}
                          content={data.frontmatter.summary}
                          col="col-5-8 col-md-center"
                          row="row-4 row-md-7"
                          category={data.frontmatter.category}
                          image={
                            data.frontmatter.image.split("/")[
                              data.frontmatter.image.split("/").length - 1
                            ]
                          }
                          detailpagelink={
                            "/blogs/" +
                            data.frontmatter.title.replace(/\s/g, "_")
                          }
                        ></BlogFeature>
                      )}
                    </>
                  )
                })}
              </>
            </Tab>
          </Tabs>
        </div>
      </Container>
    </Layout>
  )
}

export default BlogLandingPage
