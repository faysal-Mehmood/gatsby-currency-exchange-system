import React from "react";

import {
    Registration,
    Layout,
    SEO,
    Container,
  } from "src/sws-ui"

const RegisterPage = () => (
  <Layout>
    <SEO title="Register" />
        <Container gridTemplateRows="1">
            <div class="cards cards--mist row-1 col-full">
                <Registration />
            </div>
        </Container>
  </Layout>
);

export default RegisterPage;
