jQuery(function() {
    // Initialize lunr with the fields to be searched, plus the boost.
    window.idx = lunr(function () {
      this.field('id');
      this.field('title');
      this.field('content', { boost: 10 });
      this.field('author');
      this.field('categories');
      this.field('url');
      this.field('date');
    });
  
    // Get the generated search_data.json file so lunr.js can search it locally.
    window.data = $.getJSON('/search_data.json');
  
    // Wait for the data to load and add it to lunr
    window.data.then(function(loaded_data){
      $.each(loaded_data, function(index, value){
        window.idx.add(
          $.extend({ "id": index }, value)
        );
      });
    });
  
    // Event when the form is submitted
    $("#site_search").submit(function(event){
        event.preventDefault();
        var query = $("#search_box").val(); // Get the value for the text field
        var results = window.idx.search(query); // Get lunr to perform a search
        display_search_results(results); // Hand the results off to be displayed
    });
  
    function display_search_results(results) {
      var $search_results = $("#search_results");
  
      // Wait for data to load
      window.data.then(function(loaded_data) {
  
        // Are there any results?
        if (results.length) {
          $search_results.empty(); // Clear any old results
  
          // Iterate over the results
          results.forEach(function(result) {
            var item = loaded_data[result.ref];
  
            // Build a snippet of HTML for this result
            var appendString = build_card_for_result(item);
  
            // Add the snippet to the collection of results.
            $search_results.append(appendString);
          });
        } else {
          // If there are no results, let the user know.
          $search_results.html('No results found.<br/>Please check spelling, spacing, yada...');
        }
      });
    }

    function build_card_for_result(item) {
        var cardHTML = "";
        cardHTML += '<div class="ui middle aligned selection list">';
        cardHTML += '<div class="item">';
        cardHTML += '<a class="header" href="' + item.url + '">';
        cardHTML += item.title;
        cardHTML += '<small class="small-date">';
        if(item.category) {
            cardHTML += '<i>' + item.category + '</i>';
        }

        cardHTML += '</small></a>' + trancuate_string_after(item.content, 200);
        cardHTML += '</div></div>';

        return cardHTML;
    }

    function trancuate_string_after(string, length) {
        if(string.length > length) {
            return string.substring(0, length) + "...";
        }
        return string;
    }
  });
  