#!/bin/bash

die () {
    echo >&2 "$@"
    exit 1
}

[ "$#" -eq 1 ] || die "please enter the path to the lesson locale folder (with trailing slash!) as argument; i.e.; ./buildIndex.sh lessons/en/"

lessonPath="$1"
indexFile="lesson.json"

cd $1


for folder in `ls .` ; do
  
  cd $folder

  rm $indexFile
  rm *.zip

  echo "{\"lessons\":[" >> $indexFile
  
  for file in `ls .` ; do
	echo "building lesson archive $file"
	zip -r $file.zip $file
	echo "{" >> $indexFile
    	echo "\"title\": \"$file\"," >> $indexFile
    	echo "\"resource\": { \"url\": \"$file.zip\"  } " >> $indexFile     
	echo "}," >> $indexFile
  done
  
  cd ..
done

echo "]}" >> $indexFile
