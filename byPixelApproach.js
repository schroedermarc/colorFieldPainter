let brushRadius = 50;
let w = 300;
let h = 300;

let c;

function setup() {
  canvas = createCanvas(w, h);



  background(255);

  c = chroma(255,0,0,.1);

  
 
  
}

function draw() {
	
	// background(255);
	
	loadPixels();
	
	
	var pointX = mouseX;
	var pointY = mouseY;
	
	
	
	for (let i = pointX - brushRadius; i < pointX + brushRadius; i++){
		for (let j = pointY - brushRadius; j < pointY + brushRadius; j++){
			if ( sqrt( sq(j - pointY) + sq(i - pointX) ) <= brushRadius && i > 0 && j > 0 && i < w && j < h){
				
			  
				//change color of pixel
				const index = (i + j * w) * 4;
				
				// if (!pixels[index + 3]){
				// 	console.log(i,j)
				// }

				// map(pixels[index + 3], 0, 255, 0, 1)

				// create chroma color from existing color;
				const existingColor = chroma(
					pixels[index + 0], 
					pixels[index + 1], 
					pixels[index + 2],
					map(pixels[index + 3],0,255,0,1)
				);

				let mix = chroma.mix(existingColor, c, 'rgb');
	
				pixels[index + 0] = mix.rgb()[0];
				pixels[index + 1] = mix.rgb()[1];
				pixels[index + 2] = mix.rgb()[2];

				const alphaCalc = map( sqrt( sq(j - pointY) + sq(i - pointX) ), 0, brushRadius, 255, 0 );

				pixels[index + 3] = alphaCalc;
	
			}
		}
	}
	
	updatePixels();
	
}


