import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import styles from './subheader.module.css'

function SubHeader( {text, subText, buttonClick, searchUp, placeholder, inputChange} ) {
	return (

		<header className={styles.header}>
			<section className={styles.section}>
				<h1>{text}</h1>
				<p>{subText}</p>
			</section>
			{ searchUp &&
				<section className={styles.searchBar}>	
					<FontAwesomeIcon icon={faMagnifyingGlass}/>
					<input type="search" placeholder={placeholder} onChange={inputChange}/>
				</section>
			}
			<button className={styles.createButton} onClick={buttonClick}>
				<FontAwesomeIcon  icon={faAdd} />
			</button>

		</header>
	)
}

export default SubHeader