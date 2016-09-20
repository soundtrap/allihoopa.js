#!/bin/sh

set -eu

if [ ! -f package.json ]; then
    echo 'This must be run from the source root of the project'
    exit 1
fi

if [ ! -d node_modules ]; then
    exit 'NPM dependencies must have been installed'
    exit 1
fi

./scripts/clean.sh

./node_modules/.bin/typings install
./node_modules/.bin/tsc --declaration

# TODO: Add --versionTag=... from enviroment here when building for releases
./node_modules/.bin/webpack
./node_modules/.bin/webpack --production
./node_modules/.bin/webpack --externalReact
./node_modules/.bin/webpack --externalReact --production
