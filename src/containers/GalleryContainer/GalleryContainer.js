import React, { Component } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { Card, Image, ImageModal } from '../../components';
import { debounce, throttle } from '../../global';

const MAX_COLUMNS = 6;
const MIN_COLUMNS = 2;
const INITIAL_COLUMNS = 6;
const INITIAL_WIDTH = 260;
const GUTTER = 120;
const THROTTLE_RATE = 50;
const BOTTOM_PADDING = isMobileOnly ? 0 : 20;
const LOAD_OFFSET = 300;

class GalleryContainer extends Component {
    constructor (props) {
        super(props);

        let columnWidth = INITIAL_WIDTH;

        if (isMobileOnly) {
            columnWidth = Math.floor((window.innerWidth - 20) / 2);
        }
    
        let columns = Math.floor((window.innerWidth - GUTTER) / columnWidth);
        if (columns > MAX_COLUMNS) { columns = MAX_COLUMNS; }
        if (columns < MIN_COLUMNS) { columns = MIN_COLUMNS; }

        const images = this.props.data;
        const results = this.calculateHeights(images, columns, columnWidth);
        const { imageGroup, height, minHeight } = results;

        this.state = {
            columnCount: columns,
            columnWidth,
            height,
            images,
            imageGroup,
            minHeight,
            modalIsOpen: false,
            modalImage: []
        };

        this.container = React.createRef();

        this.handleResize();

        window.addEventListener('resize', this.handleResize);
        window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate (prevProps) {
        if (this.props.data !== prevProps.data) {
            const { data } = this.props;
            const { columnCount, columnWidth } = this.state;
            const { imageGroup, height, minHeight } = this.calculateHeights(data, columnCount, columnWidth);

            this.setState({
                images: data,
                imageGroup,
                height,
                minHeight
            });
        }
    }

    handleScroll = throttle(() => {
        const bottom = window.innerHeight + window.scrollY;
        const currentLoadThreshold = this.state.minHeight + this.container.current.offsetTop;
        
        if (bottom >= currentLoadThreshold - LOAD_OFFSET) {
            this.props.loadMore();
        }
    }, 100);

    handleResize = debounce(() => {
        let columns = Math.floor((window.innerWidth - GUTTER) / this.state.columnWidth);

        if (columns > MAX_COLUMNS) {
            columns = MAX_COLUMNS;
        }

        if (columns < MIN_COLUMNS) {
            columns = MIN_COLUMNS;
        }

        this.setState({
            columnCount: columns
        }, () => {
            const { images, columnCount, columnWidth } = this.state;
            const results = this.calculateHeights(images, columnCount, columnWidth);
            const { imageGroup } = results;

            this.setState({
                imageGroup
            });
        });
    }, THROTTLE_RATE)

    handleClick = (data) => {
        const { modalIsOpen } = this.state;

        if (!modalIsOpen) {
            this.setState({
                modalIsOpen: true,
                modalImage: data
            });
        }
    }

    handleModal = () => {
        this.setState({
            modalIsOpen: false
        });
    }

    calculateHeights (images, columnCount = INITIAL_COLUMNS, columnWidth = INITIAL_WIDTH) {
        let columnHeights = new Array(columnCount).fill(0);

        const sortedImages = images.map((image) => {
            const height = Math.floor(columnWidth / (image.width / image.height));

            let smallestIndex = 0;
            let smallestHeight = columnHeights[0];

            for (let i = 0; i < columnCount; i++) {
                if (columnHeights[i] < smallestHeight) {
                    smallestHeight = columnHeights[i];
                    smallestIndex = i;
                }
            }

            if (smallestHeight === 0) {
                columnHeights[smallestIndex] += height;
            } else {
                columnHeights[smallestIndex] += height + BOTTOM_PADDING;
            }

            let left = (smallestIndex * columnWidth);
            let top = columnHeights[smallestIndex] - height;

            return (
                <Card key={image.url} height={height} width={columnWidth} left={left} top={top} title={image.title} onclick={() => this.handleClick(image)}>
                    <Image
                        alt={image.alt}
                        src={image.thumbnail}
                    />
                </Card>
            );
        });

        const largestHeight = Math.max(...columnHeights);
        const smallestHeight = Math.min(...columnHeights);

        return { 
            imageGroup: sortedImages,
            height: largestHeight,
            minHeight: smallestHeight
        };
    }

    render () {
        const { height, columnWidth, columnCount, modalImage, modalIsOpen, imageGroup } = this.state;

        return (
            <div style={{ margin: '0 auto', height, width: (columnWidth * columnCount), position: 'relative' }} ref={this.container}> 
                <ImageModal data={modalImage} isOpen={modalIsOpen} handleClick={() => this.handleModal()} />
                { imageGroup }
            </div>
        );
    }
}

export default GalleryContainer;
