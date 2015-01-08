/**
 * Created by deepak on 3/11/13.
 */
var whenArray=new Array();
var whatArray=new Array();
var whoArray=new Array();
var whereArray=new Array();
var whichArray=new Array();

window.addinfo1=new Array;
window.addinfo2=new Array;

window.ques=new Array;

window.currentIndex;

whatArray[0]='is the birthname of;per_birth_name;per_birth_date;per_other_names';
whatArray[1]='is the birth place of;per_birth_place;per_death_place;per_nationality';
whatArray[2]='is the death date of;per_death_date;per_birth_date;per_death_place';
whatArray[3]='is the death place of;per_death_place;per_death_date;per_birth_date';
whatArray[4]='is the nationality of;per_nationality;per_birth_date;per_religion';
whatArray[5]='are the other names of;per_other_names;per_birth_name;per_occupation';
whatArray[6]='is the occupation of;per_occupation;per_title;per_organization';
whatArray[7]='is the designation of;per_title;per_occupation;per_awards';
whatArray[8]='are the notable works of;per_notable_works;per_awards;per_organization';
whatArray[9]='is the religion of;per_religion;per_nationality;per_birth_date';
whatArray[10]='are the awards received by;per_awards;per_notable_works;per_organization';
whatArray[11]='is the birth date of;per_birth_date;per_birth_name;per_birth_place;';


whatArray[12]='is the movie based on;fil_based_on;fil_narrator;fil_runtime';
whatArray[13]='is the language of;fil_language;fil_country;fil_writer';
whatArray[14]='is the budget of;fil_budget;fil_gross;fil_released';
whatArray[15]='is the gross of;fil_gross;fil_budget;fil_released';
whatArray[16]='is the runtime of;fil_runtime;fil_language;fil_director';


whatArray[17]='is the abbreviation of;org_abbreviation;org_purpose;org_motto';
whatArray[18]='is the motto of;org_motto;org_founder;org_purpose';
whatArray[19]='is the type of;org_type;org_location;org_purpose';
whatArray[20]='is the purpose of;org_purpose;org_formation;org_type';
whatArray[21]='is the professional title of;org_professional_title;org_motto;org_headquarters';
whatArray[22]='are the coordinates of;org_coords;org_headquarters;org_location';
whatArray[23]='is the former name of;org_former_name;org_formation;org_founder';




whenArray[0]='is the birth date of;per_birth_date;per_death_date;per_birth_place';
whenArray[1]='is the death date of;per_death_date;per_birth_date;per_birth_place';

whenArray[2]='is/was the release date of;fil_released;fil_runtime;fil_gross';

whenArray[3]='was the founding date of;org_formation;org_founder;org_headquarters';


whoArray[0]='is the spouse of;per_spouse;per_parents;per_children';
whoArray[1]='are the parents of;per_parents;per_children;per_spouse';

whoArray[2]='is the director of;fil_director;fil_producer;fil_starring';
whoArray[3]='is the producer of;fil_producer;fil_writer;fil_screenplay';
whoArray[4]='is the writer of;fil_writer;fil_music;fil_editing';
whoArray[5]='is the screenplay writer of;fil_screenplay;fil_cinematography;fil_director';
whoArray[6]='is the narrator of;fil_narrator;fil_based_on;fil_writer';
whoArray[7]='are the cast of;fil_starring;fil_director;fil_screenplay';
whoArray[8]='is the music director of;fil_music;fil_distributor;fil_director';
whoArray[9]='is the cinematographer of;fil_cinematography;fil_runtime;fil_editing';
whoArray[10]='is the distributor of;fil_distributor;fil_budget;fil_gross';
whoArray[11]='is the cinematographer of;fil_cinematography;fil_editing;fil_director';
whoArray[12]='is the editor of;fil_editor;fil_writer;fil_runtime';

whoArray[13]='is the leader of;org_leader_name;org_purpose;org_motto';
whoArray[14]='is the founder of;org_founder;org_formation;org_headquarters';


whereArray[0]='is the residence of;per_residence;per_education;per_birth_place';
whereArray[1]='was the place of education for;per_education;per_organization;per_nationality';


whereArray[2]='is the head quarters of;org_headquarters;org_location;org_coords';

whichArray[0]='is the workplace of;per_organization;per_title;per_occupation';
whichArray[1]='are the notable works of;per_notable_works;per_awards;per_organization';


whichArray[2]='is the location of;org_location;org_headquarters;org_coords';


