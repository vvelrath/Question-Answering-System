////////////////////////////////////////////////////////////
//    WikiFind is a program used for reading database dumps 
//    from MediaWiki, written by Mikael Nordin,  licensed under 
//    the GNU General Public License (GPL) version 3,  
//    or any later version.                                                                                          
//    Copyright Mikael Nordin 2008.                                                                                   
 
 
#include <iostream> //for cin and cout
#include <string>       //for strings
#include <fstream>  // for ifstream
#include <boost/regex.hpp> //for regex
 
using namespace std;
 
string keyword, line, filenamein, filenameout, title, problem, found, looking; //Global variables
string title2 = "qqqqqqxxxxwpppppzzzzzwwwwqqqq"; //title not likely to exist
int nooftitles = 0;
 
void Lang(); //Sub-routines
void Search();
 
int main() //main function
{
        Lang(); //select language
 
        Search();     //searching file
 
    return 0; 
 
}
 
void Lang() //Localization and input/query/output function
{
        string lang, q1, q2, q3; //variables
        int lang2 = 1;
 
        while (lang2 != 0) //selecting language
        {
                cout << "Välj språk / Please choose language:\n";
                cout << "1. Svenska (sv)\n";
                cout << "2. English (en)\n";
                cin >> lang;
 
                if (lang == "sv") //Swedish localization
                {
                        q1 = "Vilken fil vill du genomsöka: ",
                        q2 = "Var vill du spara resultatet: ",
                        q3 = "Vilket sökord vill du hitta: ",
                        problem = "Filen kunde inte öppnas\n",
                        found = " träffar gjordes\n",
                        looking = "Letar efter: ",
                        lang2 = 0;
                }
 
                else if (lang == "en")  //English localization
                {
                        q1 = "Which file do you want to search: ",
                        q2 = "Where do you want to store results: ",
                        q3 = "Which string do you want to seach for: ",
                        problem = "Could not open file\n",
                        found = " titles found\n",
                        looking = "Looking for: ",
                        lang2 = 0;
                }
 
                else  //incorrect lang choice
                {
                 cout << "Fel val / Wrong choice\n"; 
                }
        }
 
        cin.get();
        cout << q1; 
        getline(cin, filenamein);
 
        cout << q2;
        getline(cin, filenameout);
 
        cout << q3;      
        getline(cin, keyword);
}
 
void Search()  //searching database dump
{
        ifstream FileIn(filenamein.c_str()); //Open dump
 
        if (!FileIn) //if something goes wrong with file opening
		{
		   cout << problem;
		}
 
        ofstream FileOut(filenameout.c_str(), ios::app); //Open output file
 
        FileOut << "== " << keyword << " ==\n";  //headline to file
        cout << looking << keyword << endl; //what we are doing
 
        while (getline(FileIn, line)) //reading file  line by line
		{ //checking to see if it's a pagename
					if (line[0] == ' ' && line[1] == ' ' && line[2] == ' ' && line[3] == ' ' 
			&& line[4] == '<' && line[5] == 't' && line[6] == 'i' && line[7] == 't'
			&& line[8] == 'l' && line[9] == 'e' && line[10] == '>')
			{
					title = line; //saving any pagenames
	 
			}
	 
					boost::regex rexp(keyword);
					boost::smatch tokens;
	 
					if (boost::regex_search(line, tokens, rexp))  //if keyword is found
					{ 
							while (title2 != title) //checking to see if pagename is allready stored
					{
	 
									int langd = title.length() - 19; //removingt xml- taggs
									int i = 11;
	 
									//FileOut << "* [[";  //wikiformating
	 
									while (langd > 0) //printing pagename
									{

											if (title[i] != ' ')
												FileOut << title[i];
											else
												FileOut << '_'; 
											i = i + 1;
											langd = langd - 1;
	 
									}                                         
	 
									//FileOut << "]]\n"; //wikiformating
	 								FileOut << "\n";
									nooftitles = nooftitles +1; //counting articles
	 
									title2 = title; //saving new title
	 
									langd = title.length() - 19; //removingt xml- taggs again
									i = 11;
	 
									//cout << "* [[";  //wikiformating
	 
									while (langd > 0) //printing pagename on screen
									{
											cout << title[i]; 
											i = i + 1;
											langd = langd - 1;
	 
									}
	 
									//cout << "]]\n"; //wikiformating     
							}               cout << "\n"; 
				} 
    	}
 
    //FileOut << endl << nooftitles << found << endl;  //printing number of articles to file
 
    cout << endl << nooftitles << found;  //printing number of articles to screen
}
