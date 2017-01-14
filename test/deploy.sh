#!/bin/bash

if [[ $TRAVIS_OS_NAME == 'osx' ]]; then

    # Install some custom requirements on OS X
    # e.g. brew install pyenv-virtualenv

    case "${TOXENV}" in
        py32)
            # Install some custom Python 3.2 requirements on OS X
            ;;
        py33)
            # Install some custom Python 3.3 requirements on OS X
            ;;
    esac
else
    wget http://download.sourceforge.net/libpng/libpng-1.6.17.tar.gz
    tar zxf libpng-1.6.17.tar.gz
    chmod +x -R ./libpng-1.6.17
    cd libpng-1.6.17
    ./configure
    make
    make install
    ldconfig
fi
