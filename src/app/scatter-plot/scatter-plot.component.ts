import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {
  margin = {top: 10, right: 30, bottom: 30, left: 60};
  width = 460 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;

  private svg: any;
  private dataSet: any;
  private x: any;
  private y: any;
  private dataUrl = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv';

  constructor() {}

  ngOnInit() {
    this.svg = d3.select('#my_dataviz')
      .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
       .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
    d3.csv(this.dataUrl).then(data => {
      console.log(data)
      this.dataSet = data;
      this.addXAxis();
      this.addYaxis();
      this.addDots();
    });
  }

  addXAxis() {
    this.x = d3.scaleLinear()
      .domain([0, 4000])
      .range([0, this.width]);
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));
  }

  addYaxis() {
    this.y = d3.scaleLinear()
      .domain([0, 500000])
      .range([this.height, 0])
    this.svg.append('g')
      .call(d3.axisLeft(this.y));
  }

  addDots() {
    this.svg.append('g')
      .selectAll('dot')
      .data(this.dataSet)
      .enter()
      .append('circle')
        .attr('cx', d => {return this.x(d.GrLivArea);})
        .attr('cy', d => {return this.y(d.SalePrice);})
        .attr('r', 1.5)
        .style('fill', '#69b3a2');
  }

}
