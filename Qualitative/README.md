# Qualitative Assignment

Topic:
Exploring the MET's European Art collection's color evolution through time.

###Prototype Phase
This is the idea I want to do:
![linear timeline](https://github.com/nourzein/Major-Studio1/blob/master/Qualitative/timeline_qualitative.png)
I want it to look like a painting of paintings. I think it could be a beautiful piece.

###Execution Phase

I used the MET API to get a JSON of all the European Paintings department pieces, asking for the image url, nationality, country, date, and title of each piece. (fetch.js file)
I used request in node.js to download all the pieces using the image urls. Made sure to download the small size images. (download.js file)
I used colortheif to extract the most prominant color from each painting. (colorAnalysis.js)
I used d3.js to create rectangles for each color. (sketch.js)

Final Imgae:
![final](https://github.com/nourzein/Major-Studio1/blob/master/Qualitative/final_qualy.png)

The image looks pretty but it is information rich and sadly does not seem to convey that.
