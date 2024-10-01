import './App.css'
import TopologyNetworkComponent from './components/TopologyNetworkComponent.tsx'
import RealTimeTransactionComponent from './components/RealTimeTransactionComponent.tsx'
import TransactionTimelineComponent from './components/TransactionTimelineComponent.tsx'

function App() {
  return (
    <>
      <TopologyNetworkComponent />
      <RealTimeTransactionComponent />
      <TransactionTimelineComponent />
    </>
  )
}

export default App
