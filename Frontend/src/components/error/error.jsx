import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useNavigate } from "react-router-dom"
import errorPrompt from './error.module.css'

function Error({ error }) {
	const navigate = useNavigate()

	return (
		<div className={errorPrompt.backgroundDiv}>

			<section className={errorPrompt.section}>
				<div className={errorPrompt.iconDiv}>
					<h1><FontAwesomeIcon icon={faTriangleExclamation} /></h1>
				</div>

				<div className={errorPrompt.messageDiv}>
					<h1> {error ? error : '404'}</h1>
					<p>Error User Unauthorized</p>
				</div>

				<div className={errorPrompt.buttonDiv}>
					<button onClick={() => navigate('/login')}>Go Back</button>
				</div>
			</section>
		</div>
	)

}

export default Error