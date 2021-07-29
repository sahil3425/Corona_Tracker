var button = document.querySelector('#btn');
var inputCountry = document.querySelector('.inputCountry');
var inputDate = document.querySelector('.inputDate');
var Confirmedspan=document.querySelector('.confirmedSpan');
var Recoveredspan=document.querySelector('.recoveredSpan');
var Deathsspan=document.querySelector('.deathsSpan');
var Activespan=document.querySelector('.activeSpan');
var updatedDate=document.querySelector('.updatedh3');
var Country="india";
var d=new Date();
var date ;
var url="https://api.covid19api.com/total/country/"
// var url1="https://api.covid19api.com/total/country"
//animated counter
const animation=()=>{
const counters=document.querySelectorAll('.counter');
counters.forEach((counter)=>{
    counter.innerHTML=0;
    const updateCounter=()=>{
        const targetCount=counter.getAttribute('data-target');
        const startingCount=Number(counter.innerHTML);
        const incr = targetCount/100;
        if(startingCount<targetCount){
            counter.innerHTML=`${Math.round(startingCount+incr)}`;
            setTimeout(updateCounter,10);
        }
        else{
            counter.innerHTML=targetCount;
        }
        // console.log(typeof targetCount);
    }
updateCounter();
});}




const getApi=async()=>{
  // Activespan.textContent = "40000";
  if(inputCountry.value.length==0){
    Country='india'
  }
  else{
    Country = inputCountry.value;
  }
  
  if(inputDate.value.length==10){
    date = inputDate.value+"T00:00:00Z";
  }
console.log(Country+" "+date+" ");
    try{
        const res= await fetch(url+Country.toLocaleLowerCase()) ;
          const data  = await res.json();
      if(date!=undefined){
      data.forEach(element => {
        if(element.Date==date){
          Confirmedspan.setAttribute('data-target',element.Confirmed);
          Deathsspan.setAttribute('data-target',element.Deaths);
          Recoveredspan.setAttribute('data-target',element.Recovered);
          Activespan.setAttribute('data-target',element.Active);
          updatedDate.innerHTML="Last Updated : "+element.Date.slice(0,10);
          animation();
    }
      });}  
      else{
          Confirmedspan.setAttribute('data-target',data[data.length-1].Confirmed);
          Deathsspan.setAttribute('data-target',data[data.length-1].Deaths);
          Recoveredspan.setAttribute('data-target',data[data.length-1].Recovered);
          Activespan.setAttribute('data-target',data[data.length-1].Active);
          updatedDate.innerHTML="Last Updated : "+data[data.length-1].Date.slice(0,10);
          animation();
        
      }
  
         }
          catch(err){
              console.log(err);
          }
}
button.addEventListener('click',getApi);
inputCountry.value="india";
getApi();
// button.addEventListener('click',getApi);

//Animated Counters
