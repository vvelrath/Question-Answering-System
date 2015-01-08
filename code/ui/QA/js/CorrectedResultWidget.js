(function ($) {

    AjaxSolr.CorrectedResultWidget = AjaxSolr.AbstractWidget.extend({
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
				//snippet.trim();
				
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
