import React, { useState, useEffect } from 'react';

// URL del endpoint de listado de clientes
const API_URL = "http://localhost:3010/api/customers"; 

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Petición fetch simple, sin cabecera de Autorización
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCustomers(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <p>Cargando clientes...</p>;
  if (error) return <p className="message-error">Error al cargar clientes: {error}</p>;

  return (
    <div className="list-wrapper">
      <h2>Ejercicio 2: Listado de Clientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.phone}</td>
              <td>{customer.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;