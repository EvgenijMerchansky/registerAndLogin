System.config({
  ...
  map: {
    ...
    'google-maps-angular2':      'npm:google-maps-angular2/dist'
    ...
  },
  packages: {
    ...
    rxjs: {
      main: 'Rx.js',
      defaultExtension: 'js'
    },
    'google-maps-angular2': {
      defaultExtension: 'js',
      main: 'index.js',
      format: 'cjs'
    }
    ...
  }
})
