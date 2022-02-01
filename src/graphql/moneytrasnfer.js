import React from "react"
import { useStaticQuery, graphql } from "gatsby"
export default function Moneytrasferdata() {
  const money = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          nodes {
            frontmatter {
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
              description
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
              slug
              testominal_slider_description_one
              testominal_slider_description_three
              testominal_slider_description_two
              testominal_slider_heading_one
              testominal_slider_heading_three
              testominal_slider_heading_two
              title

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
            }
          }
        }
      }
    `
  )

  return money
}