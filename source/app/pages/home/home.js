import { App } from 'modules';

App.Controller(
    'Home',
    self => {

        var $title = self.find('h1');

        console.log($title);

    }
);