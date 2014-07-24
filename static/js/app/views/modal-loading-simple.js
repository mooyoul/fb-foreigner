define(['underscore', 'backbone', 'text!templates/modal-loading-simple.html!strip', 'bootstrap'], function (_, Backbone, template) {
    return Backbone.View.extend({
        el: 'body',
        template: _.template(template),
        events: {
        },
        initialize: function () {

        },
        render: function (model) {
            $('.modal').modal('hide');


            if(this.$el.find('#modal-loading-simple, .modal-backdrop'))
                this.$el.find('#modal-loading-simple, .modal-backdrop').remove();



            this.$el.append(this.template(model))
                .find('#modal-loading-simple')
                .modal('show');

            return this.$el;
        },
        remove: function (isHideBeforeRemove) {
            var $target = this.$el.find('#modal-loading-simple');
            if(isHideBeforeRemove) {
                $target.on('hidden.bs.modal', function () {
                    $target.remove();
                });
            } else {
                $target.remove();
                this.$el.find('.modal-backdrop').remove();
            }

        }
    });
});