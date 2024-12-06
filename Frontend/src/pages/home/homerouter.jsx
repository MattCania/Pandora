import { Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Records from '../../partials/records/records';
import CreateRecords from '../../partials/records/createRecords';
import EditRecords from '../../partials/records/editRecords';
import InventoryDisplay from '../../partials/inventoryD/inventoryD.jsx';
import Company from '../../partials/company/company.jsx';
import Transactions from '../../partials/transactions/transactions.jsx';
import Profile from '../../partials/profile/profile.jsx';
import Create from '../createPage/create.jsx';
import CreateTransactions from '../../partials/transactions/createTransactions.jsx';
import EditTransactions from '../../partials/transactions/updateTransactions.jsx';
import ProfileEdit from '../../partials/profile editing/profileEdit.jsx'
import Premium from '../../partials/premium/premium.jsx';
import Settings from '../../partials/settings/settings.jsx';
import Analytics from '../../partials/analytics/analytics.jsx';


function HomeRouter() {

  return (
      <Routes>
        <Route path="" element={<Dashboard/>} />
        <Route path="records" element={<Records/>}/>
        <Route path='create' element={<Create/>}/>

        <Route path="records/create/" element={<CreateRecords/>}/>
        <Route path='records/edit/:recordId' element={<EditRecords/>}/>
        <Route path="records/:transaction/:recordId" element={<Transactions/>}/>
        <Route path="records/:trans b action/:recordId" element={<CreateRecords />} />
        <Route path='transaction/create/:transaction/:recordId' element={<CreateTransactions/>}/>
        <Route path='transaction/edit/:transaction/:transactionId' element={<EditTransactions/>}/>
        <Route path="inventory" element={<InventoryDisplay/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="profile/profileEdit" element={<ProfileEdit/>}/>
        <Route path="company" element={<Company/>}/>
        <Route path="/premium" element={<Premium/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="analytics" element={<Analytics/>} />
      </Routes>

  );
}

export default HomeRouter;
