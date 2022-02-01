import React from "react";

import {
    Login,
    Layout,
    SEO,
    Container,
  } from "src/sws-ui"

const LoginPage = () => (
  <Layout>
    <SEO title="Login" />
        <Container gridTemplateRows="1">
            <div class="cards cards--mist row-1 col-full">
                <Login />
            </div>
        </Container>
  </Layout>
);

export default LoginPage;
