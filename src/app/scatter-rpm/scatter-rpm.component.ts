import { Component, OnInit } from '@angular/core';
import { DataService, RpmData } from '../data.service';
import * as d3 from 'd3';
import { style } from 'd3';


@Component({
  selector: 'app-scatter-rpm',
  templateUrl: './scatter-rpm.component.html',
  styleUrls: ['./scatter-rpm.component.css']
})
export class ScatterRpmComponent implements OnInit {

  testData: RpmData[];
  margin = { top: 10, right: 30, bottom: 30, left: 60 };
  width = 460 - this.margin.left - this.margin.right;
  height = 400 - this.margin.top - this.margin.bottom;

  private svg: any;
  private x: any;
  private y: any;
  private tooltip: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.svg = d3.select('#rpm')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')');
    this.dataService.getRpmTestData()
      .subscribe((data: RpmData[]) => {
        this.testData = data;
        console.log(this.testData);
        this.addXAxis();
        this.addYaxis();
        this.addDots();
      });
    this.tooltip = d3.select('#rpm')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '1px')
      .style('border-radius', '5px')
      .style('padding', '10px')
      .style('position', 'absolute');
  }

  addXAxis() {
    this.x = d3.scaleLinear()
      .domain([0, 5])
      .range([0, this.width]);
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.x));
  }

  addYaxis() {
    this.y = d3.scaleLinear()
      .domain([0, 5])
      .range([this.height, 0]);
    this.svg.append('g')
      .call(d3.axisLeft(this.y));
  }

  mouseOver() {
    this.tooltip
      .style('opacity', 1);
  }

  mouseMove(d: RpmData) {
    this.tooltip
      .html('Testing values: ' + d.xValue + ' ' + d.yValue)
      .style('left', (d3.event.x) + 'px')
      .style('top', (d3.event.y + 15) + 'px');
  }

  mouseLeave() {
    this.tooltip
      .transition()
      .duration(200)
      .style('opacity', 0);
  }

  addDots() {
    this.svg.append('g')
      .selectAll('dot')
      .data(this.testData)
      .enter()
      .append('circle')
      .attr('cx', (d: RpmData) => this.x(d.xValue))
      .attr('cy', (d: RpmData) => this.y(d.yValue))
      .attr('r', (d: RpmData) => d.isSelfDot ? 6 : 3)
      .style('fill', (d: RpmData) => d.isSelfDot ? 'green' : 'gray')
      .on('mouseover', () => {this.mouseOver(); })
      .on('mousemove', (d: RpmData) => {this.mouseMove(d); })
      .on('mouseleave', () => {this.mouseLeave(); });
  }

}
