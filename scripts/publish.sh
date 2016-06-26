#!/usr/bin/env bash

BRANCH="release/v0.0.5"
npm install -g vsce
cd client && vsce publish --baseImagesUrl https://github.com/kexi/vscode-uiflow/raw/$BRANCH/client/
