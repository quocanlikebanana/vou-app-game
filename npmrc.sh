#!/bin/bash

# Check if .npmrc file exists
if [ -f .npmrc ]; then
    # Delete .npmrc file
    rm .npmrc
fi

# Check if .env file exists
if [ -f .env ]; then
    # Load environment variables from .env file
    source .env

    # Update .npmrc file
    echo "@quocanlikebanana:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=$GH_TOKEN" >> .npmrc
else
    # Update .npmrc file
    echo "@quocanlikebanana:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=your-github-token" >> .npmrc
fi