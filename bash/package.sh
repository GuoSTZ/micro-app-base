#!/bin/bash

FTP_BUILD=build
FILE_NAME=micro-app-base.tgz

rm -rf $FTP_BUILD
mkdir -p $FTP_BUILD

for i in `ls -F | grep '/$' | grep -v 'bash/' | grep -v 'node_modules/' | grep -v $(echo "$FTP_BUILD") | grep -v 'components/'`
do
  cp -r $i/build $FTP_BUILD/$(echo "$i")
done

# 包压缩
cd $FTP_BUILD
tar -czf ../$FILE_NAME .
mv ../$FILE_NAME ./
find . ! -name $FILE_NAME -delete
cd -
