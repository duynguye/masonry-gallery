import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HeaderContainer, GalleryContainer } from '../'
import { Dropdown, Label, FormGroup, Search, Button } from '../../components';

const INITIAL_VIEW_COUNT = 20;

class MainContainer extends Component {
    constructor (props) {
        super(props);

        // Gather the different Categories recursively to use for filtering later.
        const filterCategories = ({ categories = [], set }) => {
            if (set.length > 1) {
                const first = set[0].category;
                const filtered = set.filter(item => item.category !== first);
                
                return filterCategories({
                    categories: [...categories, first],
                    viewing: INITIAL_VIEW_COUNT,
                    set: filtered
                });
            }

            return categories;
        };

        // Get the first 15 images to show
        const sorted = this.props.data.slice(0, INITIAL_VIEW_COUNT);

        // Set the state with the gathered categories.
        this.state = {
            categories: filterCategories({ set: props.data }),
            currentCategory: '',
            data: props.data,
            viewing: INITIAL_VIEW_COUNT,
            sorted,
            results: ''
        };
    }

    reset () {
        const sorted = this.props.data.slice(0, this.state.viewing);
        this.setState({
            currentCategory: '',
            sorted,
            results: ''
        });
    }

    search () {
        let { results, data } = this.state;
        let split = results.toLowerCase().split(/[ ,]+/);
        let sorted = [];

        function arrayRemove(arr, value) {
            return arr.filter(function (element) {
                return element != value;
            });
        }

    
        if (split[0].trim() !== '') {
            console.log('Searching...');
            console.log(data);

            for (let i = 0; i < split.length; i++) {
                let filter = split[i];

                data.map((item) => {
                    const tags = item.tags;
                    
                    if (tags.length > 0) {
                        for (let j = 0; j < tags.length; j++) {
                            if (tags[j].toLowerCase().indexOf(filter) !== -1) {
                                sorted.push(item);
                                return;
                            }
                        }
                    }

                    return;
                });
            }
        }

        console.log(sorted);

        this.setState({
            sorted
        });
    }

    handleInput (results) {
        this.setState({
            results
        });
    }

    handleDropdown (e) {
        const { data } = this.state;
        const filtered = data.filter(item => item.category === e);
        const group = filtered.slice(0, INITIAL_VIEW_COUNT);

        this.setState({
            currentCategory: e,
            viewing: INITIAL_VIEW_COUNT,
            sorted: group
        });
    }

    handleLoad () {
        const { data, viewing, currentCategory } = this.state;
        let filtered = [];
        let group = [];

        if (currentCategory) {
            filtered = data.filter(item => item.category === currentCategory);
            group = filtered.slice(0, viewing + 20);
        } else {
            group = data.slice(0, viewing + 20);
        }

        this.setState({
            viewing: viewing + 20,
            sorted: group
        });
    }

    render () {
        return (
            <div>
                <HeaderContainer>
                    <FormGroup>
                        <Label>Categories</Label>
                        <Dropdown items={this.state.categories} handler={this.handleDropdown.bind(this)} active={this.state.currentCategory} />
                    </FormGroup>

                    <FormGroup>
                        <Label>Search</Label>
                        <Search onupdate={(results) => { this.handleInput(results) }} value={this.state.results} />
                    </FormGroup>

                    <FormGroup>
                        <Button onclick={() => {this.search()}}>
                            <FontAwesomeIcon icon={['fal', 'search']} style={{ fontSize: '3rem', transform: 'translateY(5px)' }} />
                        </Button>
                    </FormGroup>

                    <FormGroup>
                        <Button onclick={() => {this.reset()}}>Clear</Button>
                    </FormGroup>

                    <FormGroup>
                        <p>Viewing { this.state.viewing } out of { this.state.data.length } Images</p>
                    </FormGroup>
                </HeaderContainer>
                
                <GalleryContainer data={this.state.sorted} loadMore={this.handleLoad.bind(this)} />
                
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 70, marginTop: 70, width: '100%'}}>
                    <Button onclick={this.handleLoad.bind(this)}>Load More</Button>
                </div> */}
            </div>
        );
    }
}

export default MainContainer;