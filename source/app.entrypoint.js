// Application Styles.
require('styles/app.scss');
require.context('app/components/', true, /.scss/);
require.context('app/pages/', true, /.scss/);
// Application Assets.
require.context('./assets/', true, /.*/);
// Application Pages.
const Controllers = require.context('app/pages/', true, /^(.*\.(js$))[^.]*$/igm);
Controllers.keys().forEach(key => Controllers(key));