import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { ScatterRpmComponent } from './scatter-rpm/scatter-rpm.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent,
    ScatterPlotComponent,
    ScatterRpmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
