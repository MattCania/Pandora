import promptStyle from './confirmPrompt.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function ConfirmPrompt({ mainText, subText, cancelText, proceedText, close, action }) {

	return (
		<div className={promptStyle.blur}>
			<section className={promptStyle.section}>
				<header className={promptStyle.header}>
					<h1>{mainText ? mainText : "Deleting Record?"}</h1>
					<button><FontAwesomeIcon icon={faX}/></button>
				</header>
				<h1>{subText ? subText : "This action cannot be undone!"}</h1>
				<div className={promptStyle.buttonDiv}>
					<button className={promptStyle.cancel}>{cancelText ? cancelText : "Cancel"}</button>
					<button className={promptStyle.proceed}>{proceedText ? proceedText : "Continue"}</button>
				</div>
			</section>
		</div>
	)

}

export default ConfirmPrompt