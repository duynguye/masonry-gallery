import React, { Component } from 'react';
import { isMobile } from 'react-device-detect';
import styles from './HeaderContainer.module.css';

class HeaderContainer extends Component {
    render () {
        return (
            <div className={[styles.container, isMobile ? styles.mobile : ''].join(' ')}>
                { this.props.children }
            </div>
        );
    }
}

export default HeaderContainer;