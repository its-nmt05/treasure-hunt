import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import React from "react";

function Header() {
  const time = "";

  const navItems = [
    { name: "Home", route: "/" },
    { name: "Leaderboard", route: "/leader-board" },
  ];

  return (
    <Navbar isBordered maxWidth="full">
      <NavbarContent>
        <NavbarBrand>
          <p className="text-lg font-bold">Treasure Hunt 24'</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center">
        {navItems.map((item) => (
          <NavbarItem color="foreground" isActive={item.route == location.pathname} key={item.name}>
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
  );
}

export default Header;
