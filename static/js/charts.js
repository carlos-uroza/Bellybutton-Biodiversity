function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("static/data/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("static/data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// // 1. Create the buildCharts function.
// function buildCharts(sample) {
//   // 2. Use d3.json to load and retrieve the samples.json file 
//   d3.json("static/data/samples.json").then((data) => {
//     // 3. Create a variable that holds the samples array. 
//     var sampleData = data.samples;

//     // 4. Create a variable that filters the samples for the object with the desired sample number.
//     var filteredArray = sampleData.filter(sampleObj => sampleObj.id == sample);
//     //  5. Create a variable that holds the first sample in the array.
//     var individualResult = filteredArray[0];

//     // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
//     var sampleOtuId = individualResult.otu_ids;
//     var sampleOtuLabel = individualResult.otu_labels;
//     var sampleValues = individualResult.sample_values;

//     // 7. Create the yticks for the bar chart.
//     // Hint: Get the the top 10 otu_ids and map them in descending order  
//     //  so the otu_ids with the most bacteria are last. 
      //var sampleOtuIdClean = sampleOtuId.filter(element => element != null);
      //var clean = sampleValues.slice(0,11);
      //var yticks = sampleOtuIdClean.sort((a,b) => a - b).reverse().slice(0,11);
      //var yticks = sampleOtuIdClean.sort((a,b) => a - b).reverse();
      //var yticks = sampleOtuId.map(sampleOtuId => "OTU ${sampleOtuId}").reverse();
      //var yticks = sampleOtuId.sort((a,b) => a - b).reverse().slice(0,11);
//     var yticks = sampleOtuLabel.sort((a,b) => a - b).reverse().slice(0,11);

//     // 8. Create the trace for the bar chart. 
//     var barData = {
//       x: sampleValues,
//       y: yticks,
//       type: "bar",
//       orientation: "h"
      
//     };
//     // 9. Create the layout for the bar chart. 
//     var barLayout = {
     
//     };
//     // 10. Use Plotly to plot the data with the layout. 
//     Plotly.newPlot("bar", [barData], barLayout)
//   });
// };

// // Bar and Bubble charts
// // Create the buildCharts function.
// function buildCharts(sample) {
//   // Use d3.json to load and retrieve the samples.json file 
//   d3.json("static/data/samples.json").then((data) => {
    

//     // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
//     // Plotly.newPlot(); 

//     // 1. Create the trace for the bubble chart.
//     var bubbleData = {
//       x: sampleOtuId,
//       y: sampleValues,
//       text: sampleOtuLabel,
//       mode: "markers",
//       //marker: {
//         //color:
//         //size:
//         //sizemode: "area"
//       //}
//     };

//     // 2. Create the layout for the bubble chart.
//     var bubbleLayout = {
//       title: "Bacteria Cultures Per Sample",
//       xaxis: {title:"OTU ID"},
//       margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//       },
//       hovermode: "closest"
//     };

//     // 3. Use Plotly to plot the data with the layout.
//     Plotly.newPlot("bubble", [bubbleData], bubbleLayout); 
//   });
// }

/////////

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("static/data/samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var sampleData = data.samples;
    console.log(sampleData);

    // Create a variable that filters the samples for the object with the desired sample number.
    var filteredArray = sampleData.filter(sampleObj => sampleObj.id == sample);
    console.log(filteredArray);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var individualResult = filteredArray[0];
    console.log(individualResult);

    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var sampleOtuId = individualResult.otu_ids;
    console.log(sampleOtuId)
    var sampleOtuLabel = individualResult.otu_labels;
    var sampleValues = individualResult.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var washingFreq = parseFloat(result.wfreq);
    console.log(washingFreq);

    // Create the yticks for the bar chart.
    var yticks = sampleOtuId.map(sampleOtuId => `OTU ${sampleOtuId}`);
    console.log(yticks);

    // Use Plotly to plot the bar data and layout.
    var barData = {
      x: sampleValues.slice(0,10).reverse(),
      y: yticks.slice(0,10).reverse(),
      text: sampleOtuLabel,
      type: "bar",
      orientation: "h"
      
    };

    var barLayout = {
     title: "Top 10 Bacteria Cultures Found"
    };

    Plotly.newPlot("bar", [barData], barLayout)
    
    // Use Plotly to plot the bubble data and layout.
    var bubbleData = {
      x: sampleOtuId,
      y: sampleValues,
      text: sampleOtuLabel,
      mode: "markers",
      marker: {
        color: sampleOtuId,
        colorscale: "Earth",
        size: sampleValues,
        sizeref: 1.3,
      }
    };

    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title:"OTU ID"},
      margin: {
        l: 50,
        r: 50,
        t: 100,
        b: 100
      },
      hovermode: "closest"
    };

    Plotly.newPlot("bubble", [bubbleData], bubbleLayout); 
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = {
      value: washingFreq,
      title: {text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {range: [null,10], dtick: 2 },
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color: "yellow"},
          {range: [6,8], color: "yellowgreen"},
          {range: [8,10], color: "green"}
        ],
      }
     
    };
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      },
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", [gaugeData], gaugeLayout);
  });
}