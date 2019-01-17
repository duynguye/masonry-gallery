import React from 'react';
import styles from './Label.module.css';

export default ({ children }) => (
    <label className={styles.label}>{ children }</label>
);
