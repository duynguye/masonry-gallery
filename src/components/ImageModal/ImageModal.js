import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isMobileOnly } from 'react-device-detect';
import styles from './ImageModal.module.css';

export default class ImageModal extends Component {
    constructor (props) {
        super(props);

        this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            loaded: false
        };
    }

    handleClose () {
        this.props.handleClick();

        this.setState({
            loaded: false
        });
    }

    handleBackgroundClick (e) {
        if (e.target.tagName !== 'IMG') {
            this.props.handleClick();

            this.setState({
                loaded: false
            });
        }
    }

    componentDidUpdate (prevProps) {
        if (prevProps.data.url === this.props.data.url && prevProps.isOpen !== this.props.isOpen) {
            if (this.props.isOpen) {
                this.setState({
                    loaded: true
                });
            }
        }
    }

    render () {
        const { loaded } = this.state;
        const { isOpen, data } = this.props;
        const { height, width, alt, url, title } = data;
        let imageHeight = 0;
        let imageWidth = 0;
        let multiplier = isMobileOnly ? 4 : 1;

        if (height > width) {
            // Portrait Orientation Image
            imageHeight = Math.floor(window.innerHeight - (window.innerWidth * 0.0833333 * multiplier));
            imageWidth = Math.floor((width / height) * imageHeight);

            if (isMobileOnly) {
                imageWidth = Math.floor(window.innerWidth - (window.innerWidth * 0.0833333 * multiplier));
                imageHeight = Math.floor(imageWidth / (width / height));
            }

        } else if (height < width) {
            // Landscape Orientation Image
            imageHeight = Math.floor(window.innerHeight - (window.innerWidth * 0.0833333 * multiplier));
            imageWidth = Math.floor((width / height) * imageHeight);

            if (isMobileOnly) {
                imageWidth = Math.floor(window.innerWidth - (window.innerWidth * 0.0833333 * multiplier));
                imageHeight = Math.floor(imageWidth / (width / height));
            }

        } else {
            // Square Orientation
            imageWidth = 400;
            imageHeight = 400;
        }

        return (
            <div className={[styles.modal, isOpen ? styles.open : styles.closed].join(' ')} onClick={(e) => this.handleBackgroundClick(e)}>
                <div className={styles.wrapper}>
                    <FontAwesomeIcon icon={['fal', 'spinner-third']} className={styles.spinner} />
                    <FontAwesomeIcon icon={['fal', 'times-circle']} className={styles.close} onClick={() => this.handleClose()} />
                    <img style={{ height: imageHeight, width: imageWidth, opacity: loaded ? 1 : 0 }} onLoad={() => this.setState({ loaded: true })} src={url} alt={alt} />
                    <p className={styles.caption}>{ title }</p>
                </div>
            </div>
        );
    }
}