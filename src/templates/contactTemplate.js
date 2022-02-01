import React,{useEffect} from "react"
import "src/css/pages/_news.scss"
import group12 from "src/images/icons/Group12.png"
import group121 from "src/images/icons/Group121.png"
import translate from 'src/helpers/language';
import ReactMarkdown from "react-markdown"
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

import { contactUs } from '../state/action/profile'
import {
  Heading,
  Container,
  Layout,
  SEO,
} from "src/sws-ui"
import Swal from "sweetalert2"

const ContactUs = ({pageContext}) => {
  const dispatch = useDispatch()
  const data = pageContext.alldata.frontmatter
  return (
    <Layout>
      <SEO title="Contact Us" />
      <Container gridTemplateRows="8">
        <Heading
          size="2"
          col="col-2-5 col-md-1-5"
          row="row-1"
          className="blog-title"
          style={{ marginTop: "50px" }}
        >
          {data.title}
        </Heading>
        <p className="contact__subheading col-2-11 col-md-1-12 row-2">
          {data.description}
        </p>

        <div className="background__images">
          <img src={group12}></img>
          <img src={group121}></img>
        </div>
        <div className="form__container col-2-11 col-md-1-12 row-3">
        <Formik
          initialValues={{ 
            firstName: '',
            lastName: '' ,
            email: '',
            phone: '',
            question: '',

            }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }

         if (!values.question) {
          errors.question = 'Required';
          }

          if (!values.phone) {
            errors.phone = 'Required';
            }

          if (!values.firstName) {
            errors.firstName = 'Required';
          }

          if (!values.lastName) {
            errors.lastName = 'Required';
          }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         Swal.showLoading()
         dispatch(contactUs(values))
       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
         
            <div class="form__input--wrapper">
              <input
                className="form__input form__input--full"
                placeholder="First Name"
              
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <div className="error-form">
                {errors.firstName && touched.firstName && errors.firstName}
              </div>
            </div>
           
            <div class="form__input--wrapper">
              <input
                className="form__input form__input--full"
                placeholder="Last Name"
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <div className="error-form">
                {errors.lastName && touched.lastName && errors.lastName}
              </div>
            </div>
            
            <div class="form__input--wrapper">
              <input
                className="form__input form__input--full"
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="error-form">
                {errors.email && touched.email && errors.email}
              </div>
            </div>

            <div class="form__input--wrapper">
              <input
                className="form__input form__input--full"
                placeholder="Phone Number"
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.form}
              />
              <div className="error-form">
                {errors.phone && touched.phone && errors.phone}
              </div>
            </div>
              
            <textarea
              className="form__input form__input--full"
              placeholder="Type your question here"
              name="question"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.question}
            />
            <div className="error-form">
              {errors.question && touched.question && errors.question}
            </div>
         
          
   
           <button className="btn btn--blue" type="submit" disabled={isSubmitting}>
             
             {translate('Submit','ส่ง')}
           </button>
         </form>
       )}
     </Formik>
          
        </div>
        <div className="contact__address col-2-5 col-md-1-12 row-4 row-md-4">
          <ReactMarkdown source={data.visit} />
        </div>
        <div className="contact__address col-6-8 col-md-1-12 row-4 row-md-5">
          <ReactMarkdown source={data.chat} />
        </div>
        <div className="contact__address col-9-11 col-md-1-12 row-4 row-md-6">
          <ReactMarkdown source={data.email} />
          <ReactMarkdown source={data.line} />
        </div>
      </Container>
    </Layout>
  )
}
export default ContactUs
