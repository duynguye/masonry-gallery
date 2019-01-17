import React, { Component } from 'react';
import styles from './Card.module.css';

export default class Card extends Component {
    constructor (props) {
        super(props);

        this.state = {
            hovering: false
        };

        this.handleHover = this.handleHover.bind(this);
    }

    handleHover (hovering) {
        this.setState({
            hovering
        });
    }

    render () {
        const { height, width, left, top, children, title, onclick } = this.props;
        const { hovering } = this.state;

        return (
            <div className={styles.container} style={{ height, width: width - 20, transform: `translate3d(${left}px, ${top}px, 0)` }} onClick={onclick}>
                <div 
                    className={styles.wrapper} 
                    onMouseEnter={() => this.handleHover(true)}
                    onMouseLeave={() => this.handleHover(false)}
                >
                    <div className={[styles.overlay, hovering ? styles.active : ''].join(' ')}>
                        <span>{ title }</span>
                    </div>

                    {children}
                </div>
            </div>
        )
    }
}
