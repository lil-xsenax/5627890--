// ======================================
// ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ
// ======================================

function showScreen(oldScreen, newScreen){

    if(oldScreen){
        oldScreen.classList.remove("active");
    }

    if(newScreen){
        newScreen.classList.add("active");
    }

}


// ======================================
// ЗАСТАВКА
// ======================================

setTimeout(()=>{

    const intro = document.querySelector(".intro");
    const question = document.querySelector(".question");

    showScreen(intro, question);

},4000);




// ======================================
// КНОПКА НЕТ УБЕГАЕТ
// ======================================

const noButton = document.querySelector(".no");


if(noButton){

    noButton.addEventListener("mouseover",()=>{

        const x = Math.random()*250-125;
        const y = Math.random()*150-75;

        noButton.style.transform =
        `translate(${x}px,${y}px)`;

    });

}



// ======================================
// СОЗДАНИЕ СЕРДЕЧЕК
// ======================================

function createHeart(){

    const heart = document.createElement("div");

    heart.innerHTML="❤️";

    heart.style.position="fixed";
    heart.style.left=Math.random()*100+"%";
    heart.style.bottom="0";
    heart.style.fontSize=
    20+Math.random()*30+"px";
    heart.style.zIndex="9999";
    heart.style.animation="fly 3s linear";

    document.body.appendChild(heart);


    setTimeout(()=>{

        heart.remove();

    },3000);

}



// ======================================
// ДА НА ПЕРВЫЙ ВОПРОС
// ======================================

const yesButton=document.querySelector(".yes");


if(yesButton){

    yesButton.addEventListener("click",()=>{


        for(let i=0;i<50;i++){

            setTimeout(()=>{

                createHeart();

            },i*30);

        }



        setTimeout(()=>{

            showScreen(
                document.querySelector(".question"),
                document.querySelector(".choice")
            );


        },1000);



    });

}



// ======================================
// ВЫБОР СВИДАНИЯ
// ======================================

const cards=document.querySelectorAll(".date-card");

const continueButton=document.querySelector(".continue");


let activitySelected=false;



cards.forEach(card=>{


    card.addEventListener("click",()=>{


        cards.forEach(c=>{

            c.classList.remove("selected");

        });


        card.classList.add("selected");


        activitySelected=true;


        continueButton.classList.add("active");


    });


});





continueButton.addEventListener("click",()=>{


    if(activitySelected){


        showScreen(
            document.querySelector(".choice"),
            document.querySelector(".calendar")
        );


        createCalendar();


    }


});




// ======================================
// КАЛЕНДАРЬ
// ======================================

const calendarDays =
document.querySelector(".calendar-days");


const monthTitle =
document.querySelector(".month-title");


let currentDate =
new Date(2026,6,1);



function createCalendar(){


    if(!calendarDays) return;


    calendarDays.innerHTML="";


    const year=currentDate.getFullYear();

    const month=currentDate.getMonth();



    monthTitle.textContent =
    currentDate.toLocaleString(
        "ru-RU",
        {
            month:"long",
            year:"numeric"
        }
    );



    let firstDay =
    new Date(year,month,1).getDay();



    if(firstDay===0){

        firstDay=7;

    }



    for(let i=1;i<firstDay;i++){

        calendarDays.appendChild(
            document.createElement("div")
        );

    }



    const days =
    new Date(year,month+1,0).getDate();



    for(let i=1;i<=days;i++){


        const button =
        document.createElement("button");


        button.className="calendar-day";


        button.textContent=i;



        button.addEventListener("click",()=>{


            document
            .querySelectorAll(".calendar-day")
            .forEach(day=>{

                day.classList.remove("selected");

            });



            button.classList.add("selected");


            dateSelected=true;


            checkCalendar();


        });



        calendarDays.appendChild(button);


    }


}
// ======================================
// ПЕРЕЛИСТЫВАНИЕ МЕСЯЦЕВ
// ======================================

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");


if(prevButton){

    prevButton.addEventListener("click",()=>{

        currentDate.setMonth(
            currentDate.getMonth()-1
        );

        createCalendar();

    });

}



if(nextButton){

    nextButton.addEventListener("click",()=>{

        currentDate.setMonth(
            currentDate.getMonth()+1
        );

        createCalendar();

    });

}




// ======================================
// ДАТА И ВРЕМЯ
// ======================================

let dateSelected = false;
let timeSelected = false;


const timePicker =
document.querySelector(".time-picker");


const calendarButton =
document.querySelector(".calendar-next");



function checkCalendar(){


    if(dateSelected && timeSelected){


        calendarButton.classList.add("active");

        calendarButton.style.opacity="1";

        calendarButton.style.pointerEvents="auto";


    }else{


        calendarButton.classList.remove("active");

        calendarButton.style.opacity=".5";

        calendarButton.style.pointerEvents="none";


    }


}




if(timePicker){


    timePicker.addEventListener("input",()=>{


        if(timePicker.value !== ""){


            timeSelected=true;


            checkCalendar();


        }


    });


}



if(calendarButton){

    calendarButton.addEventListener("click",()=>{


        document.querySelector(".calendar")
        .classList.remove("active");


        document.querySelector(".thanks")
        .classList.add("active");


    });

}




// ======================================
// КНОПКА "ЕЩЁ КОЕ-ЧТО"
// ======================================


const nextQuestion =
document.querySelector(".next-question");


if(nextQuestion){


    nextQuestion.addEventListener("click",()=>{


        showScreen(

            document.querySelector(".thanks"),

            document.querySelector(".final-question")

        );


    });


}





// ======================================
// ПОСЛЕДНИЙ ВОПРОС
// ======================================


const loveNo =
document.querySelector(".love-no");



if(loveNo){


    loveNo.addEventListener("mouseover",()=>{


        const x =
        Math.random()*250-125;


        const y =
        Math.random()*150-75;


        loveNo.style.transform =
        `translate(${x}px,${y}px)`;


    });


}





const loveYes =
document.querySelector(".love-yes");


const loveMessage =
document.querySelector(".love-message");



if(loveYes){


    loveYes.addEventListener("click",()=>{


        if(loveMessage){


            loveMessage.classList.add("show");


        }



        for(let i=0;i<40;i++){


            setTimeout(()=>{


                createHeart();


            },i*40);


        }



        setTimeout(()=>{


            showScreen(

                document.querySelector(".final-question"),

                document.querySelector(".final")

            );


        },2000);



    });


}





// ======================================
// ОТКРЫТИЕ ПИСЬМА
// ======================================


const envelope =
document.querySelector(".envelope");


const letter =
document.querySelector(".letter");



if(envelope && letter){


    envelope.addEventListener("click",()=>{


        letter.classList.add("open");


    });


}




// ======================================
// ФОНОВЫЕ СЕРДЕЧКИ
// ======================================


function createBackgroundHeart(){


    const heart =
    document.createElement("div");


    heart.className="bg-heart";


    heart.innerHTML="🤍";


    heart.style.left =
    Math.random()*100+"%";


    heart.style.fontSize =
    12+Math.random()*18+"px";


    document.body.appendChild(heart);



    setTimeout(()=>{


        heart.remove();


    },10000);


}



setInterval(createBackgroundHeart,700);
alert("script работает");