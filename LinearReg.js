var LinearReg = {};

var NewData = new Array(9);
var lm = [];

LinearReg.setData = function (array) {
    array.forEach(function (element, i) {
        NewData[i] = element;
        //   console.log('console log data' + i + ' array' + NewData[i])
    });
    LinearReg.setlm(array);
    LinearReg.run();
};

LinearReg.setlm = function (array) {
    //     var x= 0;
    //     var y= 0;
    //     var Xminmax= [100,0];
    //     var yminmax= [100,0];
    //     array.forEach(function (element, i) {
    // if (element[0]>Xminmax[1]) Xminmax[1] = element[0];
    // if (element[0]>Xminmax[1]) Xminmax[1] = element[0];
    // if (element[0]>Xminmax[1]) Xminmax[1] = element[0];
    // if (element[0]>Xminmax[1]) Xminmax[1] = element[0];

    //         x.push(element[0]);
    //         y.push(element[1]);
    //     });
    //     console.log('console log lm ' + lm)
    //     LinearCalc.linearRegression()
    //     LinearReg.run();
    array.forEach(function (element, i) {
        element.forEach(function(elm) {
            lm.push(elm);
        });
    });

};

LinearReg.linearRegression = function (x, y) {

    var sumX = 0;
    var sumY = 0;
    var sumXY = 0;
    var sumXX = 0;

    var n = x.length;
    for (var i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumXX += x[i] * x[i];
    };
    var b = (sumXY - (sumX * sumY) / n) / (sumXX - (sumX * sumX / n));
    var a = ((sumY - sumX * b) / n);

    return function (x) { return a + b * x };
};

LinearReg.run = function () {
    Highcharts.chart('container', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'F-Score Returns'
        },
        xAxis: {
            title: {
                enabled: true,
                text: []
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Returns ($)'
            }
        },
        // legend: {
        //     layout: 'vertical',
        //     align: 'left',
        //     verticalAlign: 'top',
        //     x: 100,
        //     y: 70,
        //     floating: true,
        //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        //     borderWidth: 1
        // },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point}</b><br>',
                    pointFormat: 'F={point.x}, Return={point.y}'
                }
            }
        },
        series: [{
            // type: 'line',
            // name: 'Regression Line',
            // color: 'rgba(255,50,50,1)',
            // data: lm,
            // marker: {
            //     enabled: false
            // },
            // states: {
            //     hover: {
            //         lineWidth: 1
            //     }
            // },
            // enableMouseTracking: false

            regression: true,
            regressionSettings: {
                type: 'linear',
                color: 'rgba(223,83,83,.9)',
                name: "%eq | r2: %r"
            },
            name: 'testinput',
            color: 'rgba(100, 130, 21320, .40)',
            data: lm
        }, {
            name: 'Energy',
            color: 'rgba(30, 0,255,.5)',
            data: NewData[0]
        }, {
            name: 'Material',
            color: 'rgba(226, 87, 30,.5)',
            data: NewData[1]
        }, {
            name: 'Industrial and Transportation',
            color: 'rgba(255, 127, 0,.5)',
            data: NewData[2]
        }, {
            name: 'Consumer Discretionary',
            color: 'rgba(255, 255, 0,.5)',
            data: NewData[3]
        }, {
            name: 'Consumer Staples',
            color: 'rgba(0, 255, 0,.5)',
            data: NewData[4]
        }, {
            name: 'Health Care',
            color: 'rgba(150, 191, 51,.5)',
            data: NewData[5]
        }, {
            name: 'Finance, Insurance, Real Estate, and Banking companies',
            color: 'rgba(140,25,215,.5)',
            data: NewData[6]
        }, {
            name: 'IT',
            color: 'rgba(0, 0, 255,.5)',
            data: NewData[7]
        }, {
            name: 'Telecommunications',
            color: 'rgba(75, 0, 130,.5)',
            data: NewData[8]
        }, {
            name: 'Utilities',
            color: 'rgba(139, 0, 255,.5)',
            data: NewData[9]
        }]
    })
}