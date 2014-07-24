define(['jquery', 'underscore', 'backbone', 'text!templates/modal-friend-list.html!strip', 'bootstrap'], function ($, _, Backbone, template) {
    return Backbone.View.extend({
        el: 'body',
        template: _.template(template),
        events: {
            'change #filter-options input[type="checkbox"]': "filterChanged"
        },
        initialize: function () {
        },
        render: function (data) {
            this.__data = data;

            $('.modal').modal('hide');


            if(this.$el.find('#modal-friend-list, .modal-backdrop'))
                this.$el.find('#modal-friend-list .modal-backdrop').remove();



            this.$el.append(this.template())
                .find('#modal-friend-list')
                .modal('show');


            return this.$el;
        },
        filterChanged: function (e) {
            var $target = this.$el.find('#filter-options input[type="checkbox"]');

            var selected = [];
            $target.filter(':checked').each(function (idx, elem) {
                selected.push($(elem).val());
            });

            this.applyFilter(selected);
        },
        applyFilter: function (methods) {
            console.log("applyFilter:: called", methods);
            var $heading = this.$el.find('#friend-list-heading'),
                $target = this.$el.find('#friend-list'),
                template = _.template('<li class="list-group-item text-center"><div class="row"><div class="col-xs-2"><img class="img-rounded img-responsive" src="<%=picture.data.url%>" alt="<%=name%>님의 프로필사진"></div> <div class="col-xs-7"><%=name%><br><span class="text-muted"><%=hometown ? (hometown.name + " 출신") : "출신지 정보없음" %>, <%= location ? (location.name + " 거주") : "거주지 정보없음"%> </span><br><span class="text-muted">(Locale: <%= (locale || "정보없음") %>, Language: <%= (languages ? _.pluck(languages, "name").join("/") : "정보없음") %>)</div><div class="col-xs-3"><a class="btn btn-primary" href="https://www.facebook.com/profile.php?id=<%=id%>" target="_blank">담벼락<br>바로가기</a></div></div></div></li>'),
                filters = {
                    language: function (item) {
                        if(! item['languages']) return true;
                        if(item['languages'].length === 0) return true;

                        var languages = _.pluck(item['languages'], 'name');

                        return !(_.contains(languages, "Korean") || _.contains(languages, "한글") || _.contains(languages, "한국어"));
                    },
                    locale: function (item) {
                        if(! item['locale']) return true;

                        return item['locale'] !== "ko_KR";
                    },
                    hometown: function (item) {
                        if(! item['hometown']) return true;

                        var hangulRegex = /[ㄱ-ㅎ가-힣]+/gi;

                        return !(item['hometown']['name'].match(hangulRegex));
                    },
                    location: function (item) {
                        if(! item['location']) return true;

                        var hangulRegex = /[ㄱ-ㅎ가-힣]+/gi;

                        return !(item['location']['name'].match(hangulRegex));
                    },
                    name: function (item) {
                        var hangulRegex = /[ㄱ-ㅎ가-힣]+/gi;

                        return !(item['name'].match(hangulRegex));
                    }
                };


            var filteredItems = this.__data;
            _.each(methods, function (method) {
                filteredItems = _.filter(filteredItems, filters[method]);
                console.log("after filter length: %d", filteredItems.length);
            });

            var combinedHTML = "";
            _.each(filteredItems, function (item) {
                if(! item['languages']) item['languages'] = null;
                if(! item['hometown']) item['hometown'] = null;
                if(! item['location']) item['location'] = null;

                combinedHTML += template(item);
            });
            $heading.html('<code>조건에 일치하는 친구가 ' + filteredItems.length + '명 있습니다.</code>')
            $target.html(combinedHTML);
        }
    });
});