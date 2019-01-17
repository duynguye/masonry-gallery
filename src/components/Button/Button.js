import React from 'react';
import styles from './Button.module.css';

export default ({ children, onclick }) => (
    <button className={styles.button} onClick={() => {onclick()}}>{ children }</button>
);  