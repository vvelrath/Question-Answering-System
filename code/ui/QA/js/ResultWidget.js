/**
 * Created by aswin on 3/11/13.
 */

(function ($) {

    AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
        start: 0,

        beforeRequest: function () {
            $(this.target).html($('<img>').attr('src', 'images/ajax-loader.gif'));
        },

        afterRequest: function () {
            $(this.target).empty();
            var docs = this.manager.response.response.docs;
            var fileds = Manager.store.get('fl').value.split(':');
            var mainquery = $('#fl').find('option:selected').val();
            var dyk = new Object();
            var snippet = '';
            var source ='';
            
            var question = $('#searchbar').val();
				if(question.indexOf('?') == -1)
					$('#question').html('<br/><h2>'+question+'?'+'</h2>');
				else
					$('#question').html('<br/><h2>'+question+'</h2>');
					
            // Spell Check to 'Did you mean'
            
            if (jQuery.isEmptyObject(docs)){

                snippet += '<span style=\"color:#923344\">Oops! I don\'t know that. Ask something else :)</span>';
                $( '#dyk' ).hide();
				$( '#dyklist' ).hide();
                
                var incorrectquery = this.manager.store.get('q')['value'];
                incorrectquery = incorrectquery.replace(/\w*/,'name_spell');
                var options = {dataType: 'json'};
				options.url = this.manager.solrUrl + 'spell' + '?q=' + incorrectquery + '&wt=json&json.wrf=?';
				options.async = false;
				jQuery.ajax(options).success(function (data) {
					if (data.spellcheck){
						
						var correction =  data.spellcheck.suggestions[data.spellcheck.suggestions.length-1];
						
						if (correction && correction[1])
						{
						
						var correctquery = correction[1].toString();
						var type;
						if($('#per_but').hasClass('active'))
							type = 'per';
						else if($('#org_but').hasClass('active'))
							type = 'org';
						else
							type = 'fil';
						correctquery = correctquery.replace(/\w*/,type + '_name_autocomplete');
						var inneroptions = {dataType: 'json'};
						inneroptions.url = 'http://54.201.136.253:8983/solr/sampleinfo/' + 'select' + '?q=' + correctquery + '&facet=true&facet.field='+type+'_name_show&facet.limit=1&facet.mincount=1'+'&wt=json&json.wrf=?';
						options.async = false;
						jQuery.ajax(inneroptions).success(function (data) {
							var corrected;
							if (type === 'per')
								corrected = data.facet_counts.facet_fields.per_name_show;
							else if(type === 'org')
								corrected = data.facet_counts.facet_fields.org_name_show;
							else
								corrected = data.facet_counts.facet_fields.fil_name_show;
							var q = corrected[0];
							$('#question').html('<br/><h2>'+$('#q').val()+' '+$('#fl').find('option:selected').text()+' '+q+'?<small><sup style=\"color:#923344\">Did you mean</sup></small></h2>')
							
							InnerManager = new AjaxSolr.Manager({
								solrUrl: 'http://54.201.136.253:8983/solr/sampleinfo/'
							});
							InnerManager.addWidget(new AjaxSolr.CorrectedResultWidget({
								id: 'correctedresult',
								target: '#answer'
							}));
							InnerManager.init();

							InnerManager.store.addByValue('q', type + '_name:\"' + q + '\"');
							InnerManager.store.addByValue('fl',$('#fl').find('option:selected').val()+','+type+'_image'+','+window.addinfo1[window.currentIndex]+','+window.addinfo2[window.currentIndex]);
							InnerManager.doRequest();
							
						});
					}
				}
				});
				
                $(this.target).html(snippet);
                return;
            }
                var doc = docs[0];
            
				if (jQuery.isEmptyObject(doc)) {
					snippet += '<span style=\"color:#923344\">Oops! I don\'t know that. Ask something else :)</span>';
				}
				else{
					for(val in doc){
						if(val != 'per_image' &&  val != 'org_image' && val != 'fil_image'){
								if (val === mainquery)
									snippet = doc[val];
								else
									dyk[val] = doc[val];
						}
						else
							source = doc[val][0];
					}
				}
				
				if(snippet === ''){
					snippet += '<span style=\"color:#923344\">Oops! I don\'t know that. Ask something else :)</span>';
				}
				
				
				$(this.target).addClass('text-center');
				$(this.target).html('<br/><strong>'+snippet+'</strong><br/>');
				var i = 1;
				
				if(jQuery.isEmptyObject(dyk)){
					$( '#dyk' ).hide();
					$( '#dyklist' ).hide();
				}
				else{
					$( '#dyk' ).show();
					$( '#dyklist' ).show();
				}
				$( '#addinfo1' ).text('');
				$( '#addinfo1' ).next().text('');
				$( '#addinfo2' ).text('');
				$( '#addinfo2' ).next().text('');
				for(addinfo in dyk){
					var def = '#addinfo'+i;
					$(def).text(window.ques[addinfo]);
					$(def).next().text(dyk[addinfo]);
					i = i + 1;
				}
            if(source !== ''){
					var filename = source.replace(/ /g, '_');//replace spaces with underscores
					var digest = String(CryptoJS.MD5(filename));//calaculate mdh hash value for the filename
					var folder = digest.charAt(0)+'/'+digest.charAt(0)+digest.charAt(1)+'/'+encodeURIComponent(filename);//determine the exact folder path from the md5 hash value
					var url = 'http://upload.wikimedia.org/wikipedia/commons/'+folder;
					fetchAndPlaceImage(url,folder);
			}
        }
    });

})(jQuery);
