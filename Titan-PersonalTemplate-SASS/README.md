# beetroot Project Template SASS

This README documents how to use the project boilerplate.

### Prerequisites

Before starting a new project or you have been assigned to an existing one please make sure you have the following software installed and configured correctly:

- LAMP/XAMPP Stack
- XAMP: https://www.apachefriends.org/index.html
- LAMP: http://www.sudo-juice.com/install-lamp-server-ubuntu/
- GIT: https://git-scm.com/
- NodeJS with Npm: https://nodejs.org/en/
- Gulp: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md (Should be installed globally `-g`)

#### Installing NodeJS and Gulp####

Go to: https://nodejs.org/en/ and download the latest LTS release, mind that this step is required only on the first time for setting it up or when you want to install it on another computer. Click the installer and install nodejs after installing node open the command line and verify that node is installed by typing: `node -v` or `npm -v` it should return the installed node version.

After veryfing it type: `npm install -g gulp` to install gulp command line tool on the whole system, this step is also required only on the first install or when you change your computer. After the install is finished, type `gulp -v` on your command line to verify it, it will return the installed version of gulp.

** FOR WINDOWS ONLY **

Windows cant delete node modules folder or move it if you want to move your project folder because the folder path is very long, therefore it is required to install rimraf a node modules that is the equivalent of `rm -rf` of unix systems, you can do this by going in the command line and typing: `npm install -g rimraf`, This is needed only one time or when you change the computer.

### What's included?

- Project folder structure
- Html file - `index.html`
- Common javascript plugins: jquery, modernizr, css browser selecetor
- Sass files and pre-structured project
- `package.json` (NODEJS developement dependecies)
- `gulpfile.js` (GulpJS Task file with built in tasks)
- `.gitignore` file to ignore node modules and common system files
- `.jshintrc` file for code quality testing

### Getting Started

Locate with your command line to the project template folder after you rename the folder, delete the `.git` folder (not `.gitignore`) and type:

```
#!shell

npm install
```

When node finishes installing the required modules you are ready to start coding.

After the install locate your project on command line and type `gulp`, this starts the default task which compiles the base styles and script in the `dist` folder.

Use `gulp watch` task to turn on the the gulp watcher tasks so it compiles your styles and scripts whenever there are changes in them and refreshes the browser

If you need to install a new plugin for javascript turn off `gulp watch` with `ctrl + c` and open `gulpfile.js` locate the `CONFIG` constant and in the vendor prop type the new js plugin for example :

```
#!javascript

vendor: [ // Vendor plugins for js concatination (it will compile in this order)
        'src/js/modernizr.js',
        'src/js/cssbrowserselector.js',
        'src/js/jquery-1.12.4.js',
        'src/js/NEW_PLUGINS.js',
        'src/js/main.js'
    ]
```

### Project folder structure

```
#!shell

│   .gitignore
│   .jshintrc
│   gulpfile.js
│   index.html
│   package.json
│
├───dist
└───src
    ├───images
    ├───js
    │       cssbrowserselector.js
    │       jquery-1.12.4.js
    │       main.js
    │       modernizr.js
    │
    └───sass
        │   style.scss
        │
        ├───main
        │       _base.scss
        │       _footer.scss
        │       _header.scss
        │       _main.scss
        │       _responsive.scss
        │       _vendor.scss
        │
        └───partials
                _base.scss
                _grid.scss
                _mixins.scss
                _reset.scss
                _typography.scss
                _variables.scss

```

All development files go in the SRC folder which will be outputted in the DIST folder ( the same structure ), when you deploy a project always deploy the dist not the src folder.

** SASS PLUGINS **

All sass/css plugins go in this folder `src/sass/main/_vendor.scsss`

** JS PLUGINS **

All js plugins go in this folder `src/js/`

#### WHEN DEPLOYING

When you deploy your project delete the `src` folder and in the `dist` folder delete _sourcemaps_ files ending with `.css.map` and `.js.map`.

#### WORDPRESS

If you are working on a wordpress envrioment, copy these files in your theme folder:

- `dist`
- `src`
- `package.json`
- `gulpfile.js`
- `.gitignore`
- `.jshintrc`

After that install modules with `npm install` and open your `gulpfile.js` and in the `CONFIG` constant change `wp: false` to `wp: true` after that change the `url:` property to whatever your xampp project path is for example: `url: http://localhost/2017/some_project` and you are good to go.

