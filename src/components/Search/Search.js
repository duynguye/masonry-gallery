import React from 'react';
import styles from './Search.module.css';

export default ({ onupdate, value }) => (
    <input type='search' placeholder='Minecraft, green, etc...' className={styles.input} onChange={(e) => onupdate(e.target.value)} value={value} />
);
