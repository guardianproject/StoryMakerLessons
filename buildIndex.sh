#!/bin/bash

lessonPath="$1"
indexPath="$2"

cd $1

rm $2
rm *.zip

echo "{\"lessons\":[" >> $2

for file in `ls $lessonPath` ; do
	echo "building lesson archive $file"
	zip -r $file.zip $lessonPath$file
	echo "{" >> $2
    	echo "\"title\": \"$file\"," >> $2
    	echo "\"resource\": { \"url\": \"$file.zip\"  } " >> $2      
	echo "}," >> $2
done

echo "]}" >> $2
