// --- Margin convention
var M = {top:10, right:0, bottom:50, left:0};
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
  .range([h, 0])
  .domain(rxrR);

var scaleTSS = d3.scaleLinear()
  .range([h, 0])
  .domain(tssR);

var scaleGB = d3.scaleLinear()
  .range([h, 0])
  .domain(gbR);

var scaleTE1K = d3.scaleLinear()
    .range([h, 0])
    .domain(te1kR);

var scaleTE2K = d3.scaleLinear()
    .range([h, 0])
    .domain(te2kR);

var scaleTE3K = d3.scaleLinear()
    .range([h, 0])
    .domain(te3kR);

var scaleTE4K = d3.scaleLinear()
    .range([h, 0])
    .domain(te4kR);

var scaleTE5K = d3.scaleLinear()
    .range([h, 0])
    .domain(te5kR);

var scaleMA = d3.scaleLinear()
    .range([h,0])
    .domain(maR);



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
        .y(function(d){return d!=NaN ;});

        var plotg = plot.append("path")
                    // .attr("class", "line")
                    .attr("d", line(value))
                    .attr("stroke-width", 1)
                    .attr("stroke", "black")
                    .attr("fill","none");
    });
});


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
