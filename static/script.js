console.log(document); 
// console.log(document.getElementsById('generate-button')); 
const button = document.querySelector('#generate-button');

button.addEventListener('click', event => {
  console.log('Button was clicked');
});
// document.getElementsByClassName('generate-button')[0].addEventListener('click',function(){
//     console.log("test   worked")
// });
// function generateEmail() {
//   console.log('The button was clicked!');
// }
