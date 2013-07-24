#!/bin/bash

# Compile dependencies
echo Compiling dependencies...
cd ../BiorhythmControls
/bin/bash ../BiorhythmControls/compile.sh
cd ../BioCalc

# Copy dependencies
echo Copying dependency files...
cp ../BiorhythmControls/bin/*.* ExternalTools/BiorhythmControls
