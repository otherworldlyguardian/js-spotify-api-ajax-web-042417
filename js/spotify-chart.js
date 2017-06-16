var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks
}

function extractPopularity(tracks) {
  return tracks.map(t => {
    return t.popularity
  })
}

function extractNames(tracks) {
  return tracks.map(t => {
    return t.name
  })
}

function chartData(labels, inputData) {
  return {
    labels: labels,
    datasets: [{
      label: 'Popularity',
      data: inputData,
      fillColor: dataSetProperties.fillColor,
      strokeColor: dataSetProperties.strokeColor,
      highlightFill: dataSetProperties.highlightFill,
      highlightStroke: dataSetProperties.highlightStroke,
    }]
  }
  // your code here

  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    headers: {
      Authorization: 'Bearer BQDmsWa7h8AIEZNUqZ0l-KQWhNFENR9DIiXaP_tMZhHvcGRNVaKHu1A87dJ1Didni7_-nqGsIb3CJvvRlxpR5zNs3X9YIN16_7S-MANOGw2I86NZ2iyz0mNAGRP6vBrfo3qMA0UkInS2hjDdt8K7BHjW'
    },
    success: callback
  })
  // $.ajax({
  //   url: url,
  //   header: {
  //     client_id: '1bc985eba36a44ea90ac6d0e9f990322',
  //     response_type: 'token',
  //     redirect_uri: 'http://localhost:8000/callback'
  //   },
  //   success: callback
  // })
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
}

function success(parsedJSON) {
  var tracks = extractTop10Tracks(parsedJSON.tracks)
  var data = chartData(extractNames(tracks), extractPopularity(tracks))
  var ctx = document.getElementById("spotify-chart").getContext('2d')
  var spotifychart = new Chart(ctx).Bar(data)
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
