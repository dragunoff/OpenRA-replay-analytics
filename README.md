# OpenRA Replay Analytics

Check out the fully-functional instance of the app at https://dragunoff.github.io/OpenRA-replay-analytics/.

## Greetings, Commander!

This is a visualization tool for data extracted from [OpenRA](https://openra.net) replay files.

To extract data from replays, use [openra-ruby](https://github.com/AMHOL/openra-ruby) with the `--format` option set to `json` or `pretty-json`. Here is an example command:

``` bash
openra replay-data /path/to/replay.orarep --format pretty-json
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
