import React from "react"
import { Header, Footer, Container } from "./"
import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default Layout
