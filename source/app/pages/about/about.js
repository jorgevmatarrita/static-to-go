import { App } from 'modules';

App.Controller(
    'About',
    self => {

        var $title = self.find('h1');

        console.log('About', $title);

    }
);