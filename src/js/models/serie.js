(function() {
  var Models = Marionette.HighCharts.models;

  var Serie = Marionette.HighCharts.models.Serie = Backbone.Model.extend({

    constructor: function (attrs) {
      Backbone.Model.prototype.constructor.apply(this, arguments);
      this.highChartsId = (attrs || {}).highChartsId || parseInt(_.uniqueId());
    },

    toHighChartsData: function () {
      return $.extend(true, {}, this.toJSON(), {id: this.highChartsId});
    },

    addPoint: function (pt) {
      this.set('data', this.get('data').concat([pt]), {silent: true});
      this.trigger('add:point', this, pt);
    }
  });


  Marionette.HighCharts.models.SerieCollection = Backbone.Collection.extend({
    model: Serie,

    toHighChartsData: function () {
      return this.map(function (serie) {
        return serie.toHighChartsData();
      });
    }
  });
})();