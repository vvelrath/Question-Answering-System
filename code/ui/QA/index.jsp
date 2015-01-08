<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QA System</title>
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.css">
    <link rel="stylesheet" href="css/utility.css">
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="https://netdna.bootstrapcdn.com/bootstrap/3.0.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/bootbox.min.js"></script>
    <script type="text/javascript" src="js/typeahead.js"></script>
    <script type="text/javascript" src="js/corner.js"></script>
    <script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
    <script type="text/javascript" src="js/facebook-js.js"></script>
    
    <script type="text/javascript" src="js/querycombo.js"></script>
    <script type="text/javascript" src="js/utility.js"></script>
    <script type="text/javascript" src="js/imageretrieve.js"></script>
    <script src="js/ajax-solr-master/core/Core.js"></script>
    <script src="js/ajax-solr-master/core/AbstractManager.js"></script>
    <script src="js/ajax-solr-master/managers/Manager.jquery.js"></script>
    <script src="js/ajax-solr-master/core/Parameter.js"></script>
    <script src="js/ajax-solr-master/core/ParameterStore.js"></script>
    <script src="js/ajax-solr-master/core/AbstractWidget.js"></script>
    <script src="js/ResultWidget.js"></script>
	<script src="js/CorrectedResultWidget.js"></script>
	<script src="js/jqcloud.min.js"></script>
	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script type="text/javascript" src="js/advancedsearch.js"></script>
	<script type="text/javascript" src="js/Chart.min.js"></script>

</head>
<body>
    <div class="container">
    <div class="jumbotron">
    <h1><i class="fa fa-search"></i>&nbsp;QA System</h1>
    <p>Questions about your favorite Person, Organization or Film ! </p>
    <p></p>
    </div>
    <div id="page1" class="container">
    <div class="row">
    <div class="col-md-6 col-xs-6 col-xs-offset-4 col-md-offset-4">
    <div class="cotainer">
    <div id="searchtype" class="btn-group btn-group-lg">
    <a id="per_but" class="btn btn-default"><i class="fa fa-user"></i>&nbsp;Person</a><a id="org_but" class="btn btn-default"><i class="fa fa-group"></i>&nbsp;Organization</a><a id="fil_but" class="btn btn-default"><i class="fa fa-film"></i>&nbsp;Film</a>
    </div>
    </div>
    </div>
    </div>

    <div class="row">
    <p><br/><br/></p>
    <div class="col-xs-4 col-md-4 col-xs-offset-2 col-md-offset-2">
    <select id="q" class="form-control">
    <option value="select" selected disabled>Select question</option>
    <option value="What">What</option>
    <option value="When" >When</option>
    <option value="Where" >Where</option>
    <option value="Which" >Which</option>
    <option value="Who">Who</option>
    </select>
    </div>
    <div class="col-xs-4 col-md-4">
    <select id="fl" class="form-control">
    </select>
    </div>
    </div>
    <div class="row">
    <p><br/><br/></p>
    <div class="col-md-6 col-xs-6 col-md-offset-3 col-xs-offset-3">

    <input id="searchbar" type="text" class="form-control input-lg" name="search" data-provide="typeahead" data-highlighter="-1">
    </div>
    </div>
    <div class="row">
    <p><br/><br/></p>
    <div class="col-xs-2 col-xs-offset-5 col-md-2 col-md-offset-5">
    <a id="ask" class="btn btn-primary btn-lg">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ask&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
    </div>
    </div>
    </div>
    <div id="container2" class="container">
    <div id="page2" class="row">
	
    <div class="col-md-3 col-md-push-9"><img id="picture"  src="" class="img-rounded" class="img-responsive" alt=""/></div>
    <div class="col-md-9 col-md-pull-3">
    <p id="question"><br/><br/></p>
    <p id="answer" class="lead"><br/><br/></p>
    <p id="dyk" class="text-muted lead">Did you know?</p>
    <dl id="dyklist" class="dl-horizontal text-info">
    <dt id="addinfo1"></dt> 
    <dd></dd>
    <dt id="addinfo2"></dt> 
    <dd></dd>
    </dl>

    </div>
    </div>
    <div class="row">
    <p><br/><br/></p>
    <div class="col-xs-4 col-md-4 col-xs-push-5 col-md-push-5">
    <a id="askmore" class="btn btn-primary btn-lg"><i class="fa fa-arrow-circle-o-left"></i>&nbsp;Ask more!&nbsp;</a>
    </div>
    </div>
    </div>

    </div>
    <a id="ccloud" class="btn btn-md btn-success"><i class="fa fa-cloud fa-2x"></i> Clc Cloud</a>
    <a id="cluster" class="btn btn-md btn-success"><i class="fa fa-th-large fa-2x"></i>Work Stats</a>
	<div id="fholder">
    <select name="qa" id="filmstat" class="form-control">
	<option class="btn-success" value="select" selected>Film Stats</option>
	<option class="btn-success value="2003">2003</option>
	<option class="btn-success value="2004">2004</option>
	<option class="btn-success value="2005">2005</option>
	<option class="btn-success value="2006">2006</option>
	<option class="btn-success value="2007">2007</option>
	<option class="btn-success value="2008">2008</option>
	<option class="btn-success value="2009">2009</option>
	<option class="btn-success value="2010">2010</option>
	<option class="btn-success value="2011">2011</option>
	<option class="btn-success value="2012">2012</option>
	<option class="btn-success value="2013">2013</option>
	</select>
	</div>
    </div>
    <div id="fb-root"><a id="share" class="btn btn-md btn-success"><i class="fa fa-facebook fa-2x"></i> Share</a></div>
</body>
</html>

