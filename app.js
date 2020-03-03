function bringinData(collection) {
  // Using D3 to read the data and creating a metadata file
  d3.json("samples.json").then(function(data) {
    var observations = data.metadata
    for (var i=0, len = observations.length; i < len; i++) {
      if (observations[i].id == collection) {
        
        var banner = d3.select("#sample-metadata").html("")
        for (let [key, value] of Object.entries(observations[i])) {
          banner.append("p").text(`${key}: ${value}`)
        
        };
      };
    };
    
  });
}
  //Defining the charts data for observation that is called 
function charts(collection) {
  d3.json("samples.json").then(function(data) {
    var data = data.samples;
    var len = data.length
    for (var i=0; i < len; i++) {
      if (data[i].id == collection) {
        var id = data[i].id;
        var sample_values = (data[i].sample_values);
        var otu_ids = (data[i].otu_ids);
        var otu_labels = (data[i].otu_labels);
      
  // Creating the Bar chart
        var barChart = [{
          type: 'bar',
          x: sample_values.slice(0,10),
          y: otu_ids.slice(0,10).map(x => `OTU ${x}`),
          text: otu_labels.slice(0,10).map(l => `OTU ${l}`),
          orientation: 'h'
        }];
        
        Plotly.newPlot('bar', barChart);
        
  //Creating the Bubble chart
        var bubbleChart = [{
          y: sample_values,
          x: otu_ids,
          
          mode: 'markers',
          text: data[i].otu_labels.map(l => `OTU ${l}`),
          marker: {
            size: data[i].sample_values.map(b => b),
            color: otu_ids
          }
        }];
        
        Plotly.newPlot('bubble', bubbleChart);

      }
      else{

      }
    }

    
  });  

};

function init() {
  // Reference an observation from the dropdown 
  var observation = d3.select("#selDataset");

  // Use the observation and populate the data 
  d3.json("samples.json").then((data) => {
    data.names.forEach((name) => {
      observation
        .append("option")
        .text(name)
        .property("value", name);
    });

  // Use the first observation to build the default chart
    const observation1 = data.names[0];
    charts(observation1);
    bringinData(observation1);
  });
}

function optionChanged(currentObservation) {
  // Get the corresponding information from the selected observation
  charts(currentObservation);
  bringinData(currentObservation);
}

init();