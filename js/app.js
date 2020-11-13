buildBreadcrumbs();
buildSections();
$(document).foundation();

// Generic AJAX GET client, handles variable number of arguments. 
// All arguments are then passed to the call-back function, 
// with the addition of the HTTP response body (passed as 
// the first argument to the call-back function.
var HttpClient = function() {
    var args = Array.prototype.slice.call(arguments);
    this.get = function(url, callback) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                args.unshift(httpRequest.responseText);
                callback.apply(null, args);
            }
        }

        httpRequest.open("GET", url, true);
        httpRequest.send(null);
    }
}

//Toggler functions
$('[data-toggler]').on('on.zf.toggler', function() {
    //var prefix = this.id.substr(0, this.id.lastIndexOf("-"));
    //$('#' + prefix + '-more').html('Read more<i class="fi fi-arrows-expand" aria-hidden="true"></i>');
    console.log('Toggler is On - ' + prefix);

});

$('[data-toggler]').on('off.zf.toggler', function() {
    //var prefix = this.id.substr(0, this.id.lastIndexOf("-"));
    //$('#' + prefix + '-more').html('Read less<i class="fi fi-arrows-compress" aria-hidden="true"></i>');
    console.log('Toggler is Off - ' + prefix);
});

$('.iframe-toggle').click(function( event ){
    console.log('Toggle clicked');
    $('#audit-5.1.1').foundation('toggle');
    event.preventDefault();
});

//execute body element functions
/*for (i = 0; i < hr_functions.length; i++) {
    hr_functions[i]();
}*/


//Back to top
$(function() {

    $(document).on('scroll', function() {

        if ($(window).scrollTop() > 100) {
            $('.scroll-top-wrapper').addClass('show');
        } else {
            $('.scroll-top-wrapper').removeClass('show');
        }
    });

    $('.scroll-top-wrapper').on('click', scrollToTop);
});

function scrollToTop() {
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $('body');
    offset = element.offset();
    offsetTop = offset.top;
    $('html, body').animate({ scrollTop: offsetTop }, 500, 'linear');
}

function buildSections() {
    var element = $("main");
    var headers = findTopHeader(element);
    var top = headers.top;
    var children = headers.children;

    console.log('Top is ' + top.attr('id'));

    menuItems = $(document.createElement("ul"));
    menuItems.addClass("vertical menu");

    $('#section-menu').append("<a href='#" + top.attr('id') + "'>"+ top.text() + "</a>\n");

    var subsections = element.find(children);
    subsections.each(function() {
        menuItems.append("<li><a href='#" + $(this).attr('id') + "'>" + $(this).text() + "</a></li>\n");
        $('#tf-small-menu-list').append("<li><a href='#" + $(this).attr('id') + "'>" + $(this).text() + "</a></li>\n");
    });
    $('#section-menu').append(menuItems);
    //smallMenu.append(smallMenuList);
    //$('#tf-small-menu').append(smallMenu);
    
}

function findTopHeader(element) {
    var retValue = {};
    retValue.top = element.find("h1");
    retValue.children = "h2";
    if (retValue.top['length'] == 0) {
        retValue.top = element.find("h2");
        retValue.children = "h3";
    }
    return retValue;
}

function buildBreadcrumbs() {
    var path = window.location.pathname;
    console.log("The path is ",path);
    var pathParts = getPathParts(path);
    if (pathParts.length == 0) {
        return;
    }
    
    var pathURLs = getURLs(pathParts);
    var crumbs = [];

    var headers = findTopHeader($("main"));
    var currText = headers.top.text();
    crumbs.unshift('<li><span  class="show-for-sr">Current: </span> '+currText.substr(currText.indexOf(' ')+1) + "</li>");
    if (pathParts[pathParts.length-1].startsWith("ITI-")) {
        console.log(pathParts[pathParts.length-1]);
        crumbs.unshift('<li class="disabled">Chapter 3</li>');
    }
    if (pathParts[pathParts.length-3].toLowerCase() === "tf") {
        if (pathParts[pathParts.length-2].toLowerCase() === "volume1") {
            crumbs.unshift('<li><a href="./index.html">Volume 1</a></li>');
            $('#volumeNo').text("1");
        } else if (pathParts[pathParts.length-2].toLowerCase() === "volume2") {
            crumbs.unshift('<li><a href="./index.html">Volume 2</a></li>');
            $('#volumeNo').text("2");
        } else if (pathParts[pathParts.length-2].toLowerCase() === "volume3") {
            crumbs.unshift('<li><a href="./index.html">Volume 3</a></li>');
            $('#volumeNo').text("3");
        } else if (pathParts[pathParts.length-2].toLowerCase() === "volume4") {
            crumbs.unshift('<li><a href="./index.html">Volume 4</a></li>');
            $('#volumeNo').text("4");
        }
        crumbs.unshift('<li><a href="../index.html">Technical Framework</a></li>');   
    }

    

    if (pathURLs.domain !== "") {
        crumbs.unshift('<li><a href="' + pathURLs.domain +'">' + pathParts[0] + '</a></li>');
    }
    crumbs.unshift('<li><a href="' + pathURLs.home +'">Home</a></li>');

    crumbs.forEach(element => $('.breadcrumbs').append(element));
}

function getPathParts(path) {
    var result=path.split("/");
    console.log("Number of parts: " + result.length);
    result.shift(); //empty string
    if (pathParts[0] === "publications")
    {
        //we are at github.io, remove first segment of path
        result.shift();
    }
    console.log("Number of parts: " + result.length);
    if (result.length == 1) {
        if ((result[0] === "") || (result[0] === "index.html"))
        {
            //root element, not breadcrumbs
            return [];
        }
    }
    console.log("Number of parts: " + result.length);
    return result;
}

function getURLs(pathParts)
{
    var url = {};
    if (pathParts.length == 1) {
        url.home = "./index.html";
        url.domain = "";
        return url;
    }
    var stepsBack = pathParts.length - 2;
    var prefix = "";

    for (i=0; i<stepsBack; i++) {
        prefix=prefix + "../";
    }

    if (prefix === "") {
        url.domain = "./index.html";
    }
    else {
        url.domain = prefix + "index.html";
    }

    url.home = prefix + "../" + "index.html";

    return url;
}