import { App } from 'modules';
require('./contact.scss');

App.Controller(
    'About',
    self => {

        var $title = self.find('h1');

        console.log('About', $title);

    }
);