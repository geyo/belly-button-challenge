//Use D3 Library to read in data from url
const bb_json = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//Initialize variables used.
let sampleData;
let sample_values = [];
let otu_ids = [];
let otu_labels = [];
let person_id = [];

//Wrap with a "then" to get a 'promise' from server. 
d3.json(bb_json).then((data) => {
    //JSON data structure: 
    //level 1: metadata, names, samples
    //level 2 for samples: id, otu_ids, sample_values, otu_labels
    
    //store data under samples.
    samples = data.samples;
       
    //for loop to iterate t/ samples and add datapoint to arrays.
    for (i = 0; i < samples.length; i++){
        person_id.push(samples[i]["id"]);
        sample_values.push(samples[i]["sample_values"]);
        otu_ids.push(samples[i]["otu_ids"]);
        otu_labels.push(samples[i]["otu_labels"]);
    };

    //HORIZONTAL BAR CHART: TOP 10 OTUS PER PERSON W DROPDOWN 
    //Grab dropdown in html
    let dropdown = d3.select("#selDataset");
    //Add id as options in the dropdown.
    for (i = 0; i < person_id.length; i++){
        d3.select("#selDataset").append("option").text(person_id[i]);
    };

    // Function to generate horizontal bar chart of top 10 OTUs
    function create_bar (selected_id) {
        selected_id = d3.event.target.value;
        //use selected option to look up the index w/n array.
        index = person_id.indexOf(selected_id);
        personData = samples[index]; //store person's data.

        //sort and slice top 10 OTUs
        //create an array of arrays: inner array = [index, otu_id, otu_labels, sample_value]
        let otusAndSample = personData.otu_ids.map((otu_id, idx) => 
            [idx, otu_id, personData.otu_labels[idx], personData.sample_values[idx]]);
        otusAndSample.sort((a,b) => b[3] - a[3]); //sort by ascending by sample_values
        otusAndSample = otusAndSample.slice(0,10); //grab top 10
        
        //prepare x-values (otu_ids)
        xValues = otusAndSample.map((x) => `OTU: ${(x[1])}`); //make # into string
        //prepare y-values (sample_values)
        yValues = otusAndSample.map((x) => x[3]);
        //prepare hovertext (otu_labels)
        hoverText = otusAndSample.map((x) => x[2]);
        
        //construct graph data and layout
        let barData = {
            x: xValues,
            y: yValues,
            type: "bar",
            hovertext: hoverText
        };

        let layout = {
            title: `Top Ten OTUs from ID ${selected_id}`
        };

        //testing
        // console.log(selected_id);
        // console.log(index);
        console.log(personData);
        console.log(otusAndSample);
        // console.log(xValues);


        //push graph to where html is
        //d3.select("#bar").html();
        Plotly.newPlot("bar", [barData], layout);


    };
    
    //event handler: when dropdown is selected, call create_bar. 
    dropdown.on("change", create_bar);


    //trigger when dropdown is selected

        //Find top ten OTUs for id


    // Create a bubble chart that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors.
    // Use otu_labels for the text values.



    // Display the sample metadata, i.e., an individual's demographic information.

    // Display each key-value pair from the metadata JSON object somewhere on the page.

    // Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:

    // Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

}); //close wrapped promise

