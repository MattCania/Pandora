import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { faAngleLeft, faHouse, faFolderOpen, faBox, faBuilding, faChartLine, faBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '/src/assets/MainLogo.svg'
import styles from './aside.module.css';

function Aside() {

  return (
    <aside className={styles.aside}>
		<header className={styles.header}>
			<a href="">
				<img src={Logo} alt="" draggable="false"/>
			</a>
		</header>
		<section className={styles.section}>
			<div className={styles.buttonSection}>
				<NavLink to="" end className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faHouse}/>Home</NavLink>
				<NavLink to="records" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faFolderOpen}/>Records</NavLink>
				<NavLink to="inventory" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faBox}/>Inventory</NavLink>
				<hr />
				
				<NavLink to="analytics" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faChartLine}/>Analytics</NavLink>
				<NavLink to="company" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faBuilding}/>Company</NavLink>
				<NavLink to="banking" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faBank}/>Banking</NavLink>
			</div>

			<button className={styles.closeButton}>
				<FontAwesomeIcon icon={faAngleLeft} size="3x"/>
			</button>
		</section>
	</aside>
  );
}

export default Aside;
