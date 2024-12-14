import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useRef, useState } from "react";
import { SessionContext } from "../../pages/home/home";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css';
import MoreSidebar from '../more/more';

function Header() {
  const [showSidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  const user = useContext(SessionContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <header className={styles.header}>
      <Link to="create" className={styles.createButton}>
        <FontAwesomeIcon icon={faPlus} />
      </Link>

      <section className={styles.section}>
        {user.profile.organization && (
          <div className={styles.organization}>
            <p>{user.profile.organization}</p>
          </div>
        )}

        <div className={styles.options}>
          <button onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </section>

      {showSidebar && (
        <div ref={sidebarRef} className={styles.moreFixed}>
          <MoreSidebar />
        </div>
      )}
    </header>
  );
}

export default Header;
