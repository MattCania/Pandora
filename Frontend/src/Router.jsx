import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './partials/login/login';
import Register from './partials/register/register';
import Records from './partials/records/records';
import Confirmation from './partials/recovery/confirmation';
import ChangePassword from './partials/recovery/changepassword';

function RouterApp() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/user-login" replace />} />
			<Route path="/user-login" element={<Login />} />
			<Route path='/user-register' element={<Register/>} />
			<Route path='/home' element={<Records/>} />
			<Route path='/forgot-password' element={<Confirmation/>}/>
			<Route path='/change-password/:email' element={<ChangePassword/>}/>
			{/* <Route path='/home/*' element={<Records/>} /> */}
			
		</Routes>
	);
}

export default RouterApp;
