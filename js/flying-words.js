// flying-words-japan.js is COPYRIGHT Michael Dowman 2010-2011 All Rights Reserved

	// Positions the element for the given word at the appropriate position in the window, given its x, y and current z coordinates. 
	// The words font size is also set appropriately, as well as the css z-index and the color attribute is added in too 
	function positionWord(wordIndex) { 
		// xBar, yBar and pBar are the x and y displacements from the top left of the screen in %, of the projection of the words onto the 
		// screen. That is why we add 50 to each coordinate - as that starts us at the middle of the screen 
		var xBar = x[wordIndex] * distanceToScreen / z[wordIndex] + 50; 
		var yBar = y[wordIndex] * distanceToScreen / z[wordIndex] + 50; 
		var pBar = fontSizeXdistanceToScreen / z[wordIndex]; 
 
		// I can delete words if their xBar or yBar values are over the edge of the screen - this should speed things up quite a lot 
		// There are generally only about 13 of the 100 words visible at one time, so it would speed things up a lot (or far fewer with 
		// some parameter settings 
		// I delete at -10%/+100% for x to allow for big words, the edge of which might still be on screen, and at -5%/+100% for y 
		if (yBar > 100 || yBar < -5 || xBar > 100 || xBar < -10) { 
			deleteWord(wordIndex); 
			return; 
		} 
 
		// Now we set the absolute position of the word appropriately, adding the size information at the same time. 
		// Adding the z index makes sure that words obscures each other correctly. Very large z indices (e.g. -10000) work fine, 
		// at least on Firefox 
		var currentElement = flyingWords[wordIndex]; 
		currentElement.style.top =  yBar + "%"; 
		currentElement.style.left =  xBar + "%"; 
		currentElement.style.fontSize = pBar + "em"; 
		currentElement.style.zIndex = -z[wordIndex]; 
		currentElement.style.color = hsbToRgb(flyingWordsHues[wordIndex], 1 - (z[wordIndex] - distanceToScreen) / totalZDistance, 1);
	} 
 
	// This function returns a string of the form rgb(1, 2, 3)
	// Hue, Saturation and Brightness are all [0,1]
	function hsbToRgb(hue, saturation, brightness) {
	         var r = 0;
	         var g = 0;
	         var b = 0;
	
	         if (saturation == 0) {
				r = brightness * 255;
				g = r;
				b = r;
	         } else {
	            var h = (hue - Math.floor(hue)) * 6;
	            var f = h - Math.floor(h);
	            var p = brightness * (1 - saturation);
	            var q = brightness * (1 - saturation * f);
	            var t = brightness * (1 - (saturation * (1 - f)));
	
	             switch (Math.floor(h)) {
	
	             case 0:
	                 r = Math.floor(brightness * 255);
	                 g = Math.floor(t * 255);
	                 b = Math.floor(p * 255);
	                 break;
	
	             case 1:
	                 r = Math.floor(q * 255);
	                 g = Math.floor(brightness * 255);
	                 b = Math.floor(p * 255);
	                 break;
	
	             case 2:
	                 r = Math.floor(p * 255);
	                 g = Math.floor(brightness * 255);
	                 b = Math.floor(t * 255);
	                 break;
	
	             case 3:
	                 r = Math.floor(p * 255);
	                 g = Math.floor(q * 255);
	                 b = Math.floor(brightness * 255);
	                 break;
	
	             case 4:
	                 r = Math.floor(t * 255);
	                 g = Math.floor(p * 255);
	                 b = Math.floor(brightness * 255);
	                 break;
	
	             case 5:
	                 r = Math.floor(brightness * 255);
	                 g = Math.floor(p * 255);
	                 b = Math.floor(q * 255);
	                 break;
	
	             }
	
	         }
	
	         return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	} 
 
