#!/bin/bash

# ----------------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------------

BIORHYTHM_CONTROLS_DIRECTORY=../BiorhythmControls

# ----------------------------------------------------------------------------
# Compile
# ----------------------------------------------------------------------------

# Compile dependencies
echo Compiling dependencies...
cd $BIORHYTHM_CONTROLS_DIRECTORY
/bin/bash compile.sh
cd ../BioCalcJs

# Copy dependencies
echo Copying dependency files...
cp $BIORHYTHM_CONTROLS_DIRECTORY/compiled/*.* libraries/BiorhythmControls
