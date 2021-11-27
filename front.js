// .firefox
// var isFF = true;
// var addRule = (function (style) {
//     var sheet = document.head.appendChild(style).sheet;
//     return function (selector, css) {
//         if ( isFF ) {
//             if ( sheet.cssRules.length > 0 ) {
//                 sheet.deleteRule( 0 );
//             }
//
//             try {
//                 sheet.insertRule(selector + "{" + css + "}", 0);
//             } catch ( ex ) {
//                 isFF = false;
//             }
//         }
//     };
// })(document.createElement("style"));


// .chrome styling

let inputRange = document.querySelector('.chrome input');
inputRange.addEventListener('change',function (){
    inputRange.style.cssText="background: linear-gradient(to right, green 0%, green" +this.value +"%, #fff " + this.value + "%, white 100%)"
});
