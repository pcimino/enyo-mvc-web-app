REM @ECHO OFF

set SERVER_HOME=..
cd %SERVER_HOME%

SET ENYO=.\enyo\

SET TOOLS=%ENYO%\tools
SET NODE="%NODE_HOME%\node.exe"
SET MINIFY=%TOOLS%\minifier\minify.js
SET DEPLOY=%TOOLS%\deploy.js

%NODE% %DEPLOY% package.js 

cp mvcApp*.html ./deploy/enyo-mvc-app/.
PAUSE