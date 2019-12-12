# Major_Studio Projects

### Islamic Art Collection Through Time

Topic:
The acquisition of islmaic art through time divided by country. Since the Islamic empire had spanned a vast area of the world, tkaing over very distinct and different cultures, I was curious to see which were the most artistic cultures of this empire. I was also curious to see any spikes in the timeline that can be attributed to historical events.

Hypothesis:
That the aquisition was affected by historical events and that most of the art pieces will be coming from the great islamic empires, specifically Iran and Eygpt.

Process and Tools:
I used the MET csv for this project, summerized the data into a smaller excell sheet and loaded that into d3 to create a line graph. See here for detailed process. LINK

Final and Reflections:
![final_image](https://github.com/nourzein/Major-Studio1/blob/master/Quant_Assignment_Code/final_quant_project.png)
There are spikes in the timeline, but there were connected more to the MET finances than historical events in the areas themselves. The top 5 countries in decending order are: Iran, Eygpt, India, Turkey, and Syria.
For my inexperienced-3 weeks into the program-self, this looked like a great final piece. I had a big learning curve to overcome to use d3 to create the line graph and I almost did not make it work.
If doing this differently I would a) not use d3 ro create a static line graph- not worth the effort, excel would have done finel, b) used illustrator and/or html to further design the piece, and c) maybe not even done a line graph and visualized the data in some other form (ex: interactive time line).

### Rich History of Color in Europe

Topic:
Europe went through an artistic boom starting in the 1200s, after the Dark Ages, and the styles of the different artistic movements have been studied greatly.
However, the use of color during this time and across these different artistic movements has not been looked at.

Hypothesis:
I am curious to see whether color use evolved with the styles, and whether this is a consequence of taste or technology.

Process and Tools:
I used the MET API this time not the csv because I wanted image Urls. I used node.js to download the images. I used colorthief to extract the dominant color of the paintings, and I used d3 for the visualization.

Final and Reflections:
Initial Rendition:
![initial_one]https://github.com/nourzein/Major-Studio1/blob/master/Qualitative_Assignment_Code/final_qualy.png
My goal was to create a painting of paintings while showing the evolution of color through time.
This visual was hard to read, and did not do a good job of conveying the rich information that I extracted from the paintings. All you can conclude is that across time, neutral tones remained popular.

Final Visualization: ADD LINK TO VIDEO
I did not only show hue, but lightness and saturation as well that also differed with the different movements.
The movements are separated interactively in this piece so you can explore them in greatly detail.
And the final takeaways are presented.

One Step Further: Accessibility and Responsiveness ADD LINK TO VIDEO
I wanted this piece to be accessible on any device and it was not in this form since it relies on the full width of a desktop. So for my final chapter I focused on designing for mobile since it is the hardest dimensions to design for.
For this, I used the scroll feature of mobile and turned the piece from an interactive exploratory visual to a more controlled storytelling experience where I take the viewer through the different movements one by one, with the takeaways and the examples shown together.
