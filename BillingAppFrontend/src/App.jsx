import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { SideBar } from './Components/sidebar/SideBar'
import { Dashboard } from './Components/dashboard/Dashboard'
import { AddMaterial } from './Components/addmaterials/AddMaterial'
import { GenerateBill } from './Components/generatebill/GenerateBill'

import './App.css'

function App() {
  const [activeComponent, setActiveComponent] = useState('dashboard'); // Default to 'dashboard'

  const renderMainContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'generateBill':
        return <GenerateBill />;
      case 'addMaterial':
        return <AddMaterial />;
      default:
        return <h1>Welcome to Chaitanya Electricals</h1>;
    }
  };

  return (
    <div className="App">
      <SideBar onNavigate={setActiveComponent} />
      <div className="main-content">
        {renderMainContent()}
      </div>
    </div>
  );
}


export default App
