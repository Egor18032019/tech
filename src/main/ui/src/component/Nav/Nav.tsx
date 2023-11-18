import React from 'react';
import styles from './Nav.module.scss';
import * as data from './links.json';
import {useContextMap} from "../../PointReducer";
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
                    <div key={link.href} className={styles['link']}   onClick={() => {
                        console.log("userCoords.reverse()");
                    }}>
                        <a href={link.href}>
                            {link.label}
                        </a>
                    </div>
                )
            })}
        </div>
    )
};

const Nav: React.FC<{}> = () => {
    const {setCoordinates, points, setPoint, setPoints, setOriginalPoints, setDataLoaded} = useContextMap();

    return (
        <nav className={styles.navbar}>
            <div className={styles['logo-container']}>
                <span>Logo</span>
            </div>
            <Links links={links} />
        </nav>
    )
}

export default Nav;
