/**
 * Created by aswin on 3/11/13.
 */
 
$(document).ready(function() {$( "#ask" ).click(function() {
    
    var unfilled = false;
    
    // Search bar failure scenarios
    
    if ($( '#fl').prop('disabled') || $( '#q').prop('disabled')){
        unfilled = true;
    }


    if(unfilled){
        bootbox.dialog({
            message: "<p><strong>Check your question!</strong><ul><li>Follow tooltip instructions!</li><li>Manual question modification disallowed.</li></ul></p>",
            title: "Input error",
            buttons: {

                danger: {
                    label: "okay, got it!",
                    className: "btn-danger"
                }
            }

        });
        return;
    }

    var complete = $( '#searchbar').val().trim().split(' ');
    var partial =  $( '#q' ).val() + ' ' + $( '#fl' ).find('option:selected').text();
    var psplit = partial.split(' ');
    var flg = true;


    var query = '';
    var type;

    var i;
    for(i = 0; i < psplit.length; ++i){
        if (complete[i] !== psplit[i]){
            flg = false;
            break;
        }
    }

    if (psplit.length === complete.length){
        flg = false;
    }

    if (!flg){
        bootbox.dialog({
            message: "<p><strong>Check your question!</strong><ul><li>Follow tooltip instructions!</li><li>Manual question modification disallowed.</li></ul></p>",
            title: "Input error",
            buttons: {

                danger: {
                    label: "okay, got it!",
                    className: "btn-danger"
                }
            }

        });
        return;
    }
	// Extracting query
    else{
        var queryarr = complete.slice(i, complete.length);
        for(i = 0; i < queryarr.length; ++i){
            if(queryarr[i].indexOf("?") == -1)
                query += queryarr[i] + ' ';
            else{
                if (queryarr[i] !== "?")
                    query += queryarr[i].substring(0,queryarr[i].length-1);
            }
        }
    }
    query = query.trim();
	
	$( "#page1" ).slideUp();
	$( '#ccloud' ).hide();
	$( '#cluster' ).hide();
	$( '#filmstat' ).hide();
	if ( $( "#container2" ).is( ":hidden" ) ){
        $( "#container2" ).slideDown();
        $( '#share' ).show();
        findIndex($( '#fl' ).find('option:selected').val());
        
        // Firing the simple Solr query asing for the query result, image and additional info
        
        Manager = new AjaxSolr.Manager({
            solrUrl: 'http://54.201.136.253:8983/solr/sampleinfo/'
        });
        Manager.addWidget(new AjaxSolr.ResultWidget({
            id: 'result',
            target: '#answer'
        }));
        Manager.init();
        if($('#per_but').hasClass('active'))
            type = 'per';
        else if($('#org_but').hasClass('active'))
            type = 'org';
        else
            type = 'fil';

        Manager.store.addByValue('q', type + '_name:\"' + query + '\"');
        Manager.store.addByValue('fl',$('#fl').find('option:selected').val()+','+type+'_image'+','+window.addinfo1[window.currentIndex]+','+window.addinfo2[window.currentIndex]);//
        Manager.doRequest();
        
	}

    });
    
    $( "#askmore" ).click(function() {
		$( '#ccloud' ).show();
		$( '#cluster' ).show();
		$( '#filmstat' ).show();
        $( "#picture").attr('src','');
        if ( $( "#container2" ).is( ":visible" ) ){
            $( "#container2" ).hide(100);
            $( '#share' ).hide(100);
        }
        $( "#page1" ).slideDown("fast");

    });

    $( '#q').prop('disabled', true);

    $( '#per_but').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('#q option:first-child').attr('selected','selected');
            $( '#q').prop('disabled', true);
            $( '#fl').empty();
            $( '#fl').prop('disabled', true);
            $( '#searchtype').tooltip('show');
        }
        else{
            $(this).addClass('active');
            $( '#q').prop('disabled', false);
            populateListTwo(document.getElementById('q'),1);
            if ( $('#q option:selected').val() != null && $('#fl option:selected').val() != null)
				$( '#searchbar' ).val($('#q').val() + ' ' +$('#fl option:selected').text()+ ' ');
            $( '#searchtype').tooltip('hide');
            $( '#org_but').removeClass('active');
            $( '#fil_but').removeClass('active');
			$('#q option:nth-child(4)').attr('disabled',false);
			$('#q option:nth-child(5)').attr('disabled',false);
        }
    });

    $( '#org_but').click(function(){

        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('#q option:first-child').attr('selected','selected');
            $( '#q').prop('disabled', true);
            $( '#fl').empty();
            $( '#fl').prop('disabled', true);
            $( '#searchtype').tooltip('show');
        }
        else{
            $(this).addClass('active');
            $( '#q').prop('disabled', false);
            populateListTwo(document.getElementById('q'),2);
            if ( $('#q option:selected').val() != null && $('#fl option:selected').val() != null)
				$( '#searchbar' ).val($('#q').val() + ' ' +$('#fl option:selected').text()+ ' ');
            $( '#searchtype').tooltip('hide');
            $( '#per_but').removeClass('active');
            $( '#fil_but').removeClass('active');
			$('#q option:nth-child(4)').attr('disabled',false);
			$('#q option:nth-child(5)').attr('disabled',false);
        }


    });
    $( '#fil_but').click(function(){

        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('#q option:first-child').attr('selected','selected');
            $( '#q').prop('disabled', true);
            $( '#fl').empty();
            $( '#fl').prop('disabled', true);
            $( '#searchtype').tooltip('show');
        }
        else{
            $(this).addClass('active');
            $( '#q').prop('disabled', false);
            populateListTwo(document.getElementById('q'),3);
            if ( $('#q option:selected').val() != null && $('#fl option:selected').val() != null)
				$( '#searchbar' ).val($('#q').val() + ' ' +$('#fl option:selected').text()+ ' ');
            $( '#searchtype').tooltip('hide');
            $( '#per_but').removeClass('active');
            $( '#org_but').removeClass('active');
            $('#q option:nth-child(4)').attr('disabled','disabled');
			$('#q option:nth-child(5)').attr('disabled','disabled');
        }

    });

    $( '#fl').prop('disabled', true);
    $( '#q').change(function(){
		$( '#fl').prop('disabled', false);
        var q = $(this).val();
        var option;
        if($('#per_but').hasClass('active'))
				option = 1;
			else if($('#org_but').hasClass('active'))
				option = 2;
			else
				option = 3;
        populateListTwo(this,option);
        var fl = $( '#fl' ).find('option:selected').text();
        $( "#searchbar").val(q + ' ' +fl+ ' ');
        $( '#fl').prop('disabled', false);
    });

    $( '#fl').change(function(){

        var fl = $(this).find('option:selected').text();
        var q = $( "#q").val();
        $( "#searchbar").val(q + ' ' + fl + ' ');
        $( "#searchbar").focus();
    });

	// Auto suggestion
	
    $('#searchbar').typeahead({

        source: function(query,process){
			
			if ($( '#fl').prop('disabled') || $( '#q').prop('disabled') || $( '#searchbar').val() == ''){
				process([]);
				return;
			}
			
			var comp = query.trim().split(' ');
			var part =  $( '#q' ).val() + ' ' + $( '#fl' ).find('option:selected').text();
			var psplit = part.split(' ');
			var flg = true;
			
			for(var i = 0; i < psplit.length; ++i){
			if (comp[i] !== psplit[i]){
				flg = false;
				break;
				}
			}

			if (psplit.length === comp.length){
				flg = false;
			}
			if (!flg){
				process([]);
				return;
			}
			
			var complete = query.length;
			var partial =  ($( '#q' ).val() + ' ' + $( '#fl' ).find('option:selected').text()).length + 1;
			var q = query.slice(partial, complete);
			
			
			Manager = new AjaxSolr.Manager({
				solrUrl: 'http://54.201.136.253:8983/solr/sampleinfo/'
			});
			Manager.init();
			var type;
			
			if($('#per_but').hasClass('active'))
				type = 'per';
			else if($('#org_but').hasClass('active'))
				type = 'org';
			else
				type = 'fil';

			var params = {
            facet: true,
            'facet.field': [type+'_name_show'],
            'facet.limit': 20,
            'facet.mincount': 1
			};

			Manager.store.addByValue('q', $('#fl').find('option:selected').val()+':[* TO *]');
			Manager.store.addByValue('fq', type + '_name_autocomplete:\"' + q + '\"');
			Manager.store.addByValue('rows', '0');

			for (var name in params) {
				Manager.store.addByValue(name, params[name]);
			}
			
			var store = new AjaxSolr.ParameterStore();
			
			store.parseString(Manager.store.string());
			
			var response = false;
			
			
			var snippet = [];
			
			var options = {dataType: 'json'};
			options.url = Manager.solrUrl + 'select' + '?' + store.string() + '&wt=json&json.wrf=?';
			options.async = false;
			jQuery.ajax(options).success(function (data) {
				var suggests;
				if (type === 'per')
					suggests = data.facet_counts.facet_fields.per_name_show;
				else if(type === 'org')
					suggests = data.facet_counts.facet_fields.org_name_show;
				else
					suggests = data.facet_counts.facet_fields.fil_name_show;
				
				for(var suggest in suggests){
					if(suggest%2 == 0)
						snippet[suggest/2] = suggests[suggest];
				
				}
				for(suggest in snippet){
					snippet[suggest] = part+ ' ' + snippet[suggest];
				}
				process(snippet);
			});
				
		},
		matcher: function(item){
				return true;
		}
    });
    


    var options = {title: '1. Choose the search type.',placement: 'left',delay: { show: 0, hide: 500 }};
    var options1 = {title: '2. Choose the question type.',placement: 'left',delay: { show: 0, hide: 200 }};
    var options2 = {title: '3. Choose the question.',placement: 'right',delay: { show: 0, hide: 200 }};
    var options3 = {title: '4. Enter a valid name.',placement: 'left', trigger: 'focus'};
    $( '#searchtype').tooltip(options);
    $( '#q').tooltip(options1);
    $( '#fl').tooltip(options2);
    $( '#searchbar').tooltip(options3);
    $('#page2').corner( "bottom top");
    $( '#share' ).hide();
    
     // Facebook share
     
     $('#share').click( function(){
		 
			 FB.ui(
			  {
		
			   method: 'feed',
			   name: 'Info Card- from QA Sys App',
			   caption: 'Sharing interesting questions and answers',
			   description: (
				 $('#question').text() + '\n' + $('#answer').text()
			   ),
			   link: 'http://qasysapp.herokuapp.com',
			   picture: $('#picture').attr('src')
			  },
			  function(response) {
				if (response && response.post_id) {
				  bootbox.alert('Post was published.');
				} else {
				  bootbox.alert('Post was not published.');
				}
			  }
			); 
	});
   
   
   // Collection word clouds
   
   $('#ccloud').click(function(){
				
			
				
				var personcloud,orgcloud,filmcloud;
				
				var options = {dataType: 'json'};
				options.url = 'http://54.201.136.253:8983/solr/sampleinfo/select?';
				options.url += 'q=' + 'per_birth_date:[* TO *]+per_birth_place:[* TO *]+per_occupation:[* TO *]+per_spouse:[* TO *]+per_birth_name:[* TO *]+per_children:[* TO *]+per_residence:[* TO *]&per_death_date:[* TO *]&per_death_place:[* TO *]&per_nationality:[* TO *]&per_other_names:[* TO *]&per_citizenship:[* TO *]&per_education:[* TO *]&per_organization:[* TO *]&per_known_for:[* TO *]&per_notable_works:[* TO *]&per_religion:[* TO *]&per_parents:[* TO *]&per_awards:[* TO *]&per_image:[* TO *]&mm=1&fl=per_name&rows=10000'+ '&wt=json&json.wrf=?';
				options.async = false;
				jQuery.ajax(options).success(function (data) {
					
					var docs = data.response.docs;
					var temp,cdata;
					var weight = Math.floor((Math.random()*10)+45);
					var len = docs.length;
					var inc = parseInt(len/weight - 1);
					var j = 0;
					personcloud = [];
					for (var i = 0; i < len;j++){
						cdata = new Object;temp = [];
						temp = docs[i];
						cdata.text = temp.per_name;
						cdata.weight = weight;
						cdata.link = {href: 'http://en.wikipedia.org/wiki/'+temp.per_name.toString().replace(/ /g, '_'), target: '_blank'};
						personcloud[j] = cdata;
						weight -= 1;
						i += inc;
					}
				});
				var options = {dataType: 'json'};
				options.url = 'http://54.201.136.253:8983/solr/sampleinfo/select?';
				options.url += 'q=' + 'org_image:[* TO *]+org_formation:[* TO *]+org_type:[* TO *]&org_former_name:[* TO *]&org_abbreviation:[* TO *]&org_motto:[* TO *]&org_founder:[* TO *]&org_extinction:[* TO *]&org_purpose:[* TO *]&org_professional_title:[* TO *]&org_headquarters:[* TO *]&org_location:[* TO *]&org_coords:[* TO *]&org_services:[* TO *]&org_leader_title:[* TO *]&org_leader_name:[* TO *]&mm=1&fl=org_name&rows=10000'+ '&wt=json&json.wrf=?';
				options.async = false;
				jQuery.ajax(options).success(function (data) {
					
					var docs = data.response.docs;
					var temp,cdata;
					var weight = Math.floor((Math.random()*10)+45);
					var len = docs.length;
					var inc = parseInt(len/weight - 1);
					var j = 0;
					orgcloud = [];
					for (var i = 0; i < len;j++){
						cdata = new Object;temp = [];
						temp = docs[i];
						cdata.text = temp.org_name;
						cdata.weight = weight;
						cdata.link = {href: 'http://en.wikipedia.org/wiki/'+temp.org_name.toString().replace(/ /g, '_'), target: '_blank'};
						orgcloud[j] = cdata;
						weight -= 1;
						i += inc;
					}
				
				});
				var options = {dataType: 'json'};
				options.url = 'http://54.201.136.253:8983/solr/sampleinfo/select?';
				options.url += 'q=' + 'fil_image:[* TO *]+fil_language:[* TO *]+fil_director:[* TO *]&fil_producer:[* TO *]&fil_writer[* TO *]&fil_screenplay:[* TO *]&fil_based_on:[* TO *]&fil_narrator:[* TO *]&fil_music:[* TO *]&fil_cinematography:[* TO *]&fil_editing:[* TO *]&fil_studio:[* TO *]&fil_distributor:[* TO *]&fil_released:[* TO *]&fil_runtime:[* TO *]&fil_country:[* TO *]&fil_budget:[* TO *]&fil_gross:[* TO *]&mm=1&fl=fil_name&rows=10000'+ '&wt=json&json.wrf=?';
				options.async = false;
				jQuery.ajax(options).success(function (data) {
					
					var docs = data.response.docs;
					var temp,cdata;
					var weight = Math.floor((Math.random()*10)+45);
					var len = docs.length;
					var inc = parseInt(len/weight - 1);
					var j = 0;
					filmcloud = [];
					for (var i = 0; i < len;j++){
						cdata = new Object;temp = [];
						temp = docs[i];
						cdata.text = temp.fil_name;
						cdata.weight = weight;
						cdata.link = {href: 'http://en.wikipedia.org/wiki/'+temp.fil_name.toString().replace(/ /g, '_'), target: '_blank'};
						filmcloud[j] = cdata;
						weight -= 1;
						i += inc;
					}
				
				});
	
				bootbox.dialog({
					message: "<div id=\"loadcloud\"><p class=\"text-center lead\">Choose the type of cloud to be displayed</p></div>",
					title: "Collection Cloud",
					className: "ccmodel",
					buttons: {

					"Person": {
						className: "btn-info",
						callback: function() {
							
								$("#loadcloud").html('');
								$("#loadcloud").jQCloud(personcloud, {
									width: 500,
									height: 300
								});
								return false;
						}
					},
					"Film": {
						className: "btn-info",
						callback: function() {
								
								$("#loadcloud").html('');
								$("#loadcloud").jQCloud(filmcloud, {
									width: 500,
									height: 300
								});
								return false;
						}
					},
					"Organization": {
						className: "btn-info",
						callback: function() {
								
								$("#loadcloud").html('');
								$("#loadcloud").jQCloud(orgcloud, {
									width: 500,
									height:300
								});
								return false;
						}
					}
				}

				});
	});
	
	function get_random_color() {
		var letters = '5EF601234789ABCD'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.round(Math.random() * 15)];
		}
		return color;
	}
	
	// Occupation based clustering
	
	$('#cluster').click(function(){
		var jobs;
		var doughnutData;
		var personjobs;
		var options = {dataType: 'json'};
		options.url = 'http://54.201.136.253:8983/solr/sampleinfo/select?';
		options.url += 'q=*:*&facet=true&fl=per_name&facet.pivot=per_occupation_copy,per_name_pivot'+ '&wt=json&json.wrf=?';
				options.async = false;
				jQuery.ajax(options).success(function (data) {
					jobs = [];
					doughnutData = [];
					personjobs = [];
					jobs = data.facet_counts.facet_pivot['per_occupation_copy,per_name_pivot'];
					for(val in jobs){
						var job = jobs[val];
						var djob = new Object;
						djob.value = job.count;
						djob.color = get_random_color();
						doughnutData[val] = djob;
						var personlist = job.pivot;
						personjobs[val] = new Object;
						personjobs[val].occupation = job.value
						personjobs[val].personlist = personlist;
					}
					
			});
						
			bootbox.dialog({
					
					message: "<div id=\"ws\"><p class=\"text-center lead\">Clustering of personality by occupation</p><div id=\"stattable\" class=\"table-responsive\" style=\"display:none;height:400px;overflow:auto\"><table class=\"table table-hover\"><thead><tr><th>Occupation</th><th>Count</th><th>Color</th></tr></thead><tbody></tbody></table></div><canvas id=\"canvas1\" height=\"400\" width=\"500\"></div>",
					title: "Personality Occupation clustering",
					className: "wsmodel",
					buttons: {
					
					"Distribution": {
						className: "btn-info",
						callback: function() {
								$('#stattable').hide();
								$('#canvas1').show();
								var ctx1 =$("#canvas1").get(0).getContext("2d");
								var myDoughnut = new Chart(ctx1).Doughnut(doughnutData);
								return false;
						}
					},
					"Statistics": {
						className: "btn-info",
						callback: function() {
								$('#canvas1').hide();
								$('#stattable').show();
								$('#stattable table tbody').append('<tr></tr>');
								for(val in doughnutData){
									var count = doughnutData[val].value;
									var color = doughnutData[val].color;
									var occupation = personjobs[val].occupation;
									$('#stattable table tbody tr:last').after('<tr id=\"r'+val+'\"><td>'+occupation+'</td>'+'<td>'+count+'</td>'+'<td style=\'background-color:'+color+'\'></td>'+'</tr>')
									var list = personjobs[val].personlist;
									var len = list.length;
									var snippet = '';
									var prev = -1;
									for(var i = 0; i < 10; ++i){
										var index = Math.floor((Math.random()*len));
										if(list[index] && index!=prev)
											snippet += list[index].value + ', ';
										prev = index;
									}
									snippet = snippet.substring(0,snippet.length-2);
									$('#r'+val).tooltip({title: snippet , placement:'bottom'});
								}
								return false;
						}
					}
				}

				});
					
			});
   
});


