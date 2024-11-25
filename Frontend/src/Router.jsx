import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './partials/login/login';
import Register from './partials/register/register';
import Records from './partials/records/records';
import Recovery from './partials/recovery/recovery';

function RouterApp() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/login" replace />} />
			<Route path="/login" element={<Login />} />
			<Route path='/register' element={<Register/>} />
			<Route path='/home' element={<Records/>} />
			<Route path='/recovery/*' element={<Recovery/>}/>
			
		</Routes>
	);
}

export default RouterApp;
