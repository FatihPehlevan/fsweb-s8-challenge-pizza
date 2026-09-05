import './App.css';
import HomePage from './pages/HomePage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [order, setOrder] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/order" element={<OrderPage setOrder={setOrder} />} />
        <Route path="/success" element={<SuccessPage order={order} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
