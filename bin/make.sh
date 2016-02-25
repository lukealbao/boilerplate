#! /usr/local/bin/bash

# credit: http://stackoverflow.com/a/246128/3186745
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do
  BP_ROOT="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$BP_ROOT/$SOURCE" 
done

export BP_ROOT="$( cd -P "$( dirname "$SOURCE" )" && pwd )/.."
export BP_BUILD="$(pwd)"


while [[ -z $BP_NAME ]]; do
    read -p "Enter a name for your project: " BP_NAME;
done
export BP_NAME="$(echo $BP_NAME | sed s/[^a-zA-Z]/-/ | tr [:upper:] [:lower:])"

echo "Building $BP_NAME in $BP_BUILD..."
cp -r $BP_ROOT/src/. $BP_BUILD

printf "Installing npm dependencies...\n"
npm install --save mysql sequelize restify bluebird bunyan
npm install --save-dev chai eslint istanbul mocha nock sinon supertest

$BP_ROOT/tools/edit-package.js $BP_BUILD/package.json $BP_NAME
$BP_ROOT/tools/edit-config.js $BP_BUILD/config/defaults.js $BP_NAME

mkdir log
cp $BP_ROOT/src/tools/hooks/gitignore $BP_BUILD/.gitignore

git init
make githooks
git add .
git commit -m "Initial commit"
