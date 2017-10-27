import { App } from 'modules';
import { index  } from './index.ehtml';

App.Controller(
    'Home',
    self => {

        var $title = self.find('h1');

        console.log('Home is here!');

        console.log(index);

    }
);