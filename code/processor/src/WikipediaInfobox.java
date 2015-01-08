import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * This class represents the data structure of a wikipediaInfobox
 * @author aravindhan
 *
 */
public class WikipediaInfobox 
{
Map<String,String> infoBoxContents;//this contains the field and values as key-value pairs
private Date publishDate;//This is the timestamp 
private String author;//Contributor: username or ip
private int id;//Page id, not revision nor parent id
private String title;//title
private String category;//which category it is person or organization or films
private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");

/**
 * Default constructor.
 * @param idFromXml: The parsed id from the xml
 * @param timestampFromXml: The parsed timestamp from the xml
 * @param authorFromXml: The parsed author from the xml
 * @param ttl: The title of the page
 * @throws ParseException If the timestamp isn't in the expected format
 */
public WikipediaInfobox(int idFromXml, String timestampFromXml, String authorFromXml, String ttl) throws ParseException 
{
	this.id = idFromXml;
	this.publishDate = (timestampFromXml == null) ? null : sdf.parse(timestampFromXml);
	this.author = (authorFromXml == null) ? null : authorFromXml;
	this.title = (ttl == null) ? null : ttl;
	infoBoxContents=new HashMap<String, String>();
}


//this method is used to add a field and its value to the infobox Contents data structure
public void addField(String field,String value)
{
	infoBoxContents.put(field, value);
}


//this method is used to set the category of the infobox
public void setCategory(String category)
{
	this.category=category;
}


/**
 * @return the title
 */
public String getTitle() {
	return title;
}

/**
 * @return the publishDate
 */
public Date getPublishDate() {
	return publishDate;
}

/**
 * @return the author
 */
public String getAuthor() {
	return author;
}

/**
 * @return the id
 */
public int getId() {
	return id;
}

/**
 * @return the category
 */
public String getCategory() {
	return category;
}


/**
 * @return the map of field and values
 */
public Map<String,String> getFields() {
	return infoBoxContents;
}
}
