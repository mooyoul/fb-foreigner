/**
 * Created by Prescott on 14. 5. 12.
 */

define([], function () {
    return {
        basename: function (path, suffix) {
            // http://kevin.vanzonneveld.net
            // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Ash Searle (http://hexmen.com/blog/)
            // +   improved by: Lincoln Ramsay
            // +   improved by: djmix
            // *     example 1: basename('/www/site/home.htm', '.htm');
            // *     returns 1: 'home'
            // *     example 2: basename('ecra.php?p=1');
            // *     returns 2: 'ecra.php?p=1'
            var b = path.replace(/^.*[\/\\]/g, '');

            if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
                b = b.substr(0, b.length - suffix.length);
            }

            return b;
        },
        number_format: function (number, decimals, dec_point, thousands_sep) {
            // http://kevin.vanzonneveld.net
            // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +     bugfix by: Michael White (http://getsprink.com)
            // +     bugfix by: Benjamin Lupton
            // +     bugfix by: Allan Jensen (http://www.winternet.no)
            // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
            // +     bugfix by: Howard Yeend
            // +    revised by: Luke Smith (http://lucassmith.name)
            // +     bugfix by: Diogo Resende
            // +     bugfix by: Rival
            // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
            // +   improved by: davook
            // +   improved by: Brett Zamir (http://brett-zamir.me)
            // +      input by: Jay Klehr
            // +   improved by: Brett Zamir (http://brett-zamir.me)
            // +      input by: Amir Habibi (http://www.residence-mixte.com/)
            // +     bugfix by: Brett Zamir (http://brett-zamir.me)
            // +   improved by: Theriault
            // +      input by: Amirouche
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // *     example 1: number_format(1234.56);
            // *     returns 1: '1,235'
            // *     example 2: number_format(1234.56, 2, ',', ' ');
            // *     returns 2: '1 234,56'
            // *     example 3: number_format(1234.5678, 2, '.', '');
            // *     returns 3: '1234.57'
            // *     example 4: number_format(67, 2, ',', '.');
            // *     returns 4: '67,00'
            // *     example 5: number_format(1000);
            // *     returns 5: '1,000'
            // *     example 6: number_format(67.311, 2);
            // *     returns 6: '67.31'
            // *     example 7: number_format(1000.55, 1);
            // *     returns 7: '1,000.6'
            // *     example 8: number_format(67000, 5, ',', '.');
            // *     returns 8: '67.000,00000'
            // *     example 9: number_format(0.9, 0);
            // *     returns 9: '1'
            // *    example 10: number_format('1.20', 2);
            // *    returns 10: '1.20'
            // *    example 11: number_format('1.20', 4);
            // *    returns 11: '1.2000'
            // *    example 12: number_format('1.2000', 3);
            // *    returns 12: '1.200'
            // *    example 13: number_format('1 000,50', 2, '.', ' ');
            // *    returns 13: '100 050.00'
            // Strip all characters but numerical ones.
            number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function (n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.round(n * k) / k;
                };
            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        date: function (format, timestamp) {
            // http://kevin.vanzonneveld.net
            // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
            // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: MeEtc (http://yass.meetcweb.com)
            // +   improved by: Brad Touesnard
            // +   improved by: Tim Wiel
            // +   improved by: Bryan Elliott
            // +   improved by: David Randall
            // +      input by: Brett Zamir (http://brett-zamir.me)
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Theriault
            // +  derived from: gettimeofday
            // +      input by: majak
            // +   bugfixed by: majak
            // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: Alex
            // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
            // +   improved by: Theriault
            // +   improved by: Brett Zamir (http://brett-zamir.me)
            // +   improved by: Theriault
            // +   improved by: Thomas Beaucourt (http://www.webapp.fr)
            // +   improved by: JT
            // +   improved by: Theriault
            // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
            // +   bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
            // +      input by: Martin
            // +      input by: Alex Wilson
            // +      input by: Haravikk
            // +   improved by: Theriault
            // +   bugfixed by: Chris (http://www.devotis.nl/)
            // %        note 1: Uses global: php_js to store the default timezone
            // %        note 2: Although the function potentially allows timezone info (see notes), it currently does not set
            // %        note 2: per a timezone specified by date_default_timezone_set(). Implementers might use
            // %        note 2: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
            // %        note 2: in order to adjust the dates in this function (or our other date functions!) accordingly
            // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
            // *     returns 1: '09:09:40 m is month'
            // *     example 2: date('F j, Y, g:i a', 1062462400);
            // *     returns 2: 'September 2, 2003, 2:26 am'
            // *     example 3: date('Y W o', 1062462400);
            // *     returns 3: '2003 36 2003'
            // *     example 4: x = date('Y m d', (new Date()).getTime()/1000);
            // *     example 4: (x+'').length == 10 // 2009 01 09
            // *     returns 4: true
            // *     example 5: date('W', 1104534000);
            // *     returns 5: '53'
            // *     example 6: date('B t', 1104534000);
            // *     returns 6: '999 31'
            // *     example 7: date('W U', 1293750000.82); // 2010-12-31
            // *     returns 7: '52 1293750000'
            // *     example 8: date('W', 1293836400); // 2011-01-01
            // *     returns 8: '52'
            // *     example 9: date('W Y-m-d', 1293974054); // 2011-01-02
            // *     returns 9: '52 2011-01-02'
            var that = this,
                jsdate,
                f,
            // Keep this here (works, but for code commented-out
            // below for file size reasons)
            //, tal= [],
                txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            // trailing backslash -> (dropped)
            // a backslash followed by any character (including backslash) -> the character
            // empty string -> empty string
                formatChr = /\\?(.?)/gi,
                formatChrCb = function (t, s) {
                    return f[t] ? f[t]() : s;
                },
                _pad = function (n, c) {
                    n = String(n);
                    while (n.length < c) {
                        n = '0' + n;
                    }
                    return n;
                };
            f = {
                // Day
                d: function () { // Day of month w/leading 0; 01..31
                    return _pad(f.j(), 2);
                },
                D: function () { // Shorthand day name; Mon...Sun
                    return f.l().slice(0, 3);
                },
                j: function () { // Day of month; 1..31
                    return jsdate.getDate();
                },
                l: function () { // Full day name; Monday...Sunday
                    return txt_words[f.w()] + 'day';
                },
                N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
                    return f.w() || 7;
                },
                S: function(){ // Ordinal suffix for day of month; st, nd, rd, th
                    var j = f.j(),
                        i = j%10;
                    if (i <= 3 && parseInt((j%100)/10, 10) == 1) {
                        i = 0;
                    }
                    return ['st', 'nd', 'rd'][i - 1] || 'th';
                },
                w: function () { // Day of week; 0[Sun]..6[Sat]
                    return jsdate.getDay();
                },
                z: function () { // Day of year; 0..365
                    var a = new Date(f.Y(), f.n() - 1, f.j()),
                        b = new Date(f.Y(), 0, 1);
                    return Math.round((a - b) / 864e5);
                },

                // Week
                W: function () { // ISO-8601 week number
                    var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
                        b = new Date(a.getFullYear(), 0, 4);
                    return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
                },

                // Month
                F: function () { // Full month name; January...December
                    return txt_words[6 + f.n()];
                },
                m: function () { // Month w/leading 0; 01...12
                    return _pad(f.n(), 2);
                },
                M: function () { // Shorthand month name; Jan...Dec
                    return f.F().slice(0, 3);
                },
                n: function () { // Month; 1...12
                    return jsdate.getMonth() + 1;
                },
                t: function () { // Days in month; 28...31
                    return (new Date(f.Y(), f.n(), 0)).getDate();
                },

                // Year
                L: function () { // Is leap year?; 0 or 1
                    var j = f.Y();
                    return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
                },
                o: function () { // ISO-8601 year
                    var n = f.n(),
                        W = f.W(),
                        Y = f.Y();
                    return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
                },
                Y: function () { // Full year; e.g. 1980...2010
                    return jsdate.getFullYear();
                },
                y: function () { // Last two digits of year; 00...99
                    return f.Y().toString().slice(-2);
                },

                // Time
                a: function () { // am or pm
                    return jsdate.getHours() > 11 ? "pm" : "am";
                },
                A: function () { // AM or PM
                    return f.a().toUpperCase();
                },
                B: function () { // Swatch Internet time; 000..999
                    var H = jsdate.getUTCHours() * 36e2,
                    // Hours
                        i = jsdate.getUTCMinutes() * 60,
                    // Minutes
                        s = jsdate.getUTCSeconds(); // Seconds
                    return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
                },
                g: function () { // 12-Hours; 1..12
                    return f.G() % 12 || 12;
                },
                G: function () { // 24-Hours; 0..23
                    return jsdate.getHours();
                },
                h: function () { // 12-Hours w/leading 0; 01..12
                    return _pad(f.g(), 2);
                },
                H: function () { // 24-Hours w/leading 0; 00..23
                    return _pad(f.G(), 2);
                },
                i: function () { // Minutes w/leading 0; 00..59
                    return _pad(jsdate.getMinutes(), 2);
                },
                s: function () { // Seconds w/leading 0; 00..59
                    return _pad(jsdate.getSeconds(), 2);
                },
                u: function () { // Microseconds; 000000-999000
                    return _pad(jsdate.getMilliseconds() * 1000, 6);
                },

                // Timezone
                e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
                    // The following works, but requires inclusion of the very large
                    // timezone_abbreviations_list() function.
                    /*              return that.date_default_timezone_get();
                     */
                    throw 'Not supported (see source code of date() for timezone on how to add support)';
                },
                I: function () { // DST observed?; 0 or 1
                    // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
                    // If they are not equal, then DST is observed.
                    var a = new Date(f.Y(), 0),
                    // Jan 1
                        c = Date.UTC(f.Y(), 0),
                    // Jan 1 UTC
                        b = new Date(f.Y(), 6),
                    // Jul 1
                        d = Date.UTC(f.Y(), 6); // Jul 1 UTC
                    return ((a - c) !== (b - d)) ? 1 : 0;
                },
                O: function () { // Difference to GMT in hour format; e.g. +0200
                    var tzo = jsdate.getTimezoneOffset(),
                        a = Math.abs(tzo);
                    return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
                },
                P: function () { // Difference to GMT w/colon; e.g. +02:00
                    var O = f.O();
                    return (O.substr(0, 3) + ":" + O.substr(3, 2));
                },
                T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
                    // The following works, but requires inclusion of the very
                    // large timezone_abbreviations_list() function.
                    /*              var abbr = '', i = 0, os = 0, default = 0;
                     if (!tal.length) {
                     tal = that.timezone_abbreviations_list();
                     }
                     if (that.php_js && that.php_js.default_timezone) {
                     default = that.php_js.default_timezone;
                     for (abbr in tal) {
                     for (i=0; i < tal[abbr].length; i++) {
                     if (tal[abbr][i].timezone_id === default) {
                     return abbr.toUpperCase();
                     }
                     }
                     }
                     }
                     for (abbr in tal) {
                     for (i = 0; i < tal[abbr].length; i++) {
                     os = -jsdate.getTimezoneOffset() * 60;
                     if (tal[abbr][i].offset === os) {
                     return abbr.toUpperCase();
                     }
                     }
                     }
                     */
                    return 'UTC';
                },
                Z: function () { // Timezone offset in seconds (-43200...50400)
                    return -jsdate.getTimezoneOffset() * 60;
                },

                // Full Date/Time
                c: function () { // ISO-8601 date.
                    return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
                },
                r: function () { // RFC 2822
                    return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
                },
                U: function () { // Seconds since UNIX epoch
                    return jsdate / 1000 | 0;
                }
            };
            this.date = function (format, timestamp) {
                that = this;
                jsdate = (timestamp === undefined ? new Date() : // Not provided
                    (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                        new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
                    );
                return format.replace(formatChr, formatChrCb);
            };
            return this.date(format, timestamp);
        },
        strtotime: function (text, now) {
            // Convert string representation of date and time to a timestamp
            //
            // version: 1109.2015
            // discuss at: http://phpjs.org/functions/strtotime
            // +   original by: Caio Ariede (http://caioariede.com)
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +      input by: David
            // +   improved by: Caio Ariede (http://caioariede.com)
            // +   bugfixed by: Wagner B. Soares
            // +   bugfixed by: Artur Tchernychev
            // +   improved by: A. Matías Quezada (http://amatiasq.com)
            // +   improved by: preuter
            // +   improved by: Brett Zamir (http://brett-zamir.me)
            // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
            // *     example 1: strtotime('+1 day', 1129633200);
            // *     returns 1: 1129719600
            // *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
            // *     returns 2: 1130425202
            // *     example 3: strtotime('last month', 1129633200);
            // *     returns 3: 1127041200
            // *     example 4: strtotime('2009-05-04 08:30:00');
            // *     returns 4: 1241418600
            var parsed, match, year, date, days, ranges, len, times, regex, i;

            if (!text) {
                return null;
            }

            // Unecessary spaces
            text = text.trim()
                .replace(/\s{2,}/g, ' ')
                .replace(/[\t\r\n]/g, '')
                .toLowerCase();

            if (text === 'now') {
                return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
            }
            if (!isNaN(parsed = Date.parse(text))) {
                return parsed / 1000 | 0;
            }
            if (text === 'now') {
                return new Date().getTime() / 1000; // Return seconds, not milli-seconds
            }
            if (!isNaN(parsed = Date.parse(text))) {
                return parsed / 1000;
            }

            match = text.match(/^(\d{2,4})-(\d{2})-(\d{2})(?:\s(\d{1,2}):(\d{2})(?::\d{2})?)?(?:\.(\d+)?)?$/);
            if (match) {
                year = match[1] >= 0 && match[1] <= 69 ? +match[1] + 2000 : match[1];
                return new Date(year, parseInt(match[2], 10) - 1, match[3],
                    match[4] || 0, match[5] || 0, match[6] || 0, match[7] || 0) / 1000;
            }

            date = now ? new Date(now * 1000) : new Date();
            days = {
                'sun': 0,
                'mon': 1,
                'tue': 2,
                'wed': 3,
                'thu': 4,
                'fri': 5,
                'sat': 6
            };
            ranges = {
                'yea': 'FullYear',
                'mon': 'Month',
                'day': 'Date',
                'hou': 'Hours',
                'min': 'Minutes',
                'sec': 'Seconds'
            };

            function lastNext(type, range, modifier) {
                var diff, day = days[range];

                if (typeof day !== 'undefined') {
                    diff = day - date.getDay();

                    if (diff === 0) {
                        diff = 7 * modifier;
                    }
                    else if (diff > 0 && type === 'last') {
                        diff -= 7;
                    }
                    else if (diff < 0 && type === 'next') {
                        diff += 7;
                    }

                    date.setDate(date.getDate() + diff);
                }
            }
            function process(val) {
                var splt = val.split(' '), // Todo: Reconcile this with regex using \s, taking into account browser issues with split and regexes
                    type = splt[0],
                    range = splt[1].substring(0, 3),
                    typeIsNumber = /\d+/.test(type),
                    ago = splt[2] === 'ago',
                    num = (type === 'last' ? -1 : 1) * (ago ? -1 : 1);

                if (typeIsNumber) {
                    num *= parseInt(type, 10);
                }

                if (ranges.hasOwnProperty(range) && !splt[1].match(/^mon(day|\.)?$/i)) {
                    return date['set' + ranges[range]](date['get' + ranges[range]]() + num);
                }
                if (range === 'wee') {
                    return date.setDate(date.getDate() + (num * 7));
                }

                if (type === 'next' || type === 'last') {
                    lastNext(type, range, num);
                }
                else if (!typeIsNumber) {
                    return false;
                }
                return true;
            }

            times = '(years?|months?|weeks?|days?|hours?|minutes?|min|seconds?|sec' +
                '|sunday|sun\\.?|monday|mon\\.?|tuesday|tue\\.?|wednesday|wed\\.?' +
                '|thursday|thu\\.?|friday|fri\\.?|saturday|sat\\.?)';
            regex = '([+-]?\\d+\\s' + times + '|' + '(last|next)\\s' + times + ')(\\sago)?';

            match = text.match(new RegExp(regex, 'gi'));
            if (!match) {
                return false;
            }

            for (i = 0, len = match.length; i < len; i++) {
                if (!process(match[i])) {
                    return false;
                }
            }

            // ECMAScript 5 only
            //if (!match.every(process))
            //    return false;

            return (date.getTime() / 1000);
        }
    };
});