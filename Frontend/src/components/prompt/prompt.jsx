import { useState, useEffect } from 'react'
import styles from './prompt.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faCircleCheck, faXmark, faX } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function Prompt({ error, message, onClose }) {

	return (
		<section className={styles.section}>
			<div className={styles.promptDiv}>
				<section className={styles.promptMessage}>
					<div className={styles.closeButton}>
						<button onClick={onClose}> 
							<FontAwesomeIcon icon={faX}/>
						</button>
					</div>

					{error ? <h1><FontAwesomeIcon icon={faCircleXmark} size="4x" color='red' /></h1> : <h1><FontAwesomeIcon icon={faCircleCheck} size="4x" color='green'/></h1>}
					<h2>{message}</h2>
				</section>
			</div>
		</section>
	)
}

export default Prompt