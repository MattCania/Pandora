import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { faAngleLeft, faAngleRight, faHouse, faFolderOpen, faBox, faBuilding, faChartLine, faBank } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '/src/assets/MainLogo.svg'
import styles from './aside.module.css';
import LogoMain from '/P.svg'

function Aside() {
	const [displayAside, setDisplay] = useState(false)
	const toggleDisplay = () => {
		setDisplay(displayAside => !displayAside)
	}

	const linkToggle = () => {
		setDisplay(false)
	}

	return (
		<aside className={displayAside ? styles.asideClose : styles.aside}>
			<header className={styles.header}>
				<Link to="">
					<img src={displayAside ? LogoMain : Logo} alt="" draggable="false" />
				</Link>
			</header>
			<section className={styles.section}>
				<div className={styles.buttonSection}>
					<NavLink onClick={linkToggle} to="" end className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faHouse} />{!displayAside && "Home"}</NavLink>
					<NavLink onClick={linkToggle} to="records" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faFolderOpen} />{!displayAside && "Records"}</NavLink>
					<NavLink onClick={linkToggle} to="inventorydisplay" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faBox} />{!displayAside && "Inventory"}</NavLink>
					<hr />

					<NavLink onClick={linkToggle} to="analytics" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faChartLine} />{!displayAside && "Analytics"}</NavLink>
					<NavLink onClick={linkToggle} to="company" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faBuilding} />{!displayAside && "Company"}</NavLink>
					<NavLink onClick={linkToggle} to="banking" className={({ isActive }) => isActive ? `${styles.active}` : ''} ><FontAwesomeIcon icon={faBank} />{!displayAside && "Banking"}</NavLink>
				</div>

				<button className={styles.closeButton} onClick={toggleDisplay}>
					<FontAwesomeIcon icon={!displayAside ? faAngleLeft : faAngleRight} size="3x" />
				</button>
			</section>
		</aside>
	);
}

export default Aside;
