// we will put some jscript in here

$(function(){
    
    function loadItems() {
        
        var newContent = '';

        $.getJSON('./tequila.json')
        .done( function(jsData){
            
            $.each(jsData["tequila"], function(key, value){
                
                var $myOuterDiv;
                
                // create the new item and add it to the document
                newContent = makeNewItem(value);
                $('hr').after(newContent);
                
                // set up the classes for this item including what shows or is hidden
                //  initial state is hidden so we can fade it in after everything else is set
                $myOuterDiv = $('hr').siblings('div').first();
                setupClasses($myOuterDiv);
                
                // now that the item is built and added, fade it in
                $myOuterDiv.fadeIn(2000);
                
                });
            
            } )
        .fail( function(){
            
            // show an error message in the event that we fail to get our data
            newContent = 'Error retrieving data.';
            $('hr').after(newContent);
            
            } )
        .always( function(){
            
            // now that all items are created, add the click event
            $('.titleDiv').on('click', function(){
                
                // hide all the stuff under every title EXCEPT this one
                $('.titleDiv').not($(this)).siblings().hide();
                
                // fade the clicked title's stuff in or out
                $(this).siblings()
                    .fadeToggle(1600);
            });
            
            } );

        // the following placement does not work
        //  it runs before the .getJSON method is complete.
        //$('hr').after(newContent);
    }
    
    function makeNewItem(tequila){
        
        var newContent, titleDivContent, descDivContent, listContent;
        
        var name = tequila.name;
        var image = tequila.image;
        var description = tequila.description;
        var infoList = tequila.info;
        
        // build title and description, including an image in the description
        titleDivContent = '<div>' + name + '</div>';
        descDivContent = '<div><img src=\"./images/' + image + '\">' + description + '</div>';
        
        // create the list from the last JSON item which is an array
        listContent = makeInfoList(tequila.info);
        
        // concatenate all the various content components into the new item we're adding
        newContent = '<div class=\"hideme\">' + titleDivContent + descDivContent + listContent + '</div>';
        
        return newContent;
        
    }
    
    function makeInfoList(infoList){
        
        var theList = '';
        
        // from the array in the JSON data, build an unordered list of info
        theList += '<li><span>Distiller: </span>' + infoList[0].distiller + '</li>';
        theList += '<li><span>Location: </span>' + infoList[0].location + '</li>';
        theList += '<li><span>Type: </span>' + infoList[0].type + '</li>';
        theList += '<li><span>' + infoList[0].priceSource + ' Price: </span>$ ' + infoList[0].price.toFixed(2) + '</li>';
        
        return '<ul>' + theList + '</ul>';
    }
    
    function setupClasses($theDiv){
        
        var tequilaType = '';
        
        $theTitle = $theDiv.children('div:eq(0)');
        $theDescription = $theTitle.siblings('div');
        $theInfoList = $theTitle.siblings('ul');
        
        // keep everything hiden while we work on it by hiding the outer div
        $theDiv
            .hide()
            .removeClass('hideme')
            .addClass('outerDiv');
        
        
        //add classes for the item title
        $theTitle.addClass('titleDiv');

        // pull the type out of the appropriate list item
        tequilaType = $theTitle.siblings('ul').children('li:eq(2)').text();
        tequilaType = tequilaType.toLowerCase();
        tequilaType = tequilaType.replace('ñ','n');
        
        $theTitle.addClass(tequilaType);
        
        // add classes and hide the non-title parts of the item
        $theDescription
            .hide()
            .addClass('descDiv');
        
        $theInfoList.hide();
        $('span').addClass('listTitle');
        
    }
    
    loadItems();
    
    
});