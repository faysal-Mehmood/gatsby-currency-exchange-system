import React from "react"
import { Layout, SEO, Container  } from "src/sws-ui"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import slip from "../images/slip.svg"

const Reciept = (props) => {
 console.log(props)

  return (
    <Layout>
      <SEO title="Privacy" />
      <Container gridTemplateRows="3" className="Recieptconditions">
          
        <div classNmae="reciept">
            <iframe src={props.location.search.split("token=")[1]} style={{height:'100vh',width:'100vw'}} />
        </div>
      </Container>
    </Layout>
  )
}

export default Reciept
