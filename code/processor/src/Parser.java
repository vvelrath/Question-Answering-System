import java.text.DateFormatSymbols;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Stack;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

//we are importing the sax parser packages
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.helpers.*;
import org.xml.sax.Attributes;


/**
 * @author aravindhan
 * This class is responsible for parsing a given input corpus into a collection of wikipedia Infoboxes
 */
public class Parser
{	
//we are implementing the parser code here where i break the dump xml into wikipedia document instances	
public void parse(String filename,Collection<WikipediaInfobox> docs) 
{
	SAXParserFactory parserFactory= SAXParserFactory.newInstance();//create sax parser factory
	ExecutorService exec=Executors.newFixedThreadPool(2);
	List<Callable<WikipediaInfobox>> callables =new ArrayList<Callable<WikipediaInfobox>>();
	MyHandler myHandler=new MyHandler(callables);
	try
	{
	SAXParser parser=parserFactory.newSAXParser();//create a parser using that factory
	parser.parse(filename,myHandler);//parse the file and handle the events
	
	try 
    {
    List<Future<WikipediaInfobox>> myWikidocs=exec.invokeAll(callables);
    for(Future<WikipediaInfobox> myWikidoc: myWikidocs) 
    {
    	WikipediaInfobox doc=myWikidoc.get();
    	if(doc!=null)
    	add(doc,docs);
    }
    } 
    catch (InterruptedException ex) 
    {
        ex.printStackTrace();
    } 
    catch (ExecutionException e) 
    {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} 
    finally 
    {
        exec.shutdownNow();
    }
	System.out.println("PARSING SUCCESSFUL!!");
	}
	catch (Exception e) 
	{
		System.out.println("Parse Method:"+e.getMessage());
	}
	}
	
	class MyHandler extends DefaultHandler
	{
		Collection<WikipediaInfobox> wikiDocs=null;
		List<Callable<WikipediaInfobox>> callables;
		String contents=null;
		String timestamp=null,author=null,title=null;
		StringBuffer wmlContents=new StringBuffer();
		int id=0;
		int pageCount=0;
		Stack<String> myXMLElementsStack=new Stack<String>();//this tag maintains the tags i encounter in xml
		
		MyHandler(List<Callable<WikipediaInfobox>> callables)
		{
			this.callables=callables;
		}

		//this method is called whenever a start element is encountered
		@Override
		public void startElement(String namespaceURI,String localName,String qName, Attributes atts)
		{
			myXMLElementsStack.push(qName);//whenever an element is encountered push it into stack
			if(qName=="text")//if the start element is a text element..then we have approached our wml contents
				wmlContents=new StringBuffer();
			
		}
		
