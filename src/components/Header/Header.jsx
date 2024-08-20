import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import React from "react"

function Header() {
  const time = "1:10"
  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent>
        <NavbarBrand>
          <p className="text-lg font-bold">IISERB QUIZ</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <p>{time}</p>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
