import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderOpen, faBox, faPlus} from "@fortawesome/free-solid-svg-icons";
import styles from './create.module.css';
import { Link } from 'react-router-dom';

function Create () {

	return(
		<section >
			<body className={styles.body}>
				<div className={styles.button}>
					<Link to='/home/records/create'>
					<button>
						<FontAwesomeIcon icon={faFolderOpen} size="2x" />
						<span>Record</span>
					</button>
					</Link>
					<Link to='/home/records'>
					<button>
						<FontAwesomeIcon icon={faPlus} size="2x" />
						<span>Transaction</span>
					</button>
					</Link>
					<Link to='/home/inventory'>
					<button>
						<FontAwesomeIcon icon={faBox} size="2x" />
						<span>Inventory</span>
					</button>
					</Link>
				</div>
			</body>
		</section>
	)

}

export default Create