let container = document.getElementById('content');
let links = {
    question1 : `<h6>ВОПРОС 1</h6>
                <h3>Сколько у вас<span class="green-text"> дойных коров?</span></h3>
                <input type="input" id="input" placeholder="Например: 45">`,
    question2 : `<h6>ВОПРОС 2</h6>
                <h3>Сколько<span class="green-text"> молока в сутки вы доите?</span></h3>
                <input type="input" id="input" placeholder="Например: 12">`,
    question3 : `<h6>ВОПРОС 3</h6>
                <h3 class="green-text">Вы являетесь?</h3>
                <form class="position-choice">
                    <div>
                        <input name="position" type="radio" id="choice1" value="Руководителем фермы">
                        <label for="choice1">Руководителем фермы</label>
                    </div>
                    <div>
                        <input name="position" type="radio" id="choice2" value="Зоотехником">
                        <label for="choice2">Зоотехником</label>
                    </div>
                    <div>
                        <input name="position" type="radio" id="choice3" value="Ветеренаром">
                        <label for="choice3">Ветеринаром</label>
                    </div>
                </form>`,
    callBack : `<h3 class="green-text call">Куда прислать вам ответ?</h3>
                    <form class="callback-choice">
                        <div>
                            <input name="callback" type="radio" id="choice1" name="contact" value="По телефону">
                            <label for="choice1">По телефону</label>
                        </div>
                        <div>
                            <input name="callback" type="radio" id="choice2" name="contact" value="E-mail">
                            <label for="choice2">E-mail</label>
                        </div>
                        <div>
                            <input name="callback" type="radio" id="choice3" name="contact" value="Viber">
                            <label for="choice3">Viber</label>
                        </div>
                        <div>
                            <input name="callback" type="radio" id="choice4" name="contact" value="Telegram">
                            <label for="choice4">Telegram</label>
                        </div>
                        <div>
                            <input name="callback" type="radio" id="choice5" name="contact" value="Whatsaap">
                            <label for="choice5">Whatsaap</label>
                        </div>
                    </form>
                    <p id="call-type">Выберите тип связи</p>
                    <div id="input-container"></div>`,
    finish : `<h3 class="green-text call">Ваши данные сохранены</h3>
            <h3 class="green-text call">Наши менеджеры вскоре свяжуться с вами</h3>
            <a id="checkData" onclick="checkData()">(Проверить данные)</a>`};
let inputsObj = {
    choice1 : `<input type="tel" id="input" placeholder="+3751234567">`,
    choice2 : `<input type="email" id="input" placeholder="example@example.com">`,
    choice3 : `<input type="text" id="input" placeholder="Viber@username">`,
    choice4 : `<input type="text" id="input" placeholder="Telegram@username">`,
    choice5 : `<input type="text" id="input" placeholder="Whatsaap@username">`
    };
let typeNameObj ={
    choice1 : `номер телефона`,
    choice2 : `e-mail`,
    choice3 : `Viber`,
    choice4 : `Telegram`,
    choice5 : `Whatsaap`
}
let pageState = 'question1';
let button = document.getElementById('next-button');

let data = {};
function updateState(){
    let content = links[pageState];
    container.innerHTML = content;
    updateButton();
    updateScroller();
    if(pageState == "callBack")updateInput();
};
window.addEventListener("load", updateState());
button.addEventListener('click', function(){
    if(pageState == 'question1'){
        stepOne();
        updateState()
        return;
    } if(pageState == 'question2'){
        stepTwo();
        updateState()
        return;
    } if(pageState == 'question3'){
        stepThree();
        updateState();
        return;
    } if(pageState == 'callBack'){
       callBack();
       updateState();
    } if(pageState == 'finish'){
        localStorage.setItem('leadMeUserData', JSON.stringify(data));
    };
});
function updateButton(){
    button.disabled = true;
    (pageState == 'finish') ? button.style.display ='none' : (pageState == 'callBack') ? (button.innerHTML = 'Отправить и получить ответ', button.style.width = '225px') : 
    (button.style.width = '125px', button.innerHTML = 'Далее >');
};
function stepOne(){
    let input = document.getElementById('input').value;
    data.cattleQuantity = input;
    pageState = 'question2';
};
function stepTwo(){
    let input = document.getElementById('input').value;
    data.milk = input;
    pageState = 'question3';
};
function stepThree(){
    let choice = document.getElementsByName('position');
    for(let i = 0; i < choice.length; i++){
        if(choice[i].checked){
            data.position = choice[i].value;
        };
    };
    pageState = 'callBack';
};
function callBack(){
    let call = document.getElementsByName('callback');
    for(let i = 0; i < call.length; i++){
        if(call[i].checked){
            data.callBackType = call[i].value;
        };
    let input = document.getElementById('input');
        data.callBackDestination = input.value;
    }; 
    pageState = 'finish';
};
function checkData(){
    let extrData =  JSON.parse(localStorage.getItem('leadMeUserData'));
    let msg = `Ваши данные:
            Количество коров: ${extrData.cattleQuantity};
            Суточный удой: ${extrData.milk};
            Вы являетесь ${extrData.position};
            Ваш ${extrData.callBackType} - ${extrData.callBackDestination};
    `
    alert(msg);
};
function updateScroller(){
    let scroller = document.getElementById('scroller-content');
        if(pageState == 'question1'){
            scroller.children[0].classList.add('active-item');
        } if(pageState == 'question2'){
            scroller.children[1].classList.add('active-item');
            scroller.style.background = 'linear-gradient(to right, #5dbd30 50%, #f4f4f4 50%';
        } if(pageState == 'question3'){
            scroller.style.background = '#5dbd30';
            scroller.children[2].classList.add('active-item');
        };
};
function updateInput(){
    let form = document.getElementsByClassName('callback-choice')[0];
    form.addEventListener('change', function(){
        let call = document.getElementsByName('callback');
        let container = document.getElementById('input-container');
        let type = document.getElementById('call-type');
        for(let i = 0; i < call.length; i++){
            if(call[i].checked){   
            container.innerHTML = inputsObj[call[i].id];
            type.innerHTML = `введите ваш ${typeNameObj[call[i].id]}`;
            if(call[i].id == 'choice1'){
            container.innerHTML = inputsObj[call[i].id];
            type.innerHTML = `введите ваш ${typeNameObj[call[i].id]}`;
            let phoneMask = IMask(
                document.getElementById('input'),
                {
                  mask: '+{375}(00)000-00-00',
                  lazy: false,
                  overwrite: true,
                  autofix: true,
                }
              );
            }
            };
        };
    });
};
function validateInput(str, regExp){
    return (str.search(regExp)) ? false : true;
  };
    let contentContainer = document.getElementsByClassName('form')[0];
        contentContainer.addEventListener('input', function(event){
            let id = event.target.id;
            let input = document.getElementById('input');
                button.disabled = true;

                if(id == 'choice1')regExp = /^[0-9-()+]{17}$/;
                if(id == 'choice2')regExp = /^[a-z0-9._-]{3,25}@[a-z0-9._-]{2,6}.[a-z]{2,4}$/;
                if(id == 'choice3' || id == 'choice4' || id == 'choice5')regExp = /^[a-z -_@.]{3,25}$/i;
                if(pageState == 'question1' && validateInput(input.value, /^[0-9]{1,3}$/) || pageState == 'question2' && validateInput(input.value, /^[0-9]{1,3}$/)){
                    button.disabled = false;
                } if(pageState == 'question3' && event){
                    button.disabled = false;
                }if(pageState == 'callBack' && input && validateInput(input.value,regExp)){
                    button.disabled = false;
                };
        });