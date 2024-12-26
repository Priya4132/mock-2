let form= document.getElementById("form");
form.addEventListener("submit", function(){
event.preventDefault();

let title=form.statement.value;
let A=form.A.value;
let B=form.B.value;
let C=form.C.value;
let D=form.D.value;
let correctOptions=form.correctOptions.value;
let quizObj={title,A,B,C,D,correctOptions, reveiwStatus:false}


//push qiz to json server

fetch("https://scientific-young-ankylosaurus.glitch.me/quiz", {
    method:"POST",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(quizObj)
})
.then(()=>{
    alert("Question Created");
}).catch((err)=>{
    console.log(err);
    console.log("Something went wrong while adding quiz");
})
})


// on window loading displaying quiz

window.onload= async()=>{
let arr= await getQuiz();
displayQuiz(arr);
}
// fucntion for fetching quiz

async function getQuiz(){
    try{
let res= await fetch("https://scientific-young-ankylosaurus.glitch.me/quiz");
let data = await res.json();
return data;
    }
catch(err){
    console.log(err);
    console.log("not able to fetch quiz")
}
   }


// function for displaying quiz
 function displayQuiz(arr){
let cont=document.getElementById("cont");
cont.innerHTML="";
arr.map((el,i)=>{
    let card=document.createElement("div");
    card.setAttribute("class", "quizdiv")
    let title=document.createElement("h4");
    title.textContent= `Title: ${el.statement}`
     let A=document.createElement("h4");
   A.textContent= `Option A: ${el.A}`
    let B=document.createElement("h4");
   B.textContent= `Option B: ${el.B}`;
   let C=document.createElement("h4");
   C.textContent= `Option C: ${el.C}`;
   let D=document.createElement("h4");
   D.textContent= `Option D: ${el.D}`;
   let correctOptions=document.createElement("h4")
correctOptions.textContent=`Correct Options: ${el.correctOptions}`;
let reveiwStatus=document.createElement("h4");
reveiwStatus.textContent=  el.reveiwStatus==true?  "ReveiwStatus: Reviewed " : "ReveiwStatus:  Not Reviewed "

let reviewQuestion=document.createElement("button");
reviewQuestion.setAttribute("class", "btn")
reviewQuestion.textContent="Review Question"
let deleteQuestion=document.createElement("button");
deleteQuestionQuestion.setAttribute("class", "btn")
deleteQuestion.textContent="Delete Question";
card.append(title,A,B,C,D,correctOptions,reveiwStatus,reviewQuestion,deleteQuestion);
cont.append(card);
deleteQuestion.addEventListener("click", function(){
    deleteQuestionFn(el,i);

    
})



})
 }

 function deleteQuestionFn(el,i){
    let quizId=el.id;
    let baseurl="https://scientific-young-ankylosaurus.glitch.me"
    if(confirm("Are you sure to delete?")){
        fetch(`${baseurl}/quiz/${quizId}`, {
            medthod:"DELETE"
        }).then(()=>{
            alert("Question Deleted");
        }).catch((err)=>{
            console.log(err);
            console.log("Something went wrong while deleting quiz");
        })
    
    }
    
 }