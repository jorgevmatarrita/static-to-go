const ModuleBlob = require.context('modules/', false, /.js/);
const ModuleList = ModuleBlob.keys().map(module => ModuleBlob(module));

let Modules = {};

ModuleList.forEach( module => {
    const name = Object.keys(module)[0];
    if (name) {
        Modules[name] = module[name];
    }
});

module.exports = Modules;