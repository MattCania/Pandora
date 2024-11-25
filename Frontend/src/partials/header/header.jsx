import { useEffect, useState } from "react";
import { faPlus, faCrown, faBell, faGear, faBars, faUser, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css'
function Header () {
	
	return(
		<header className={styles.header}>
			<Link to="create" className={styles.createButton}><FontAwesomeIcon icon={faPlus}/></Link>

			<section className={styles.section}>
				<a href="" className={styles.ad}>
					<FontAwesomeIcon icon={faCrown} color="gold"/>
					Premium
				</a>

				<div className={styles.organization}>
					"User Organization Info..."
					<button>
						<FontAwesomeIcon icon={faAngleDown}/>
					</button>
				</div>

				<div className={styles.options}>
					<button>
						<FontAwesomeIcon icon={faBell}/>
					</button>
					<button>
						<FontAwesomeIcon icon={faGear}/>
					</button>
					<button>
						<FontAwesomeIcon icon={faUser}/>
					</button>
					<button>
						<FontAwesomeIcon icon={faBars}/>
					</button>
				</div>

			</section>
		</header>
	)


}

export default Header