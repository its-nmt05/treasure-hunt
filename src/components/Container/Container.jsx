import React from "react"

function Container({ children }) {
  return (
    <div className="flex flex-row lg:p-8 p-6 min-h-screen justify-center">
      {children}
    </div>
  )
}

export default Container
