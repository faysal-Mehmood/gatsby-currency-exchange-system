const path = require(`path`)

//doc dynamic
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const docsTemplate = path.resolve(`src/templates/blogTemplates.js`)
  const newsTemplate = path.resolve(`src/templates/newsTemplates.js`)
  const privacyTemplate = path.resolve(`src/templates/privacyTemplate.js`)
  const securityTemplate = path.resolve(`src/templates/securityTemplate.js`)
  const termsTemplate = path.resolve(`src/templates/termsTemplate.js`)
  const contactPage = path.resolve(`src/templates/contactTemplate.js`)
  const MoneyPage = path.resolve(`src/templates/moneyTransferTemplate.js`)
  const homePage = path.resolve(`src/templates/homeTemplate.js`)
  const faqPage = path.resolve(`src/templates/faqtemplate.js`)
  return graphql(
    `
      query loadPagesQuery {
        allMarkdownRemark {
          nodes {
            frontmatter {
              image
              summary
              title
              date
              blog_post
              category
              author_name
              slug
              news_article
              privacy_policy_content
              category_language
              security_content
              terms_content
              visit
              email
              chat
              line
              description
              FAQ_answer_five
              FAQ_answer_four
              FAQ_answer_three
              FAQ_button_link_text
              FAQ_answer_two
              FAQ_answer_one
              FAQ_heading
              FAQ_question_four
              FAQ_question_five
              FAQ_question_three
              FAQ_question_one
              FAQ_question_two
              app_feature_description_one
              app_feature_description_two
              app_feature_description_three
              app_feature_heading_one
              app_feature_heading_three
              app_feature_heading_two
              app_feature_image_one
              app_feature_image_three
              app_feature_image_two
              banner_button_text
              banner_description
              banner_heading
              banner_image
              blog_description_one
              blog_description_three
              blog_description_two
              blog_heading_one
              blog_heading_three
              blog_heading_two
              blog_image_one
              blog_image_two
              blog_link_one
              blog_link_three
              blog_link_two
              blog_main_description
              blog_main_title
              button_text
              easy_transfer_button_text
              easy_transfer_description
              easy_transfer_description_five
              easy_transfer_description_four
              easy_transfer_description_six
              easy_transfer_description_one
              easy_transfer_description_three
              easy_transfer_description_two
              easy_transfer_heading_four
              easy_transfer_heading_one
              easy_transfer_heading_five
              easy_transfer_heading_six
              easy_transfer_heading_two
              easy_transfer_heading_three
              easy_transfer_heaidng
              easy_transfer_image_five
              easy_transfer_image_one
              easy_transfer_image_four
              easy_transfer_image_six
              easy_transfer_image_three
              easy_transfer_image_two
              easy_transfer_link_text_five
              easy_transfer_link_text_four
              easy_transfer_link_text_one
              easy_transfer_link_text_six
              easy_transfer_link_text_three
              easy_transfer_link_text_two
              easy_transfer_section_main_description
              easy_transfer_section_main_title
              fast_transaction_description_four
              fast_transaction_description_one
              fast_transaction_description_three
              fast_transaction_description_two
              fast_transaction_heading_four
              fast_transaction_heading_one
              fast_transaction_heading_three
              fast_transaction_heading_two
              fast_transaction_image_four
              fast_transaction_image_one
              fast_transaction_image_three
              fast_transaction_image_two
              get_the_app_description
              get_the_app_heading
              get_verified__link_text_one
              get_the_app_image
              get_verified__link_text_three
              get_verified__link_text_two
              get_verified_description
              get_verified_description_one
              get_verified_description_three
              get_verified_description_two
              get_verified_heading
              get_verified_heading_one
              get_verified_heading_three
              get_verified_heading_two
              heading
              image
              life_transaction_description_four
              life_transaction_description_one
              life_transaction_description_three
              life_transaction_description_two
              life_transaction_heading
              life_transaction_heading_four
              life_transaction_heading_one
              life_transaction_heading_three
              life_transaction_heading_two
              life_transaction_image_four
              life_transaction_image_one
              life_transaction_image_three
              life_transaction_image_two
              link_text
              testominal_slider_description_one
              testominal_slider_description_three
              testominal_slider_description_two
              testominal_slider_heading_one
              testominal_slider_heading_three
              testominal_slider_heading_two
              blog_image_three
              compliance_heading
              Compliance_description
              entering_bank_description
              entering_bank_heading
              instructions_description
              instructions_heading
              lisence_description
              lisence_heading
              payments_description
              payments_heading
              third_Party_heading
              third_Party_description
              testominal_slider_image
              question_Category
              all_faqs {
                answer_faq
                question_faq
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }
    const faqpagechecker_ENG =[];
    const faqpagechecker_THI =[];
    result.data.allMarkdownRemark.nodes.filter((node, counter) => {
      if (node.frontmatter.slug === "blog_page") {
        if(node.frontmatter.category_language == "Thi") {
        createPage({
          // Path for this page — required
          path: "th/blogs/" + node.frontmatter.title.replace(/\s/g, "_"),
          component: docsTemplate,
          context: {
            alldata: node,
          },
        })
      } else {
        createPage({
          // Path for this page — required
          path: "en/blogs/" + node.frontmatter.title.replace(/\s/g, "_"),
          component: docsTemplate,
          context: {
            alldata: node,
          },
        })
      }

      } 

      else if (node.frontmatter.slug === "news_page") {
        if(node.frontmatter.category_language == "Thi") {
          createPage({
            // Path for this page — required
            path: "th/news/" + node.frontmatter.title.replace(/\s/g, "_"),
            component: newsTemplate,
            context: {
              alldata: node,
            },
          })
      } else {
        createPage({
          // Path for this page — required
          path: "en/news/" + node.frontmatter.title.replace(/\s/g, "_"),
          component: newsTemplate,
          context: {
            alldata: node,
          },
        })
      }

      } 
      
      
     

       
      // privacy
      else if (node.frontmatter.slug === "privacy") {
        if(node.frontmatter.category_language == "Thi") {
        createPage({
          // Path for this page — required
          path: "th/Privacy",
          component: privacyTemplate,
          context: {
            alldata: node,
          },
        })
      }else{
        createPage({
          // Path for this page — required
          path: "en/Privacy",
          component: privacyTemplate,
          context: {
            alldata: node,
          },
        })
      }
      }

      //security
      else if (node.frontmatter.slug === "security") {
        if(node.frontmatter.category_language == "Thi") {
        createPage({
          // Path for this page — required
          path: "th/security",
          component: securityTemplate,
          context: {
            alldata: node,
          },
        })
      } else{
        createPage({
          // Path for this page — required
          path: "en/security",
          component: securityTemplate,
          context: {
            alldata: node,
          },
        })
      }
      }

      // terms
      else if (node.frontmatter.slug === "terms_page") {
        if(node.frontmatter.category_language == "Thi") {
        createPage({
          // Path for this page — required
          path: "th/terms",
          component: termsTemplate,
          context: {
            alldata: node,
          },
          langCurrent:'Thi'
        })
      } else{
        createPage({
          // Path for this page — required
          path: "en/terms",
          component: termsTemplate,
          context: {
            alldata: node,
          },
          langCurrent:'English'
        })
      }
      }

      // contact
      else if (node.frontmatter.slug === "contact_page") {
        if(node.frontmatter.category_language == "Thi") {
        createPage({
          // Path for this page — required
          path: "th/contact",
          component: contactPage,
          context: {
            alldata: node,
          },
        })
      } else{
        createPage({
          // Path for this page — required
          path: "en/contact",
          component: contactPage,
          context: {
            alldata: node,
          },
        })
      }
      }

      // home
      else if (node.frontmatter.slug === "home") {
        if(node.frontmatter.category_language == "Thi") {
        createPage({
          // Path for this page — required
          path: "th",
          component: homePage,
          context: {
            alldata: node,
          },
        })
      } 
      }

      //money transfer

      else if (node.frontmatter.slug === "moneytransferpagcomplete") {
        if(node.frontmatter.category_language == "Thi") {
        createPage({
          // Path for this page — required
          path: "th/money_transfer",
          component: MoneyPage,
          context: {
            alldata: node,
          },
        })
      } else{
        createPage({
          // Path for this page — required
          path: "en/money_transfer",
          component: MoneyPage,
          context: {
            alldata: node,
          },
        })
      }
      }

      // faq
      else if (node.frontmatter.slug === "faq_page") {
        if(node.frontmatter.category_language == "Thi") {
         // if(result.data.allMarkdownRemark.nodes.length === counter+1) {
            createPage({
              // Path for this page — required
              path: "th/faqs",
              component: faqPage,
              context: {
                alldata:  result.data.allMarkdownRemark.nodes,
                lang:"Thi"
              },
              
            })
          // } else {
          //   faqpagechecker_ENG.push(node)
          // }
          
          
       
      } else{
       // if(result.data.allMarkdownRemark.nodes.length === counter+1) {
          createPage({
            // Path for this page — required
            path: "en/faqs",
            component: faqPage,
            context: {
              alldata: result.data.allMarkdownRemark.nodes,
              lang:"English"
            },
           
          })
        //} else {
       //   faqpagechecker_THI.push(node)
       // }
      }
      }
      
    })
  })
}
