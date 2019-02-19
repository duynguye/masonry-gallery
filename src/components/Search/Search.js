import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import styles from './Search.module.css';

export default ({ onupdate, onenter, value }) => (
    <input type='search' placeholder='Minecraft, green, etc...' className={[styles.input, isMobileOnly ? styles.mobile : ''].join(' ')} onChange={(e) => onupdate(e.target.value)} value={value} onKeyUp={(e) => onenter(e)} />
);
