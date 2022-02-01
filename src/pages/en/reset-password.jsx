import React from "react";

import {
    ForgotPasswordTwo,
    Layout,
    SEO,
    Container,
  } from "src/sws-ui"

const LoginPage = () => (
  <Layout>
    <SEO title="Forgot Password" />
        <Container gridTemplateRows="1">
            <div class="cards cards--mist row-1 col-full">
                <ForgotPasswordTwo />
            </div>
        </Container>
  </Layout>
);

export default LoginPage;
