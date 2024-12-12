import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderOpen, faBox, faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from './create.module.css';
import { Link } from 'react-router-dom';

function Create () {

	return(
		<div className={styles.section}>
			<body className={styles.body}>
				<div className={styles.button}>
					<Link to='/home/records/create'>
						<FontAwesomeIcon icon={faFolderOpen} size="2x" />
						<span>Record</span>
					</Link>
					<Link to='/home/records'>
						<FontAwesomeIcon icon={faPlus} size="2x" />
						<span>Transaction</span>
					</Link>
					<Link to='/home/inventory'>
						<FontAwesomeIcon icon={faBox} size="2x" />
						<span>Inventory</span>
					</Link>
				</div>
			</body>
		</div>
	)

}

export default Create