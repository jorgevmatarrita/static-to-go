import { App } from 'modules';
require('./careers.scss');

App.Controller(
    'Careers',
    self => {

        var $title = self.find('h1');

        console.log('Careers', $title);

    }
);