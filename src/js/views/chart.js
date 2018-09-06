
(function(Views) {
  Views.Chart = Marionette.ItemView.extend({
    template: false,

    highChartsEvents: {},

    getHighChartsEvents: function() {
      return _.reduce(this.highChartsEvents, function(res, callback, event) {
        res[event] = _.bind(this[callback], this);
        return res;
      }, {}, this);
    },

    initialize: function(options) {
      options = options || {};
      this.stockChart = options.stockChart || false;
      this.initializeHighCharts();
      this.bindHighChartsEvents();
    },

    initializeHighCharts: function() {
      var highChartsOptions = $.extend(true, {
        series: this.collection.toHighChartsData(),
        chart: {
          events: this.getHighChartsEvents()
        }
      }, this.model.toJSON());

      if (this.stockChart) {
        this.$el.highcharts('StockChart', highChartsOptions);
      } else if (this.map) {
        this.$el.highcharts('Map', highChartsOptions);
      } else {
        this.$el.highcharts(highChartsOptions);
      }
    },

    onShow: function() {
      this.$el.highcharts().redraw();
    },

    bindHighChartsEvents: function() {
      this.listenTo(this.collection, 'add', this.onAddSerie);
      this.listenTo(this.collection, 'remove', this.onRemoveSerie);
      this.listenTo(this.collection, 'reset', this.render);

      this.collection.each(this.bindHighChartsSerieEvents, this);
    },

    bindHighChartsSerieEvents: function(serie) {
      this.listenTo(serie, 'change', this.onSerieChange);
      this.listenTo(serie, 'add:point', this.onSerieAddPoint);
    },

    unbindHighChartsSerieEvents: function(serie) {
      this.stopListening(serie);
    },

    onSerieAddPoint: function(model, pt) {
      var serie = _.find(this.$el.highcharts().series, function(serie) { return serie.options.id === model.highChartsId; });
      serie.addPoint(pt);
    },

    onSerieChange: function(model) {
      var changes = model.changed,
        nbChanges = _.keys(changes).length,
        serie = _.find(this.$el.highcharts().series, function(serie) { return serie.options.id === model.highChartsId; });

      if (nbChanges === 1 && changes.data)  {
        serie.setData(model.get('data'));
      } else if (nbChanges === 1 && changes.visible) {
        serie.setVisible(model.get('visible'));
      } else if (nbChanges === 2 && changes.visible && changes.data) {
        serie.setData(model.get('data'));
        serie.setVisible(model.get('visible'));
      } else {
        serie.update(changes);
      }
    },

    onAddSerie: function(model) {
      this.$el.highcharts().addSeries(model.toJSON(), { id: model.id || model.cid });
      this.bindHighChartsSerieEvents(model);
    },

    onRemoveSerie: function(model) {
      _.find(this.$el.highcharts().series, function(serie) { return serie.options.id === model.highChartsId; }).remove();
      this.unbindHighChartsSerieEvents(model);
    },

    onBeforeDestroy: function() {
      this.$el.highcharts().destroy();
    }
  });
})(Marionette.HighCharts.views);
