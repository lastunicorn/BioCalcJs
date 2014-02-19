#!/bin/bash

path="./UnitTests"

if [ "$1" != "" ]; then
    path="$1"
fi

chutzpah.console.exe /path "$path"
echo