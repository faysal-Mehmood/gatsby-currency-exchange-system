import React from "react"
import { Layout, SEO, Container, Highlight, Heading, List } from "src/sws-ui"
import "src/css/pages/_privacy-conditions.scss"
import "src/css/pages/_news.scss"
import group12 from "src/images/icons/Group12.png"
import group121 from "src/images/icons/Group121.png"
import queryString from 'query-string'

import translate from "src/helpers/language"
import { navigate } from "gatsby"

const PoliSuccessfulPage = () => {

    const parseQuery = typeof window !== 'undefined' && queryString.parse(window.location.search)
    const resetToken = parseQuery.token
    console.log('resetToken')
    console.log(parseQuery)
    console.log(resetToken)

    return (

    <Layout>
        <SEO title="Transfer Successful" />
        <Container gridTemplateRows="8">


            <div className="background__images">
            <img src={group12}></img>
            <img src={group121}></img>
            </div>
            <div className="form__container col-2-11 col-md-1-12 row-3" style={{'textAlign': 'center'}}>
            <h1 className="row-1 col-2-11">
            Transfer Successful
            </h1>
            <div className="row-2 col-2-11">
            <div style={{'marginBottom': '30px'}}>
                <img src={`http://122.155.197.101:8080/DevWebApi.Winplus/slip?token=${resetToken}`} style={{'maxWidth': '100%', 'maxHeight': '500px'}}/>
            </div>
            {
                typeof window !== "undefined" &&
                <div>
                    <span 
                        style={{'width': '150px', 'marginBottom': '15px'}}
                        class="transfer__ghost-button" 
                        onClick={e => {
                            e.preventDefault()
                            window.print()
                            }
                        }
                    >
                        Print
                    </span>
                </div>
            }
            <button
                type="submit"
                className="btn bold btn--yellow"
                onClick={e => {
                    e.preventDefault()
                    navigate(
                    typeof window !== "undefined" && window.location.href.includes("/th")
                        ? "/th/"
                        : "/"
                    )
                }}
                >
                {translate("Homepage", "หน้าแรก")}
            </button>
        </div>
            </div>
        </Container>
        </Layout>
    )
};

export default PoliSuccessfulPage;
