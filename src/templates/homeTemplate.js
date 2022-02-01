import React from "react"
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons"

import {
  Accordion,
  AccordionWrapper,
  Button,
  Hero,
  Heading,
  BlogCards,
  Cards,
  Container,
  CTA,
  Features,
  Image,
  Highlight,
  Layout,
  SEO,
} from "src/sws-ui"

import Swiper from "react-id-swiper"
import "swiper/css/swiper.css"
import "src/css/pages/_testimonial.scss"
import {Link} from 'gatsby'
const accordionItems = [
  {
    heading: `What do I need to know when transferring money with Smartway?`,
    content: (
      <React.Fragment>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a
          metus dapibus, dictum nisl nec, pulvinar nunc. Maecenas nunc tellus,
          vehicula eu mauris vitae, hendrerit tincidunt libero. Curabitur quam
          tortor, tincidunt congue nunc non, porta porta nibh. Donec eget
          volutpat quam. Quisque magna libero, ultricies a finibus sit amet,
          auctor sit amet nunc. Nam sed viverra tellus. Aliquam erat volutpat.
          Quisque vulputate malesuada nisl.
        </p>
        <p>
          Aenean maximus tristique turpis eu dignissim. Sed rutrum nunc id nunc
          volutpat aliquam eu sed magna. Nullam quis volutpat augue. Vestibulum
          vestibulum mauris quam, non pellentesque nibh consectetur ut. Nullam
          interdum, metus at viverra suscipit.
        </p>
      </React.Fragment>
    ),
  },
  {
    heading: `Are there any fees?`,
    content: (
      <React.Fragment>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a
          metus dapibus, dictum nisl nec, pulvinar nunc. Maecenas nunc tellus,
          vehicula eu mauris vitae, hendrerit tincidunt libero. Curabitur quam
          tortor, tincidunt congue nunc non, porta porta nibh. Donec eget
          volutpat quam. Quisque magna libero, ultricies a finibus sit amet,
          auctor sit amet nunc. Nam sed viverra tellus. Aliquam erat volutpat.
          Quisque vulputate malesuada nisl.
        </p>
        <p>
          Aenean maximus tristique turpis eu dignissim. Sed rutrum nunc id nunc
          volutpat aliquam eu sed magna. Nullam quis volutpat augue. Vestibulum
          vestibulum mauris quam, non pellentesque nibh consectetur ut. Nullam
          interdum, metus at viverra suscipit.
        </p>
      </React.Fragment>
    ),
  },
  {
    heading: `Why don't customers get a receipt after transferring?`,
    content: (
      <React.Fragment>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a
          metus dapibus, dictum nisl nec, pulvinar nunc. Maecenas nunc tellus,
          vehicula eu mauris vitae, hendrerit tincidunt libero. Curabitur quam
          tortor, tincidunt congue nunc non, porta porta nibh. Donec eget
          volutpat quam. Quisque magna libero, ultricies a finibus sit amet,
          auctor sit amet nunc. Nam sed viverra tellus. Aliquam erat volutpat.
          Quisque vulputate malesuada nisl.
        </p>
        <p>
          Aenean maximus tristique turpis eu dignissim. Sed rutrum nunc id nunc
          volutpat aliquam eu sed magna. Nullam quis volutpat augue. Vestibulum
          vestibulum mauris quam, non pellentesque nibh consectetur ut. Nullam
          interdum, metus at viverra suscipit.
        </p>
      </React.Fragment>
    ),
  },
  {
    heading: `How long does the transfer process take?`,
    content: (
      <React.Fragment>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a
          metus dapibus, dictum nisl nec, pulvinar nunc. Maecenas nunc tellus,
          vehicula eu mauris vitae, hendrerit tincidunt libero. Curabitur quam
          tortor, tincidunt congue nunc non, porta porta nibh. Donec eget
          volutpat quam. Quisque magna libero, ultricies a finibus sit amet,
          auctor sit amet nunc. Nam sed viverra tellus. Aliquam erat volutpat.
          Quisque vulputate malesuada nisl.
        </p>
        <p>
          Aenean maximus tristique turpis eu dignissim. Sed rutrum nunc id nunc
          volutpat aliquam eu sed magna. Nullam quis volutpat augue. Vestibulum
          vestibulum mauris quam, non pellentesque nibh consectetur ut. Nullam
          interdum, metus at viverra suscipit.
        </p>
      </React.Fragment>
    ),
  },
  {
    heading: `Why does Smartway require a reason for the transfer?`,
    content: (
      <React.Fragment>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a
          metus dapibus, dictum nisl nec, pulvinar nunc. Maecenas nunc tellus,
          vehicula eu mauris vitae, hendrerit tincidunt libero. Curabitur quam
          tortor, tincidunt congue nunc non, porta porta nibh. Donec eget
          volutpat quam. Quisque magna libero, ultricies a finibus sit amet,
          auctor sit amet nunc. Nam sed viverra tellus. Aliquam erat volutpat.
          Quisque vulputate malesuada nisl.
        </p>
        <p>
          Aenean maximus tristique turpis eu dignissim. Sed rutrum nunc id nunc
          volutpat aliquam eu sed magna. Nullam quis volutpat augue. Vestibulum
          vestibulum mauris quam, non pellentesque nibh consectetur ut. Nullam
          interdum, metus at viverra suscipit.
        </p>
      </React.Fragment>
    ),
  },
]

