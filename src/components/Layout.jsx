import React from "react";
import { Header, Footer, Container } from "./";
import { Outlet } from "react-router-dom";
import bg from "../static/images/bg_image.png";

function Layout() {
  console.log(bg);
  return (
    <div style={{ backgroundImage: `url(${bg})` }}>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default Layout;
