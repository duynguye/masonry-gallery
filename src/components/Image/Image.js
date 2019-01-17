import React, { Component } from 'react';
import styles from './Image.module.css';

export default class Image extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    render () {
        const { alt, src } = this.props;
        const { loaded } = this.state;

        return <img alt={alt} src={src} className={styles.image} style={{ opacity: loaded ? 1 : 0 }} onLoad={() => this.setState({ loaded: true })} />;
    }
}