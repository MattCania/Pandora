import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Aside from "../../partials/aside/aside";
import styles from './home.module.css'
import Header from "../../partials/header/Header";
import HomeRouter from "./homerouter";

function Home(){

	return(
		<main className={styles.main}>
			<Aside/>
			<section className={styles.section}>
				<Header/>

				<section className={styles.embedSection}>
					<Routes>
            			<Route path="*" element={<HomeRouter />} />
	        		</Routes>
				</section>
			</section>


		</main>
	)

}

export default Home;