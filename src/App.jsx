import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinanceProvider } from './context/FinanceContext';
import './index.css';

import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Reports from './pages/Reports';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <FinanceProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </MainLayout>
      </Router>
    </FinanceProvider>
  );
}

export default App;
