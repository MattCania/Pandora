import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import styles from './subheader.module.css'

function SubHeader( {text, subText} ) {
	return (

		<header className={styles.header}>
			<section className={styles.section}>
				<h1>{text}</h1>
				<p>{subText}</p>
			</section>
			<button className={styles.createButton}>
				<FontAwesomeIcon  icon={faAdd} />
			</button>

		</header>
	)
}

export default SubHeader