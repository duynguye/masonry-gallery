import React, { Component } from 'react';
import { MainContainer } from './containers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSort } from '@fortawesome/pro-solid-svg-icons';
import { faTimesCircle, faSearch, faSpinnerThird } from '@fortawesome/pro-light-svg-icons';
import gallery from './data';

console.log(window.galleryImages);

library.add(faSort);
library.add(faTimesCircle);
library.add(faSearch);
library.add(faSpinnerThird);

class App extends Component {
    render() {
        return (
            <MainContainer data={window.galleryImages ? window.galleryImages : gallery} />
        );
    }
}

export default App;
