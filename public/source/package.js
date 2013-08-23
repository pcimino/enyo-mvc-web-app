enyo.depends(
	// include support libraries
	"$lib/layout"
	, "$lib/onyx"
  , "$lib/gravatar"
  , "$lib/enyo-socket.io"
  , "$lib/socket-io.client"
	// include application sources
	, "css"
	, "models"
	, "controllers"
	, "views"
	, "apps"
	// include our default entry point
	, "start.js"
);
