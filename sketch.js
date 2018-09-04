let splatterRadius = 50;
let nSplatter = 1000;
let maxSplatterSize = 2;
let colorVariance = .1;


let radiusSlider, nSplatterSlider, colorVarianceSlider;

let img;

function preload(){

}

function radiusSliderChanged () {
	document.getElementById("radiusLabel").innerHTML = radiusSlider.value;
	splatterRadius = radiusSlider.value;
}

function nSplatterSliderChanged(){
	document.getElementById("nSplatterLabel").innerHTML = nSplatterSlider.value;
	nSplatter = nSplatterSlider.value;
}

function colorVarianceSliderChanged(){
	colorVariance = colorVarianceSlider.value / 10;
}


function setup() {
	canvas = createCanvas(1000, 1000);
	
	angleMode(DEGREES);
	noStroke();

	radiusSlider = document.getElementById("slider1");
	nSplatterSlider = document.getElementById("slider2");
	colorVarianceSlider = document.getElementById("slider3");

	radiusSliderChanged();
	nSplatterSliderChanged();
	colorVarianceSlider.value = 0.1
	

	radiusSlider.oninput = radiusSliderChanged;
	nSplatterSlider.oninput = nSplatterSliderChanged;
	colorVarianceSlider.oninput = colorVarianceSliderChanged;

	
	////////////////////////////
	
	// background(162, 155, 130);

	// fill(80, 103, 131);
	// rect(300, 320, 1000 ,1000);


	// fill(26, 40, 112);
	// rect(300, 620, 1000, 1000);

	// fill(197, 129, 88);
	// triangle(0, 320, 850, 1000, 0, 1000)

	///////////////////////////////

	background(6, 16, 80);

	fill(166, 22, 21);
	rect(100, 100, 800, 380);

	fill("black");
	rect(100, 520, 800, 180);

	fill(0, 37, 192);
	rect(100, 730, 800, 180);


	///////////////////////////////



}

function draw() {


}

function mouseClicked(){
	
	const sourceX = mouseX;
	const sourceY = mouseY;

	loadPixels();

	// get source color for clicked pixel;
	sourceR = pixels[(sourceX + sourceY * width) * 4]
	sourceG = pixels[(sourceX + sourceY * width) * 4 + 1]
	sourceB = pixels[(sourceX + sourceY * width) * 4 + 2]
	sourceA = pixels[(sourceX + sourceY * width) * 4 + 3]


	updatePixels();

	// for as many splatters
	for (i = 0; i < nSplatter; i++){
		
		//pick random radius
		const r = random(0, splatterRadius);

		//pick random angle (in degrees)
		const a = random(0, 360);

		//pick splatter x dimension
		const splatterWidth = random(1,maxSplatterSize);

		//pick splatter y dimesion
		const splatterHeight = random(1, maxSplatterSize);
		
		//calculate x and y coord from r and a
		const splatterX = sourceX + (r * cos(a));
		const splatterY = sourceY + (r * sin(a));


		// set chroma color
		chromaColor = chroma(sourceR, sourceG, sourceB);
	
		// randomly choose to darken or brighten and saturate and desaturate;
		let darken = random([true,false]);
		let saturate = random([true,false]);
	
		// calculate new chromacolor values based on choices
		if (darken){
			chromaColor = chromaColor.darken(random() * colorVariance * .7)
		} else {
			chromaColor =chromaColor.brighten(random() * colorVariance)
		}
		
		if (saturate){
			chromaColor = chromaColor.saturate(random() * colorVariance);
		} else {
			chromaColor = chromaColor.desaturate(random() * colorVariance);
		}


		//draw splatter ellipse with chroma colors
		noStroke();
		fill(chromaColor.rgba()[0], chromaColor.rgba()[1], chromaColor.rgba()[2], sourceA);
		ellipse(splatterX, splatterY, splatterWidth, splatterHeight);
	}

}


function keyPressed(){

	if (keyCode === UP_ARROW){
		blurImage();
	}

}


function blurImage(){

	filter(BLUR, 1);
}

