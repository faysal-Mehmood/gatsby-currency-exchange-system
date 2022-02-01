import React from "react"
import "src/css/pages/_money-transfer.scss"
import {
  Button,
  Heading,
  Hero,
  Cards,
  LinkHandler,
  Container,
  Layout,
  SEO,
} from "src/sws-ui"
import {Link} from 'gatsby'
const MoneyTransfer = ({pageContext}) => {
  //call api
  const moneydata = pageContext.alldata.frontmatter
 
  


  console.log(moneydata)

  const lifesTransferCards = [
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.life_transaction_image_one.split("/")[
            moneydata.life_transaction_image_one.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>{moneydata.life_transaction_heading_one}</Heading>
      <p>{moneydata.life_transaction_description_one}</p>
    </div>,
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.life_transaction_image_two.split("/")[
            moneydata.life_transaction_image_two.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>{moneydata.life_transaction_heading_two}</Heading>
      <p>{moneydata.life_transaction_description_two}</p>
    </div>,
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.life_transaction_image_three.split("/")[
            moneydata.life_transaction_image_three.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>{moneydata.life_transaction_heading_three}</Heading>
      <p>{moneydata.life_transaction_description_three}</p>
    </div>,
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.life_transaction_image_four.split("/")[
            moneydata.life_transaction_image_four.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>{moneydata.life_transaction_heading_four}</Heading>
      <p>{moneydata.life_transaction_description_four}</p>
    </div>,
  ]

  //largeTransferCards

  // const largeTransferCards = large_transfer.map((data, counter) => {
  //   return (
  //     <div className="card card--mint">
  //       <span>{counter + 1}</span>
  //       <Heading size={3}>{data.heading}</Heading>
  //       <p>{data.description}</p>
  //       <LinkHandler to="/" arrow={true}>
  //         {data.link_text}
  //       </LinkHandler>
  //     </div>
  //   )
  // })

  const largeTransferCards = [
    <div className="card card--mint">
      <span>1</span>
      <Heading size={3}>{moneydata.get_verified_heading_one}</Heading>
      <p>{moneydata.get_verified_description_one}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.get_verified__link_text_one}
      </LinkHandler>
    </div>,
    <div className="card card--mint">
      <span>2</span>
      <Heading size={3}>{moneydata.get_verified_heading_two}</Heading>
      <p>{moneydata.get_verified_description_two}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.get_verified__link_text_two}
      </LinkHandler>
    </div>,
    <div className="card card--mint">
      <span>3</span>
      <Heading size={3}>{moneydata.get_verified_heading_three}</Heading>
      <p>{moneydata.get_verified_description_three}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.get_verified__link_text_three}
      </LinkHandler>
    </div>,
  ]

  //easyTransferCards
  // const easyTransferCards = easy_transfer.map((data, counter) => {
  //   return (
  //     <div className="card">
  //       <img
  //         src={require("../../static/assets/" +
  //           data.image.split("/")[data.image.split("/").length - 1])}
  //         alt=""
  //       />
  //       <Heading size={3}>
  //         {counter + 1}. {data.heading}
  //       </Heading>
  //       <p>{data.description}</p>
  //       <LinkHandler to="/" arrow={true}>
  //         {data.link_text}
  //       </LinkHandler>
  //     </div>
  //   )
  // })
  const easyTransferCards = [
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.easy_transfer_image_one.split("/")[
            moneydata.easy_transfer_image_one.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>1. {moneydata.easy_transfer_heading_one}</Heading>
      <p>{moneydata.easy_transfer_description_one}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.easy_transfer_link_text_one}
      </LinkHandler>
    </div>,
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.easy_transfer_image_two.split("/")[
            moneydata.easy_transfer_image_two.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>2. {moneydata.easy_transfer_heading_two}</Heading>
      <p>{moneydata.easy_transfer_description_two}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.easy_transfer_link_text_two}
      </LinkHandler>
    </div>,
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.easy_transfer_image_three.split("/")[
            moneydata.easy_transfer_image_three.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>2. {moneydata.easy_transfer_heading_three}</Heading>
      <p>{moneydata.easy_transfer_description_one}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.easy_transfer_link_text_three}
      </LinkHandler>
    </div>,
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.easy_transfer_image_four.split("/")[
            moneydata.easy_transfer_image_four.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>2. {moneydata.easy_transfer_heading_four}</Heading>
      <p>{moneydata.easy_transfer_description_four}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.easy_transfer_link_text_four}
      </LinkHandler>
    </div>,
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.easy_transfer_image_five.split("/")[
            moneydata.easy_transfer_image_five.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>5. {moneydata.easy_transfer_heading_five}</Heading>
      <p>{moneydata.easy_transfer_description_five}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.easy_transfer_link_text_five}
      </LinkHandler>
    </div>,
    <div className="card">
      <img
        src={require("../../static/assets/" +
          moneydata.easy_transfer_image_six.split("/")[
            moneydata.easy_transfer_image_six.split("/").length - 1
          ])}
        alt=""
      />
      <Heading size={3}>6. {moneydata.easy_transfer_heading_six}</Heading>
      <p>{moneydata.easy_transfer_description_six}</p>
      <LinkHandler to="/" arrow={true}>
        {moneydata.easy_transfer_link_text_six}
      </LinkHandler>
    </div>,
  ]

  return (
    <Layout>
      <SEO title="Money Transfer" />
      <Container gridTemplateRows="10">
        <Hero
          heading={moneydata.banner_heading}
          subHeading={moneydata.banner_description}
          image={
            moneydata.banner_image &&
            moneydata.banner_image.split("/").length > 0 &&
            moneydata.banner_image.split("/")[
              moneydata.banner_image.split("/").length - 1
            ]
          }
          imageAlign="right"
          button={<Link to="./en/login"><Button color="blue">{moneydata.banner_button_text}</Button></Link>}
          row="row-1"
        />

        <Cards
          heading={moneydata.life_transaction_heading}
          cards={lifesTransferCards}
          size="half"
        />

        <Cards
          heading={moneydata.get_verified_heading}
          content={moneydata.get_verified_description}
          cards={largeTransferCards}
          backgroundColor="white"
          alignCenter={true}
        />

        <Cards
          heading={moneydata.easy_transfer_heaidng}
          content={moneydata.easy_transfer_description}
          cards={easyTransferCards}
          backgroundColor="white"
          alignCenter={true}
          noBorders={true}
        />
      </Container>
    </Layout>
  )
}

export default MoneyTransfer
