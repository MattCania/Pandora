import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './partials/login/login';
import Register from './partials/register/register';
import Records from './partials/records/records';
import Recovery from './partials/recovery/recovery';
import Home from './pages/home/home';
import Landing from './partials/landing/landing.jsx';

function RouterApp() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/landing" replace />} />
			<Route path='/landing' element={<Landing />} />
			<Route path="/login" element={<Login />} />
			<Route path='/register' element={<Register/>} />
			<Route path='/home/*' element={<Home/>} />
			<Route path='/recovery/*' element={<Recovery/>}/>
			<Route path='/records' element={<Records/>}/>
		</Routes>
	);
}

export default RouterApp;
