import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {FacebookProvider} from "react-facebook";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FacebookProvider appId='998655314519567' version='v18.0' cookie={true} xfbml={true}>
      <App/>
    </FacebookProvider>
  </React.StrictMode>,
)
