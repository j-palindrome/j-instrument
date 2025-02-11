import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { socketContext, useSocket } from './store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Frame />
  </React.StrictMode>
)

function Frame() {
  const socket = useSocket()
  return (
    socket && (
      <socketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
          </Routes>
        </BrowserRouter>
      </socketContext.Provider>
    )
  )
}
