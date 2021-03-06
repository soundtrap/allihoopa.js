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

rm -rf dist lib
