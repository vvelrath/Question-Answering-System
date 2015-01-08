/**
 * Created by deepak on 3/11/13.
 */
 
var selectedvalue='select';
var dateoutput;
var outputbudget;
var outputgross;
var filmname;
var count1=0;
var count2=0;
var loop1=0;
var loop2=0;
var grossarray=new Array();
var budgetarray=new Array();
var mixedarray=new Array();
var namefilm=new Array();
var outputfilm=new Array();
$(document).ready(function() {
	$('#filmstat').change(function(){
		selectedvalue=this.value;
		if(selectedvalue!='select')
		{
		var options = {dataType: 'json'};
		options.url = 'http://54.201.136.253:8983/solr/sampleinfo/select' + '?' + 'q=fil_name:*&rows=10000&fl=fil_name,fil_released,fil_gross,fil_budget' + 

'&wt=json&json.wrf=?';
		}
		jQuery.ajax(options).success(function (data) {
			if(selectedvalue!='select')
				{
			var docs = data.response.docs;
			var count = 0;
			var dateinput;
			var grossinput;
			var budgetinput;
			
			 grossarray.length=0;
			 budgetarray.length=0;
			 var i=0;
			for(doc in docs){
			 var film = docs[doc];
			 if(film['fil_released'] && film['fil_gross'] && film['fil_budget'])
			 {
		    filmname=film['fil_name'];
			var releasedate=film['fil_released'];
			dateinput=releasedate.toString();
			convertdate(dateinput);
			var budget = film['fil_budget'];
			budgetinput=budget.toString();
			convertbudget(budgetinput);
			var gross = film['fil_gross'];
            grossinput=gross.toString();
            convertgross(grossinput);
			if(outputgross!=undefined && outputbudget!=undefined && dateoutput!=undefined && loop1==1 && loop2==1)
			{
				if(dateoutput==selectedvalue && filmname!='Drive Angry' && filmname!='Horrible Bosses' && filmname!='Toy Story 3' && filmname!='The Simpsons Movie' && filmname!='The Departed' && filmname!='The Missing')
					{
					budgetarray[i]=outputbudget;
					grossarray[i]=outputgross;
					namefilm[i]=filmname;
				    count++;	
				    i++;
					}
				}
			}
		 }	
			var j=0;
			var random= getRandomInt (100, 300);
			var random1=getRandomInt(50,175);
			for(i=0;i<budgetarray.length;i++)
				{
				budgetarray[i]=budgetarray[i]/1000000;
				grossarray[i]=grossarray[i]/1000000;
				}
		var counter=getRandomInt (1,2);
		if(counter==1)
			{
			for(i=0;i<grossarray.length;i++)
			{
			if(grossarray[i] > random )
				{
			mixedarray[j]=parseInt(grossarray[i]);
			outputfilm[j]=namefilm[i];
			j=j+1;
			if(j==6)
				{
				break;
				}
				}
			}
			bootbox.dialog({
	            message: "<p>The movies that grossed over " + random + " million are <strong><i>"+ outputfilm +"</i></strong> and their respective gross(in million USD) are <strong>" + mixedarray +".</strong><div id=\"piechart\"></div>", 
	            title: "Film Stats for " + selectedvalue ,
	            buttons: {
	                "Click to view graph": {
	                    className: "btn-info",
	                    callback: function(){
	                    	creategraph(mixedarray);
	                    	$('#filmstat').val('select');
	                    	$('.btn-info').hide();
	                    	return false;
	                    }
			
	                }
			  }
			
	        });	
			}
		else
		{
			for(i=0;i<budgetarray.length;i++)
			{
			if(budgetarray[i] > random1)
				{
			mixedarray[j]=parseInt(budgetarray[i]);
			outputfilm[j]=namefilm[i];
			j=j+1;
			if(j==6)
				{
				break;
				}
				}
			}
			bootbox.dialog({
	            message: "<p>The movies that had a budget over " + random1 + " million are <strong><i>"+ outputfilm +"</i></strong> and their respective budget(in million USD) are <strong>" + mixedarray +".</strong><div id=\"piechart\"></div>", 
	            title: "Film Stats for " + selectedvalue ,
	            buttons: {
	                "Click to view graph": {
	                    className: "btn-info",
	                    callback: function(){
	                    	creategraph(mixedarray);
	                    	$('#filmstat').val('select');
	                    	$('.btn-info').hide();
	                    	return false;
	                    }
			
	                }
			  }
			
	        });	
			}
	}
		
			else
			{
				bootbox.alert("<p><strong>Film Stats</strong></p><p><strong><ul><li>Select a Year to Proceed !</ul></li></strong></p>");
			}
			//else select a value
		});
	});
});
function convertdate(dateinput)
{
 dateoutput=dateinput.split(' ')[2];
}