function populateListTwo(node,option){
	var optionSelected=node.value;
	var listTwo=document.getElementById('fl');	

	listTwo.innerHTML='';
	
	//case person 
	if(option === 1){
	
	if(optionSelected=='What'){
		for(var i=0;i<=11;i++){
			var child=document.createElement('option');
			child.innerHTML=whatArray[i].split(';')[0];
			child.setAttribute('value',whatArray[i].split(';')[1]);
			listTwo.appendChild(child);
			}
		 additionalInformation(optionSelected,option);
	}
	else if(optionSelected=='When'){
		
		for(var i=0;i<=1;i++){
			var child=document.createElement('option');
			child.innerHTML=whenArray[i].split(';')[0];
			child.setAttribute('value',whenArray[i].split(';')[1]);
			listTwo.appendChild(child);
		}
		 additionalInformation(optionSelected,option);
	}
	
else if(optionSelected=='Who'){
		
		for(var i=0;i<=1;i++){
			var child=document.createElement('option');
			child.innerHTML=whoArray[i].split(';')[0];
			child.setAttribute('value',whoArray[i].split(';')[1]);
			listTwo.appendChild(child);
		}
		 additionalInformation(optionSelected,option);
	}
	
else if(optionSelected=='Where'){
	
	for(var i=0;i<=1;i++){
		var child=document.createElement('option');
		child.innerHTML=whereArray[i].split(';')[0];
		child.setAttribute('value',whereArray[i].split(';')[1]);
		listTwo.appendChild(child);
	}
	 additionalInformation(optionSelected,option);
}
	
else if(optionSelected=='Which'){
	
	for(var i=0;i<=1;i++){
		var child=document.createElement('option');
		child.innerHTML=whichArray[i].split(';')[0];
		child.setAttribute('value',whichArray[i].split(';')[1]);
		listTwo.appendChild(child);
	}
	 additionalInformation(optionSelected,option);
}
}
//end of person
else if (option === 3){
//case film

	if(optionSelected=='What'){
		for(var i=12;i<=16;i++){
			var child=document.createElement('option');
			child.innerHTML=whatArray[i].split(';')[0];
			child.setAttribute('value',whatArray[i].split(';')[1]);
			listTwo.appendChild(child);
			}
		 additionalInformation(optionSelected,option);
	}
	else if(optionSelected=='When'){
		
		for(var i=2;i<=2;i++){
			var child=document.createElement('option');
			child.innerHTML=whenArray[i].split(';')[0];
			child.setAttribute('value',whenArray[i].split(';')[1]);
			listTwo.appendChild(child);
		}
		 additionalInformation(optionSelected,option);
	}
	
else if(optionSelected=='Who'){
		
		for(var i=2;i<=12;i++){
			var child=document.createElement('option');
			child.innerHTML=whoArray[i].split(';')[0];
			child.setAttribute('value',whoArray[i].split(';')[1]);
			listTwo.appendChild(child);
		}
		 additionalInformation(optionSelected,option);
	}
	

}
//end of film


//case organization
else {

	if(optionSelected=='What'){
		for(var i=17;i<=23;i++){
			var child=document.createElement('option');
			child.innerHTML=whatArray[i].split(';')[0];
			child.setAttribute('value',whatArray[i].split(';')[1]);
			listTwo.appendChild(child);
			}
		 additionalInformation(optionSelected,option);
	}
	else if(optionSelected=='When'){
		
		for(var i=3;i<=3;i++){
			var child=document.createElement('option');
			child.innerHTML=whenArray[i].split(';')[0];
			child.setAttribute('value',whenArray[i].split(';')[1]);
			listTwo.appendChild(child);
		}
		 additionalInformation(optionSelected,option);
	}
	
else if(optionSelected=='Who'){
		
		for(var i=13;i<=14;i++){
			var child=document.createElement('option');
			child.innerHTML=whoArray[i].split(';')[0];
			child.setAttribute('value',whoArray[i].split(';')[1]);
			listTwo.appendChild(child);
		}
		 additionalInformation(optionSelected,option);
	}
	
else if(optionSelected=='Where'){
	
	for(var i=2;i<=2;i++){
		var child=document.createElement('option');
		child.innerHTML=whereArray[i].split(';')[0];
		child.setAttribute('value',whereArray[i].split(';')[1]);
		listTwo.appendChild(child);
	}
	 additionalInformation(optionSelected,option);
}
	
else if(optionSelected=='Which'){
	
	for(var i=2;i<=2;i++){
		var child=document.createElement('option');
		child.innerHTML=whichArray[i].split(';')[0];
		child.setAttribute('value',whichArray[i].split(';')[1]);
		listTwo.appendChild(child);
	}
	 additionalInformation(optionSelected,option);
}

//end of organization

}
}
function additionalInformation(option,type)
{
			window.addinfo1.length = 0;
			window.addinfo2.length = 0;

//case person
if ( type === 1){
		if(option=='What')
			{
			for(var i=0;i<=11;i++)
			{
			window.addinfo1[i]=whatArray[i].split(';')[2];
			window.addinfo2[i]=whatArray[i].split(';')[3];
			}
			}
		else if(option=='When')
		{
			for(var i=0;i<=1;i++)
			{
			window.addinfo1[i]=whenArray[i].split(';')[2];
			window.addinfo2[i]=whenArray[i].split(';')[3];
			}
		}
		else if(option=='Who')
		{
			for(var i=0;i<=1;i++)
			{
			window.addinfo1[i]=whoArray[i].split(';')[2];
			window.addinfo2[i]=whoArray[i].split(';')[3];
			}
		}
		else if(option=='Where')
		{
			for(var i=0;i<=1;i++)
			{
			window.addinfo1[i]=whereArray[i].split(';')[2];
			window.addinfo2[i]=whereArray[i].split(';')[3];
			}
		}
		else if(option=='Which')
		{
			for(var i=0;i<=1;i++)
			{
			window.addinfo1[i]=whichArray[i].split(';')[2];
			window.addinfo2[i]=whichArray[i].split(';')[3];
			}
		}
}		
		//case films
else if (type === 3){		
				if(option=='What')
			{
			for(var i=12;i<=16;i++)
			{
			window.addinfo1[i]=whatArray[i].split(';')[2];
			window.addinfo2[i]=whatArray[i].split(';')[3];
			}
			}
		else if(option=='When')
		{
			for(var i=2;i<=2;i++)
			{
			window.addinfo1[i]=whenArray[i].split(';')[2];
			window.addinfo2[i]=whenArray[i].split(';')[3];
			}
		}
		else if(option=='Who')
		{
			for(var i=2;i<=12;i++)
			{
			window.addinfo1[i]=whoArray[i].split(';')[2];
			window.addinfo2[i]=whoArray[i].split(';')[3];
			}
		}
	}
		//case organization
	else{	
				if(option=='What')
			{
			for(var i=17;i<=23;i++)
			{
			window.addinfo1[i]=whatArray[i].split(';')[2];
			window.addinfo2[i]=whatArray[i].split(';')[3];
			}
			}
		else if(option=='When')
		{
			for(var i=3;i<=3;i++)
			{
			window.addinfo1[i]=whenArray[i].split(';')[2];
			window.addinfo2[i]=whenArray[i].split(';')[3];
			}
		}
		else if(option=='Who')
		{
			for(var i=13;i<=14;i++)
			{
			window.addinfo1[i]=whoArray[i].split(';')[2];
			window.addinfo2[i]=whoArray[i].split(';')[3];
			}
		}
		else if(option=='Where')
		{
			for(var i=2;i<=2;i++)
			{
			window.addinfo1[i]=whereArray[i].split(';')[2];
			window.addinfo2[i]=whereArray[i].split(';')[3];
			}
		}
		else if(option=='Which')
		{
			for(var i=2;i<=2;i++)
			{
			window.addinfo1[i]=whichArray[i].split(';')[2];
			window.addinfo2[i]=whichArray[i].split(';')[3];
			}
		}
		
	}
}

