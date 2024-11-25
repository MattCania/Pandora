import { useEffect, useState, useRef } from "react";
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Logo from '/src/assets/MainLogo.svg'
import ChangePassword from "./changePassword";
import ConfirmEmail from "./confirmEmail";

import styles from './recovery.module.css'

function Recovery(){

	return (
		<section className={styles.section}>
			<div className={styles.leftImage}></div>

			<div className={styles.middleSection}>
				<a href="/">
					<img className={styles.formLogo} src={Logo} alt="" draggable="false"  />
				</a>
				<Routes>
            		<Route path="/" element={<ConfirmEmail />} />
            		<Route path="/new-password" element={<ChangePassword />} />
         		</Routes>
			</div>

			<div className={styles.rightImage}></div>
		</section>

	)
}

export default Recovery;