import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';

function HomeRouter() {

  return (
      <Routes>
        <Route path="" element={<Dashboard/>} />
      </Routes>

  );
}

export default HomeRouter;
