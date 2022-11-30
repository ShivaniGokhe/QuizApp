const start_quiz = document.querySelector(".start_quiz button");
const info_box = document.querySelector(".info_box");
const exit_btn = document.querySelector(".buttons .exit_quiz");
const continue_btn = document.querySelector(".buttons .continue_quiz");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");

//IF WE CLICK ON START BUTTON
start_quiz.onclick = () => {
    info_box.classList.add("activeInfo") //<-- this showes information box
}

//IF WE CLICK ON EXIT BUTTON
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo") //<-- this will hide the info box
}

//IF WE CLICK ON START BUTTON
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo") //<-- this will hide the info box
    quiz_box.classList.add("activeQuiz") //<-- this will show the quiz box
    showQue(0);
    BottomQueCount(1);
}

let que_count = 0;
let que_no = 1;
let score = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const continue_quiz = result_box.querySelector(".buttons .continue_quiz");
const exit_quiz = result_box.querySelector(".buttons .exit_quiz");

continue_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz") //<-- this will hide the info box
    result_box.classList.remove("activeResult") //<-- this will show the quiz box

    let que_count = 0;
    let que_no = 1;
    let score = 0;
    showQue(que_count);
    BottomQueCount(que_no);
    next_btn.style.display = "none";
}

exit_quiz.onclick = () => {
    window.location.reload();
}

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_no++;
        showQue(que_count);
        BottomQueCount(que_no);
        next_btn.style.display = "none";
    } else {
        console.log("Question Completed");
        resultBox();
    }
}


//show questions
function showQue(index) {
    const que_text = document.querySelector(".que");

    let que_tag = '<span>' + questions[index].numb + "]. " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].option[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].option[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].option[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].option[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const options = option_list.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
        options[i].setAttribute("onclick", "optionSelected(this)")
    }
}

let tickicon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossicon = '<div class="icon cross"><i class="fas fa-times"></i></div>';
let banicon = '<div class="icon ban"><i class="fas fa-ban"></i></div>';

//this work for selected answer is write or wrong
function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let remainOption = option_list.children.length;
    if (userAns == correctAns) {
        score += 1;
        console.log(score);
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickicon);
    } else {
        answer.classList.add("incorrect");
        console.log("Wrong Answer");
        answer.insertAdjacentHTML("beforeend", crossicon);

        //this work if answer is incorrect then correct answer will show
        for (let i = 0; i < remainOption; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickicon);
            }
        }

    }
    //this work for once option selected remaining options will disabled
    for (let i = 0; i < remainOption; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

//this work for to show us result
function resultBox() {
    info_box.classList.remove("activeInfo") //<-- this will hide the info box
    quiz_box.classList.remove("activeQuiz") //<-- this will hide the quiz box
    result_box.classList.add("activeResult") //<-- this will show the result box
    const Scoreis = result_box.querySelector(".score_text"); //<-- this will store and display score
    if (score > 3) {
        let scoreTag = '<span>and Congracts you got <p>' + score + '</p>Out of <p>' + questions.length + '</p></span>';
        Scoreis.innerHTML = scoreTag;
    } else
        if (score > 1) {
            let scoreTag = '<span>and Nice you got <p>' + score + '</p>Out of <p>' + questions.length + '</p></span>';
            Scoreis.innerHTML = scoreTag;
        } else {
            let scoreTag = '<span>and Sorry you got only <p>' + score + '</p>Out of <p>' + questions.length + '</p></span>';
            Scoreis.innerHTML = scoreTag;
        }
}


//this will show bottom question count
function BottomQueCount(index) {
    const bottom_que_count = quiz_box.querySelector(".total_que");
    let totalQueCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Question</span>'; // + index + '</p>Out of <p>' +  + '</p>Questions</span>';
    bottom_que_count.innerHTML = totalQueCountTag;
}

