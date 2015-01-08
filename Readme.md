Question Answering System
==================

The system has been deployed online using Amazon EC2 for the SOLR (Running on JETTY) and Heroku for the Web Application(UI).

http://qasysapp.herkuapp.com

There are 3 steps to deploy the system(on a local machine) and see it work.

Parsing the Wikipedia Dump: (files can be found in code/processor)
=============	
	The parsing involves extraction/selection of dump(Part-1) and then the actual conversion of the dump to SOLR indexable format(Part-2).

	Part-1

	a. Download Wikipedia Dump(s) from http://dumps.wikimedia.org/enwiki/latest/ (Starts like enwiki-latest-pages-articles*.xml-  		   *.bz2)
	b. Make use of the program wikifind.cpp to identify titles of documents having people, organization, film infoboxes.
	
	c. Use Wikipedia special export ( http://en.wikipedia.org/wiki/Special:Export ) paste the titles obtained from the above step 		   to download the dump.

	(or)
	
	a. Directly make use of Wikipedia's special export to get XML dumps of necessary articles by directly entring the titles.

	Part-2

	a. Import the Parser code (in src) in eclipse IDE.
	b. Open the Runner.java file and change the input xml dump path and the SOLR formatted XML path accordingly.
	c. Run the code to get the SOLR formatted XML ready to be indexed in SOLR.


Indexing using SOLR (files can be found in code/solr)
=============
	Can be done with the prepackaged Jetty or custom Tomcat.
	
	I. Using Jetty Server: (comes packaged with SOLR http://www.apache.org/dyn/closer.cgi/lucene/solr/4.6.0)
	
	a. Copy the files schema.xml and solrconfig.xml into the conf directory of the collection. (In default SOLR setup cd into 
	   /example/solr/collection1/conf) 
	
	b. Start the Jetty server packaged with SOLR using ( found in /example/start.jar)
		java -jar start.jar
	
	c. Take the parsed dump(s) from the above step and make use of post.jar provided by Jetty server to post it into the index.(In 		   default SOLR setup it can be found in into /example/exampledocs/post.jar) 
		
	   eg. java -Durl=http://<host>:<port>/solr/<collection name>/update -jar post.jar <file1.xml> <file2.xml> ...
		
	   specific example: java -Durl=http://localhost:8983/solr/sampleinfo/update -jar post.jar final1.xml final2.xml
	

	(or)

	c. Using the SOLR web interface the documents can be indexed. Visit the SOLR web interface at http://localhost:8983/solr. Then 		   choose the core. Choose the Documents option. Then in the right pane choose file upload in the Document type. And choose 		   the file(s) press submit document.

	II. Using Tomcat Server: (download from http://apache.mirrors.tds.net/tomcat/tomcat-7/v7.0.47/bin/apache-tomcat-7.0.47.tar.gz)
	
	a. Deploy SOLR inside tomcat by extracting the .war and placing it inside the weapps folder in tomcat.
	b. Change the web-xml to include
		<env-entry>
	       	<env-entry-name>solr/home</env-entry-name>
       		<env-entry-value>/<user-path>/solr_home/solr</env-entry-value>
	        <env-entry-type>java.lang.String</env-entry-type>
	        </env-entry>
	c. Create a directory solr_home/solr in the <user-path>
	d. Inside solr copy dist,contrib persent in / of the default SOLR package.
	e. Place the collection1 folder inside /example/solr/
	f. Replace the schema.xml and solrconfig.xml inside collection1/conf with the provided ones.
	g. Start the tomcat server by startup.sh in /bin of tomcat.
	h. Follow steps as above method to index the files. (Step c)

Deploying User Interface (files can be found in code/ui)
=============
	a. Copy the folder QA into the webapps folder of tomcat. (http://apache.mirrors.tds.net/tomcat/tomcat-7/v7.0.47/bin/apache- 		   tomcat-7.0.47.tar.gz)
	b. Start the tomcat server by startup.sh in /bin of tomcat. (In case it is not already started)
	
Access the Web Application at http://localhost:8080/QA



Demo system:
core name: sampleinfo
files indexed: 10000+
SOLR: on tomcat (local system) / on Jetty (hosted)
Web App: on tomcat (local system) / on Heroku (hosted)
wikifind.cpp to search for relevant dump
Parser written in JAVA to parse the dump into SOLR input XML.
AjaxSolr was made use of in combination with simple AJAX requests to retrive and display information.
Some APIs used in the front-end include jQuery(functionality), Bootstrap(layout/responsiveness), D3(data visualization), facebook API(share), crypto(image retrieval)
