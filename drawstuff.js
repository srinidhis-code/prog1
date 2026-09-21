/* classes */ 

// Color constructor
class Color {
    constructor(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end try
        
        catch (e) {
            console.log(e);
        }
    } // end Color constructor

        // Color change method
    change(r,g,b,a) {
        try {
            if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
                throw "color component not a number";
            else if ((r<0) || (g<0) || (b<0) || (a<0)) 
                throw "color component less than 0";
            else if ((r>255) || (g>255) || (b>255) || (a>255)) 
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a; 
            }
        } // end throw
        
        catch (e) {
            console.log(e);
        }
    } // end Color change method
} // end color class


/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata,x,y,color) {
    try {
        if ((typeof(x) !== "number") || (typeof(y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x<0) || (y<0) || (x>=imagedata.width) || (y>=imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y*imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex+1] = color.g;
            imagedata.data[pixelindex+2] = color.b;
            imagedata.data[pixelindex+3] = color.a;
        } else 
            throw "drawpixel color is not a Color";
    } // end try
    
    catch(e) {
        console.log(e);
    }
} // end drawPixel
    
// draw random pixels
function drawRandPixels(context) {
    var c = new Color(0,0,0,0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.01;
    var numPixels = (w*h)*PIXEL_DENSITY; 
    
    // Loop over 1% of the pixels in the image
    for (var x=0; x<numPixels; x++) {
        c.change(Math.random()*255,Math.random()*255,
            Math.random()*255,255); // rand color
        drawPixel(imagedata,
            Math.floor(Math.random()*w),
            Math.floor(Math.random()*h),
                c);
    } // end for x
    context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
    const INPUT_ELLIPSOIDS_URL = 
        "https://ncsucgclass.github.io/prog1/ellipsoids.json";
        
    // load the ellipsoids file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_ELLIPSOIDS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log("Unable to open input ellipses file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input ellipsoids

//get the input triangles from the standard class URL
function getInputTriangles() {
    const INPUT_TRIANGLES_URL = 
        "https://ncsucgclass.github.io/prog1/triangles.json";
        
    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input triangles file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input triangles

// get the input lights from the standard class URL
function getInputLights() {
    const INPUT_LIGHTS_URL =
        "https://ncsucgclass.github.io/prog1/lights.json";

    // load the lights file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_LIGHTS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log("Unable to open input lights file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
} // end get input lights

// get the Part 5 triangle sets. TODO: this is a placeholder local test file
// standing in for the real fixed URL -- swap INPUT_TRIANGLE_SETS_URL for
// that URL (same fetch pattern as getInputEllipsoids/getInputLights above)
// once it's provided.
function getInputTriangleSets() {
    const INPUT_TRIANGLE_SETS_URL = "triangles_test.json";

    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_TRIANGLE_SETS_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log("Unable to open input triangle sets file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
} // end get input triangle sets

//get the input boxex from the standard class URL
function getInputBoxes() {
    const INPUT_BOXES_URL = 
        "https://ncsucgclass.github.io/prog1/boxes.json";
        
    // load the boxes file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_BOXES_URL,false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input boxes file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response); 
} // end get input boxes

// put random points in the ellipsoids from the class github
function drawRandPixelsInInputEllipsoids(context) {
    var inputEllipsoids = getInputEllipsoids();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputEllipsoids != String.null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var ellipsoidXRadius = 0; // init ellipsoid x radius
        var ellipsoidYRadius = 0; // init ellipsoid y radius
        var numEllipsoidPixels = 0; // init num pixels in ellipsoid
        var c = new Color(0,0,0,0); // init the ellipsoid color
        var n = inputEllipsoids.length; // the number of input ellipsoids
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var e=0; e<n; e++) {
            cx = w*inputEllipsoids[e].x; // ellipsoid center x
            cy = h*inputEllipsoids[e].y; // ellipsoid center y
            ellipsoidXRadius = Math.round(w*inputEllipsoids[e].a); // x radius
            ellipsoidYRadius = Math.round(h*inputEllipsoids[e].b); // y radius
            numEllipsoidPixels = ellipsoidXRadius*ellipsoidYRadius*Math.PI; // projected ellipsoid area
            numEllipsoidPixels *= PIXEL_DENSITY; // percentage of ellipsoid area to render to pixels
            numEllipsoidPixels = Math.round(numEllipsoidPixels);
            //console.log("ellipsoid x radius: "+ellipsoidXRadius);
            //console.log("ellipsoid y radius: "+ellipsoidYRadius);
            //console.log("num ellipsoid pixels: "+numEllipsoidPixels);
            c.change(
                inputEllipsoids[e].diffuse[0]*255,
                inputEllipsoids[e].diffuse[1]*255,
                inputEllipsoids[e].diffuse[2]*255,
                255); // ellipsoid diffuse color
            for (var p=0; p<numEllipsoidPixels; p++) {
                do {
                    x = Math.random()*2 - 1; // in unit square 
                    y = Math.random()*2 - 1; // in unit square
                } while (Math.sqrt(x*x + y*y) > 1) // a circle is also an ellipse
                drawPixel(imagedata,
                    cx+Math.round(x*ellipsoidXRadius),
                    cy+Math.round(y*ellipsoidYRadius),c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
                //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            } // end for pixels in ellipsoid
        } // end for ellipsoids
        context.putImageData(imagedata, 0, 0);
    } // end if ellipsoids found
} // end draw rand pixels in input ellipsoids

// draw 2d projections read from the JSON file at class github
function drawInputEllipsoidsUsingArcs(context) {
    var inputEllipsoids = getInputEllipsoids();
    
    
    if (inputEllipsoids != String.null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputEllipsoids.length; 
        //console.log("number of ellipsoids: " + n);

        // Loop over the ellipsoids, draw each in 2d
        for (var e=0; e<n; e++) {
            context.fillStyle = 
                "rgb(" + Math.floor(inputEllipsoids[e].diffuse[0]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[1]*255)
                +","+ Math.floor(inputEllipsoids[e].diffuse[2]*255) +")"; // diffuse color
            context.save(); // remember previous (non-) scale
            context.scale(1, inputEllipsoids[e].b/inputEllipsoids[e].a); // scale by ellipsoid ratio 
            context.beginPath();
            context.arc(
                Math.round(w*inputEllipsoids[e].x),
                Math.round(h*inputEllipsoids[e].y),
                Math.round(w*inputEllipsoids[e].a),
                0,2*Math.PI);
            context.restore(); // undo scale before fill so stroke width unscaled
            context.fill();
            //console.log(context.fillStyle);
            //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
            //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
            //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
        } // end for ellipsoids
    } // end if ellipsoids found
} // end draw input ellipsoids

//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
    var inputTriangles = getInputTriangles();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputTriangles != String.null) { 
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var numTrianglePixels = 0; // init num pixels in triangle
        var c = new Color(0,0,0,0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);

        // Loop over the triangles, draw rand pixels in each
        for (var f=0; f<n; f++) {
        	var tn = inputTriangles[f].triangles.length;
        	//console.log("number of triangles in this files: " + tn);
        	
        	// Loop over the triangles, draw each in 2d
        	for(var t=0; t<tn; t++){
        		var vertex1 = inputTriangles[f].triangles[t][0];
        		var vertex2 = inputTriangles[f].triangles[t][1];
        		var vertex3 = inputTriangles[f].triangles[t][2];

        		var vertexPos1 = inputTriangles[f].vertices[vertex1];
        		var vertexPos2 = inputTriangles[f].vertices[vertex2];
        		var vertexPos3 = inputTriangles[f].vertices[vertex3];
        		//console.log("vertexPos1 " + vertexPos1);
        		//console.log("vertexPos2 " + vertexPos2);
        		//console.log("vertexPos3 " + vertexPos3);
        		
        		// triangle position on canvas
        		
        		var v1 = [w*vertexPos1[0], h*vertexPos1[1]];
        		var v2 = [w*vertexPos2[0], h*vertexPos2[1]];
        		var v3 = [w*vertexPos3[0], h*vertexPos3[1]];
        		
        		// calculate triangle area on canvas (shoelace formula)
        		var triangleArea = 0.5*Math.abs(v1[0]*v2[1]+v2[0]*v3[1]+v3[0]*v1[1]-v2[0]*v1[1]-v3[0]*v2[1]-v1[0]*v3[1]);
        		var numTrianglePixels = triangleArea; // init num pixels in triangle
            	//console.log("triangle area " + triangleArea);
            	numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
            	numTrianglePixels = Math.round(numTrianglePixels);
            	// console.log("numTrianglePixels " + numTrianglePixels);
            	c.change(
            		inputTriangles[f].material.diffuse[0]*255,
                	inputTriangles[f].material.diffuse[1]*255,
                	inputTriangles[f].material.diffuse[2]*255,
                	255); // triangle diffuse color
            	for (var p=0; p<numTrianglePixels; p++) {
                    var point; // on canvas plane
            		var triangleTest = 0;
            		while (triangleTest == 0 ){ //if the pixel outside the triangle
                  
            			point = [Math.floor(Math.random()*w), Math.floor(Math.random()*h)];
                    	// plane checking
            			
                    	var t1 = ((point[0]-v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
                    	var t2 = ((point[0]-v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
                    	var t3 = ((point[0]-v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;
                    	
                    	if((t1==t2)&&(t2==t3)) // draw the pixel if inside the triangle
                    		triangleTest = 1;
            		}
            		drawPixel(imagedata,point[0],point[1],c);
                	//console.log("color: ("+c.r+","+c.g+","+c.b+")");
                	//console.log("x: "+ x);
                	//console.log("y: "+ y);
            	} // end for pixels in triangle
        	} // end for triangles
    	} // end for files
        context.putImageData(imagedata, 0, 0);
    } // end if triangle file found
} // end draw rand pixels in input triangles

//draw 2d projections traingle from the JSON file at class github
function drawInputTrainglesUsingPaths(context) {
    var inputTriangles = getInputTriangles();
    
    if (inputTriangles != String.null) { 
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputTriangles.length; 
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var f=0; f<n; f++) {
        	var tn = inputTriangles[f].triangles.length;
        	//console.log("number of triangles in this files: " + tn);
        	
        	// Loop over the triangles, draw each in 2d
        	for(var t=0; t<tn; t++){
        		var vertex1 = inputTriangles[f].triangles[t][0];
        		var vertex2 = inputTriangles[f].triangles[t][1];
        		var vertex3 = inputTriangles[f].triangles[t][2];

        		var vertexPos1 = inputTriangles[f].vertices[vertex1];
        		var vertexPos2 = inputTriangles[f].vertices[vertex2];
        		var vertexPos3 = inputTriangles[f].vertices[vertex3];
        		//console.log("vertexPos1 " + vertexPos1);
        		//console.log("vertexPos2 " + vertexPos2);
        		//console.log("vertexPos3 " + vertexPos3);
        		
            	context.fillStyle = 
            	    "rgb(" + Math.floor(inputTriangles[f].material.diffuse[0]*255)
            	    +","+ Math.floor(inputTriangles[f].material.diffuse[1]*255)
            	    +","+ Math.floor(inputTriangles[f].material.diffuse[2]*255) +")"; // diffuse color
            
            	var path=new Path2D();
            	path.moveTo(w*vertexPos1[0],h*vertexPos1[1]);
            	path.lineTo(w*vertexPos2[0],h*vertexPos2[1]);
            	path.lineTo(w*vertexPos3[0],h*vertexPos3[1]);
            	path.closePath();
            	context.fill(path);

        	} // end for triangles
        } // end for files
    } // end if triangle files found
} // end draw input triangles

// put random points in the boxes from the class github
function drawRandPixelsInInputBoxes(context) {
    var inputBoxes = getInputBoxes();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w*h)*PIXEL_DENSITY; 
    
    if (inputBoxes != String.null) { 
	    var x  = 0; var y  = 0; // pixel coord init
        var lx = 0; var rx = 0; // input lx, rx from boxes.json
        var by = 0; var ty = 0; // input by, ty from boxes.json
        var fz = 0; var rz = 0; // input fz, rz from boxes.json
        var numBoxPixels = 0; // init num pixels in boxes
        var c = new Color(0,0,0,0); // init the box color
        var n = inputBoxes.length; // the number of input boxes
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var b=0; b<n; b++) {
			// input lx,rx,by,ty on canvas
			lx = w*inputBoxes[b].lx;
			rx = w*inputBoxes[b].rx;
			by = h*inputBoxes[b].by;
			ty = h*inputBoxes[b].ty;           
			
            numBoxesPixels  = (rx-lx)*(ty-by); // projected box area 
            numBoxesPixels *= PIXEL_DENSITY;  // percentage of box area to render to pixels
            numBoxesPixels  = Math.round(numBoxesPixels);
           
            //console.log("num box pixels: "+numBoxesPixels);
            
			c.change(
                inputBoxes[b].diffuse[0]*255,
                inputBoxes[b].diffuse[1]*255,
                inputBoxes[b].diffuse[2]*255,
                255); // box diffuse color
            for (var p=0; p<numBoxesPixels; p++) {
                do {
                    x = Math.floor(Math.random()*w); 
                    y = Math.floor(Math.random()*h); 
                } while ( x<lx || x>rx || y>ty || y<by ) // inside the projection
                drawPixel(imagedata,x,y,c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: " + x);
                //console.log("y: " + y);
            } // end for pixels in box
        } // end for boxes
        context.putImageData(imagedata, 0, 0);
    } // end if boxes found
} // end draw rand pixels in input boxes

//draw 2d projections boxes from the JSON file at class github
function drawInputBoxesUsingPaths(context) {
    var inputBoxes = getInputBoxes();
    var n = inputBoxes.length; // the number of input boxes
	
    if (inputBoxes != String.null) { 
		var w = context.canvas.width;
        var h = context.canvas.height;
        var c = new Color(0,0,0,0); // the color at the pixel: black
        var x  = 0; var y  = 0; // pixel coord init
        var lx = 0; var rx = 0; // input lx, rx from boxes.json
        var by = 0; var ty = 0; // input by, ty from boxes.json
        var fz = 0; var rz = 0; // input fz, rz from boxes.json
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var b=0; b<n; b++) {
				
			// input lx,rx,by,ty on canvas
			lx = w*inputBoxes[b].lx;
			rx = w*inputBoxes[b].rx;
			by = h*inputBoxes[b].by;
			ty = h*inputBoxes[b].ty; 
        		
            context.fillStyle = 
            	"rgb(" + Math.floor(inputBoxes[b].diffuse[0]*255)
            	+","+ Math.floor(inputBoxes[b].diffuse[1]*255)
            	+","+ Math.floor(inputBoxes[b].diffuse[2]*255) +")"; // diffuse color
            
            var path=new Path2D();
            path.moveTo(lx,ty);
            path.lineTo(lx,by);
            path.lineTo(rx,by);
			path.lineTo(rx,ty);
            path.closePath();
            context.fill(path);

        } // end for files
    } // end if box files found
} // end draw input boxes

/* vector helpers (3-element arrays [x,y,z]) */

function vecSub(a,b) { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
function vecAdd(a,b) { return [a[0]+b[0], a[1]+b[1], a[2]+b[2]]; }
function vecScale(a,s) { return [a[0]*s, a[1]*s, a[2]*s]; }
function vecDot(a,b) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; }
function vecCross(a,b) {
    return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    ];
} // end vecCross
function vecNormalize(a) {
    var len = Math.sqrt(vecDot(a,a));
    return [a[0]/len, a[1]/len, a[2]/len];
} // end vecNormalize


/* ray casting (Part 1: unlit, flat-colored ellipsoids) */

// find the smallest positive t at which ray eye+t*dir hits ellipsoid,
// or -1 if it misses. dir is assumed normalized.
//
// derivation: an ellipsoid with center (cx,cy,cz) and per-axis radii
// (a,b,c) is the set of points satisfying
//   ((x-cx)/a)^2 + ((y-cy)/b)^2 + ((z-cz)/c)^2 = 1
// substituting the ray x = eye.x + t*dir.x (and similarly for y,z) turns
// this into a quadratic in t: A*t^2 + B*t + C = 0, where A, B, C come from
// dividing the eye-to-center offset and the ray direction through by each
// axis's radius first (equivalent to un-scaling the ellipsoid to a unit
// sphere) and then dotting them together.
function intersectEllipsoid(eye, dir, ellipsoid) {
    var oc = [
        (eye[0] - ellipsoid.x) / ellipsoid.a,
        (eye[1] - ellipsoid.y) / ellipsoid.b,
        (eye[2] - ellipsoid.z) / ellipsoid.c
    ];
    var sd = [
        dir[0] / ellipsoid.a,
        dir[1] / ellipsoid.b,
        dir[2] / ellipsoid.c
    ];

    var A = vecDot(sd, sd);
    var B = 2 * vecDot(oc, sd);
    var C = vecDot(oc, oc) - 1;

    var discriminant = B*B - 4*A*C;
    if (discriminant < 0)
        return -1; // ray misses the ellipsoid entirely

    var sqrtDisc = Math.sqrt(discriminant);
    var t1 = (-B - sqrtDisc) / (2*A); // nearer root
    var t2 = (-B + sqrtDisc) / (2*A); // farther root

    const EPSILON = 1e-6;
    if (t1 > EPSILON)
        return t1;
    if (t2 > EPSILON)
        return t2;
    return -1; // both intersections are behind the eye
} // end intersectEllipsoid


/* ray casting (Part 5: triangles) */

const TRIANGLE_EPSILON = 1e-9; // guards against a ray parallel to the triangle's plane

// Moller-Trumbore ray-triangle intersection. dir is assumed normalized;
// returns the smallest positive t, or -1 if the ray misses.
//
// derivation: any point on the triangle can be written in terms of its two
// edges E1=V1-V0, E2=V2-V0 as P(u,v) = V0 + u*E1 + v*E2, and that point is
// inside the triangle exactly when u>=0, v>=0, u+v<=1 (u,v are the
// barycentric weights on V1,V2; 1-u-v is the weight on V0). Setting the ray
// equal to that point, O + t*D = V0 + u*E1 + v*E2, and moving V0 to the left
// (T = O - V0) gives a linear system for the three unknowns u, v, t:
//   u*E1 + v*E2 + t*(-D) = T
// i.e. a 3x3 matrix with columns E1, E2, -D, applied to [u,v,t], equals T.
// Solving with Cramer's rule -- for a 3x3 matrix with columns a,b,c,
// det = a.(b x c), and cyclically permuting the three columns doesn't change
// the determinant -- and substituting P = D x E2 to reuse that cross product
// across both the shared denominator and the u numerator collapses the three
// 3x3 determinants down to:
//   P = D x E2,  det = E1.P             (shared denominator)
//   u = (T.P) / det
//   Q = T x E1
//   v = (D.Q) / det
//   t = (E2.Q) / det
// (this P/Q/T/det naming follows Moller & Trumbore's 1997 paper "Fast,
// Minimum Storage Ray-Triangle Intersection", which this derivation and
// implementation are based on)
function intersectTriangle(origin, dir, v0, v1, v2) {
    var e1 = vecSub(v1, v0);
    var e2 = vecSub(v2, v0);

    var p = vecCross(dir, e2);
    var det = vecDot(e1, p);
    if (Math.abs(det) < TRIANGLE_EPSILON)
        return -1; // ray is (near) parallel to the triangle's plane
    var invDet = 1 / det;

    var tvec = vecSub(origin, v0); // this is "T" in the derivation above
    var u = vecDot(tvec, p) * invDet;
    if ((u < 0) || (u > 1))
        return -1; // outside the triangle past the V0-V1 edge

    var q = vecCross(tvec, e1);
    var v = vecDot(dir, q) * invDet;
    if ((v < 0) || (u + v > 1))
        return -1; // outside the triangle past the V0-V2 edge or the V1-V2 edge

    var t = vecDot(e2, q) * invDet;
    if (t < TRIANGLE_EPSILON)
        return -1; // triangle is behind the ray origin

    return t;
} // end intersectTriangle

// flat-shaded triangle normal (one normal per triangle, from the cross
// product of its two edges), flipped if needed so it faces the incoming ray
// -- input files aren't guaranteed to wind vertices consistently, and without
// this a triangle lit from the "wrong" side of its stored winding would
// shade as if facing away from every light
function triangleNormal(v0, v1, v2, rayDir) {
    var normal = vecNormalize(vecCross(vecSub(v1, v0), vecSub(v2, v0)));
    if (vecDot(normal, rayDir) > 0)
        normal = vecScale(normal, -1);
    return normal;
} // end triangleNormal

// triangles.json (Part 5) is an array of triangle SETS, each set sharing one
// material and a vertex pool, with triangles as index triples into that
// pool; flatten that into one record per triangle so the render loop doesn't
// need to know about sets at all
function flattenTriangleSets(triangleSets) {
    var flat = [];
    for (var s=0; s<triangleSets.length; s++) {
        var set = triangleSets[s];
        for (var ti=0; ti<set.triangles.length; ti++) {
            var idx = set.triangles[ti];
            flat.push({
                v0: set.vertices[idx[0]],
                v1: set.vertices[idx[1]],
                v2: set.vertices[idx[2]],
                material: set.material
            });
        } // end for triangles in this set
    } // end for triangle sets
    return flat;
} // end flattenTriangleSets

/* Blinn-Phong lighting (Part 2, extended to multiple lights in Part 3) */

function clamp01(x) { return Math.min(1, Math.max(0, x)); }

const SHADOW_EPSILON = 1e-4; // offset along the normal to dodge shadow acne

// true if a ray from `point` toward `lightPos` is blocked by any ellipsoid
// OR triangle in the scene before it reaches the light (Part 4: shadow
// detection; Part 5: triangles participate identically to ellipsoids, both
// as casters here and as receivers via the caller). The ray origin is
// nudged off the surface along its normal so the surface doesn't shadow
// itself via floating-point self-intersection at t~0, and a hit only counts
// as blocking if it lands strictly between the origin and the light (not
// behind the origin, not past the light).
function isInShadow(point, normal, lightPos, ellipsoids, triangles) {
    var origin = vecAdd(point, vecScale(normal, SHADOW_EPSILON));
    var toLight = vecSub(lightPos, origin);
    var lightDist = Math.sqrt(vecDot(toLight, toLight));
    var shadowDir = vecScale(toLight, 1 / lightDist);

    for (var i=0; i<ellipsoids.length; i++) {
        var t = intersectEllipsoid(origin, shadowDir, ellipsoids[i]);
        if ((t > 0) && (t < lightDist))
            return true; // this ellipsoid blocks the light before we reach it
    } // end for ellipsoids
    for (var j=0; j<triangles.length; j++) {
        var tri = triangles[j];
        var tt = intersectTriangle(origin, shadowDir, tri.v0, tri.v1, tri.v2);
        if ((tt > 0) && (tt < lightDist))
            return true; // this triangle blocks the light before we reach it
    } // end for triangles
    return false;
} // end isInShadow

// outward surface normal of an ellipsoid at point I, from the gradient of
// its implicit equation: d/dx[(x-cx)^2/a^2 + (y-cy)^2/b^2 + (z-cz)^2/c^2] =
// 2*(x-cx)/a^2 (and similarly for y,z)
function ellipsoidNormal(point, ellipsoid) {
    var n = [
        2 * (point[0] - ellipsoid.x) / (ellipsoid.a * ellipsoid.a),
        2 * (point[1] - ellipsoid.y) / (ellipsoid.b * ellipsoid.b),
        2 * (point[2] - ellipsoid.z) / (ellipsoid.c * ellipsoid.c)
    ];
    return vecNormalize(n);
} // end ellipsoidNormal

// Blinn-Phong shading at a single ray-hit point, summed over every light;
// returns [r,g,b] in [0,1]. Shared by both primitive types (Part 5) -- the
// caller passes whichever object actually carries the ambient/diffuse/
// specular/n fields (an ellipsoid directly, or a triangle's `.material`),
// so this function never needs to know which kind of primitive was hit.
// Neither input file carries separate ka/kd/ks scalars, so ambient/diffuse/
// specular are treated as the already-weighted material colors (ka=kd=ks=1
// by default); n is used directly as the shininess exponent.
//
// allEllipsoids/allTriangles are the full scene, used to shadow-test each
// light independently (Part 4, extended to triangles in Part 5): a shadowed
// light still contributes its ambient term, but skips diffuse/specular at
// this point.
function shadeHit(point, normal, eyePos, material, lights, allEllipsoids, allTriangles) {
    var ka = (material.ka !== undefined) ? material.ka : 1.0;
    var kd = (material.kd !== undefined) ? material.kd : 1.0;
    var ks = (material.ks !== undefined) ? material.ks : 1.0;
    var shininess = (material.n !== undefined) ? material.n : 10.0;
    // a material may optionally compute its diffuse color per-point instead
    // of carrying one fixed array (e.g. Earth's procedural ocean/land
    // pattern, Part 6) -- ambient/specular/shininess stay exactly as
    // defined regardless, so this is the only thing that varies by point
    var diffuseColor = (typeof material.diffuseAt === "function") ?
        material.diffuseAt(point) : material.diffuse;

    var V = vecNormalize(vecSub(eyePos, point)); // point -> eye

    var color = [0, 0, 0];
    for (var li=0; li<lights.length; li++) {
        var light = lights[li];
        var lightPos = [light.x, light.y, light.z];
        var L = vecNormalize(vecSub(lightPos, point)); // point -> light
        var H = vecNormalize(vecAdd(L, V));

        var shadowed = isInShadow(point, normal, lightPos, allEllipsoids, allTriangles);

        var diffuseFactor = shadowed ? 0 : Math.max(0, vecDot(normal, L));
        // no specular highlight on the side of the surface facing away from
        // the light, or when this light is shadowed at this point
        var specularFactor = (diffuseFactor > 0) ?
            Math.pow(Math.max(0, vecDot(normal, H)), shininess) : 0;

        for (var i=0; i<3; i++) {
            var ambientTerm  = ka * light.ambient[i]  * material.ambient[i]; // always counted
            var diffuseTerm  = kd * light.diffuse[i]  * diffuseColor[i]  * diffuseFactor;
            var specularTerm = ks * light.specular[i] * material.specular[i] * specularFactor;
            color[i] += ambientTerm + diffuseTerm + specularTerm;
        } // end for color channels
    } // end for lights

    for (var i=0; i<3; i++)
        color[i] = clamp01(color[i]);
    return color;
} // end shadeHit


/* flexible camera / view window (Part 3) */

const WINDOW_DIST = 0.5; // fixed distance from eye to view window, as in Parts 1-2
const DEFAULT_WINDOW_HEIGHT = 1; // world-space window height used for aspect auto-fit
const MIN_VEC_LENGTH = 1e-9; // below this, a vector is treated as degenerate (zero)

// currently-loaded scene data and render target, set once by main()
var sceneEllipsoids = null;
var sceneTriangles = null;
var sceneLights = null;
var currentContext = null;

// true until the user hand-edits a window-bound field; while true, the
// window bounds are recomputed to match the canvas aspect ratio on every
// canvas resize so objects never stretch
var windowBoundsAutoFit = true;

// build an orthonormal camera basis from raw (un-normalized) eye/lookAt/viewUp
// vectors, or return null if the input is degenerate (zero-length look/up, or
// up parallel to look, so no well-defined right axis exists).
//
// lookAtRaw is a DIRECTION vector from the eye (which way the camera faces),
// not a world-space point the eye looks toward -- it's only normalized here,
// never subtracted from eye. If the "Look At" UI field were instead meant as
// a target point, it would need to be converted to a direction first, e.g.
// computeCameraBasis(eye, vecSub(target, eye), viewUpRaw).
function computeCameraBasis(eye, lookAtRaw, viewUpRaw) {
    var lookLen = Math.sqrt(vecDot(lookAtRaw, lookAtRaw));
    var upLen = Math.sqrt(vecDot(viewUpRaw, viewUpRaw));
    if (!(lookLen > MIN_VEC_LENGTH) || !(upLen > MIN_VEC_LENGTH))
        return null; // zero-length look-at or view-up vector

    var lookAt = vecScale(lookAtRaw, 1/lookLen);
    var viewUp = vecScale(viewUpRaw, 1/upLen);

    var rightRaw = vecCross(viewUp, lookAt);
    var rightLen = Math.sqrt(vecDot(rightRaw, rightRaw));
    if (!(rightLen > MIN_VEC_LENGTH))
        return null; // view-up is parallel (or antiparallel) to look-at

    var right = vecScale(rightRaw, 1/rightLen);
    var up = vecNormalize(vecCross(lookAt, right)); // re-orthogonalized window y axis

    return {
        eye: eye,
        lookAt: lookAt,
        right: right,
        up: up,
        windowCenter: vecAdd(eye, vecScale(lookAt, WINDOW_DIST))
    };
} // end computeCameraBasis

// read a labeled x/y/z triplet of number inputs (ids idPrefix+"X/Y/Z"),
// or return null if any of them isn't a finite number
function parseVec3(idPrefix) {
    var x = parseFloat(document.getElementById(idPrefix + "X").value);
    var y = parseFloat(document.getElementById(idPrefix + "Y").value);
    var z = parseFloat(document.getElementById(idPrefix + "Z").value);
    if (!isFinite(x) || !isFinite(y) || !isFinite(z))
        return null;
    return [x, y, z];
} // end parseVec3

// recompute the L/R/B/T view-window fields so the window's aspect ratio
// matches the canvas's, keeping window height fixed at DEFAULT_WINDOW_HEIGHT
// -- this is what keeps a canvas resize from stretching the rendered scene
function updateAutoFitWindowBounds(canvasWidth, canvasHeight) {
    var width = DEFAULT_WINDOW_HEIGHT * (canvasWidth / canvasHeight);
    document.getElementById("winLeft").value   = (-width / 2);
    document.getElementById("winRight").value  = (width / 2);
    document.getElementById("winBottom").value = (-DEFAULT_WINDOW_HEIGHT / 2);
    document.getElementById("winTop").value    = (DEFAULT_WINDOW_HEIGHT / 2);
} // end updateAutoFitWindowBounds

/* Part 6: stylized "Artemis II: Earth to Moon" scene, toggled by spacebar.
   This only supplies alternate scene DATA (ellipsoids/triangles/lights) --
   render()/shadeHit()/intersectEllipsoid/intersectTriangle/isInShadow are
   all reused completely unmodified from Parts 1-5. The real fetched
   sceneEllipsoids/sceneTriangles/sceneLights are never touched, so toggling
   back always restores the exact Parts 1-5 default render. */

var artemisSceneActive = false;
var artemisAnimT = 0;             // seconds since the animation was (re)started
var artemisAnimStartTime = null;  // performance.now() timestamp corresponding to t=0
var artemisAnimFrameId = null;    // current requestAnimationFrame handle, or null if not running
var savedArtemisCanvasSize = null; // {width,height} saved before dropping resolution for animation

const STAR_DENSITY = 0.002; // ~0.2% of background pixels become stars

// cheap 32-bit integer hash of a pixel coordinate -- large-prime multiply-add
// followed by xorshift mixing, a standard "hash the bits" technique (not
// from a specific paper); deterministic per (x,y) and well-mixed enough that
// nearby pixels don't get visibly correlated (no row/column banding)
function hash01(x, y) {
    var h = Math.imul(x, 374761393) + Math.imul(y, 668265263);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h = h ^ (h >>> 16);
    return (h >>> 0) / 4294967296; // -> [0, 1)
} // end hash01

// mostly-black background with a sparse scatter of white/near-white "star"
// pixels of varying brightness -- only used where a primary ray hits
// nothing, so it never touches the ellipsoid/triangle shading path at all
function starfieldColor(px, py) {
    var presence = hash01(px, py);
    if (presence >= STAR_DENSITY)
        return new Color(0, 0, 0, 255);
    var brightness = 0.5 + 0.5 * hash01(px + 104729, py + 15485867); // vary 0.5-1.0
    var v = Math.round(brightness * 255);
    return new Color(v, v, v, 255);
} // end starfieldColor

// hardcoded, non-physically-scaled Earth/Moon scene, composed for its own
// dedicated camera (see ARTEMIS_CAMERA_FIELDS below): Earth large in the
// foreground, Moon smaller in the mid/background with clear separation.
// Built once and cached (see artemisStaticParts below) -- unlike the
// rocket, none of this changes frame to frame.
var EARTH_LAND_DIFFUSE = [0.10, 0.45, 0.12]; // green land patches
var EARTH_LAND_THRESHOLD = 0.324; // tuned (by sampling the unit sphere) so ~30% of the surface reads as land

// deterministic, irregular ocean/land pattern as a function of longitude/
// latitude on Earth's local unit sphere: a sum of sine waves at unrelated
// (non-integer, differently-phased) frequencies, so the resulting blotches
// don't line up into an obvious grid or perfectly radial stripes
function earthLandPattern(theta, phi) {
    return Math.sin(theta * 2.3 + phi * 3.1) * 0.5
         + Math.sin(theta * 4.7 - phi * 1.7 + 1.3) * 0.3
         + Math.sin(theta * 1.1 + phi * 5.3 + 2.7) * 0.4
         + Math.sin(theta * 7.9 + phi * 0.6) * 0.15;
} // end earthLandPattern

// per-point diffuse color for Earth's surface: ocean blue, except in the
// irregular patches where earthLandPattern crosses the tuned threshold,
// which read as green land. Ambient/specular/shininess are untouched by
// this -- see shadeHit's `diffuseAt` hook -- so the ocean glint and overall
// brightness behave exactly as before, just with a two-tone diffuse color.
function earthDiffuseAt(earth, oceanDiffuse, point) {
    var local = vecNormalize([
        (point[0] - earth.x) / earth.a,
        (point[1] - earth.y) / earth.b,
        (point[2] - earth.z) / earth.c
    ]);
    var theta = Math.atan2(local[2], local[0]);
    var phi = Math.asin(Math.max(-1, Math.min(1, local[1])));
    return (earthLandPattern(theta, phi) > EARTH_LAND_THRESHOLD) ? EARTH_LAND_DIFFUSE : oceanDiffuse;
} // end earthDiffuseAt

function buildArtemisStaticParts() {
    var earthCenter = [0, -0.05, 3.0];
    var moonCenter = [2.5, 0.6, 5.4];

    var earthOceanDiffuse = [0.05, 0.30, 0.55]; // ocean blue
    var earth = {
        x: earthCenter[0], y: earthCenter[1], z: earthCenter[2], a: 1.0, b: 1.0, c: 1.0,
        ambient:  [0.10, 0.13, 0.18],
        diffuse:  earthOceanDiffuse, // fallback/ocean color
        specular: [0.35, 0.35, 0.40], // glossy ocean highlight (land patches keep this too)
        n: 30
    };
    earth.diffuseAt = function(point) { return earthDiffuseAt(earth, earthOceanDiffuse, point); };
    var moon = {
        x: moonCenter[0], y: moonCenter[1], z: moonCenter[2], a: 0.30, b: 0.30, c: 0.30, // clearly smaller than Earth
        ambient:  [0.08, 0.08, 0.08],
        diffuse:  [0.62, 0.62, 0.60], // light gray
        specular: [0.08, 0.08, 0.08], // low -- matte
        n: 5
    };

    // Sun: far off to Earth's side, angled a bit toward the eye so the
    // camera sees a real lit crescent (not just a grazing sliver), with
    // boosted intensity so both bodies read clearly instead of dim
    var sun = {
        x: -29.584, y: 7.346, z: -22.886,
        ambient:  [0.15, 0.15, 0.13],
        diffuse:  [1.6, 1.45, 1.15],  // warm white, boosted
        specular: [1.6, 1.45, 1.15]
    };
    // headlight: a dim fill light AT the eye. Any face the camera can see
    // has its (ray-facing-corrected) normal pointing back roughly toward
    // the eye, so this lights up whatever's visible regardless of the
    // Sun's angle -- without it, the rocket's 3-sided hull has faces that
    // point away from the Sun and render as flat near-black slivers even
    // though they're plainly in view. Kept dim enough that Earth's and
    // Moon's terminators (the whole point of the Sun's placement) stay
    // clearly readable.
    var headlight = {
        x: 0, y: 0, z: 0,
        ambient:  [0, 0, 0],
        diffuse:  [0.55, 0.52, 0.47],
        specular: [0.22, 0.22, 0.22]
    };

    return {
        earthCenter: earthCenter,
        moonCenter: moonCenter,
        ellipsoids: [earth, moon],
        lights: [sun, headlight]
    };
} // end buildArtemisStaticParts

// build the rocket's 11 triangles (tapered 3-sided body: nose + 6-triangle
// tube + 2 fins) at a given world-space position, facing a given direction
// of travel -- shared by every animation frame, just fed a different
// mid/forward each time (see getArtemisRocketState below)
var ARTEMIS_CRAFT_BODY_MATERIAL = {
    ambient:  [0.18, 0.18, 0.18],
    diffuse:  [0.75, 0.75, 0.78], // white/light-gray hull
    specular: [0.5, 0.5, 0.5],
    n: 25
};
var ARTEMIS_CRAFT_ACCENT_MATERIAL = {
    ambient:  [0.12, 0.03, 0.01],
    diffuse:  [0.85, 0.22, 0.05], // orange/red nose cone + fins
    specular: [0.4, 0.3, 0.2],
    n: 20
};
function buildArtemisRocketTriangles(mid, forward) {
    var NOSE_LEN = 0.16, BODY_LEN = 0.26, BODY_RADIUS = 0.065, FIN_LEN = 0.12, FIN_SPAN = 0.12;
    var RING_OFFSET_DEG = 120; // cross-section rotation tuned so the Sun+headlight actually light the visible faces

    var worldUp = [0, 1, 0];
    var right = vecNormalize(vecCross(worldUp, forward));
    if (!(vecDot(right, right) > MIN_VEC_LENGTH)) // forward parallel to worldUp -- fall back to an arbitrary reference
        right = vecNormalize(vecCross([1, 0, 0], forward));
    var trueUp = vecNormalize(vecCross(forward, right));

    function ringPoint(center, angleDeg, radius) {
        var rad = (angleDeg + RING_OFFSET_DEG) * Math.PI / 180;
        return vecAdd(center, vecAdd(vecScale(trueUp, radius * Math.cos(rad)), vecScale(right, radius * Math.sin(rad))));
    }
    function finTip(tail, angleDeg) {
        var rad = (angleDeg + RING_OFFSET_DEG) * Math.PI / 180;
        var dirOut = vecAdd(vecScale(trueUp, Math.cos(rad)), vecScale(right, Math.sin(rad)));
        return vecAdd(vecAdd(tail, vecScale(dirOut, BODY_RADIUS + FIN_SPAN)), vecScale(forward, -FIN_LEN));
    }

    var noseTip = vecAdd(mid, vecScale(forward, NOSE_LEN));
    var tail = vecAdd(mid, vecScale(forward, -BODY_LEN));
    var sh0 = ringPoint(mid, 90, BODY_RADIUS), sh1 = ringPoint(mid, 210, BODY_RADIUS), sh2 = ringPoint(mid, 330, BODY_RADIUS);
    var t0 = ringPoint(tail, 90, BODY_RADIUS), t1 = ringPoint(tail, 210, BODY_RADIUS), t2 = ringPoint(tail, 330, BODY_RADIUS);
    var fin1Tip = finTip(tail, 210), fin2Tip = finTip(tail, 330);

    // note: the nose triangles use (v0,v2,v1) order (not v0,v1,v2) -- v0,v1,v2
    // here would wind the wrong way and point the flat-shading normal back
    // into the rocket's own body instead of outward
    return [
        { v0: sh0, v1: noseTip, v2: sh1, material: ARTEMIS_CRAFT_ACCENT_MATERIAL }, // nose cone (3 tris)
        { v0: sh1, v1: noseTip, v2: sh2, material: ARTEMIS_CRAFT_ACCENT_MATERIAL },
        { v0: sh2, v1: noseTip, v2: sh0, material: ARTEMIS_CRAFT_ACCENT_MATERIAL },
        { v0: sh0, v1: sh1, v2: t0, material: ARTEMIS_CRAFT_BODY_MATERIAL }, // body tube (6 tris, 2 per side face)
        { v0: sh1, v1: t1,  v2: t0, material: ARTEMIS_CRAFT_BODY_MATERIAL },
        { v0: sh1, v1: sh2, v2: t1, material: ARTEMIS_CRAFT_BODY_MATERIAL },
        { v0: sh2, v1: t2,  v2: t1, material: ARTEMIS_CRAFT_BODY_MATERIAL },
        { v0: sh2, v1: sh0, v2: t2, material: ARTEMIS_CRAFT_BODY_MATERIAL },
        { v0: sh0, v1: t0,  v2: t2, material: ARTEMIS_CRAFT_BODY_MATERIAL },
        { v0: t0, v1: t1, v2: fin1Tip, material: ARTEMIS_CRAFT_ACCENT_MATERIAL }, // 2 fins
        { v0: t2, v1: t0, v2: fin2Tip, material: ARTEMIS_CRAFT_ACCENT_MATERIAL }
    ];
} // end buildArtemisRocketTriangles

/* Artemis II flight profile: Earth orbit -> trans-lunar transfer -> hold,
   looping. All positions/timings here were derived and verified with a
   Node-side simulation (checked for Earth/Moon collisions along the
   transfer curve and for degenerate orientation math across the whole
   cycle) before being hardcoded -- not guessed blind. */
var ARTEMIS_ORBIT_DURATION = 6.0;    // seconds for one full Earth orbit (phase 1)
var ARTEMIS_TRANSFER_DURATION = 4.0; // seconds for the trans-lunar transfer (phase 2)
var ARTEMIS_HOLD_DURATION = 1.5;     // seconds paused near the Moon before looping (phase 3)
var ARTEMIS_CYCLE_DURATION = ARTEMIS_ORBIT_DURATION + ARTEMIS_TRANSFER_DURATION + ARTEMIS_HOLD_DURATION;

// orbit basis: axis1 points from Earth's center to the rocket's start
// position (chosen to match Part 6's original static composition, so t=0
// reproduces that exact look); axis2 is Gram-Schmidt-orthogonalized from
// the old fixed Earth-to-Moon direction, so the orbit both starts at the
// right spot AND starts facing roughly moonward, same as the static design
var ARTEMIS_ORBIT_AXIS1 = [0.3323, 0.0554, -0.9415];
var ARTEMIS_ORBIT_AXIS2 = [0.9147, 0.2245, 0.3360];
var ARTEMIS_ORBIT_RADIUS = 1.8055; // ~0.81 above Earth's radius-1.0 surface

// trans-lunar transfer: a quadratic Bezier from the orbit exit point (P0,
// same as the orbit's t=0 point, since the orbit duration is exactly one
// full revolution) to a point just outside the Moon's near surface (P2),
// bowed away from Earth's center (P1) so the curve can't dip back through
// Earth along the way
var ARTEMIS_TRANSFER_P0 = [0.6,    0.05,   1.3];
var ARTEMIS_TRANSFER_P1 = [2.5566, 0.5626, 3.3349];
var ARTEMIS_TRANSFER_P2 = [2.1455, 0.5078, 5.0597];

function artemisBezierPoint(s) {
    var a = (1 - s) * (1 - s), b = 2 * (1 - s) * s, c = s * s;
    return [
        a * ARTEMIS_TRANSFER_P0[0] + b * ARTEMIS_TRANSFER_P1[0] + c * ARTEMIS_TRANSFER_P2[0],
        a * ARTEMIS_TRANSFER_P0[1] + b * ARTEMIS_TRANSFER_P1[1] + c * ARTEMIS_TRANSFER_P2[1],
        a * ARTEMIS_TRANSFER_P0[2] + b * ARTEMIS_TRANSFER_P1[2] + c * ARTEMIS_TRANSFER_P2[2]
    ];
} // end artemisBezierPoint

function artemisBezierTangent(s) {
    var d0 = vecSub(ARTEMIS_TRANSFER_P1, ARTEMIS_TRANSFER_P0);
    var d1 = vecSub(ARTEMIS_TRANSFER_P2, ARTEMIS_TRANSFER_P1);
    return vecNormalize(vecAdd(vecScale(d0, 2 * (1 - s)), vecScale(d1, 2 * s)));
} // end artemisBezierTangent

// rocket position + direction of travel at animation time t (seconds),
// looping every ARTEMIS_CYCLE_DURATION. t=0 exactly reproduces Part 6's
// original static composition (same position AND orientation).
function getArtemisRocketState(t, earthCenter) {
    var tw = t % ARTEMIS_CYCLE_DURATION;
    if (tw < 0) tw += ARTEMIS_CYCLE_DURATION;

    if (tw < ARTEMIS_ORBIT_DURATION) {
        // phase 1: circular orbit around Earth
        var theta = tw * (2 * Math.PI / ARTEMIS_ORBIT_DURATION);
        var pos = vecAdd(earthCenter, vecAdd(
            vecScale(ARTEMIS_ORBIT_AXIS1, ARTEMIS_ORBIT_RADIUS * Math.cos(theta)),
            vecScale(ARTEMIS_ORBIT_AXIS2, ARTEMIS_ORBIT_RADIUS * Math.sin(theta))
        ));
        var tangent = vecNormalize(vecAdd(
            vecScale(ARTEMIS_ORBIT_AXIS1, -Math.sin(theta)),
            vecScale(ARTEMIS_ORBIT_AXIS2, Math.cos(theta))
        ));
        return { pos: pos, forward: tangent };
    } else if (tw < ARTEMIS_ORBIT_DURATION + ARTEMIS_TRANSFER_DURATION) {
        // phase 2: trans-lunar transfer along the Bezier arc
        var s = (tw - ARTEMIS_ORBIT_DURATION) / ARTEMIS_TRANSFER_DURATION;
        return { pos: artemisBezierPoint(s), forward: artemisBezierTangent(s) };
    } else {
        // phase 3: hold near the Moon, facing the way the transfer arrived
        return { pos: ARTEMIS_TRANSFER_P2, forward: artemisBezierTangent(1) };
    }
} // end getArtemisRocketState

// full Artemis scene at animation time t: static Earth/Moon/lights (built
// once and cached) plus a freshly-computed rocket for this exact instant
var artemisStaticParts = null;
function getArtemisScene(t) {
    if (artemisStaticParts == null)
        artemisStaticParts = buildArtemisStaticParts();
    var state = getArtemisRocketState(t, artemisStaticParts.earthCenter);
    return {
        ellipsoids: artemisStaticParts.ellipsoids,
        triangles: buildArtemisRocketTriangles(state.pos, state.forward),
        lights: artemisStaticParts.lights
    };
} // end getArtemisScene

// dedicated camera/window for the Artemis scene -- Earth prominent close to
// the eye, Moon smaller and offset far enough to clear Earth's silhouette,
// straight down +z. Applied on activation and restored on deactivation (see
// wireControls' spacebar handler) so it never disturbs the Parts 1-5 camera.
var ARTEMIS_CAMERA_FIELDS = {
    eyeX: "0", eyeY: "0", eyeZ: "0",
    lookAtX: "0", lookAtY: "0", lookAtZ: "1",
    viewUpX: "0", viewUpY: "1", viewUpZ: "0",
    winLeft: "-0.5", winRight: "0.5", winBottom: "-0.5", winTop: "0.5"
};
var CAMERA_FIELD_IDS = [
    "eyeX","eyeY","eyeZ", "lookAtX","lookAtY","lookAtZ", "viewUpX","viewUpY","viewUpZ",
    "winLeft","winRight","winBottom","winTop"
];
var savedCameraFields = null; // captured just before switching into Artemis mode
var savedWindowBoundsAutoFit = true;

function captureCameraFields() {
    var out = {};
    CAMERA_FIELD_IDS.forEach(function(id) { out[id] = document.getElementById(id).value; });
    return out;
} // end captureCameraFields

function applyCameraFields(fields) {
    CAMERA_FIELD_IDS.forEach(function(id) {
        if (fields[id] !== undefined)
            document.getElementById(id).value = fields[id];
    });
} // end applyCameraFields

// ray cast the scene into Blinn-Phong shaded pixels, using the camera, view
// window, and lights currently set in the UI controls
function render(context) {
    var statusEl = document.getElementById("statusMsg");
    if (statusEl) statusEl.textContent = "";

    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w,h);
    var backgroundColor = new Color(0,0,0,255);

    if (!artemisSceneActive && ((sceneEllipsoids == String.null) || (sceneEllipsoids == null)))
        return; // nothing to render without scene data (Parts 1-5 default)

    var eye = parseVec3("eye");
    var lookAtRaw = parseVec3("lookAt");
    var viewUpRaw = parseVec3("viewUp");

    var l = parseFloat(document.getElementById("winLeft").value);
    var r = parseFloat(document.getElementById("winRight").value);
    var b = parseFloat(document.getElementById("winBottom").value);
    var t = parseFloat(document.getElementById("winTop").value);
    var validWindow = isFinite(l) && isFinite(r) && isFinite(b) && isFinite(t)
        && (r > l) && (t > b);

    var basis = (eye && lookAtRaw && viewUpRaw && validWindow) ?
        computeCameraBasis(eye, lookAtRaw, viewUpRaw) : null;

    if (basis == null) {
        // degenerate camera/window input -- render nothing rather than crash
        for (var py=0; py<h; py++)
            for (var px=0; px<w; px++)
                drawPixel(imagedata, px, py, backgroundColor);
        context.putImageData(imagedata, 0, 0);
        if (statusEl) {
            statusEl.textContent =
                "Invalid camera or window settings (check eye/up/look-at/window fields).";
            statusEl.style.color = "#b00"; // error
        }
        return;
    } // end if degenerate camera

    var ellipsoids, triangles, lights;
    if (artemisSceneActive) {
        var artemisFrame = getArtemisScene(artemisAnimT);
        ellipsoids = artemisFrame.ellipsoids;
        triangles = artemisFrame.triangles;
        lights = artemisFrame.lights;
    } else {
        ellipsoids = sceneEllipsoids;
        triangles = (sceneTriangles == String.null || sceneTriangles == null) ? [] : sceneTriangles;
        lights = (sceneLights == String.null || sceneLights == null) ? [] : sceneLights;
    }

    if (statusEl) {
        statusEl.textContent = artemisSceneActive ?
            "Artemis II: Earth to Moon (Part 6) -- press Space to return to the default scene" :
            "";
        statusEl.style.color = "#06c"; // info, not an error
    }

    // outer loop over pixels, inner loop over primitives -- this is ray
    // CASTING (one ray per pixel tested against every primitive), not
    // rasterization (which would loop primitives on the outside)
    for (var py=0; py<h; py++) {
        for (var px=0; px<w; px++) {

            // this pixel's point on the view window, interpolated directly
            // from the view-space L/R/B/T bounds (independently per axis,
            // over that axis's own pixel count, so canvas width and height
            // are never conflated)
            var u = l + (r - l) * (px + 0.5) / w;
            var v = t - (t - b) * (py + 0.5) / h; // flip so row 0 is the top (+up)

            var windowPoint = vecAdd(basis.windowCenter,
                vecAdd(vecScale(basis.right, u), vecScale(basis.up, v)));

            var rayDir = vecNormalize(vecSub(windowPoint, basis.eye));

            // find the closest primitive this ray hits, of EITHER type --
            // t is just a distance along the ray, so ellipsoids and
            // triangles compare directly against the same closestT (Part 5)
            var closestT = Infinity;
            var closestEllipsoid = null;
            var closestTriangle = null;
            for (var e=0; e<ellipsoids.length; e++) {
                var hitT = intersectEllipsoid(basis.eye, rayDir, ellipsoids[e]);
                if ((hitT > 0) && (hitT < closestT)) {
                    closestT = hitT;
                    closestEllipsoid = ellipsoids[e];
                    closestTriangle = null;
                }
            } // end for ellipsoids
            for (var tri=0; tri<triangles.length; tri++) {
                var triRef = triangles[tri];
                var hitT2 = intersectTriangle(basis.eye, rayDir, triRef.v0, triRef.v1, triRef.v2);
                if ((hitT2 > 0) && (hitT2 < closestT)) {
                    closestT = hitT2;
                    closestTriangle = triRef;
                    closestEllipsoid = null;
                }
            } // end for triangles

            var pixelColor;
            if (closestEllipsoid != null) {
                var hitPoint = vecAdd(basis.eye, vecScale(rayDir, closestT));
                var normal = ellipsoidNormal(hitPoint, closestEllipsoid);
                var shaded = shadeHit(hitPoint, normal, basis.eye, closestEllipsoid, lights, ellipsoids, triangles);
                pixelColor = new Color(shaded[0]*255, shaded[1]*255, shaded[2]*255, 255);
            } else if (closestTriangle != null) {
                var hitPoint2 = vecAdd(basis.eye, vecScale(rayDir, closestT));
                var normal2 = triangleNormal(closestTriangle.v0, closestTriangle.v1, closestTriangle.v2, rayDir);
                var shaded2 = shadeHit(hitPoint2, normal2, basis.eye, closestTriangle.material, lights, ellipsoids, triangles);
                pixelColor = new Color(shaded2[0]*255, shaded2[1]*255, shaded2[2]*255, 255);
            } else {
                pixelColor = artemisSceneActive ? starfieldColor(px, py) : backgroundColor;
            }
            drawPixel(imagedata, px, py, pixelColor);

        } // end for px
    } // end for py

    context.putImageData(imagedata, 0, 0);
} // end render

// Part 6 animation: benchmarked full-pipeline frame times (measuring actual
// intersect/shade calls, not a guess) were ~1.5s/frame at 512x512 (~0.7fps,
// unusably stuttery) vs ~95ms/frame at 128x128 (~10.6fps, smooth enough to
// read the orbit/transfer motion) -- so the canvas is temporarily dropped to
// this resolution only while the animation runs, and restored on exit.
const ARTEMIS_ANIMATION_CANVAS_SIZE = 128;

function dropCanvasResolutionForAnimation() {
    var canvas = currentContext.canvas;
    // save both the pixel-buffer size (canvas.width/height) and whatever
    // CSS size it was displaying at, so both can be restored exactly
    savedArtemisCanvasSize = {
        width: canvas.width, height: canvas.height,
        cssWidth: canvas.style.width, cssHeight: canvas.style.height
    };
    // lock the CSS (on-screen) size to the ORIGINAL dimensions before
    // shrinking the actual pixel buffer -- otherwise, with no CSS size set,
    // a canvas displays at its width/height attribute in CSS pixels, so
    // dropping canvas.width to 128 would also shrink it on screen to a
    // 128px box instead of just rendering fewer pixels into the same area
    canvas.style.width = savedArtemisCanvasSize.width + "px";
    canvas.style.height = savedArtemisCanvasSize.height + "px";
    canvas.width = ARTEMIS_ANIMATION_CANVAS_SIZE;
    canvas.height = ARTEMIS_ANIMATION_CANVAS_SIZE;
} // end dropCanvasResolutionForAnimation

function restoreCanvasResolutionAfterAnimation() {
    if (savedArtemisCanvasSize == null)
        return;
    var canvas = currentContext.canvas;
    canvas.width = savedArtemisCanvasSize.width;
    canvas.height = savedArtemisCanvasSize.height;
    canvas.style.width = savedArtemisCanvasSize.cssWidth;
    canvas.style.height = savedArtemisCanvasSize.cssHeight;
    savedArtemisCanvasSize = null;
} // end restoreCanvasResolutionAfterAnimation

// drives the continuous re-render loop for Part 6. t is derived from
// elapsed wall-clock time (timestamp - artemisAnimStartTime), not frame
// count, so playback speed doesn't depend on frame rate.
function artemisAnimationTick(timestamp) {
    if (!artemisSceneActive) {
        artemisAnimFrameId = null;
        return; // toggled off since this frame was scheduled -- stop cleanly, no runaway loop
    }
    artemisAnimT = (timestamp - artemisAnimStartTime) / 1000;
    render(currentContext);
    artemisAnimFrameId = requestAnimationFrame(artemisAnimationTick);
} // end artemisAnimationTick

function startArtemisAnimation() {
    artemisAnimStartTime = performance.now();
    artemisAnimFrameId = requestAnimationFrame(artemisAnimationTick);
} // end startArtemisAnimation

function stopArtemisAnimation() {
    if (artemisAnimFrameId != null) {
        cancelAnimationFrame(artemisAnimFrameId);
        artemisAnimFrameId = null;
    }
} // end stopArtemisAnimation

// apply the canvas width/height fields to the canvas and re-render
function onCanvasSizeChange() {
    var newW = parseInt(document.getElementById("canvasWidthInput").value, 10);
    var newH = parseInt(document.getElementById("canvasHeightInput").value, 10);
    if (!isFinite(newW) || !isFinite(newH) || (newW < 1) || (newH < 1))
        return; // ignore invalid size input, leave canvas as-is

    var canvas = currentContext.canvas;
    canvas.width = newW;
    canvas.height = newH;

    if (windowBoundsAutoFit)
        updateAutoFitWindowBounds(newW, newH);

    render(currentContext);
} // end onCanvasSizeChange

// wire up all UI controls to recompute/re-render on change
function wireControls() {
    document.getElementById("canvasWidthInput").addEventListener("change", onCanvasSizeChange);
    document.getElementById("canvasHeightInput").addEventListener("change", onCanvasSizeChange);

    ["eyeX","eyeY","eyeZ","lookAtX","lookAtY","lookAtZ","viewUpX","viewUpY","viewUpZ"]
        .forEach(function(id) {
            document.getElementById(id).addEventListener("change", function() {
                render(currentContext);
            });
        });

    ["winLeft","winRight","winBottom","winTop"].forEach(function(id) {
        var el = document.getElementById(id);
        el.addEventListener("input", function() { windowBoundsAutoFit = false; });
        el.addEventListener("change", function() { render(currentContext); });
    });

    // Part 6: spacebar toggles the stylized, animated Artemis II scene on/
    // off. It swaps in the scene's own dedicated camera and a reduced
    // canvas resolution (saving/restoring whatever was in place), and
    // starts/stops the requestAnimationFrame loop -- but never touches
    // sceneEllipsoids/sceneTriangles/sceneLights or the default canvas
    // size, so the Parts 1-5 default is completely unaffected.
    document.addEventListener("keydown", function(event) {
        if ((event.code !== "Space") && (event.key !== " "))
            return;
        var active = document.activeElement;
        if (active && (active.tagName === "INPUT"))
            return; // don't hijack spacebar while a control field is focused

        event.preventDefault(); // stop the page from scrolling
        artemisSceneActive = !artemisSceneActive;

        if (artemisSceneActive) {
            savedCameraFields = captureCameraFields();
            savedWindowBoundsAutoFit = windowBoundsAutoFit;
            applyCameraFields(ARTEMIS_CAMERA_FIELDS);
            windowBoundsAutoFit = false; // Artemis scene uses its own fixed window
            dropCanvasResolutionForAnimation();

            artemisAnimT = 0;
            render(currentContext); // immediate t=0 frame -- matches the original static composition even without playback
            startArtemisAnimation();
        } else {
            stopArtemisAnimation();
            restoreCanvasResolutionAfterAnimation();
            if (savedCameraFields) {
                applyCameraFields(savedCameraFields);
                windowBoundsAutoFit = savedWindowBoundsAutoFit;
                savedCameraFields = null;
            }
            render(currentContext);
        }
    });
} // end wireControls


/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");
    currentContext = context;

    // load the scene once; camera/window/canvas-size changes just re-render
    // against this same cached data instead of re-fetching it
    sceneEllipsoids = getInputEllipsoids();
    sceneLights = getInputLights();
    var triangleSets = getInputTriangleSets();
    sceneTriangles = (triangleSets == String.null) ? [] : flattenTriangleSets(triangleSets);

    // seed the view window from the canvas's starting (square) size
    updateAutoFitWindowBounds(canvas.width, canvas.height);

    wireControls();

    render(context);
      // Parts 1-3: ray cast the input ellipsoids into Blinn-Phong shaded
      // pixels, using the camera/window/lights from the UI controls

    //drawRandPixelsInInputEllipsoids(context);
      // shows how to draw pixels and read input file

    //drawInputEllipsoidsUsingArcs(context);
      // shows how to read input file, but not how to draw pixels
    
    //drawRandPixelsInInputTriangles(context);
      // shows how to draw pixels and read input file
    
    //drawInputTrainglesUsingPaths(context);
      // shows how to read input file, but not how to draw pixels
    
    //drawRandPixelsInInputBoxes(context);
      // shows how to draw pixels and read input file
    
    //drawInputBoxesUsingPaths(context);
      // shows how to read input file, but not how to draw pixels
}
