#!/bin/bash

RESIDENT_DIRECTORY=$(realpath $(dirname $0))
pushd "$RESIDENT_DIRECTORY" >/dev/null
npm --prefix ui run build && mkdir -p server/public && cp -a ui/build/* server/public/
popd >/dev/null
