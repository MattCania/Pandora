import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Aside from "../../partials/aside/aside";
import styles from './home.module.css'
import Header from "../../partials/header/Header";


function Home(){

	return(
		<main className={styles.main}>
			<Aside/>
			<Header/>


		</main>
	)

}

export default Home;