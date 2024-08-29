import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import React from "react"

function Header() {
  const time = "1:10"

  const navItems = [
    { name: "Home", route: "/" },
    { name: "Leaderboard", route: "/leader-board" },
  ]

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent>
        <NavbarBrand>
          <p className="text-lg font-bold">IISERB QUIZ</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navItems.map((item) => (
          <NavbarItem
            color="foreground"
            isActive={item.route == location.pathname}
            key={item.name}
          >
            <Link color="foreground" href={item.route}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <p>{time}</p>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
