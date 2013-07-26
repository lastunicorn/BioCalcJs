@echo off

rem Compile dependencies
echo Compiling dependencies...
cd ..\BiorhythmControls
call compile.bat
cd ..\BioCalc

rem Copy dependencies
echo Copying dependency files...
xcopy /y ..\BiorhythmControls\bin\*.* ExternalTools\BiorhythmControls