const params = {
  pagination: {
    el: ".swiper-pagination",
    type: "bullets",
    clickable: true,
  },
  loop: true,
  slidesPerView: 1,
}

const featureItems = [
  {
    heading: "Great Rates",
    icon: "great-rates.png",
    content:
      "Have we mentioned that we offer the best Australian Dollar to Thai Baht  rates? Yeah, we are pretty proud of it. Our unique partnerships allow us to offer you the best exchange rates in real-time through FX sales. When you transfer money internationally with Smartway System, your funds go further.",
  },
  {
    heading: "Secure",
    icon: "secure.png",
    content: `In this day and age, safety with online money transactions is more important than ever. At Smartway System, we work with large, established banks in Australia that require extra identification protocols. We will never allow third-parties to see our client's details.`,
  },
  {
    heading: "No Hidden Fees",
    icon: "no-hidden-fee.png",
    content: `What you see is what you get with us! We believe in complete transparency with our customers. That's why we are always upfront with your about how we do business.`,
  },
]

let parallax = null

const cardItems = [
  <div className="card">
    <span>1</span>
    <Heading size={3}>Free Register</Heading>
    <p>
      It is completely free to register with Smartway System. Register today and
      start saving money!
    </p>
  </div>,
  <div className="card">
    <span>2</span>
    <Heading size={3}>Verify Your Identity</Heading>
    <p>
      Before you send money online instantly, you will have to verify your
      identity with us.
    </p>
  </div>,
  <div className="card">
    <span>3</span>
    <Heading size={3}>Provide Bank Details</Heading>
    <p>
      After you verify your identity, you will need to verify your bank details.
      Then you can begin transferring money.
    </p>
  </div>,
  <div className="card">
    <span>4</span>
    <Heading size={3}>Choose an Amount</Heading>
    <p>
      After the verification process, you are ready to transfer. Enter in how
      much money you want to transfer and you’re off!
    </p>
  </div>,
  <div className="card">
    <span>5</span>
    <Heading size={3}>Transfer</Heading>
    <p>
      The transaction will take an hour to complete. You will get a notification
      when it has been sent.
    </p>
  </div>,
  <div className="card">
    <span>6</span>
    <Heading size={3}>Tracking</Heading>
    <p>
      After you have sent your money on our service, you can track your funds to
      see where they are.
    </p>
  </div>,
]

// const stepItems = [
// 	{
// 		heading: '',
// 		content: ''
// 	},
// 	{
// 		heading: '',
// 		content: ''
// 	},
// 	{
// 		heading: '',
// 		content: ''
// 	},
// 	{
// 		heading: '',
// 		content: ''
// 	},
// ];

const blogItems = [
  {
    image:
      "./images/blog/a-young-girl-listens-to-a-music-or-podcast-while-traveling-in-a-train.png",
    heading: "The Safest Way for Sending Money Home...",
    content: "Transaction will take an hour to complete their transaction...",
    linkUrl: "/blog",
  },
  {
    image:
      "./images/blog/a-young-girl-listens-to-a-music-or-podcast-while-traveling-in-a-train.png",
    heading: "The Safest Way for Sending Money Home...",
    content: "Transaction will take an hour to complete their transaction...",
    linkUrl: "/blog",
  },
  {
    image:
      "./images/blog/a-young-girl-listens-to-a-music-or-podcast-while-traveling-in-a-train.png",
    heading: "The Safest Way for Sending Money Home...",
    content: "Transaction will take an hour to complete their transaction...",
    linkUrl: "/blog",
  },
]

