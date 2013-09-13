REM Assumes server is in parent directory, set to absolute path to run script from anywhere
set SERVER_HOME=..
set GIT_SSL_NO_VERIFY=true
REM Development is the default environment, showing how to do it explicitly
set NODE_ENV=development

cd %SERVER_HOME%
git submodule update --init --recursive
git submodule foreach git pull origin master
pause
