import React from 'react';
import styles from './FormGroup.module.css';

export default ({ children }) => (
    <div className={styles.container}>
        { children }
    </div>
)
