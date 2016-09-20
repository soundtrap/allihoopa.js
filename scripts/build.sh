#!/usr/bin/env bash

set -eu

if [ ! -f package.json ]; then
    echo 'This must be run from the source root of the project'
    exit 1
fi

if [ ! -d node_modules ]; then
    exit 'NPM dependencies must have been installed'
    exit 1
fi

WEBPACK_EXTRA=

if [ "${TRAVIS_TAG}" != "" ]; then
    echo "Tagging release for ${TRAVIS_TAG}"
    echo
    echo "Naming release ${TRAVIS_TAG/v/}"
    WEBPACK_EXTRA=--versionTag=${TRAVIS_TAG/v/}
fi

./scripts/clean.sh

./node_modules/.bin/typings install
./node_modules/.bin/tsc --declaration

./node_modules/.bin/webpack $WEBPACK_EXTRA
./node_modules/.bin/webpack --production $WEBPACK_EXTRA
./node_modules/.bin/webpack --externalReact $WEBPACK_EXTRA
./node_modules/.bin/webpack --externalReact --production $WEBPACK_EXTRA
