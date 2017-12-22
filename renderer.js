var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
document.getElementById('openButton').onclick = () =>{
  dialog.showOpenDialog((fileNames)=> {
    if (fileNames == undefined)
    {
      alert('nope');
    }
    else if (isData(fileNames[0]))
    {
      var array = fs.readFileSync(fileNames[0]).toString().split("\n");
      for(i in array) {
        //  console.log(array[i]);
      }

        var  cj = new dataInTake(array);
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

function getExtension(filename) {
   var parts = filename.split('.');
   return parts[parts.length - 1];
}

function isData(filename) {
   var ext = getExtension(filename);
   switch (ext.toLowerCase()) {
   case 'txt':
   case 'csv':
       //etc
       return true;
   }
   return false;
}


class dataInTake
{

  constructor(array)
  {
    dataInTake.chopAndSor(array);

  }

    static chopAndSor(arra)
  {
    var lineStart = 0;
        for(i in arra) {
        if (dataInTake.findTime(arra[i]))
        {
           lineStart = i;
           break;
         }
        }
        this.lastIndex = lineStart;
        this.nameData = dataInTake.getNameData (lineStart, arra);
        dataInTake.getData (lineStart, arra);
  }
  static getData (lineStart, arra)
  {
console.log(arra[5]  + " g g   " + lineStart+1);
    var stringsa = [];
      var numbOfData = [];
      for(var j = 5 ; j < arra.length-1; j++ ) {

        var places = dataInTake.findCommas(arra[j]);
        var f = 0;
        var goTo;
        var n = '';
        for (i in places){
          var numbOfDat = [];
          numbOfData.push(numbOfDat)
        goTo =  places[i];
        n = '';
                for (f ; f < goTo ; f++)
                {
                  if (arra[j].substring(f , f+1) !== ',')
                    { // console.log(  lineStart+ " g g   " +  arra[j].substring(f , f+1));
                      n += arra[j].substring(f, f+1);}
                  }
          numbOfData[i].push(n);
          f = goTo;
                }

      }
      var o = 0;
      for (i in numbOfData)
      {
        for (o in numbOfData[i]){
        console.log( numbOfData[i][o]);
    }
      }
  }
  static getNameData (lineStart, arra)
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
                  n += arra[lineStart].substring(f, f+1);}
              }
      stringsa.push(n);
    f = goTo;
            }
return stringsa;
  }
  static findCommas(lokn)
  {
    var coms = [];
    for (var f = 0; f < lokn.length - 1; f++)
    {
      if (lokn.substring(f , f+1) == ',')
        {
          coms.push(f)
        }

      }
      coms.push(lokn.length - 1);
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
