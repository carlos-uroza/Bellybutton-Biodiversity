// Create a dropdown menu of ID numbers dynamically
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  // Create functioned called by index.html
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  // Create function to print information to the Demographic Info panel
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(result.id);
      PANEL.append("h6").text(result.ethnicity);
      PANEL.append("h6").text(result.gender);
      PANEL.append("h6").text(result.age);
      PANEL.append("h6").text(result.location);
      PANEL.append("h6").text(result.bbtype);
      PANEL.append("h6").text(result.wfreq);
    });
  }