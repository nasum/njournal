#!/bin/bash
set -eu

echo "Checking for uncommitted changes"

if ! git tag | grep -q "$(jq -r '.info.productVersion' wails.json)"; then
  echo "Tag not found, creating a new tag"
  git tag -a "$(jq -r '.info.productVersion' wails.json)" -m "Release $(jq -r '.info.productVersion' wails.json)"
  git push origin "$(jq -r '.info.productVersion' wails.json)"
fi

echo "Finished"
