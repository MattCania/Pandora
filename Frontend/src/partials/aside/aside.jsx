import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
				<Link to=""><FontAwesomeIcon icon={faHouse}/>Home</Link>
				<Link to=""><FontAwesomeIcon icon={faFolderOpen}/>Records</Link>
				<Link to=""><FontAwesomeIcon icon={faBox}/>Inventory</Link>
				<hr />
				
				<Link to=""><FontAwesomeIcon icon={faChartLine}/>Analytics</Link>
				<Link to=""><FontAwesomeIcon icon={faBuilding}/>Company</Link>
				<Link to=""><FontAwesomeIcon icon={faBank}/>Banking</Link>
			</div>

			<button className={styles.closeButton}>
				<FontAwesomeIcon icon={faAngleLeft} size="3x"/>
			</button>
		</section>
	</aside>
  );
}

export default Aside;