//moneytransfer

const IndexPage = ({pageContext}) => {


  var homepagedata = pageContext.alldata.frontmatter


  return (
    <Parallax pages={8.2} ref={ref => (parallax = ref)} scrolling={true}>
		
			
    <ParallaxLayer className="parallax--item" offset={0.2} speed={0.5} style={{width: '347px', position: 'absolute', top:'150px', left: '167px'}}>
      <Image src="deco1.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={0.2} speed={0.4} style={{width: '122px', position: 'absolute', top:'170px', left: '347px'}}>
      <Image src="deco2.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={0.2} speed={0.2} style={{width: '122px', position: 'absolute', top:'320px', left: '45%'}}>
      <Image src="deco3.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={0.2} speed={0.1} style={{width: '330px', position: 'absolute', top:'200px', right: '300px'}}>
      <Image src="deco4.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={1.2} speed={0.06} style={{width: '330px', position: 'absolute', right: '800px'}}>
      <Image src="ft1.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={1.4} speed={0.02} style={{width: '330px', position: 'absolute', right: '600px'}}>
      <Image src="blue-doted.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={1.7} speed={0.1} style={{width: '330px', position: 'absolute', left: '300px'}}>
      <Image src="ce-1.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={2} speed={0.04} style={{width: '330px', position: 'absolute', left: '600px'}}>
      <Image src="ce-2.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={2.3} speed={0.1} style={{width: '330px', position: 'absolute', right: '500px'}}>
      <Image src="sc-1.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={2.4} speed={0.05} style={{width: '330px', position: 'absolute', right: '750px'}}>
      <Image src="sc-2.png"></Image>
    </ParallaxLayer>
    <ParallaxLayer className="parallax--item" offset={2.8} speed={0.06} style={{width: '330px', position: 'absolute',  left: '300px'}}>
      <Image src="ft1.png"></Image>
    </ParallaxLayer>
<ParallaxLayer offset={0}>
        <Layout homepage={true}>
          <SEO title="Home" />
          <Container gridTemplateRows="14">
            <Hero
              heading={homepagedata.banner_heading}
              subHeading={homepagedata.banner_description}
              button={
                <Link to="/en/login"><Button color="blue">{homepagedata.banner_button_text}</Button></Link>
              }
              image={
                homepagedata.banner_image.split("/")[
                  homepagedata.banner_image.split("/").length - 1
                ]
              }
              row="row-1"
            />

            <div className="highlight__group container col-full row-3">
              <Highlight
                heading={homepagedata.fast_transaction_heading_one}
                align="left"
                row="row-2"
              >
                <p>{homepagedata.fast_transaction_description_one}</p>
              </Highlight>
              <Image
                src={
                  homepagedata.fast_transaction_image_one.split("/")[
                    homepagedata.fast_transaction_image_one.split("/").length -
                      1
                  ]
                }
                row="row-2 row-md-3 "
                col="col-7-12 col-md-center col-sm-center"
              />
            </div>

            <div className="highlight__group container col-full row-4">
              <Highlight
                heading={homepagedata.fast_transaction_heading_two}
                align="right"
                row="row-3"
              >
                <p>{homepagedata.fast_transaction_description_two} </p>
              </Highlight>
              <Image
                src={
                  homepagedata.fast_transaction_image_two.split("/")[
                    homepagedata.fast_transaction_image_two.split("/").length -
                      1
                  ]
                }
                row="row-3 row-md-4"
                col="col-1-6 col-md-center col-sm-center"
              />
            </div>

            <div className="highlight__group container col-full row-5">
              <Highlight
                heading={homepagedata.fast_transaction_heading_three}
                align="left"
                row="row-5 row-md-6"
              >
                <p>{homepagedata.fast_transaction_description_three}</p>
              </Highlight>
              <Image
                src={
                  homepagedata.fast_transaction_image_three.split("/")[
                    homepagedata.fast_transaction_image_three.split("/")
                      .length - 1
                  ]
                }
                row="row-4-5 row-md-7"
                col="col-7-12 col-md-center col-sm-center"
              />
            </div>

            <div className="highlight__group container col-full row-6">
              <Highlight
                heading={homepagedata.fast_transaction_heading_four}
                align="right"
                row="row-5 row-md-6"
              >
                <p>{homepagedata.fast_transaction_description_four}</p>
              </Highlight>
              <Image
                src={
                  homepagedata.fast_transaction_image_four.split("/")[
                    homepagedata.fast_transaction_image_four.split("/").length -
                      1
                  ]
                }
                row="row-4-5 row-md-7"
                col="col-1-6 col-md-center col-sm-center"
              />
            </div>

            <CTA
              row="row-7 row-md-9"
              heading={homepagedata.get_the_app_heading}
              description={homepagedata.get_the_app_description}
            />
            <Features
              items={featureItems}
              row="row-8 row-md-10"
              //   app_feature_description_one={
              //     homepagedata.app_feature_description_one
              //   }
              //   app_feature_description_two={
              //     homepagedata.app_feature_description_two
              //   }
              //   app_feature_description_three={
              //     homepagedataapp_feature_description_three
              //   }
              //   app_feature_heading_one={homepagedata.app_feature_heading_one}
              //   app_feature_heading_three={homepagedata.app_feature_image_two}
              //   app_feature_heading_two={homepagedata.app_feature_heading_three}
              //   app_feature_image_one={homepagedata.app_feature_image_one}
              //   app_feature_image_three={homepagedata.app_feature_image_three}
              //   app_feature_image_two={homepagedata.app_feature_image_two}
              {...homepagedata}
            />
            <div className="row-9 row-md-11 container col-full testimonial--wrapper">
              <div
                className="col-1-9 col-md-1-12 row-1 row-md-1 testimonial--image-wrapper"
                style={{ zIndex: 3 }}
              >
                <Image
                  src={
                    homepagedata.testominal_slider_image.split("/")[
                      homepagedata.testominal_slider_image.split("/").length - 1
                    ]
                  }
                ></Image>
              </div>
              <div
                className="col-2-11 row-1 testimonial--tri"
                style={{ zIndex: 2 }}
              >
                <Image src="greytri.png"></Image>
              </div>
              <div
                className="col-7-12 row-1 testimonial--tri testimonial--tri-3"
                style={{ zIndex: 1 }}
              >
                <Image src="greytri.png"></Image>
              </div>
              <div
                className="col-8-12 col-md-1-12 row-1 row-md-1 swiper--container"
                style={{ zIndex: 4 }}
              >
                <Swiper {...params}>
                  <div>
                    <div className="testimonial--item">
                      <Heading size={2}>
                        {homepagedata.testominal_slider_heading_one}
                      </Heading>
                      <p>{homepagedata.testominal_slider_description_one}</p>
                    </div>
                  </div>
                  <div>
                    <div className="testimonial--item">
                      <Heading size={2}>
                        {homepagedata.testominal_slider_heading_two}
                      </Heading>
                      <p>{homepagedata.testominal_slider_description_two}</p>
                    </div>
                  </div>
                  <div>
                    <div className="testimonial--item">
                      <Heading size={2}>
                        {homepagedata.testominal_slider_heading_three}
                      </Heading>
                      <p>{homepagedata.testominal_slider_description_three}</p>
                    </div>
                  </div>
                </Swiper>
              </div>
            </div>
            <Cards
              heading={homepagedata.easy_transfer_section_main_title}
              content={homepagedata.easy_transfer_section_main_description}
              cards={cardItems}
              {...homepagedata}
              row="row-10 row-md-12"
              button={true}
            />
            <AccordionWrapper
              heading={homepagedata.FAQ_heading}
              subheading={"all questions"}
              linkText={homepagedata.FAQ_button_link_text}
              linkUrl="faqs"
              row="row-11 row-md-13"
              theme="green"
            >
              <Accordion accordionItems={accordionItems} theme="green" />
            </AccordionWrapper>
            <BlogCards
              heading={homepagedata.blog_main_title}
              content={homepagedata.blog_main_description}
              row="row-12 row-md-14"
              cards={blogItems}
              {...homepagedata}
              to={"/blog"}
            />
          </Container>
        </Layout>
      </ParallaxLayer>
    </Parallax>
  )
}

export default IndexPage