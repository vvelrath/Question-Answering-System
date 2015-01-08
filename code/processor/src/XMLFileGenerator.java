import java.io.File;
import java.util.Collection;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;


/**
 * This class is responsible for generating XML document from the collection of wikipedia infoboxes
 * and write the XML Document as a XML file
 * @author aravindhan
 *
 */
public class XMLFileGenerator 
{
Document doc;//the XML Document to be generated

public XMLFileGenerator()
{
	try 
	{
	DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
	DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
	doc = docBuilder.newDocument();//the XML Document
	}
	catch (ParserConfigurationException e) 
	{
		e.printStackTrace();
	}
}


//this method generates the XML Document from the input collection of wikipedia infoboxes
public void generateXML(Collection<WikipediaInfobox> collection)
{
	try
	{
	Element add=doc.createElement("add");//create the top level add element
	doc.appendChild(add);//append it to the doc
	for(WikipediaInfobox infobox:collection)//for every infobox
	{
		boolean nameFlag=false;
		String category=infobox.getCategory().substring(0,3);//get the category of the infobox
		Element document=doc.createElement("doc");//create a new doc element for every infobox
		add.appendChild(document);
		Map<String,String> fields=infobox.getFields();//get all the fields present in the infobox
		for(String field:fields.keySet())//for every field in the infobox
		{
			//reason for handling name field differently is...
			//there can be multiple values for the name field and also
			//there can be multiple person with the same name
			if(field.equals("name"))//if the field is a name field discard the parsed data
			{
				Element fieldElement=doc.createElement("field");//create a field element
				Attr attribute=doc.createAttribute("name");//create a name attribute for the field name
				fieldElement.setAttribute("name",category+"_"+field);//set the name attribute with the field name
				fieldElement.setTextContent(infobox.getTitle().trim());//set the text content of the field with the field's value
				document.appendChild(fieldElement);//append the field element to the doc element
				nameFlag=true;
			}
			else
			{
			String value=fields.get(field);//get the field's value
			value=value.replaceAll("(?m)\\n",",");
			Element fieldElement=doc.createElement("field");//create a field element
			Attr attribute=doc.createAttribute("name");//create a name attribute for the field name;
			fieldElement.setAttribute("name",category+"_"+field);//set the name attribute with the field name
			fieldElement.setTextContent(value);//set the text content of the field with the field's value
			document.appendChild(fieldElement);//append the field element to the doc element
			}
		}
		if(!nameFlag)
		{
			Element fieldElement=doc.createElement("field");//create a field element
			Attr attribute=doc.createAttribute("name");//create a name attribute for the field name
			fieldElement.setAttribute("name",category+"_"+"name");//set the name attribute with the field name
			fieldElement.setTextContent(infobox.getTitle().trim());//set the text content of the field with the field's value
			document.appendChild(fieldElement);//append the field element to the doc element
		}
	}
}
	catch(Exception e)
	{
	e.printStackTrace();
	}
}

//this method exports the XML document as a XML file
public void writeToXML(String path)
{
	try
	{
	TransformerFactory transformerFactory = TransformerFactory.newInstance();
	Transformer transformer = transformerFactory.newTransformer();
	transformer.setOutputProperty(OutputKeys.INDENT, "yes");
	DOMSource source = new DOMSource(doc);
	StreamResult result = new StreamResult(new File(path));
	transformer.transform(source, result);
	System.out.println("XML FILE CREATED!!");
	}
	catch(Exception e)
	{
		e.printStackTrace();
	}
}
	

public static void Main(String[] args)
{
}
}
