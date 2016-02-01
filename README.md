# Spitfire

Real-time lyrics assistant.

## Roadmap

- [x] dev setup
- [x] data processing
- [ ] voice input and feedback

## Setup

You will need Git, Node (v4.2.1 or higher), and npm to be installed.

Clone the repo and `cd` into it:

```
$ git clone git@github.com:oliveratutexas/Spitfire.git
$ cd Spitfire
```

Install dependencies via npm:

```
$ npm i
```

## Structure

#### `index.html` 

The HTML entry-point. It loads CSS and scripts from `dist/css`, `dist/js`, and `dist/app`.

#### `src/` 

Contains the source for the CSS and script files. 

CSS:

- `src/less/*` contains the less files that are compiled to `dist/css/main.css`.

Scripts:

- `src/app/main.js` is the entry point for the core of the app including the data from `map.json`. It is fairly large (around 48 MB) and should be loaded async.
- `src/js/main.js` will be used for other scripts such as showing and hiding a loading indicator, async loading of `dist/app/main.js`, etc.

#### `data/`

Starting with `common_data.csv`, the data processing scripts will produce `common_words.json`, `common_cmu_dict.json`, and `map.json`.

#### `data-processing/`

See section on `Processing data`.

#### `gulp-tasks/`

Tasks for gulp.

#### `dist/`

Compiled files. Currently checked in to the repo. See section on `Deployment` for future plans regarding this directory.

## Processing data

Pre-processed data can be found in `data/`. To process data again, run:

```
$ npm run process-data
``` 

The single command above essentially runs the following serially:

```
$ node data-processing/parse-csv.js
$ node data-processing/intersect.js
$ node data-processing/best-matches.js
```


The final result (that you most likely use in the app) is `data/map.json`. 

```js
var fs = require('fs');
var mapJSON = fs.readFileSync('map.json').toString();
var map = JSON.parse(mapJSON);
```

The variable `map` is now:

```js
{
	a: [],
	aa: ["aaa","fillet","allay", ... ],
	aaron: ["karen","heron","charon", ... ],
	...
}
```

The keys are words. The corresponding value for a key is a list of words that rhyme best with the key (using the logic defined in `data-processing/best-matches.js`). The list is sorted from best to worst.

**Note:** It is not necessary to perform a `hasOwnProperty` on `map` to ignore keys such as `toString`.

## Development

The default gulp jobs watches for changes and compiles `.js` and `.less` files in `src/` with sourcemaps into the `dist/` directory:

```
$ gulp
```

Install `http-server`:

```
$ npm install -g http-server
```

Serve files locally:

```
$ http-server
```

Visit `http://localhost:8080` in your browser.

## Deploy

TODO: use wercker and do not check in `dist/` into git.

For now, produce compiled files for deployment by running:

```
$ gulp compile --deploy
```