var BaseChartFactory = (function () {
    return {
        createChart: function (type, options, cols, rows) {
            var chart = {};
            chart.type = type;
            chart.options = options;
            chart.data = {};
            chart.data.cols = cols;
            chart.data.rows = rows;
            chart.formatters = {
                "number": [
                    {
                        "columnNum": 1,
                        }
                    ]
            }

            return chart;
        },
        createOptions: function (title, hAxisTitle, vAxisTitle, minZero) {
            var options = {
                title: title,
                curveType: 'function',
                vAxis: {
                    title: vAxisTitle,
                    viewWindowMode: 'explicit',
                    viewWindow: function () {
                        if (minZero) return {
                            min: 0
                        };
                        else return {};
                    }
                },
                hAxis: {
                    title: hAxisTitle,
                    format: 'HH:mm MMM d, y'
                },
                animation: {
                    duration: 1000,
                    easing: 'in'
                },
                legend: 'none',
                'chartArea': {
                    'width': '90%',
                    'height': '80%'
                },
            }

            return options;
        }
    }
}());