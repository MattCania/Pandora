import React from 'react';
import { useState } from "react";
import styles from "./landing.module.css"
import Logo from '/src/assets/MainLogo.svg';
import { Link } from "react-router-dom";

function about() {

    return (
        <section className={styles.section}>
            <div className={styles.navigation}>
                    <div className={styles.logo}>
                        <a href="/landing">
                            <img src={Logo} alt="Pandora" a href="/landing"/>
                        </a>
                    </div>
                    <div className={styles.links}>
                        <a href="/aboutus">About Us</a>
                        <a href="">Contact Us</a>
                    </div>
                    <div className={styles.logging}>
                        <a href="/login">Sign In</a>
                        <a href="/register">Sign Up</a>
                </div>
            </div>
            <div className={styles.lowerSection}>
                <div className={styles.halfLeft}>
                    <div className={styles.mainText}>
                        <h1>About Us</h1>
                    </div>
                    <div className={styles.paragraph}>
                        <h3>At Pandora, we are passionate about helping individuals and businesses achieve financial clarity and confidence through precise, reliable, and tailored bookkeeping solutions. Our mission is to simplify the complexities of financial management, providing you with the tools and support you need to make informed decisions and focus on what truly matters—growing your business and achieving your goals.</h3>
                        <h3>We believe that strong financial foundations are the backbone of success. By partnering with us, you gain more than a bookkeeping service—you gain a trusted ally dedicated to your prosperity. Let us take the burden of financial management off your shoulders so you can focus on what you do best: leading your business to new heights.</h3>
                    </div>
                </div>
                <div className={styles.halfRight}>
                    <img src="../src/assets/aboutus.jpg"/>
                </div>
            </div>
        </section>
    );
}

export default about;