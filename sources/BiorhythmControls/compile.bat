@echo off

rem ----------------------------------------------------------------------------
rem Configuration
rem ----------------------------------------------------------------------------

set COMPILER_FILE=..\..\ClosureCompiler\compiler.jar

set OUTPUT_FILE_BASE_NAME=BiorhythmControls
set OUTPUT_FILE_NAME=%OUTPUT_FILE_BASE_NAME%.js
set OUTPUT_FILE_NAME_MIN=%OUTPUT_FILE_BASE_NAME%.min.js

set OUTPUT_DIRECTORY=bin

set OUTPUT_FILE=%OUTPUT_DIRECTORY%\%OUTPUT_FILE_NAME%
set OUTPUT_FILE_MIN=%OUTPUT_DIRECTORY%\%OUTPUT_FILE_NAME_MIN%

rem ----------------------------------------------------------------------------
rem Compile
rem ----------------------------------------------------------------------------

echo Compiling BiorhythmControls
echo.

echo Reduceing white spaces: %OUTPUT_FILE%...

java -jar "%COMPILER_FILE%" --js *.js --js Common\*.js --js Common\BiorhythmModel\*.js --js Common\PaintDataCalculation\*.js --js Common\Painting\*.js --js Core\*.js --js_output_file %OUTPUT_FILE% --formatting PRETTY_PRINT --compilation_level WHITESPACE_ONLY

echo Full minimisation: %OUTPUT_FILE_MIN%...

java -jar "%COMPILER_FILE%" --js *.js --js Common\*.js --js Common\BiorhythmModel\*.js --js Common\PaintDataCalculation\*.js --js Common\Painting\*.js --js Core\*.js --js_output_file %OUTPUT_FILE_MIN%

echo.
pause