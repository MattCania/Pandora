import { faPlus, faCrown, faBell, faGear, faBars, faUser, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../pages/home/home";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css'
import MoreSidebar from '../more/more';



function Header() {
	const [showSidebar, setSidebar] = useState(false);
	const [orgDropdown, setorgDropdown] = useState(false);

	const toggleOrganization = () => {
		setorgDropdown(orgDropdown => !orgDropdown)
	}

	const toggleSidebar = () => {
		setSidebar(showSidebar => !showSidebar)
	}

	const user = useContext(SessionContext)

	if (!user) {
		return <p>Loading user data...</p>;
	}

	
	return (
		<header className={styles.header}>
			<Link to="create" className={styles.createButton}><FontAwesomeIcon icon={faPlus} /></Link>

			<section className={styles.section}>
				<Link to='premium' className={styles.ad}>
					<FontAwesomeIcon icon={faCrown} color="gold" />
					Premium
				</Link>

				{user.profile.organization &&
					<div className={styles.organization}>
						<p>
						{user.profile.organization}
						</p>
					</div>
				}

				<div className={styles.options}>
					<button>
						<FontAwesomeIcon icon={faBell} />
					</button>
						<button onClick={toggleSidebar}>
							<FontAwesomeIcon icon={faBars} />
						</button>
				</div>
			</section>
			{
				showSidebar && <MoreSidebar/>
			}
		</header>
	)


}

export default Header