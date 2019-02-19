import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import styles from './FormGroup.module.css';

export default ({ children, layout = 'column' }) => (
    <div className={[styles.container, layout === 'row' ? styles.row : styles.column, isMobileOnly ? styles.mobile : ''].join(' ')}>
        { children }
    </div>
)