function deleteWord(wordIndex) {
	// All flying words are directly in the element body, not inside any other element
	document.body.removeChild(flyingWords[wordIndex]);
	// And record in the array that is has been deleted
	flyingWords[wordIndex] = null;
}
 
	// Creates the text for a random new color and returns it 
	function newColor() { 
		var red = Math.floor(Math.random() * 256); 
		var green = Math.floor(Math.random() * 256); 
		var blue = Math.floor(Math.random() * 256); 
 
		return "rgb(" + red + ", " + green + ", " + blue +")"; 
	} 
 
	// This function creates a new html element containing just a word, which has absolute positioning. 
	// It then calls positionWord to set its position in the window, and its size, according to its x, y 
	// and z coordinates. 
	// The x and y coordinates, as well as the word itself and its color are set randomly 
	function addNewWord(zIndex) { 
		var newWordIndex = findFirstEmptySlotInArrays(); 
 
		// Now choose the x and y positions of the word, and store them 
		// and the z index in the arrays 
		// This calculates the x and y positions so they will be anywhere in the visible area when they 
		// are right at the back of the arena. (That is their projections will be in the range +-50% 
		x[newWordIndex] = 50 * distanceToWordStartPointDdistanceToScreen * Math.random(); 
		y[newWordIndex] = 50 * distanceToWordStartPointDdistanceToScreen * Math.random(); 
		if (Math.random() < 0.5) { 
			x[newWordIndex] = -x[newWordIndex]; 
		} 
		if (Math.random() < 0.5) { 
			y[newWordIndex] = -y[newWordIndex]; 
		} 
 
		z[newWordIndex] = Math.floor(zIndex); 
 
		// Now create the html element containing the word, and store it in the array 
		// This function also adds it to theWordsElement 
		flyingWords[newWordIndex] = createNewWordHtmlElement(); 
 
 		// Now create the colour information for the word
 		flyingWordsHues[newWordIndex] = Math.random();
 
		// Now set its size and location in the window, as well as adding the color information 
		// This will also immediately delete the word if it is already out of sight 
		positionWord(newWordIndex); 
	} 
 
	// This is the usual function for adding a new word - we add at word at the back of the arena, 
	// plus a small random offset so words don't occur in lined up rows 
	function addNewWordAtBack() { 
		var newWordZ = distanceToWordStartPoint + distanceToMoveOnEachTimeStep * Math.random(); 
		addNewWord(newWordZ); 
	} 
 
	// This just creates an html element, which is always a img, with a random word, with a random 
	// color in it. 
	function createNewWordHtmlElement() { 
		var newElement = document.createElement("img"); 
		newElement.src = randomChoice(availableWords); 
		newElement.width = "40";
		newElement.height = "40";
		newElement.style.position = "fixed"; 
		newElement.style.whiteSpace = 'nowrap';
 
		// Now we actually add the element to theWordsElement span 
		document.body.appendChild(newElement); 
 
		// And we return it so it can be stored so we can access it again later 
		return newElement; 
	} 
 
	// This returns the index of the first empty slot in the arrays, which will sometimes 
	// be the index of the element after the last current element 
	function findFirstEmptySlotInArrays() { 
		for (var currentWordIndex in x) { 
			if (flyingWords[currentWordIndex] == null) { 
				return currentWordIndex; 
			} 
		} 
 
		// If we get all the way through the array without finding a gap, the first empty slot 
		// will be after the end of the arrays 
		return flyingWords.length; 
	} 
 
	// This moves all words forwards, deleting any that have passed the screen, and adding a new 
	// one at the back with probabilityOfANewWord probability. 
	function advanceOneTimeStep() { 
		for (var currentWordIndex in flyingWords) { 
			// If flying words is null, then there is currently no word in the position, so we 
			// skip it. 
			if (flyingWords[currentWordIndex]) { 
				// First we update the z coordinate of the word (deleting it if it's passed 
				// through the screen) 
				z[currentWordIndex] -= distanceToMoveOnEachTimeStep; 
 
				// If we've just moved the word past the screen then delete it 
				if (z[currentWordIndex] < distanceToScreen) { 
					deleteWord(currentWordIndex); 
				} else { 
					// Otherise we update the html element to reflect the words new position 
					positionWord(currentWordIndex); 
				} 
			} 
		} 
 
		// At each time step, there is a certain probability of adding a new word, will which start 
		// right at the back of the arena. 
		if (Math.random() < probabilityOfANewWord) { 
			addNewWordAtBack(); 
		} 
 
		// Here we set up a timer that will call this function again after a set delay, so that 
		// the words are moved at fairly regular intervals 
		timer = setTimeout("advanceOneTimeStep()", waitBetweenTimeSteps); 
	} 
 
	// Given an array, just return a randomly chosen element 
	function randomChoice(array) { 
		return array[Math.floor(Math.random() * array.length)]; 
	} 
 
	// In the initial setup, we don't add words at the back, we just add them anywhere between the 
	// back of the arena and the screen 
	function addNewWordInInitialSetup() { 
		var newWordZ = (distanceToWordStartPoint - distanceToScreen) * Math.random() + distanceToScreen; 
		addNewWord(newWordZ); 
	} 
 
