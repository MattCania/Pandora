import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { faAngleLeft, faAngleRight, faHouse, faFolderOpen, faBox,faChartLine, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "/src/assets/MainLogo.svg";
import LogoMain from "/P.svg";
import styles from "./aside.module.css";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

function Aside() {
  const [displayAside, setDisplay] = useState(false);
  const [disableClose, setDisableClose] = useState(false)
  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 768) {
      setDisplay(true);
      setDisableClose(true)
    }
    else{
      setDisplay(false);
      setDisableClose(false)
    }
  }, [size.width]);

  const toggleDisplay = () => {
    setDisplay((displayAside) => !displayAside);
  };

  const linkToggle = () => {
    if (size.width < 768) {
      setDisplay(true);
    }
  };

  return (
    <aside className={displayAside ? styles.asideClose : styles.aside}>
      <header className={styles.header}>
        <Link to="">
          <img src={displayAside ? LogoMain : Logo} alt="Logo" draggable="false" />
        </Link>
      </header>
      <section className={styles.section}>
        <div className={styles.buttonSection}>
          <NavLink
            onClick={linkToggle}
            to=""
            end
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            <FontAwesomeIcon icon={faHouse} />
            {!displayAside && size.width > 768 && "Home"}
          </NavLink>
          <NavLink
            onClick={linkToggle}
            to="records"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            <FontAwesomeIcon icon={faFolderOpen} />
            {!displayAside && size.width > 768 && "Records"}
          </NavLink>
          <NavLink
            onClick={linkToggle}
            to="inventory"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            <FontAwesomeIcon icon={faBox} />
            {!displayAside && size.width > 768 && "Inventory"}
          </NavLink>
          <hr />
          <NavLink
            onClick={linkToggle}
            to="analytics"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            <FontAwesomeIcon icon={faChartLine} />
            {!displayAside && size.width > 768 && "Analytics"}
          </NavLink>
          <NavLink
            onClick={linkToggle}
            to="company"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            <FontAwesomeIcon icon={faChartLine} />
            {!displayAside && size.width > 768 && "Company"}
          </NavLink>
        </div>
        { !disableClose &&


        <button className={styles.closeButton} onClick={toggleDisplay}>
          <FontAwesomeIcon
            icon={!displayAside ? faAngleLeft : faAngleRight}
            size="3x"
            />
        </button>
          }
      </section>
    </aside>
  );
}

export default Aside;
