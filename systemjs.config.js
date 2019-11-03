    /**
     * System configuration for Angular 2 samples
     * Adjust as necessary for your application needs.
     */
    (function (global) {
      System.config({
        paths: {
          // paths serve as alias
          'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
          // our app is within the app folder
          app: 'src/app',
          // angular bundles
          '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
          '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
          '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
          '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
          '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
          '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
          '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
          '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
          // other libraries
          'rxjs':                       'npm:rxjs',
          'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
          // transcriba related libraries
          'ng2-translate':              'npm:ng2-translate/bundles/index.js',
          'ng2-toasty':                 'npm:ng2-toasty/bundles/index.umd.js',
          'leaflet':                    'node_modules/leaflet/dist/leaflet.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
          app: {
            main: './main.js',
            defaultExtension: 'js'
          },
          rxjs: {
            defaultExtension: 'js'
          },
          'ng2-translate':{ defaultExtension: 'js' }//,
        }
      });
    })(this);
