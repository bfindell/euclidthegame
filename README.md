Euclid The Game
===============

The goal of this project is to gamify geometric challanges. We use the [GeoGebra](http://www.geogebra.org) software for this. This game is MIT licensed; see the LICENSE file.

### Message January 2023 (from Brad Findell)
Kasper Peulen's brilliant game has been borrowed and rehosted at https://euclid.findell.org.  We have squashed bugs, improved the GeoGebra functionality of the apps, made some edits, and added new levels.

Notes: 
* Peulen's source code requires Jekyll, a simple, blog-aware, static site generator.  See https://jekyllrb.com/docs/installation/.
* After Jekyll is installed, from the main directory the command `jekyll build` will build the site in the subdirectory `_site`.
* The command `jekyll serve` will serve the site locally for debugging.  
* The key idea behind this site is javascript code that tests whether GeoGebra objects ave been drawn.  For the current version, see the file `_includes/testobjects.js`.
* At one point, there were plans for an iOS game.  See https://www.facebook.com/euclidthegame.

### Message July 2014 (from Kasper Peulen)
A year ago I posted the idea for this game at stackexchange:
http://math.stackexchange.com/questions/373672/about-euclids-elements-and-modern-video-games

I hoped that I could inspire game developers to make such a game. Well, I failed! But I did inspire myself to learn a little bit about html/javascript and geogebra, and in this way, I was able to make this game.

If you have worked with geogebra, it may be not so hard to contribute to new levels. I've written a couple of functions that make it easy to test if objects/lines/circles are drawn.
