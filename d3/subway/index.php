<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <base href="/d3/subway/" target="" />
    <link rel="stylesheet" href="train_colours.css" title="" type="text/css" />
    <style type="text/css" media="all">
      .axis path, .line{
        stroke:black; }
      .line { float:left;
        } .line_container{
        width: 150px;
        height: 20px; }
      path{
        fill: none;
        } .key{
        float:right; }
      .key_line{
        font-size:17px;
        width:100%; }
      .key_line:hover{
        color: lightgray;
        cursor: pointer;
      }
      .key_square{ height:10px;
        width:10px;
        outline:solid 1px black; float:left;
        margin: 6px 10px 0px 10px;
        } #timeseries{
        float:left;
      }
      #timeseries .chart-line path{
        stroke-width:3px; }
      #timeseries .chart-line circle{ stroke: white;
      }
      #timeseries .chart-line text{
        fill: white;
        stroke: none; font-size:12px; font-weight: bold;
      }
    </style>
    <script src="d3.js"></script>
    <script>
      // Make these global so that we have access to them across functions
      var time_scale, percent_scale, g;

      function draw(data) {
        "use strict";
        // badass visualization code goes here
        var container_dimensions = {width: 900, height: 400},
            margins = {top: 10, right: 20, bottom: 30, left: 60},
            chart_dimensions = {
              width: container_dimensions.width - margins.left - margins.right,
              height: container_dimensions.height - margins.top - margins.bottom
            };

        var chart = d3.select("#timeseries")
          .append("svg")
            .attr("width", container_dimensions.width)
            .attr("height", container_dimensions.height)
          .append("g")
            .attr("transform", "translate(" + margins.left + "," + margins.top + ")")
            .attr("id","chart");

        //Build the axes
        time_scale = d3.time.scale()
          .range([0,chart_dimensions.width])
          .domain([new Date(2009, 0, 1), new Date(2011, 3, 1)]);

        percent_scale = d3.scale.linear()
          .range([chart_dimensions.height, 0])
          .domain([65,90]);

        var time_axis = d3.svg.axis()
          .scale(time_scale);
        var count_axis = d3.svg.axis()
          .scale(percent_scale)
          .orient("left");

        chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + chart_dimensions.height + ")")
          .call(time_axis);
        chart.append("g")
          .attr("class", "y axis")
          .call(count_axis);

        d3.select(".y.axis")
          .append("text")
          .attr("text-anchor","middle")
          .text("percent on time")
          .attr("transform", "rotate (-270, 0, 0)")
          .attr("x", container_dimensions.height/2)
          .attr("y", 50);

        // Build out keys
        var key_items = d3.select("#key")
          .selectAll("div")
          .data(data)
          .enter()
          .append("div")
            .attr("class","key_line")
            .attr("id",function(d){return d.line_id});

        key_items.append("div")
          .attr("id", function(d){return "key_square_" + d.line_id})
          .attr("class", function(d){return "key_square " + d.line_id});

        key_items.append("div")
          .attr("class","key_label")
          .text(function(d){return d.line_name});

        // Click Handlers
        d3.selectAll(".key_line")
          .on("click", get_timeseries_data);
      }

      function get_timeseries_data(){
        // get the id of the current element
        var id = d3.select(this).attr("id");
        // see if we have an associated time series
        var ts = d3.select("#"+id+"_path");
        if (ts.empty()){
          d3.json("subway_wait.json", function(data){
            var filtered_data = data.filter(function(d){return d.line_id === id});
            draw_timeseries(filtered_data, id);
          })
        } else {
          ts.remove();
        }
      }

      function draw_timeseries(data, id){
        var line = d3.svg.line()
          .x(function(d){return time_scale(d.time)})
          .y(function(d){return percent_scale(d.late_percent)})
          .interpolate("linear");

        g = d3.select("#chart")
          .append("g")
          .attr("id", id + "_path")
          .attr("class", function(d){ return id + " chart-line"; });

        g.append("path")
          .attr("d", line(data))

        g.selectAll("circle")
          .data(data)
          .enter() .append("circle")
          .attr("cx", function(d) {return time_scale(d.time)})
          .attr("cy", function(d) {return percent_scale(d.late_percent)})
          .attr("r",0);

        var enter_duration = 1000;
        g.selectAll("circle")
          .transition()
          .delay(function(d, i) { return i / data.length * enter_duration; })
          .attr("r", 5)
          .each("end",function(d,i){
            if (i === data.length-1){
              add_label(this,d);
            }
          });

        // Mouseover effects

        g.selectAll("circle")
          .on("mouseover", function(d){
            d3.select(this)
            .transition()
            .attr("r",9);
          })
          .on("mouseout", function(d, i){
            if (i !== data.length-1) {
              d3.select(this).transition().attr("r", 5);
            }
          });

        g.selectAll("circle")
          .on("mouseover.tooltip", function(d){
            d3.select("text#" + d.line_id).remove();
            d3.select("#chart")
            .append("text")
              .text(d.late_percent + "%")
              .attr("x", time_scale(d.time) + 10)
              .attr("y", percent_scale(d.late_percent) - 10)
              .attr("id", d.line_id);
          })
          .on("mouseout.tooltip", function(d){
            d3.select("text#" + d.line_id)
              .transition()
              .duration(500)
              .style("opacity",0)
              .attr("transform","translate(10, -10)")
              .remove();
          });
      }

      function add_label(circle, d){
        d3.select(circle)
        .transition()
        .attr("r", 9);

        g.append("text")
          .text(d.line_id.split("_")[1])
          .attr("x", time_scale(d.time))
          .attr("y", percent_scale(d.late_percent))
          .attr("dy", "0.35em")
          .attr("class","linelabel")
          .attr("text-anchor","middle")
          .style("opacity", 0)
          .style("fill", "white")
          .transition()
            .style("opacity", 1);
      }
    </script>
  </head>
  <body>
    <div id="timeseries"></div>
    <div id="key"></div>
    <script>
      d3.json("subway_wait_mean.json", draw);
    </script>
    <?php include '../../analytics.php'; ?>
  </body>
</html>
