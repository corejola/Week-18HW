# All the News That's Fit to Scrape

### Notes:
* 7/27/19: was able to scrape [Thrasher Magazine](http://www.thrashermagazine.com) and retrieve the title & link. Link required extra hard coding but was able to work and be displayed w/ handlebars. 

### Next Steps:
1. Define the CRUD operations in the controller for the *Notes* collection.
2. Set up routing for notes. Use `db.Notes.create`, `req.body` & utilize `.populate` to make a mongo association between the note & the targeted article.
3. set up a modal to display a text box for `req.body`
4. incorporate a *delete* button in the modal & associated routing to delete a comment
5. update the Article Model for a new column called *saved_Articles* (T/F) in order to isolate the list to only display saved articles.

### Node Packages
1. express
2. express-handlebars
3. mongoose
4. cheerio
5. axios