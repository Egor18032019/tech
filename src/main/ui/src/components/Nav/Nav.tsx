import React from 'react';
import styles from './Nav.module.scss';
import * as data from './links.json';
import {NavLink} from "react-router-dom";
const linksString = JSON.stringify(data);
const links = JSON.parse(linksString).links;

type Link = {
    label: string;
    href: string;
};

const Links: React.FC<{ links: Link[] }> = ({ links }) => {
    return (
        <div className={styles['links-container']}>
            {links.map((link: Link) => {
                return (
                    <div key={link.href} className={styles['link']}>
                        <NavLink to={link.href} className="card-link">
                            {link.label}
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
};


const Nav: React.FC<{}> = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
                <span>Навигатор чистоты</span>
            </div>

            <Links links={links} />
        </nav>
    )
}

export default Nav;
