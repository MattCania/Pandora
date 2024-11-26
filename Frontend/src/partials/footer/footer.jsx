import QR from '/public/fakeQr.svg'
import styles from './footer.module.css'

function Footer() {

	return (
		<footer className={styles.footer}>

			<div className={styles.leftSide}>
				<section className={styles.qrSection}>
					<h1>Download Our App!</h1>
					<img src={QR} alt="" draggable="false"/>
				</section>
				<p>
					Access Pandora on the go,
					using Pandora’s Mobile App
					for both IOS and Android
				</p>
			</div>

			<div className={styles.rightSide}>
				<ul>
					<h1>Contacts</h1>
					<li>+639108273132</li>
					<li>+639662169452</li>
				</ul>
				<ul>
					<h1>Help</h1>
					<li><a href="">help-center</a></li>
					<li><a href="">technical-support</a></li>
				</ul>
				<ul>
					<h1>Other Links</h1>
					<li><a href="">CloudCFO</a></li>
					<li><a href="">QuickBooks</a></li>
					<li><a href="">Zoho Books</a></li>
					<li><a href="">Bench Accounting</a></li>
				</ul>
			</div>


		</footer>
	)

}

export default Footer