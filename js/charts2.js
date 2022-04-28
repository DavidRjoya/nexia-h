var barOptions_stacked = {
    tooltips: {
        enabled: false
    },
    hover :{
        animationDuration:0
    },
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true,
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            scaleLabel:{
                display:false
            },
            gridLines: {
            }, 
            stacked: true
        }],
        yAxes: [{
            gridLines: {
                display:false,
                color: "#EEE",
                zeroLineColor: "#EEE",
                zeroLineWidth: 0
            },
            ticks: {
                fontFamily: "'Open Sans Bold', sans-serif",
                fontSize:11
            },
            stacked: true
        }]
    },
    legend:{
        display:false
    },
    
    animation: {
        onComplete: function () {
            var chartInstance = this.chart;
            var ctx = chartInstance.ctx;
            ctx.textAlign = "left";
            ctx.font = "9px Open Sans";
            ctx.fillStyle = "#EEE";

            Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                Chart.helpers.each(meta.data.forEach(function (bar, index) {
                    data = dataset.data[index];
                    if(i==0){
                        ctx.fillText(data, 50, bar._model.y+4);
                    } else {
                        ctx.fillText(data, bar._model.x-25, bar._model.y+4);
                    }
                }),this)
            }),this);
        }
    },
    pointLabelFontFamily : "Quadon Extra Bold",
    scaleFontFamily : "Quadon Extra Bold",
};

var ctx = document.getElementById("Chart1");
var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ["2022", "2021", "2020", "2019"],
        
        datasets: [{
            data: [727, 589, 537, 200, 574],
            backgroundColor: "rgba(63,103,126,1)",
            hoverBackgroundColor: "rgba(50,90,100,1)"
        },{
            data: [238, 553, 532, 324, 903],
            backgroundColor: "rgba(163,103,126,1)",
            hoverBackgroundColor: "rgba(140,85,100,1)"
        },{
            data: [1238, 685, 592, 500, 903],
            backgroundColor: "rgba(63,203,226,1)",
            hoverBackgroundColor: "rgba(46,185,235,1)"
        }]
    },

    options: barOptions_stacked,
});