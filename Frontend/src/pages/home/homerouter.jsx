import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Records from '../../partials/records/records';
import CreateRecords from '../../partials/records/createRecords';
import EditRecords from '../../partials/records/editRecords';
import InventoryDisplay from '../../partials/inventoryD/inventoryD.jsx';
import Home from './home.jsx';
import Company from '../../partials/company/company.jsx';

function HomeRouter() {

  return (
      <Routes>
        <Route path="" element={<Dashboard/>} />
        <Route path="records" element={<Records/>}/>
        {/* <Route path='records/edit/:recordId' element={<EditRecord/>}/> */}
        <Route path="records/create/" element={<CreateRecords/>}/>
        <Route path="inventorydisplay" element={<InventoryDisplay/>}/>
        <Route path='records/edit/:recordId' element={<EditRecords/>}/>
        <Route path="records/:transaction/:recordId" element={<h1>No Display Yet</h1>}/>
        <Route path="company" element={<Company/>}/>
      </Routes>

  );
}

export default HomeRouter;
