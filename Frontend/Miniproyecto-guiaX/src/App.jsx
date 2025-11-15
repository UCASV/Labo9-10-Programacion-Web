import { useState } from 'react';
import CustomerList from './components/CustomerList.jsx';
import SalesForm from './components/SalesForm.jsx';
import SalesList from './components/SalesList.jsx';
import CustomerSearch from './components/CustomerSearch.jsx';
import './App.css'; 

function App() {
  const [activeComponent, setActiveComponent] = useState('home');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'customers':
        return <CustomerList />; // Eje 2
      case 'sales-form':
        return <SalesForm />; // Eje 3
      case 'sales-list':
        return <SalesList />; // Eje 4
      case 'customer-search':
        return <CustomerSearch />; // Eje 5
      // case 'sales-report':
      //   return <SalesReport />; // Eje 6
      default:
        return (
          <>
            <h1>Mini-Proyecto Guía X</h1>
            <p>Selecciona un ejercicio para comenzar.</p>
          </>
        );
    }
  };

  return (
    <>
      <nav className="nav-menu">
        <button onClick={() => setActiveComponent('home')}>🏠 Home</button>
        <button onClick={() => setActiveComponent('customers')}>Eje 2: Listar Clientes</button>
        <button onClick={() => setActiveComponent('sales-form')}>Eje 3: Registrar Venta</button>
        <button onClick={() => setActiveComponent('sales-list')}>Eje 4: Listar Ventas</button>
        <button onClick={() => setActiveComponent('customer-search')}>Eje 5: Buscar Cliente</button>
        {/* <button onClick={() => setActiveComponent('sales-report')}>Eje 6: Reporte</button> */}
      </nav>
      <div className="content">
        {renderComponent()}
      </div>
    </>
  );
}

export default App;