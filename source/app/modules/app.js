import jQuery from 'jquery';

export const App = {
    Controller : (ID, fn) => 
        jQuery(() => {
            const $page = jQuery(`#${ID}`);
            if ($page.length > 0 ) { fn($page); }
        })
    ,
};