		//this method is called whenever an end element is encountered
		@Override
		public void endElement(String namespaceURI,String localName,String qName)
		{
		myXMLElementsStack.pop();//whenever end element is encountered pop it from the stack
	    
		if(qName=="timestamp" && myXMLElementsStack.peek()=="revision")
			timestamp=contents;
		else if(qName=="title" && myXMLElementsStack.peek()=="page")
			title=contents;
		else if((qName=="username" || qName=="ip") && myXMLElementsStack.peek()=="contributor")
			author=contents;
		else if(qName=="id" && myXMLElementsStack.peek()=="page")
			id=Integer.parseInt(contents);
		//if we encounter the end page element then we have read through one wiki page
		//so we can create one wikipedia document object and add it to the collection
		else if(qName=="page")
		{
			class MyCallable implements Callable<WikipediaInfobox> 
			{
	            private final int threadnumber;
	            WikipediaInfobox doc;
	            StringBuffer wmlContents;

	            MyCallable(int threadnumber,int id,String timestamp,String author,String title,StringBuffer wmlContents)
	            {
	                this.threadnumber = threadnumber;
	                try 
	                {
						doc = new WikipediaInfobox(id, timestamp, author, title);
						this.wmlContents=wmlContents;
					} 
	                catch (ParseException e) 
	                {
						e.printStackTrace();
					}
	            }

	            public WikipediaInfobox call() 
	            {	   
				try {
					//first we will extract the infobox out from the wml contents
					String infoBox=WikipediaParser.extractInfoBox(wmlContents.toString());
					if(infoBox==null)
						return null;
					else
					{
					//we will first remove and parse the html tags
					String afterTagFormatting=WikipediaParser.parseTagFormatting(infoBox);
					//parse the list items
					String afterListItemParsing=WikipediaParser.parseListItem(afterTagFormatting);
					//we will remove the text formatting
					String afterTextFormatting=WikipediaParser.parseTextFormatting(afterListItemParsing);
					//then parse the links
					StringBuffer afterLinkParsing=parseLinks(afterTextFormatting,"(\\[\\[?.*?\\]?\\])");
					//then parse the birth date
					StringBuffer afterBirthdateParsing=parseDate(afterLinkParsing,"(\\{\\{(B|b)irth date( and age)?(\\|(d|m)f=y(es)?)?\\|(\\d{4}\\|\\d{1,2}\\|\\d{1,2})(\\|(d|m)f=y(es)?)?.*?\\}\\})",7);
					//then parse the Death date
					StringBuffer afterDeathdateParsing=parseDate(afterBirthdateParsing,"((D|d)eath date( and age)?(\\|(d|m)f=y(es)?)?\\|(\\d{4}\\|\\d{1,2}\\|\\d{1,2})\\|\\d{4}\\|\\d{1,2}\\|\\d{1,2}(\\|(d|m)f=y(es)?)?.*?\\}\\})",7);	
					//then parse the Film date
					StringBuffer afterFilmdateParsing=parseDate(afterDeathdateParsing,"(\\{\\{(F|f)ilm date(\\|(d|m)f=y(es)?)?\\|(\\d{4}\\|\\d{1,2}\\|\\d{1,2}).*?\\}\\})",6);
					//then parse the linkedText templates
					StringBuffer afterLinkedTextParsing=parseLinkedText(afterFilmdateParsing,"(\\{\\{linktext\\|(.*?)\\}\\})",2);
					//then parse the language templates
					//lang templaes of form lang-ru and lang|ru
					StringBuffer afterLangTempParsing=parseLangTemplate(afterLinkedTextParsing,"(\\{\\{lang(-|\\|)[a-z]{1,3}\\|(.*?)\\}\\})",1);
					//remove citation needed templates completely
					String afterCitationNeededParsing=afterLangTempParsing.toString().replaceAll("\\{\\{citation needed\\|.*?\\}\\}","");
					//then parse the templates
					String afterTemplateParsing=parseTemplates(afterCitationNeededParsing,"((?s)\\{\\{(?!Infobox).*?\\|(.*?)\\}\\})");
					//after parsing everything out remove the template markups {{ and }}
					String afterFinalParsing=afterTemplateParsing.replaceAll("(\\{\\{)|(\\}\\})","");
					
					
					String[] fields=afterFinalParsing.split("\\|");//split using |
					//the 1st field is not a field..it gives us the type of infobox
					String infoBoxType=fields[0].replaceAll("Infobox","").trim();
					doc.setCategory(infoBoxType);
					//extract the data from the remaining fields
					for(int i=1;i<fields.length;i++)
					{
						String field=fields[i].trim();
						if(!field.equals(""))//neglecting empty fields(empty lines or spaces)
						{
						String[] values=field.split("=");
						//only if it is a valid field(ie it has a field name and a non empty value)
						//we should remove the imagesizefield --it is not necessary
						if(values.length==2 && !values[0].trim().equals("imagesize"))
						{
							doc.addField(values[0].trim(), values[1].trim());
						}
						}
					}
					return doc;
					}
				} 
				catch (Exception e) 
				{
					e.printStackTrace();
					return null;
				}
	            }
	          }
			
			
			pageCount++;
            callables.add(new MyCallable(pageCount,id,timestamp,author,title, wmlContents));//whenever i encounter an end page element i add a new callable for parsing that page 
		}
		}
		
		//this method is called for the characters between the start element and end element
		@Override
		public void characters(char[] ch,int start,int length)
		{	
			contents=new String(ch,start,length);//collect the characters in a string
			//if the last encountered element is text..then the characters are wmlcontents
			if(myXMLElementsStack.peek()=="text")
			{
				wmlContents.append(contents);
			}
		}
		
		
		public StringBuffer parseLinks(String afterTagFormatting,String regexp)
		{
		StringBuffer afterLinkParsing=new StringBuffer();
        Pattern regex = Pattern.compile(regexp);
		Matcher regexMatcher = regex.matcher(afterTagFormatting);
		String matchedLink;
		while(regexMatcher.find())
		   {
			matchedLink=regexMatcher.group(1);
			String[] parsedLinks=WikipediaParser.parseLinks(matchedLink);
			regexMatcher.appendReplacement(afterLinkParsing,parsedLinks[0].replace("$","\\$"));//$ is a special character when we try to use append replacement
		   }
		regexMatcher.appendTail(afterLinkParsing);
		return afterLinkParsing;
		}
		
		
		public StringBuffer parseLinkedText(StringBuffer afterFormatting,String regexp,int groupNo)
		{
		StringBuffer afterLinkedTextParsing=new StringBuffer();
        Pattern regex = Pattern.compile(regexp);
		Matcher regexMatcher = regex.matcher(afterFormatting);
		String matchedLink;
		while(regexMatcher.find())
		   {
			matchedLink=regexMatcher.group(groupNo).replaceAll("\\|","");
			regexMatcher.appendReplacement(afterLinkedTextParsing,matchedLink);
		   }
		regexMatcher.appendTail(afterLinkedTextParsing);
		return afterLinkedTextParsing;
		}
		
		
		