function findIndex(value)
 {
	 var indexvalue=value;
	 var listone=document.getElementById('q').value;	
	 
	 if(listone=='What')
		 {
		 for(var i=0;i<whatArray.length;i++)
			 {
			 if(whatArray[i].split(';')[1]==indexvalue)
				 {
				 window.currentIndex=i;
				 break;
				 }
			 }
		 }
	 
	 else if(listone=='When')
	 {
	 for(var i=0;i<whenArray.length;i++)
		 {
		 if(whenArray[i].split(';')[1]==indexvalue)
			 {
			 window.currentIndex=i;
			 break;
			 }
		 }
	 }
	 
	 else if(listone=='Who')
	 {
	 for(var i=0;i<whoArray.length;i++)
		 {
		 if(whoArray[i].split(';')[1]==indexvalue)
			 {
			 window.currentIndex=i;
			 break;
			 }
		 }
	 }
	 
	 else if(listone=='Where')
	 {
	 for(var i=0;i<whereArray.length;i++)
		 {
		 if(whereArray[i].split(';')[1]==indexvalue)
			 {
			 window.currentIndex=i;
			 break;
			 }
		 }
	 }
	 
	 else if(listone=='Which')
	 {
	 for(var i=0;i<whichArray.length;i++)
		 {
		 if(whichArray[i].split(';')[1]==indexvalue)
			 {
			 window.currentIndex=i;
			 break;
			 }
		 }
	 }
	 additionalQuestion() ; 
 }
 
 function additionalQuestion()
 {
	 window.ques.length = 0

	 if(window.addinfo1[window.currentIndex].split('_')[2]!=undefined)
		 {
		window.ques[window.addinfo1[window.currentIndex]]=window.addinfo1[window.currentIndex].split('_')[1] + window.addinfo1[window.currentIndex].split('_')[2];
		 }
	 else
		 {
		 window.ques[window.addinfo1[window.currentIndex]]=window.addinfo1[window.currentIndex].split('_')[1]; 
		 }
	 if(window.addinfo2[window.currentIndex].split('_')[2]!=undefined)
	 {
		 window.ques[window.addinfo2[window.currentIndex]]=window.addinfo2[window.currentIndex].split('_')[1] + window.addinfo2[window.currentIndex].split('_')[2]; 
	 }
	 else
	 {
		 window.ques[window.addinfo2[window.currentIndex]]=window.addinfo2[window.currentIndex].split('_')[1];
	 }
	 
	window.ques[window.addinfo1[window.currentIndex]]=window.ques[window.addinfo1[window.currentIndex]].charAt(0).toUpperCase() + window.ques[window.addinfo1[window.currentIndex]].slice(1);
	window.ques[window.addinfo2[window.currentIndex]]=window.ques[window.addinfo2[window.currentIndex]].charAt(0).toUpperCase() + window.ques[window.addinfo2[window.currentIndex]].slice(1);
 }
