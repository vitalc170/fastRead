// onmessage = function (e){
//     console.log(e)
//     let array = e.data[0];
//     let position = e.data[1]-20;
//     let availableLength = position + 100;
//     var listString='';
//     let parent = document.createElement('li');
//     for(let i = position; i < availableLength; i++){
//         if (i === position+19){
//             let curentEl = document.createElement('p');
//
//             listString += '<p id="' + i + '" class="active">' + array[i] + '</p>';
//         }
//         else{
//             listString += '<a href = "#" id="' + i + '">' + array[i] + '</a>';
//         }
//
//     }
//
//     console.log(parent);
//     postMessage(parent)
// }
