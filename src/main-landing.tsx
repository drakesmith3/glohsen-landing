import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingApp from './LandingApp.tsx'

// ============================================================
// LANDING PAGE ENTRY POINT
// This mounts the standalone LandingApp (no backend).
// Used for Vercel deployment of glohsen.com landing page.
// ============================================================

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingApp />
  </StrictMode>,
)
