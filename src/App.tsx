import './App.css'
import RealTimeTransactionComponent from './components/RealTimeTransactionComponent.tsx'
import TransactionTimelineComponent from './components/TransactionTimelineComponent.tsx'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout.tsx'
import SystemTopology from './pages/SystemTopology/SystemTopology.tsx'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainLayout />}>
          <Route path="toplogy" element={<SystemTopology />} />
          <Route path="realtime-tx" element={<RealTimeTransactionComponent />} />
          <Route path="transactions" element={<TransactionTimelineComponent />} />
          <Route path="transactions/:id" element={<TransactionTimelineComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
