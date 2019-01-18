import React, { Component } from 'react';
import { MainContainer } from './containers';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSort } from '@fortawesome/pro-solid-svg-icons';
import { faTimesCircle, faSearch } from '@fortawesome/pro-light-svg-icons';
import galleryImages from './data';

library.add(faSort);
library.add(faTimesCircle);
library.add(faSearch);

class App extends Component {
    render() {
        return (
            <MainContainer data={galleryImages} />
        );
    }
}

export default App;
