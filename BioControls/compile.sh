#!/bin/bash

# ----------------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------------

COMPILER_FILE=ExternalTools/ClosureCompiler/compiler.jar

OUTPUT_FILE_BASE_NAME=BiorhythmControls
OUTPUT_FILE_NAME=$OUTPUT_FILE_BASE_NAME.js
OUTPUT_FILE_NAME_MIN=$OUTPUT_FILE_BASE_NAME.min.js

OUTPUT_DIRECTORY=compiled

OUTPUT_FILE=$OUTPUT_DIRECTORY/$OUTPUT_FILE_NAME
OUTPUT_FILE_MIN=$OUTPUT_DIRECTORY/$OUTPUT_FILE_NAME_MIN

SOURCE_DIRECTORY=sources

# ----------------------------------------------------------------------------
# Compile
# ----------------------------------------------------------------------------

echo Compiling BiorhythmControls
echo

echo Reduceing white spaces: $OUTPUT_FILE...

java -jar "$COMPILER_FILE" --js $SOURCE_DIRECTORY/*.js --js $SOURCE_DIRECTORY/common/*.js --js $SOURCE_DIRECTORY/common/biorhythmModel/*.js --js $SOURCE_DIRECTORY/common/paintDataCalculation/*.js --js $SOURCE_DIRECTORY/common/painting/*.js --js $SOURCE_DIRECTORY/core/*.js --js_output_file $OUTPUT_FILE --formatting PRETTY_PRINT --compilation_level WHITESPACE_ONLY

echo Full minimisation: $OUTPUT_FILE_MIN...

java -jar "$COMPILER_FILE" --js $SOURCE_DIRECTORY/*.js --js $SOURCE_DIRECTORY/common/*.js --js $SOURCE_DIRECTORY/common/biorhythmModel/*.js --js $SOURCE_DIRECTORY/common/paintDataCalculation/*.js --js $SOURCE_DIRECTORY/common/painting/*.js --js $SOURCE_DIRECTORY/core/*.js --js_output_file $OUTPUT_FILE_MIN

echo

#read -n1 -r -p "Press any key to continue..."
#echo
