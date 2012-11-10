function displayTextile(textileSrc,elementId) {
		var html = convert(textileSrc);
		document.getElementById(elementId).innerHTML=html;
	}


$(document).bind('pagechange', function() {
  $('.ui-page-active .ui-listview').listview('refresh');
  $('.ui-page-active :jqmData(role=content)').trigger('create');
});

$(document).ready(function() {


$.ajax({
  url: 'sample.txt',
  beforeSend: function ( xhr ) {
  }
}).done(function ( data ) {

	var pageData = convertTextile(data);
	
	var headers = $(pageData).filter('h1,h2,h3,hr');
	var headerCount = headers.length;
	
	headers.each(function(i) {
	
	    var current = $(this);
	    current.attr("id", "title" + i);
	 
	    //$("#mainMenuList").append("<li><a id='link" + i + "' href='#page" +
	      //  i + "' title='" + current.attr("tagName") + "'>" + 
	      //  current.html() + "</a></li>");
	       
	       var newPageData = '';
	     
	       var nextNode = $(this);
	     
	       var notH1 = false;
	       
	       newPageData += '<div style="height:63px;">';
	       
	       for (n = 0; n < headerCount; n++)
	       {
	       		if (i == n)
	       			newPageData += '<img src="img/circle-on.png" style="width:43px;height:63px;" onClick="page(' + n + ')"/>';
	       		else
	       			newPageData += '<img src="img/circle-off.png" style="width:43px;height:63px;" onClick="page(' + n + ')"/>';
	       		
	       }
	       
	       newPageData += '</div>';
	       
	       		
	       while (!notH1)
	       {
	       		newPageData += "<" + nextNode[0].tagName + ">";
	       		newPageData += nextNode.html();
	       		newPageData += "</" + nextNode[0].tagName + ">";
	       		
	       		nextNode = nextNode.next();
	       		
	       		if (nextNode[0] === undefined)
	       			break;
	       		else
	       			notH1 = (nextNode[0].tagName == "H1"
	       			 || nextNode[0].tagName == "H2" || nextNode[0].tagName == "H3"
	       			 || nextNode[0].tagName == "HR");
	       		
	       }
	       
			$("body").append('<div id="page' + i + '" data-role="page" data-theme="c"><div id="page' + i + '" data-role="content">' + newPageData + '</div></div>');
		
		 	$('#page' + i + ' a').attr("rel", "external");
		 	$('#page' + i + ' hr').remove();
			$('#page' + i).trigger("create");
			
			//$("#mainMenuList").listview("refresh");
		
		});
		
		
		 $.mobile.changePage("#page0", "slide", false, true);
		   //get an Array of all of the pages and count
    	windowMax = $('div[data-role="page"]').length; 
		 
	});

	
});
	
$(document).ready(function() {

    $('.ui-slider-handle').live('touchstart', function(){
        // When user touches the slider handle, temporarily unbind the page turn handlers
        doUnbind();
    });

    $('.ui-slider-handle').live('mousedown', function(){
        // When user touches the slider handle, temporarily unbind the page turn handlers
        doUnbind();
    });

    $('.ui-slider-handle').live('touchend', function(){
        //When the user let's go of the handle, rebind the controls for page turn
        // Put in a slight delay so that the rebind does not happen until after the swipe has been triggered
        setTimeout( function() {doBind();}, 100 );
    });

    $('.ui-slider-handle').live('mouseup', function(){
        //When the user let's go of the handle, rebind the controls for page turn
        // Put in a slight delay so that the rebind does not happen until after the swipe has been triggered
        setTimeout( function() {doBind();}, 100 );
    });

    // Set the initial window (assuming it will always be #1
    window.now = 0;

    //get an Array of all of the pages and count
    windowMax = $('div[data-role="page"]').length; 

   doBind();
});
    // Functions for binding swipe events to named handlers
    function doBind() {
        $('div[data-role="page"]').live("swipeleft", turnPage); 
        $('div[data-role="page"]').live("swiperight", turnPageBack);
    }

    function doUnbind() {
        $('div[data-role="page"]').die("swipeleft", turnPage);
        $('div[data-role="page"]').die("swiperight", turnPageBack);
    }

    // Named handlers for binding page turn controls
    function turnPage(){
        // Check to see if we are already at the highest numbers page            
        if (window.now < windowMax) {
            window.now++
            $.mobile.changePage("#page"+window.now, "slide", false, true);
        }
    }

    function turnPageBack(){
        // Check to see if we are already at the lowest numbered page
        if (window.now != 1) {
            window.now--;
            $.mobile.changePage("#page"+window.now, "slide", true, true);
        }
    }
    
    function page (pageIdx)
    {
    	  $.mobile.changePage("#page"+pageIdx, "slide", false, true);
    }