Template.afSummernote.created = function () {
  this.value = new ReactiveVar(this.data.value);
};

Template.afSummernote.rendered = function() {
  var self = this;
  var options = this.data.atts.settings || {};
  var $editor = self.$('div').first();

  this.autorun(function () {
    var data = Template.currentData();
    self.value.set(data.value);
  });

  var onblur = options.onblur;
  options.onBlur = function(e) {
    $editor.trigger('change');
    if (typeof onblur === 'function') {
      onblur.apply(this, arguments);
    }
  };

  $editor.summernote(options);

  this.autorun(function () {
    $editor.code(self.value.get());
  });

  $editor.closest('form').on('reset', function() {
    $editor.code('');
  });
};

Template.afSummernote.helpers({
  atts: function () {
    return _.omit(this.atts, 'settings');
  }
});