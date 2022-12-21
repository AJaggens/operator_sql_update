const docBody = document.getElementById('outputBody')
const netStud = "Network (Studio)"
const netNew = "Network (actual)"
const mcc = "MCC"
const mnc = "MNC"
const country = "Country"
const fileInput = document.getElementById('jsonFile').files[0];
var json = ''

let finalList = []

document.getElementById("startButton").addEventListener('click', e => generateStr(json))



function generateStr (json){
    json.forEach(el => {
        if (el[netStud] == ""){
            finalList.push(`insert into mno_networks (country,network,MCC,MNC) values ("${el[country]}","${el[netNew]}",${el[mcc]},${el[mnc]})`)
        } else if ((el[netStud] != "") && (el[netNew] != el[netStud])){
            finalList.push(`update mno_networks set network="${el[netNew]}" where MCC=${el[mcc]} and MNC=${el[mnc]}`)
        } else {
            console.log('error')
        }
    });
    printList(finalList);
}

function storeFile(input) {
    let file = input.files[0];
  
    let reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = function() {
      json = JSON.parse(reader.result)
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}

function printList(arr) {
    arr.forEach(el => {
        let outputPara = document.createElement('p')
        outputPara.textContent = `${el}`
        docBody.appendChild(outputPara)
    })
}