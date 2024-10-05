import './App.css'
import TransactionTimelineComponent from './components/TransactionTimelineComponent.tsx'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.tsx'
import SystemTopology from './pages/SystemTopology/SystemTopology.tsx'
import RealTimeTransaction from './pages/RealTimeTransaction/RealTimeTransaction.tsx'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainLayout />}>
          <Route path="toplogy" element={<SystemTopology />} />
          <Route path="realtime-tx" element={<RealTimeTransaction />} />
          <Route path="transactions" element={<TransactionTimelineComponent />} />
          <Route path="transactions/:id" element={<TransactionTimelineComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
