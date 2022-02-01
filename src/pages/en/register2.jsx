import React from "react";

import {
    RegistrationTwo,
    Layout,
    SEO,
    Container,
  } from "src/sws-ui"

const RegisterPage2 = () => (
  <Layout>
    <SEO title="Register" />
        <Container gridTemplateRows="1">
            <div class="cards cards--mist row-1 col-full registration--two">
                <RegistrationTwo />
            </div>
        </Container>
  </Layout>
);

export default RegisterPage2;
