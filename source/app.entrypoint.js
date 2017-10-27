// Application Styles.
require('styles/app.scss');
require.context('app/components/', true, /.scss/);
require.context('app/pages/', true, /.scss/);
// Application Assets.
require.context('./assets/', true, /.*/);
// Application Components.
const Components = require.context('app/components/', true, /^(.*\.(js$))[^.]*$/igm);
Components.keys().forEach(key => Components(key));