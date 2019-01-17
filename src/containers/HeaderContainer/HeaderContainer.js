import React, { Component } from 'react';
import styles from './HeaderContainer.module.css';

class HeaderContainer extends Component {
    render () {
        return (
            <div className={styles.container}>
                { this.props.children }
            </div>
        );
    }
}

export default HeaderContainer;