		public StringBuffer parseLangTemplate(StringBuffer afterFormatting,String regexp,int groupNo)
		{
		StringBuffer afterLangTempParsing=new StringBuffer();
        Pattern regex = Pattern.compile(regexp);
		Matcher regexMatcher = regex.matcher(afterFormatting);
		String matchedLink;
		while(regexMatcher.find())
		   {
			matchedLink=regexMatcher.group(groupNo).replaceAll("lang\\|","lang-");//replace ex: lang|ar as lang-ar
			String[] langtemps=matchedLink.split(",");
			StringBuffer parsedLink=new StringBuffer();
			for(int i=0;i<langtemps.length;i++)
			{
				String[] parts=langtemps[i].split("\\|");
				parsedLink.append(parts[1]);
				if(i!=langtemps.length-1)
					parsedLink.append(",");
			}
			regexMatcher.appendReplacement(afterLangTempParsing,parsedLink.toString());
		   }
		regexMatcher.appendTail(afterLangTempParsing);
		return afterLangTempParsing;
		}
		
		
		
		
		public StringBuffer parseDate(StringBuffer afterLinkParsing,String regexp,int groupNo)
		{
			StringBuffer afterDateParsing=new StringBuffer();
			Pattern regex1 = Pattern.compile(regexp);
			Matcher regexMatcher1 = regex1.matcher(afterLinkParsing);
			while(regexMatcher1.find())
			   {
				String matchedText=regexMatcher1.group(groupNo);//group No is the digits comprising date
				String[] dates=matchedText.split("\\|");
				if(dates[2].equals("00") || dates[2].equals("0"))//if date is not specified
					dates[2]="";//discard it
				if(dates[1].equals("00") || dates[1].equals("0"))//if month is not specified discard it
					regexMatcher1.appendReplacement(afterDateParsing,dates[2]+" "+dates[0]);
				else
				{
					try
					{
					int month=Integer.parseInt(dates[1]);
					if(month>12)
						{
						month=month%12;
						}
					regexMatcher1.appendReplacement(afterDateParsing,dates[2]+" "+new DateFormatSymbols().getMonths()[month-1]+" "+dates[0]);
					}
					catch(Exception e)
					{
						e.printStackTrace();
					}
				}
			   }
			regexMatcher1.appendTail(afterDateParsing);
			return afterDateParsing;
		}
		
		
		public String parseTemplates(String afterFormatting,String regexp)
		{
			String matchedTemplate="";
			String replaceText="";
			StringBuffer afterTemplateParsing=new StringBuffer();
	        Pattern regex = Pattern.compile(regexp);
			Matcher regexMatcher = regex.matcher(afterFormatting);
	
			while(regexMatcher.find())
			   {
				matchedTemplate=regexMatcher.group(2);
				String[] values=matchedTemplate.split("\\|");
				if(values.length==1)
				{
					replaceText=matchedTemplate;
				}
				else if(matchedTemplate.matches("(\\d{4}\\|\\d{1,2}\\|\\d{1,2})"))//then this template data is a date..so parse date
				{
					if(values[2].equals("00") || values[2].equals("0"))//if date is not specified
						values[2]="";//discard it
					if(values[1].equals("00") || values[1].equals("0"))//if month is not specified discard it
						replaceText=values[2]+" "+values[0];
					else
					replaceText=values[2]+" "+new DateFormatSymbols().getMonths()[Integer.parseInt(values[1])-1]+" "+values[0];
				}
				else if(values[0].matches("(\\d|-)?(\\d|,\\d{3})*.?\\d*") && values[1].matches("c|m|l"))
				{
					replaceText=values[0]+" "+values[1].replace("c","crores INR").replace("l","lakhs INR").replace("m", "million INR").replace("b", "billion INR");
				}
				else//else just replace it with text after '|' symbol
				{
					replaceText=matchedTemplate.replaceAll("\\|",",");
				}
				regexMatcher.appendReplacement(afterTemplateParsing,replaceText.replace("$"," USD ").trim());
			   }
			regexMatcher.appendTail(afterTemplateParsing);
			return afterTemplateParsing.toString();
		}
		
		}
	
	
	/**
	 * Method to add the given document to the collection.
	 * PLEASE USE THIS METHOD TO POPULATE THE COLLECTION AS YOU PARSE DOCUMENTS
	 * For better performance, add the document to the collection only after
	 * you have completely populated it, i.e., parsing is complete for that document.
	 * @param doc: The WikipediaDocument to be added
	 * @param documents: The collection of WikipediaDocuments to be added to
	 */
	private synchronized void add(WikipediaInfobox doc, Collection<WikipediaInfobox> documents) {
		documents.add(doc);
	}
	
	
}











