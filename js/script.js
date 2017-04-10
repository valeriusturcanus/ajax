function loadData() {

    var $body = $("body");
    var $wikiElem = $("#wikipedia-links");
    var $nytHeaderElem = $("#nytimes-header");
    var $nytElem = $("#nytimes-articles");
    var $greeting = $("#greeting");
    var street, city, address, urlAddress;

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    street = $("#street").val();
    city = $("#city").val();
    // console.log(city);
    address = street + "," + city;
    console.log(address);
    urlAddress = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" +
        address

    $body.append("<img class='bgimg' src=" + urlAddress + ">");
    // $greeting.text(urlAddress);
    $wikiElem.text(address.toUpperCase());

    var wikiAddress = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback=wikiCallback";

    // $.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+city+"&sort=newest&api-key=bf9bf7929d7844669c66acf69aceb838",function(data){
    $.ajax({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&sort=newest&api-key=bf9bf7929d7844669c66acf69aceb838",
            success: function(data) {
                if (data.response.docs.length > 0) {


                    for (var index = 0; index < data.response.docs.length & index < 10; index++) {
                        var lists = "<li><a href=" + data.response.docs[index].web_url + ">" + data.response.docs[index].headline.main + "</a><p>" +
                            data.response.docs[index].lead_paragraph + "</p></li>"

                        $("#nytimes-articles").append(lists);

                    }
                } else {
                    $("#nytimes-header").text("New York Times Articles Could not be found");
                }

            }
        })
        .fail(function() {
            $("#nytimes-header").text("New York Times Articles Could not be found");
        });
    var wikiRequestTimout = setTimeout(function() {
        $wikiElem.text("failed to get Response");
        console.log("eror");
    }, 8000)


    $.ajax({
        url: wikiAddress,
        dataType: "jsonp",
        success: function(response) {
            // console.log(response);
            for (var i = 0; i < response[1].length; i++) {
                var urlArticle = response[3][i];
                var wikiTitle = response[1][i];
                var lists = "<li><a href=" + urlArticle + ">" + wikiTitle + "</a> </li>";
                $("#wikipedia-links").append(lists);
            };
            clearTimeout(wikiRequestTimout);
        }
    });
    return false;
};
$("#form-container").submit(loadData);


// WIKI API ADDRESS
// "http://en.wikipedia.org/w/api.php?action=opensearch&search="+city+"&format=json&callback=wikiCallback";
// https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch
// https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988
// article search address

// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=liverpool?api-key=bf9bf7929d7844669c66acf69aceb838
// Google street view key AIzaSyBs5mffewvCSY8JLB0_hxFu9m6fOjDsg8I
// New York Times key =  bf9bf7929d7844669c66acf69aceb838

// Liverpool wikipedia API
// https://en.wikipedia.org/w/api.php?action=query&titles=liverpool&prop=revisions&rvprop=content&format=json
