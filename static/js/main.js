/**
    Created by Moo Yeol, Lee (Prescott) @ 2014.05.01

    [Changelog]
    2014.02.24/ mordernizr updated to v2.7.1
    2014.02.24/ jquery updated to v1.11.0
    2014.02.24/ bootstrap updated to v3.1.1
    2014.02.24/ underscore (v1.6.0) added
    2014.02.24/ backbone (v1.1.2) added
    2014.02.24/ require (v2.1.11) added



    This script contains below js files.

    require                 v2.1.11
    require-text            v2.0.10
    modernizr               v2.7.1
    html5shiv               v3.7.0
    jquery                  v1.11.0
    bootstrap               v3.1.1
    underscore              v1.6.0
    backbone                v1.1.2
*/
require.config({
    paths: {
        'modernizr': 'lib/modernizr-custombuild',
        'html5shiv': 'lib/html5shiv-min',
        'jquery': 'lib/jquery-1.11.0.min',
        'bootstrap': 'lib/bootstrap.min',
        'underscore': 'lib/underscore-min',
        'backbone': 'lib/backbone-min',
        'facebook' : '//connect.facebook.net/en_US/all',
        'text': 'lib/text',
        'templates': '../templates'
    },
    shim: {
        'jquery-gritter': {
            deps: ["jquery"]
        },
        'bootstrap': {
            deps: ["jquery"]
        },
        'bootstrap-datepicker': {
            deps: ["jquery", "bootstrap"]
        },
        'bootstrap-timepicker': {
            deps: ["jquery", "bootstrap"]
        },
        'bootstrap-select': {
            deps: ["jquery", "bootstrap"]
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        facebook: {
            exports: 'FB'
        }
    }
});

require(['jquery', 'backbone', 'underscore', 'app/global', 'facebook',
    'app/views/modal-loading-simple', 'app/views/modal-friend-list'], function ($, Backbone, _, global, FB, LoadingModalView, FriendListModalView) {


    FB.init({
        appId      : 'YOUR_APP_ID'
    });


    FB.login(function(response) {
        if (response.authResponse) {
            console.log(response);
            var view = new LoadingModalView;
            view.render({
                title: "데이터를 불러오는 중입니다...",
                description: "페이스북 서버에서 친구목록을 요청하고 있습니다. 잠시만 기다려주세요..."
            });
            FB.api('/me', function(response) {
                console.log('Good to see you, ' + response.name + '.');
                FB.api('/v1.0/me/friends?fields=id,name,locale,location,hometown,languages,picture&locale=ko_KR', function (response) {
                    console.log("Friend List fetched.");

                    var view = new FriendListModalView;
                    view.render(response.data);
                });
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: "user_friends,friends_about_me,friends_activities,friends_education_history,friends_hometown,friends_location,friends_likes,friends_status,friends_religion_politics"});


});
