var Chart = require('chart.js');
var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
document.getElementById('openButton').onclick = () =>{ /// finds when open button is clicked
  dialog.showOpenDialog((fileNames)=> { //// takes the location of the filenPath
    if (fileNames == undefined) //  if not nothing
    {
      alert('nope');
    }
    else if (isData(fileNames[0])) /// takes the file and the first path length in the array
    {
      var array = fs.readFileSync(fileNames[0]).toString().split("\n"); //looks through an cuts file
      // into array list of of lines of data
      for(i in array) {
        //  console.log(array[i]);
      }
      console.log(" ");
        var  cj = new dataInTake(array); //  creates data  that is cut into ammounts of data
        var hs = cj.sendArray();
        var ctx = document.getElementById('myChart').getContext('2d');
        ctx.canvas.width = 1;
        ctx.canvas.height = 1;
        var lineGraphHumd = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: hs[0],
        datasets: [
          {
            label: "Humidity",
            //backgroundColor: 'rgb(25, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: hs[1],
        },

        {
            label: "Temperature in Celcius",
          //  backgroundColor: 'rgb(25, 9, 132)',
            borderColor: 'rgb(255, 99, 12)',
            data: hs[2],
        },

        {
            label: "Heat Index",
            //backgroundColor: 'rgb(5, 99, 12)',
            borderColor: 'rgb(55, 99, 2)',
            data: hs[3],
        }
      ]
    },

   options: {
      title: {
        display: true,
        text: 'Humidity Chart'
      }
  }
});



      //chopAndSort(array);
      //readFiled(fileNames[0]);
      //console.log('Line: ' + fileNames[0]);
    }
    else
    {
      alert('nope');
    }
  });

};

function getExtension(filename) { // determins if the file is read able
   var parts = filename.split('.');
   return parts[parts.length - 1];
}

function isData(filename) { // sees what type of file it is
   var ext = getExtension(filename);
   switch (ext.toLowerCase()) {
   case 'txt':
   case 'csv':
       //etc
       return true;
   }
   return false;
}


class dataInTake // data struct
{

  constructor(array) // constuctor calls shit
  {
    this.data = dataInTake.chopAndSor(array); // chops data

  }
  sendArrayOut()
  {

    return this.NameData
  }
  sendArray() {
    return this.data
  }


    static chopAndSor(arra)// takes data trying to find start of data
  {
    var lineStart = 0;
        for(i in arra) { // runns through the lines
        if (dataInTake.findTime(arra[i])) // finding time for the  starting point
        {
           lineStart = i; // takes down that line
           break;
         }
        }
        this.lastIndex = lineStart;// line where  "time" is found
        this.nameData = dataInTake.getNameData (lineStart, arra); // get the name array to access the name array
        // use var dataInTakevar = dataInTake(array );
        //dataInTakevar.nameData  this is and array access
      var data =  dataInTake.getData (lineStart, arra); // gets finnish cut up arrays
      return data; // sends final array of cut data
  }
  static getData (lineStart, arra)  // getss data
  {
    var stringsa = [];
      var numbOfData = [];
      for(var j = 5 ; j < arra.length-1; j++ ) {

        var places = dataInTake.findCommas(arra[j]); // runs through to get cammas and add the  place to an array
        var f = 0;
        var goTo;
        var n = '';
        for (i in places){
          var numbOfDat = []; //   empty place holder array
          numbOfData.push(numbOfDat) // adds to main aray
        goTo =  places[i]; // camma to cammo
        n = '';
                for (f ; f < goTo ; f++)
                {
                  if (arra[j].substring(f , f+1) !== ',')
                    { // console.log(  lineStart+ " g g   " +  arra[j].substring(f , f+1));
                      n += arra[j].substring(f, f+1);
                    } // adds to string
                  }
          numbOfData[i].push(n); // add to smaller array in b
          f = goTo; //starting point
                }

      }
      var o = 0;
      for (i in numbOfData)
      {
        for (o in numbOfData[i]){
        //console.log( numbOfData[i][o]); // how access the data from array
    }
      }
      //sendArrayOut(numbOfData)
return  numbOfData; /// returns whole array data
  }
  static getNameData (lineStart, arra) //  same shit but with names
  {
    var n = '';
    var stringsa = [];
    var findc = 0;
    var places = dataInTake.findCommas(arra[lineStart]);
    var f = 0;
    var goTo;
    for (i in places){
    goTo =  places[i];
    n = '';
            for (f ; f < goTo ; f++)
            {
              if (arra[lineStart].substring(f , f+1) !== ',')
                {  //console.log( "   " +  arra[lineStart].substring(f , f+1));2
                  n += arra[lineStart].substring(f, f+1); /// adding names to the array
                }
              }
      stringsa.push(n);
    f = goTo;
            }
return stringsa;
  }
  static findCommas(lokn) // finds  commas in the string
  {
    var coms = [];
    for (var f = 0; f < lokn.length - 1; f++)
    {
      if (lokn.substring(f , f+1) == ',') // finds commas
        {
          coms.push(f) // ADDS POSITION TO array
        }

      }
      coms.push(lokn.length - 1); ///AND LAST POS
      return coms;

  }
  static findTime(lokn)
  {
    var ifFound = false;
    var times = 'Time';
  if (lokn.includes(times)){
  ifFound = true;
  }
    return ifFound;
  }

}
