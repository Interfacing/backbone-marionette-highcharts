# Backbone Marionette HighCharts
  A [Backbone Marionette](http://marionettejs.com/) wrapper around [HighCharts](http://www.highcharts.com/). 
## Features
  - Specifics model and collection extend from Backbone.Model/Collection.
  - Collection's events are handle by default `add`, `remove`, `reset`.
  - Model's events are handle by default `change`,`add:point`.
  - Customization is easy, you can extend or define your own options for specifics charts views.
  
## Dependencies
  - Marionette 2.x.x.
  - HighCharts 4+

## Installation
Include dependencies then the javascript file:
```
  <script src="backbone-marionette-highcharts.js"></script>
```  

## Example
1. Create your series:

```
  var series = new Marionette.HighCharts.models.SerieCollection([{
    name: 'Tokyo',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  }]);
```  
    
2. Define options for your charts
```
  var highchartsOptions = new Marionette.HighCharts.models.HighChartsOptions({
    title: {
      text: 'Monthly Average Temperature',
        x: -20 //center
    },
    subtitle: {
      text: 'Source: WorldClimate.com',
        x: -20
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      valueSuffix: '°C'
    },
    legend: {
      layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    }
  });
```

3. Create your chart
    
```
  new Marionette.HighCharts.views.Chart({
    el: '#main-container',
    collection: series,
    model: highchartsOptions
  });
```

Give a look at the (basic example)[https://github.com/Interfacing/backbone-marionette-highcharts/blob/master/example/basic/index.html] section for more informations.

## Options
List of options for the `Chart` view:
- **collection**: a collection of series `SerieCollection`.
- **model**: the model which is containing the chart configuration `HighChartsOptions`.

## Events
Override `highChartsEvents` to handle [chart's events](http://api.highcharts.com/highcharts#chart.events.load) in `Chart` view.

## Changelog

##### Version 0.2.0
  - Add option to use highstock (See demo basic-highstock)
  
##### Version 0.1.0
  - Initial commit
