function autoGenerate()
{
    var x = document.querySelector("#inputNumbers");
    var i = Math.floor((Math.random() * 199) + 1);
    x.value += i + " ";
}

function Implement()
{
    var ErrorMsg = document.getElementById('ErrorMsg');  
    hideError(ErrorMsg);

    // numbers Enter by user
    var inputNumbersString = document.getElementById('inputNumbers').value;
    inputNumbersString = inputNumbersString.trim();
    var inputNumbers = inputNumbersString.split(" ");
    var inputHeadPos = document.getElementById('inputHeadPos').value;

    for (var i = 0; i < inputNumbers.length; i++)
    {
        if (inputNumbers[i] == inputHeadPos)
        {
            inputNumbers.splice(i, 1);
        }
    }
    inputNumbers.unshift(inputHeadPos);

    inputNumbers = inputNumbers.filter(function (item, pos)
    {
        return inputNumbers.indexOf(item) == pos;
    });

    var isValidInput = true; 
    
    if (inputHeadPos == "")
    {
        showError(ErrorMsg, "Please Enter a number of R/W head and numbers for Request Queue or Autogenerate it");
        isValidInput = false;
    }
    else if (isNaN(inputHeadPos))
    {
        showError(ErrorMsg, "Please Enter Numeric value here");
        isValidInput = false; 
    }
    else if (parseInt(inputHeadPos) < 0 || parseInt(inputHeadPos) > 199) {
        showError(ErrorMsg, "Enter a number of R/W head between 0 to 199");
        isValidInput = false;
    }
    else if (inputNumbersString == "")
    {
        showError(ErrorMsg, "Please Enter numbers in Request Queue");
        isValidInput = false; 
    }
    else
    {
        var totalNumbers = inputNumbers.length;
    
        for (var i = 0; i < totalNumbers; i++)
        {
            if (isNaN(inputNumbers[i]))
            {
                showError(ErrorMsg, "Enter numbers please");
                isValidInput = false;
            }
            else if (parseInt(inputNumbers[i]) < 0 || parseInt(inputNumbers[i]) > 199)
            {
                showError(Ersg, "Please Enter numbers between 0 to 199 in Request Queue");
                isValidInput = false;
            }
        }
    }

    // var graphType = document.getElementById("chartType").value;
    var ctx = document.getElementById("line-chart").getContext('2d');
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fcfs(inputNumbers, inputHeadPos),
            legend: {
                display: true
            },
            datasets: [
                {
                    label: "First Come First Serve (FCFS) Algorithm", data: inputNumbers, lineTension: 0, fill: false, backgroundColor: "rgba(0,145,180, 0.6)", borderColor: "rgba(0,145,155, 0.8)", pointBackgroundColor: "rgba(0,145,155, 0.6)", pointBorderColor: "#db7093", pointHoverBackgroundColor: "#db7093", pointHoverBorderColor: "#db7093", borderWidth: 2.5,
                }
            ]
        },
        options: {
            tooltips: {
                enabled: true
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Seek Count ",
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Seek Sequence"
                    }
                }]
            }
        }
    });

    document.querySelector(".canvas button").classList.add("printChart");
    document.querySelector(".printChart").style.visibility = "initial";
    document.querySelector(".printChart").addEventListener("click", function () {
        printImage();
    });
}

function printImage()
{
    var canvas = document.querySelector("#line-chart");
};

function showError(ErrorMsg, msg)
{
    ErrorMsg.classList.add('alert');
    ErrorMsg.classList.add('alert-danger');
    ErrorMsg.innerHTML = msg;
}

function hideError(ErrorMsg)
{
    ErrorMsg.classList.remove('alert');
    ErrorMsg.classList.remove('alert-danger');
    ErrorMsg.innerHTML = "";
}

function showResult(count, seekSequence)
{
    var div = document.getElementById('count-output');
    if (count == "") div.innerHTML = "";
    else div.innerHTML = "<br/> Entered Seek Sequence: <b>[" + seekSequence + "]</b><br ><br/>Total no. of tracks movement by R/w head: <b>" + count + "<b>";
}

function fcfs(Numbers, Head)
{
    var tempArray = [];
    var seekCountSequence = [];
    var totalNumbersLength = Numbers.length;
    var totalHeadMovements = 0;
    var distance = 0;
        
    for (var i = 0; i < totalNumbersLength; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
        Numbers.sort();
    }

    for (var i = totalNumbersLength; i >= 0 ; i--)
    {
        var currentTrack = Numbers[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        seekCountSequence.push(totalHeadMovements);
        Head = currentTrack;
    }
    for (var i = 1; i < totalNumbersLength; i++)
    {
        tempArray.push(Numbers[i]);
    }
    showResult(totalHeadMovements, tempArray);
    return seekCountSequence;
}