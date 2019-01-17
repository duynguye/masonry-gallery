import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ImageModal.module.css';

export default class ImageModal extends Component {
    render () {
        console.log(this.props.data);
        const { height, width, alt, url } = this.props.data;
        let orientation = '';
        let imageHeight = 0;
        let imageWidth = 0;

        if (height > width) {
            orientation = 'portrait';
            imageHeight = window.innerHeight - (window.innerWidth * 0.0833333);
            imageWidth = (width / height) * imageHeight;

        } else if (height < width) {
            orientation = 'landscape';
        } else {
            orientation = 'square'
        }

        if (orientation) {
            console.log(orientation);
        }

        return (
            <div className={styles.modal}>
                <div>
                    <FontAwesomeIcon icon={['fal', 'times-circle']} />
                    <img style={{ height: imageHeight, width: imageWidth }} src={url} alt={alt} />
                </div>
            </div>
        );
    }
}