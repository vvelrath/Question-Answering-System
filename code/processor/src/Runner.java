import java.util.concurrent.ConcurrentLinkedQueue;

/**
 * This class is the runner that runs the parser and and the XMLGenerator
 * @author aravindhan
 *
 */
public class Runner
{
	public static void main(String[] args) 
	{
		
		//this code will run our parser
		//the wikipedia documents in the corpus will be processed , parsed
		//and a collection of wikipediainfoboxes which is of type WikipediaInfobox will be created
		Parser parser=new Parser();
		String filename="/home/aravindhan/workspace/IR3/data/tdkr.xml";
		ConcurrentLinkedQueue<WikipediaInfobox> documents=new ConcurrentLinkedQueue<WikipediaInfobox>();
		parser.parse(filename, documents);
		//now we have our collection of wikiinfoboxes ready
		//the next step is we need to generate the XML document from the wikipedia infobox contents we have
		XMLFileGenerator xmlGenerator=new XMLFileGenerator();
		xmlGenerator.generateXML(documents);
		//once the XML document is generated now we need to export it as a XML file
		xmlGenerator.writeToXML("/home/aravindhan/workspace/IR3/data/tdkroutput.xml");
	}

}
