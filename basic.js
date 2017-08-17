// --- Margin convention
var M = {top:5, right:0, bottom:5, left:10};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;

var w = outerWidth - M.left - M.right,
	h = outerHeight - M.top - M.bottom;
// console.log(h);

// --- appending svg to a div
var plot = d3.select('.canvas')
			.append('svg')
			.attr('width', outerWidth)
			.attr('height', outerHeight)
			.append('g')
		    .attr('transform','translate('+ M.left + ',' + M.top +')');

// --- Create SCALE

var rxrR = [1.100576 , 715.9621];
var tssR = [0 , 87.2];
var gbR = [0 , 129.59];
var te1kR = [0,148.436];
var te2kR = [0,136.52];
var te3kR = [0,140.316];
var te4kR = [0,142.1943];
var te5kR = [0,141.2014];
var maR = [2.499556 , 13.92267]
var scaleRXR = d3.scaleLinear()
  .range([h-10, 0])
  .domain(rxrR);

var scaleTSS = d3.scaleLinear()
  .range([h-10, 0])
  .domain(tssR);

var scaleGB = d3.scaleLinear()
  .range([h-10, 0])
  .domain(gbR);

var scaleTE1K = d3.scaleLinear()
    .range([h-10, 0])
    .domain(te1kR);

var scaleTE2K = d3.scaleLinear()
    .range([h-10, 0])
    .domain(te2kR);

var scaleTE3K = d3.scaleLinear()
    .range([h-10, 0])
    .domain(te3kR);

var scaleTE4K = d3.scaleLinear()
    .range([h-10, 0])
    .domain(te4kR);

var scaleTE5K = d3.scaleLinear()
    .range([h-10, 0])
    .domain(te5kR);

var scaleMA = d3.scaleLinear()
    .range([h-10,0])
    .domain(maR);

var yAxis = d3.axisRight(d3.scaleLinear().range([h-10,0]).domain([0,100]))
              .ticks(11);




// var x = [0,10, 20, 30, 40,50,60,70, 80,90, 100];

var label = [{"x":w/10  , "col":"#5b14ff","t":"RXR"} ,
             {"x":w*2/10, "col":"#ff0009","t":"Pol_TSS"} ,
             {"x":w*3/10, "col":"#ff6333","t":"Pol_GB"} ,
             {"x":w*4/10, "col":"#ff952a","t":"Pol_TE1K"} ,
             {"x":w*5/10, "col":"#ffc228","t":"Pol_TE2K"} ,
             {"x":w*6/10, "col":"#fff30e","t":"Pol_TE3K"} ,
             {"x":w*7/10, "col":"#c5ff15","t":"Pol_TE4K"} ,
             {"x":w*8/10, "col":"#5eff01","t":"Pol_TE5K"} ,
             {"x":w*9/10, "col":"#04ffd9","t":"mRNA"}];

// d3.queue()
//   .defer(d3.csv, 'pp.csv', parse)
//   .await(function(error, rows) {
//     console.log(rows);
// });
// --- Parse csv to row and process each
d3.csv('pp2.csv',function(error, rows) {

    rows.forEach(function(d){
      var value = [];
      value.push(scaleRXR(+d['qnorm.02']));
      value.push(scaleTSS(+d['Pol_TSS_02']));
      value.push(scaleGB(+d['Pol_gb_02']));
      value.push(scaleTE1K(+d['Pol_TE1K_02']));
      value.push(scaleTE2K(+d['Pol_TE2K_02']));
      value.push(scaleTE3K(+d['Pol_TE3K_02']));
      value.push(scaleTE4K(+d['Pol_TE4K_02']));
      value.push(scaleTE5K(+d['Pol_TE5K_02']));
      value.push(scaleMA(+d['ZT2']));
      console.log(value);

      var x = [w/10,w*2/10,w*3/10,w*4/10,w*5/10,w*6/10,w*7/10,w*8/10,w*9/10];
      var line = d3.line()
        .x(function(d,i){return (x[i]);})
        .y(function(d){return d ;});

        var plotg = plot.append("path")
                    // .attr("class", "line")
                    .attr("d", line(value))
                    .attr("stroke-width", 1)
                    .attr("stroke", "black")
                    .attr("fill","none");
    });
});
var text = plot.selectAll("text")
            .data(label)
            .enter()
            .append("text");

var textLabel = text
                  .attr("x", function(d,i){return d.x-10;})
                  .attr("y", 5)
                  .text( function (d,i) { return d.t; })
                  .attr("font-family", "sans-serif")
                  .attr("font-size", "12px")
                  .attr("fill", function (d,i) { return d.col; });

plot.append('g').call(yAxis);

function parse(d){
	return {
    rxr: +scaleRXR(+d['qnorm.02']),
    tss: +scaleTSS(+d['Pol_TSS_02']),
    gb: +scaleGB(+d['Pol_gb_02']),
    te1k: +scaleTE1K(+d['Pol_TE1K_02']),
    te2k: +scaleTE2K(+d['Pol_TE2K_02']),
    te3k: +scaleTE3K(+d['Pol_TE3K_02']),
    te4k: +scaleTE4K(+d['Pol_TE4K_02']),
    te5k: +scaleTE5K(+d['Pol_TE5K_02']),
    ma: +scaleMA(+d['ZT2']),
	};
}
