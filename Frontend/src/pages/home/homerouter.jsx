import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Records from '../../partials/records/records';
import CreateRecords from '../../partials/records/createRecords';
import More from '../../partials/more/more.jsx'
import InventoryDisplay from '../../partials/inventoryD/inventoryD.jsx';


function HomeRouter() {

  return (
      <Routes>
        <Route path="" element={<Dashboard/>} />
        <Route path="records" element={<Records/>}/>
        {/* <Route path='records/edit/:recordId' element={<EditRecord/>}/> */}
        <Route path="records/create/" element={<CreateRecords/>}/>
        <Route path="/more" element={<More />} />
        <Route path="inventorydisplay" element={<InventoryDisplay/>}/>
      </Routes>

  );
}

export default HomeRouter;
