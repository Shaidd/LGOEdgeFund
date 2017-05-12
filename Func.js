var Func = {};
var analysischoise = [2]
var options;
var series = [];

Func.createseries = function (dataset) {
    var array = []
    for (var i = 0; i < 11; i++) {
        array[i] = [];
    };
    //for each [3] put first two variables in a dataset with same industry
    dataset.forEach(function (element) {
        array[Number(index[element[0]])].push([element[1], element[2]]);
    }); //return array of arrays for each industry with [fscore,return]
    LinearReg.setData(array);
    return array;
};


Func.analysis = function (method) {
    var industryarr = JSON.parse('[' + $('#selectInd').val() + ']');
    var selectHoldingP = JSON.parse('['+ $('#selectHoldingP').val() + ']'); //need to check if OK
//    if(industryarr == 'null')
    if (method != 2) {
        dataSet = Func.master(industryarr,JSON.parse(method),JSON.parse(selectHoldingP));
        series = Func.createseries(dataSet);
    };

    Func.createPlot(JSON.parse(method), series);
};

Func.createPlot = function (method, series) {
    if (method < 2) {
        LinearReg.setData(series);
    }
    else { ScatterPlot.run() };
};



Func.filterFunction = function () {
    var input, filter, ul, li, option, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    option = div.getElementsByTagName("option");
    for (i = 0; i < option.length; i++) {
        if (option[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            option[i].style.display = "";
        } else {
            option[i].style.display = "none";
        }
    }
};


var FSReturn = [];
var FSAvgReturn = [];

Func.master = function (indcode, method, selectHoldingP) {
    //Anuj helped considerably to write this code below...
    var focusCode;
    function f(d) {
        // d is each row from the data.input variable            
        // return alls the rows which have industry codes set by the industry codes
        // we remove the first year from calculating the change in F-Score
        // we remove the last year from calculating the 2nd year return value

        if (method == 1 && d[5] == "Year_1") {
            return;
        }
        else if (selectHoldingP == 1 && d[7] == "N/A") {
            return;
        }
        else { return parseInt(d[2]) == focusCode }

    };

    function m(d) {
        // d is each row from the filtered variable
        // i is the index of the row in filtered

        // find the firstIndex (whtehr its 5 or 6) and the secondIndex (whether its 7 or 8)
        var firstIndex = method;
        var secondIndex = selectHoldingP;

        if (firstIndex === 0) {
            firstIndex = 4;
        }
        else {
            firstIndex = 5;
        }

        if (secondIndex === 0) {
            secondIndex = 6;
        }
        else {
            secondIndex = 7;
        }
        array = [JSON.parse(d[2]), JSON.parse(d[firstIndex]), JSON.parse(d[secondIndex])];
        if(JSON.parse(d[firstIndex])<0){
            console.log(array);
        };
        return (array);
    }

    // loops over the data input and map it based on the looper function
    //results will be the array of all the industry information and analysis techniques
    var results = [];

    console.log(indcode);

    indcode.forEach(function (c) {
        //focusCode provides the individual industry within the webData[0] array
        focusCode = c;

        //filters over the data to grab only the industry
        var filtered = data.input.filter(f);

        //takes the filtered data and grabs the significant variables that we want within the row (depending on the analysis we want))
        var mapped = filtered.map(m);

        //pops out the array within the array and just makes mapped an array
        results = results.concat(mapped);
    });

    return results;
};


/*
Func.FScoreReturn = function (input) {
    //grabs the fScore and the return from the data base (fourth and sixth column)
    FSReturn.push(input[4], input[6]);
};

//loops over each of the arrays in the database and send it to the FScoreReturn function
data.input.forEach(FScoreReturn);


Func.average = function (input) {
    for (j = 0; j < 10; j++) {
        //loops over all FScores 1 through 9, clears the sum and the quantity each time
        var returnSum = 0;
        var count = 0;
        var newarray = [];
        for (i = 1; i < input.length; i = i + 2) {
            if (input[i - 1] == j) {
                //finds the total sum of the specific FScore (j) returns
                count += 1
                returnSum += Number(input[i])
            }
        }
        newarray.push(j, returnSum / count, count)
        //this will return an array with 27 items in it (one for each FScore)
        //the items are arranged within the array as follows: 1 = FScore, 2 = Avg return, 3 = No. of companies with that FScore
        FSAvgReturn.push(newarray)
    }
    return (FSAvgReturn)
}
console.log("FScore, Return, Qty of Companies " + average(FSReturn))

//---------------

//Change in F_score linked to one year avg return
var ChangeFSReturn = [];
function dFScoreReturn(input) {
    //grabs the fScore and the return from the data base (fourth and sixth column)
    ChangeFSReturn.push(input[5], input[6]);
}

//loops over each of the arrays in the database and send it to the FScoreReturn function
data.input.forEach(dFScoreReturn);

ChangeFSAvgReturn = [];
function changeAverage(input) {
    for (j = -7; j < 7; j++) {
        //loops over all change in FScores -7 through 7, clears the sum and the quantity each time
        var returnSum = 0;
        var count = 0;
        var newarray = [];
        for (i = 1; i < input.length; i = i + 2) {
            if (input[i] == "Year_1") {
                //skip this, ie add nothing to array
            } else if (input[i - 1] == j) {
                //finds the total sum of the specific FScore (j) returns
                count += 1
                returnSum += Number(input[i])
            }
        }
        newarray.push(j, returnSum / count, count)
        //this will return an array with 27 items in it (one for each FScore)
        //the items are arranged within the array as follows: 1 = Change in FScore, 2 = Avg return, 3 = No. of companies with that FScore
        ChangeFSAvgReturn.push(newarray)
    }
    return (ChangeFSAvgReturn)
}
console.log("Change in FScore, Return, qty of companies " + changeAverage(ChangeFSReturn))

//---------------

//2-Year Buy and Hold Strategy year return to current year FScore
var FSSecondReturn = [];
function FScore2ndReturn(input) {
    //grabs the fScore and the return from the data base (fourth and sixth column)
    FSSecondReturn.push(input[4], input[7]);
}

//loops over each of the arrays in the database and send it to the FScoreReturn function
data.input.forEach(FScore2ndReturn);

FSAvgSecondYrReturn = [];
function averageSecondYear(input) {
    for (j = 0; j < 10; j++) {
        //loops over all change in FScores 0 through 9, clears the sum and the quantity each time
        var returnSum = 0;
        var count = 0;
        var newarray = [];
        for (i = 1; i < input.length; i = i + 2) {
            if (input[i] == "N/A") {
                //since this is the last year in the data, it'll skip over this return, ie add nothing to array
            } else if (input[i - 1] == j) {
                //finds the total sum of the specific FScore (j) 2nd year returns
                count += 1
                returnSum += Number(input[i])
            }
        }
        newarray.push(j, returnSum / count, count)
        //this will return an array with 27 items in it (one for each FScore)
        //the items are arranged within the array as follows: 1 = FScore, 2 = Avg 2nd year Return, 3 = No. of companies with that FScore
        FSAvgSecondYrReturn.push(newarray)
    }
    return (FSAvgSecondYrReturn)
}
console.log("FScore, 2nd Year Return, qty of companies " + averageSecondYear(FSSecondReturn))

//---------------
//Change in F Score + 2 year buy and hold
var ChangeFSSecondReturn = [];
function ChangeFScore2ndReturn(input) {
    //grabs the fScore and the return from the data base (fourth and sixth column)
    ChangeFSSecondReturn.push(input[5], input[7]);
}

//loops over each of the arrays in the database and send it to the FScoreReturn function
data.input.forEach(ChangeFScore2ndReturn);

ChangeFSSecondYrReturn = [];
function changeFSavgSecondYear(input) {
    for (j = -7; j < 7; j++) {
        //loops over all change in FScores 0 through 9, clears the sum and the quantity each time
        var returnSum = 0;
        var count = 0;
        var newarray = [];
        for (i = 1; i < input.length; i = i + 2) {
            if (input[i] == "N/A") {
                //since this is the last year in the data, it'll skip over this return, ie add nothing to array
            } else if (input[i - 1] == "Year_1") {
                //since this is the first year in the data for a company, it'll skip over this return
            } else if (input[i - 1] == j) {
                //finds the total sum of the specific FScore (j) 2nd year returns
                count += 1
                returnSum += Number(input[i])
            }
        }
        newarray.push(j, returnSum / count, count)
        //this will return an array with 27 items in it (one for each FScore)
        //the items are arranged within the array as follows: 1 = Change in FScore, 2 = Avg 2nd year Return, 3 = No. of companies with that FScore
        ChangeFSSecondYrReturn.push(newarray)
    }
    return (ChangeFSSecondYrReturn)
}
console.log("Change in FScore, 2nd Year Return, qty of companies " + changeFSavgSecondYear(ChangeFSSecondReturn))

var ene = [] //10 - Array of energy companies only and their performance
var mat = [] //15 - Material companies only and their performance
var ind = [] //20 - Industrial (transportaiton included) companies only and their performance
var dis = [] //25 - Consumer Discretionary companies only and their performance
var sta = [] //30 - Consumer Staples (food, drug, household products) Communications, Electric, Gas and Sanitary service
var hcc = [] //35 - Health Care companies
var fin = [] //40 - Finance, Insurance, and Banking companies
var itc = [] //45 - IT
var tel = [] //50 - Telecommunications
var utl = [] //55 - Utilities
var rea = [] //60 - Real Estate 
// reference: https://en.wikipedia.org/wiki/Global_Industry_Classification_Standard

// -------
// Previous code before filter came into play for web data

function industry(input) {
    //for a given industry input this will push an array into the array of company name, year, fScore and return

    if (Number(input[2]) == 10) {
        ene.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 15) {
        mat.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 20) {
        ind.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 25) {
        dis.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 30) {
        sta.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 35) {
        hcc.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 40) {
        fin.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 45) {
        itc.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 50) {
        tel.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 55) {
        utl.push([input[1], input[3], input[4], input[6]])
    }
    else if (Number(input[2]) == 60) {
        rea.push([input[1], input[3], input[4], input[6]])
    }
}

data.input.forEach(industry);

console.log("Qty of Companies :  " + "Energy = " + ene.length + ", Materials = " + mat.length + ", Industrial = " + ind.length +
    ", Consumer Discretionary = " + dis.length + ", Consumer Staples = " + sta.length +
    ", Health Care = " + hcc.length + ", Finance = " + fin.length + ", Information Technology " + itc.length + ", Telecommunications = " + tel.length +
    ", Utilities = " + utl.length + ", Real Estate = " + rea.length)
*/