// Finding the height of the window is actually quite hard, owing to IE doing it in different ways
// to all the other browsers - hence the need for a whole function to calculate it.
// 0 indicates that we didn't manage to find a height for the window
function calculateWindowHeight() {
  if(typeof( window.innerHeight ) == 'number') {
    // All non-IE browsers
	return window.innerHeight;
  } else if (document.documentElement && document.documentElement.clientHeight) {
    // IE 6+ in 'standards compliant mode'
    return document.documentElement.clientHeight;
  } else if( document.body && document.body.clientHeight ) {
    // IE 4 compatible
    return document.body.clientHeight;
  }
  
  return 0;
}

// Centres the front-page-title element vertically, in the centre of the window
function centerTitle() {
	var windowHeight = calculateWindowHeight();
	// If we can't find the window height, we just don't bother repositioning the title - it won't really
	// matter too much
	if (windowHeight != 0) {
		var titleElement = document.getElementById("front-page-title");
		// We only try and centre the title if we can find it - some pages might not have one to be centred
		if (titleElement) {
			var verticalMarginSize = Math.floor((windowHeight - titleElement.clientHeight) / 2) + "px";
			titleElement.style.marginTop = verticalMarginSize;
			titleElement.style.marginBottom = verticalMarginSize;
		}
	}
}

	var availableWords = ["https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/snapchat-512.png", "https://cdn1.iconfinder.com/data/icons/logotypes/32/square-facebook-512.png", "https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png"]; 

	// We keep a record of the timer, so it can be stopped by other scripts if necessary
	var timer;
 
	// This isn't really visible - it's just between the back of the arena and the screen - some could be out of sight off to the sides 
	var meanNumberOfWordsVisisbleAtOneTime = 70; 
	var distanceToWordStartPoint = 60000; 
	// This must be an integer 
	var distanceToMoveOnEachTimeStep = 400; 
	// This is in miliseconds 
	var waitBetweenTimeSteps = 35; 
	// This is z' 
	var distanceToScreen = 1200; 
	var totalZDistance = distanceToWordStartPoint + distanceToMoveOnEachTimeStep - distanceToScreen;
	// This is kind of p' and is in em's - it is the font size when the word is right at the screeen 
	var fontSize = 30; 
 
	// These are precalculated values to speed things up a bit 
	var fontSizeXdistanceToScreen = fontSize * distanceToScreen; 
	var distanceToWordStartPointDdistanceToScreen = distanceToWordStartPoint / distanceToScreen; 
 
	// So we have three arrays, one for x positions, one for y positions and one for z positions (distance in front) 
	// as well as a fourth, which indexes the html elements containing the words, and a fifth which specifies the colors of each element 
	// N.B. x and y can be negative, as they are offsets from the middle of the display 
	// If flyingWords is null, it signals that the array index doesn't correspond to an active word. 
	var x = []; 
	var y = []; 
	// N.B. z is always an integer 
	var z = []; 
 
	var flyingWords = []; 
	var flyingWordsHues = []; 
 
	// First we have to work out the probability of a word appearing at each time step 
	// This is the mean number of words visible at one time divided by the number of timesteps in the complete movement of a word from back to front 
	// N.B. This is only approximate, as we start words a little further back at a random position, so that they aren't lined up in rows 
	var probabilityOfANewWord = meanNumberOfWordsVisisbleAtOneTime / (distanceToWordStartPoint  /  distanceToMoveOnEachTimeStep); 
 
	// We also keep track of the flying words element so we do not have to keep searching for it again and again 
	var theWordsElement; 
 
		centerTitle();
 
		// Next we initialise the arrays 
 
		// Now we go through the number of time steps between the back and the front of the arena 
		for (var index = 1; index <= (distanceToWordStartPoint - distanceToScreen) / distanceToMoveOnEachTimeStep; ++index) { 
			if (Math.random() < probabilityOfANewWord) { 
				// Each word is positioned immediately it is made, and as a lot will start already off the screen they will 
				// be deleted immediately. 
				addNewWordInInitialSetup(); 
			} 
		} 
 
		// So, now were set up all the words in their initial position, we just start things moving - they will then continue 
		// as long as the page is open 
		advanceOneTimeStep(); 