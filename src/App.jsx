import { useState } from "react"
import { Button, NextUIProvider } from "@nextui-org/react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { Layout } from "./components"
import { Home } from "./pages"
import Leaderboard from "./pages/Leaderboard"
import Questions from "./pages/Questions"

function App() {
  const navigate = useNavigate()
  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/leader-board" element={<Leaderboard />} />
          <Route path="/:teamId" element={<Questions />} />
        </Route>
      </Routes>
    </NextUIProvider>
  )
}

export default App
