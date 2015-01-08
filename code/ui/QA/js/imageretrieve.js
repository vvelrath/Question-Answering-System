/**
 * Created by aravindhan on 3/11/13.
 */

			function returnStatus(req, status) {
  
				if(status == 200) {
					return 1;
				}
				else {
					return 0;
				}
			}

			function fetchAndPlaceImage(address,folder) {
				var client = new XMLHttpRequest();
				client.onreadystatechange = function() {
				// in case of network errors this might not give reliable results
					if(this.readyState == 4){
						var myStatus=returnStatus(this, this.status);
						if(myStatus==1){
							
							$( "#picture").attr('src',address);
							
						}
						else{
							
							$( "#picture").attr('src','http://upload.wikimedia.org/wikipedia/en/'+folder);
							
						}
					}
					else{
						
					}
				}
				
				client.open("HEAD", address);
				client.send();
			}
