import React from "react"

function Container({ children }) {
  return (
    <div className="flex flex-row min-h-screen justify-center items-center">
      {children}
    </div>
  )
}

export default Container
