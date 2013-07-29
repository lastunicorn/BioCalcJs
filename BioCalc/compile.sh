#!/bin/bash

# ----------------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------------

BIORHYTHM_CONTROLS_DIRECTORY=../BioControls

# ----------------------------------------------------------------------------
# Compile
# ----------------------------------------------------------------------------

# Compile dependencies
echo Compiling dependencies...
cd $BIORHYTHM_CONTROLS_DIRECTORY
/bin/bash compile.sh
cd ../BioCalc

# Copy dependencies
echo Copying dependency files...
cp $BIORHYTHM_CONTROLS_DIRECTORY/compiled/*.* libraries/BiorhythmControls
