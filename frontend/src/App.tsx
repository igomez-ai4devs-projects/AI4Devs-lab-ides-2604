import { useState } from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { AddCandidatePage } from './pages/AddCandidatePage';

type Route = 'dashboard' | 'add';

function App() {
  const [route, setRoute] = useState<Route>('dashboard');
  return route === 'dashboard' ? (
    <DashboardPage onAddCandidate={() => setRoute('add')} />
  ) : (
    <AddCandidatePage onBack={() => setRoute('dashboard')} />
  );
}

export default App;
