# Color Wheel

This is a color wheel were the hue, saturation, and lightness of the colors used in the European Paitings Deparment at the MET are analyzed.
I first downloaded all the objects in the european department using "request" moduel in node and then used used colorthief to extract color and save it as another property of the objects. I used the colorthief server side version to do this.
Then I used d3 to draw my visual.
I initially drew them as rectangles ordered through time- but that did not convey to much information other than neutral colors were popular throughout the period (interesting takeawy but not enough).
Then I thought of ways to extract more information from the qualititave data I had (the dominant color in all the paintings).
After a few trial and errors, I found that creating a color wheel to show the hue, but also saturation and lightness conveyed the most information possible for this dataset.
The interactive parts included the tooltip to give more information on the painting, the artistic movement filters to give more information on movement and time, and the side "count" to keep track of how many circles there are to give an idea of the dataset you are looking at at any time since there is overlap.
I want to add a zoom feature in the future. I also want to try to make my "Anlaysis Takeaways" not really a text summary but show it in the visual.

Inspiration

http://www.geotests.net/couleurs/v2/#
