[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/dragunoff/OpenRA-replay-analytics) 

# OpenRA Replay Analytics

## Greetings, Commander!

This is a visualization tool for data extracted from [OpenRA](https://openra.net) replay files.

To extract data from replays, use [openra-ruby](https://github.com/AMHOL/openra-ruby) with the `--format` option set to `json` or `pretty-json`. Here is an example command:

``` bash
openra replay-data /path/to/replay.orarep --format pretty-json
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
