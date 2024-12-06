import { useState, useEffect, createContext, useContext } from "react";
import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Aside from "../../partials/aside/aside";
import styles from './home.module.css'
import Header from "../../partials/header/Header";
import HomeRouter from "./homerouter";
import GetSession from "../../hooks/GetSession";
import Prompt from "../../components/prompt/prompt";
import Loading from "../../partials/loading/loading"
import GetData from "../../hooks/GetData";
import Error from "../../components/error/error";

export const SessionContext = createContext();

function Home() {
	const navigate = useNavigate()
	const user = GetSession()
	const [isAuth, setAuth] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) return;

		if (user) {
			setAuth(true);
		} else {
			setAuth(false);
		}
	}, [user, loading]);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setLoading(false);
		};
		fetchUser();
	}, []);

	return (

		<main className={styles.main}>
			{loading && <Loading />}
			{!isAuth && !loading && !user && (
				<Error/>
			)}

			<SessionContext.Provider value={user} >
				<Aside />
				<section className={styles.section}>
					<Header />

					<section className={styles.embedSection}>

						<Routes>
							<Route path="*" element={<HomeRouter />} />
						</Routes>
					</section>
				</section>


			</SessionContext.Provider>
		</main>
	)

}

export default Home;