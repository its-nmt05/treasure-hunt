import React from "react"

function Container({ children }) {
  return (
    <div className="flex flex-row px-8 py-8 min-h-screen justify-center">
      {children}
    </div>
  )
}

export default Container