### `index.html` file

Inside the `index.html` there are 3 main sections (header main footer) which will persist on the whole project alongside that we have a section wrapper for each of the main sections

### _SASS_ files

```
#!shell

src/sass
│   style.scss (everything is imported here)
│
├───main
│    _base.scss (main folder imports)
│    _footer.scss
│    _header.scss
│    _main.scss
│    _responsive.scss
│    _vendor.scss (vendor plugins go here)
│
└───partials
|    _base.scss (partial folder imports)
|    _grid.scss (grid system here)
|    _mixins.scss (mixins and functions here)
|    _reset.scss
|    _typography.scss (font/typography related folder)
|    _variables.scss (sass global variables/settings)
```

- The `style.scss` file contains the two main base imports form **src/sass/main/base.scss** and **src/sass/partials/base.scss**
- `_base.scss` contains imports from their respective folders
- `_grid.scss` contains a 12 column grid system ( check the file to see the responsive classes) a sticky footer with flexbox included ( needs modernizr to work), and a part of normalize.css plugin
- `_variables.scss` contains globals for the grid system (gutters and the number of columns)
- `_mixins.scss` contains media queries mixins with some extend only selectors that have a high probability to be needed on a project

### `gulpfile.js` its functions and tasks

**Our Gulpfile contains these tasks and functions:**

**PROJECT CONFIG CONSTANT**

```
#!javascript

//Project Config
const CONFIG = {
    name: 'PROJECTNAME', //Project Name
    sftp: false, // If the deployment is on a sftp server
    ftp: false, // If the deployment is on a ftp server
    wp: false, // If the project is a wordpress theme
    uploadOnSave: false, //WARNING: THIS UPLOADS THE WHOLE PROJECT ON SAVE
    url: 'PROJECTURL', //If is Wordpress Site url eg: localhost/2016/project
    vendor: [ // Vendor plugins for js concatination (it will compile in this order)
        'src/js/modernizr.js',
        'src/js/cssbrowserselector.js',
        'src/js/jquery-1.12.4.js',
        'src/js/main.js'
    ],
    buildSrc: [ // Build source files for generating a build zip file
        'dist/js',
        'dist/css',
        'dist/images',
        './icons/**',
        './icon/**',
        './favicon/**',
        './favicons/**',
        './*.html'
    ],
    buildSrcWP: [ // Build source for generating a zip file WORDPRESS ONLY
        '**/*',
        '*',
        '!node_modules/**',
        '!./src',
        '!src',
        '!./node_modules'
    ],
    browserSyncFiles: [ // If this is a wordpres theme we need a proxy server to inject files
        '**/*.php',
        '**/*.{png,jpg,gif}'
    ],
    ftpDetails: { // If FTP or SFTP is used this is the server configuration
        host: 'REMOTE_HOST',
        port: 'REMOTE_PORT',
        user: 'REMOTE_USER',
        password: 'REMOTE_PASSWORD',
        parallel: '5',
        remoteFolder: 'REMOTE_FOLDER'
    },
    ftpFiles: [ // When gulp deploy task is called this filters what should be uploaded
        '**/*',
        '*',
        '!node_modules/**',
        '!./node_modules' // if you wish to exclude directories, start the item with an !
    ]
};
```

- Browser sync task to autorefresh and sync browsers for testing
- A deployment task which has two types of a connection (FTP or SFTP) to push tbe project to a remote server based on the parameters in the config constant
- Styles tasks which compiles sass to css, minifies the file, prefixes for known vendor prefixes generates source-maps and outputs a single `app.min.css` file to the `dist/css` folder (whatever you name your css file the output will be `app.min.css`)
- Script task which concatenates and minifies all of your javascript in the `src/js` folder in the order you specified on `CONFIG` constant inside the `vendor` variable ( The same as `app.min.css` this will output a `app.min.js` together with its sourcemaps whatever the name of the javascript is ) this taks also checks our javascript file for errors and monitors the quality of the code based on `jshint` specifications
- Image task to compress/optimize the images inside the `src/images` the optimized images will be moved to `dist/images` folder
- A zip tasks that generates a zip file to deploy the project on a production server
- A watch tasks which runs tasks ( script, style, images) whenever there are changes and refreshes the browser