function convertbudget(budgetinput)  // Parses input to produce a value in millions
{
var budget;
var budgetoutput=budgetinput.split(' ')[1];
loop1=0;
if(budgetoutput=='million')
	{
	if(budgetinput[3]!='m' && budgetinput[3]!=' ')
	{
	budgetinput=budgetinput[0]+budgetinput[1]+budgetinput[2]+budgetinput[3]+'000000';
	}
	else if(budgetinput[2]!=' ')
	{
	budgetinput=budgetinput[0]+budgetinput[1]+budgetinput[2]+'000000';
	}
	else if(budgetinput[1]!=' ')
	{
	budgetinput=budgetinput[0]+budgetinput[1]+'000000';
	}
	else if(budgetinput[0])
	{
	budgetinput=budgetinput[0]+'000000';
	}
	budget=budgetinput.split('$')[1];

	if(budget!=undefined)
	{
	loop1=1;
	budget=budget.split("-").join("");
	budget=budget.split(",").join("");
    outputbudget=budget;
    count1++;
	}
	}
else if((budgetoutput=='(estimated)' || budgetoutput=='(est.)' || budgetoutput=='US') && loop1!=1)
	{
	var budget1=budgetinput.split(' ')[0];
	budget=budget1.split('$')[1];
	if(budget!=undefined)
	{
	loop1=1;
	budget=budget.split("-").join("");
	budget=budget.split(",").join("");
	budget=budget.split(".").join("");
	outputbudget=budget;
	count1++;
	}
	}
}

function convertgross(grossinput)
{
	
	var grossmillion=grossinput.split(' ')[1];
	var gross;
	loop2=0;
	if(grossmillion=='million')
		{
		if(grossinput[3]!=' ')
			{
		grossinput=grossinput[0]+grossinput[1]+grossinput[2]+grossinput[3]+'000000';
			}
		else if(grossinput[2]!=' ')
		{
			grossinput=grossinput[0]+grossinput[1]+grossinput[2]+'000000';
		}
		else if(grossinput[1]!=' ')
		{
			grossinput=grossinput[0]+grossinput[1]+'000000';
		}
		else if(grossinput[0]!=' ')
		{
			grossinput=grossinput[0]+'000000';
		}
		grossinput=grossinput.split("m").join("");
		grossinput=grossinput.split(" ").join("");
		grossinput=grossinput.split("$").join("");
		grossinput=grossinput.split(",").join("");
		grossinput=grossinput.split("£").join("");
		grossinput=grossinput.split("US").join("");
		grossinput=grossinput.split(".").join("");
		loop2=1;
		outputgross=grossinput;
		count2++;
		}
	else if(grossinput!='m')
		{
		
		var gross1=grossinput.split(' ')[0];
		gross=gross1.split('$')[1];
		if(gross!=undefined)
			{
			gross=gross.split(",").join("");
			gross=gross.split("US").join("");
			gross=gross.split("(Hong").join("");
			gross=gross.split("(Worldwide)").join("");
			gross=gross.split("(worldwide").join("");
			grossinput=grossinput.split(".").join("");
			loop2=1;
			outputgross=gross;
			count2++;
			}
	 }
  }

function creategraph(mixedarray)
{
	$('#piechart').html('');
	var r=150;
	var color=d3.scale.ordinal()
				.range(["red","blue","orange","green","brown","pink","yellow","grey"]);
	
	var canvas=d3.select("#piechart").append("svg")
				 .attr("width",500)
				 .attr("height",310);

	var group=canvas.append("g")
					.attr("transform","translate(270,160)");

	var arc=d3.svg.arc()
			  .innerRadius(0)
			  .outerRadius(r);

	var pie=d3.layout.pie()
			  .value(function(d) {return d;});

	var arcs=group.selectAll(".arc")
				  .data(pie(mixedarray))
				  .enter()
				  .append("g")
				  .attr("class","arc");

	arcs.append("path")
		.attr("d",arc)
		.attr("fill",function(d) {return color(d.data);});
		
	arcs.append("text")	
		.attr("transform", function (d) { return "translate(" + arc.centroid(d) +")";})
		.attr("text-anchor","middle")
		.attr("font-size","1em")
		.text(function (d) {return d.data;});

	arcs.each(function(d){
		d3.select(this)
			.attr('transform','translate(0,-150)')
			.transition()
			.duration(2000)
			.ease('bounce', d)
			.attr('transform','translate(0,0)');
	});
	
	function arcTween(b) {
		var i = d3.interpolate({value: b.previous}, b);
		return function(t) {
		return arc(i(t));
	};
}

}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
