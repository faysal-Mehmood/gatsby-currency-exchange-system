import React from "react";

import {
    ForgotPasswordTwo,
    Layout,
    SEO,
    Container,
  } from "src/sws-ui"
import { RegistrationFail } from "../../sws-ui";

const LoginPage = () => (
  <Layout>
    <SEO title="Registration Failed" />
        <Container gridTemplateRows="1">
            <div class="cards cards--mist row-1 col-full">
                <RegistrationFail />
            </div>
        </Container>
  </Layout>
);

export default LoginPage;
