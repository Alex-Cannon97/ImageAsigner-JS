const email = document.querySelector("#email");
const assignButton = document.querySelector("#confirm")
let emailValidation = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const storedEmails = []
const containingDiv = document.querySelector('.saved-img')
const firstImage = document.querySelector('#Image-1')
let ID 
let emailDisplay
let emailImageDiv
let incrementID = 0;
const refresh = document.querySelector('.refresh-btn')
const emailInvalidError = document.querySelector('.error-message-container');
const successMessage = document.querySelector('.success-message')



function  check(){
    if(email.value.match(emailValidation)){
        return true
    }
    else{
        console.log('error with email')
        return false
    }
}

const saveEmail = function(){
    let exists = false;
   for(let i = 0; i < storedEmails.length; i++){
   if(email.value === storedEmails[i]){
       exists = true;
    } 
}
   if(exists === false){
    storedEmails.push(email.value)
    return false
   }
   return true
}

const addingEmail = function(){
    emailImageDiv = document.createElement('div')
    emailImageDiv.setAttribute("id", incrementID)
    emailDisplay = document.createElement('h3')
    emailDisplay.textContent = email.value
    emailImageDiv.append(emailDisplay)
    containingDiv.append(emailImageDiv)
    incrementID++
}

const addingImage = function(){
    for(let x = 0; x < storedEmails.length; x++){
        console.log(email.value)
        console.log(emailDisplay.innerHTML)
        if(email.value === storedEmails[x]){
            let showImageSaved = document.createElement('img')
            $(`div#${x}`).append(showImageSaved)
            showImageSaved.setAttribute('src','https://picsum.photos/id/' + ID + '/150/150/' )
        }
    }
}





function generateRandomeImageId(){
    const randomNumber = Math.round(Math.random() *100) 
    return randomNumber
}

function settingRandomIdUrl(){
    const Id = generateRandomeImageId()
    ID = Id
    firstImage.setAttribute('src', 'https://picsum.photos/id/'+ Id + '/300/300')
    console.log('this is the ID of the image' + Id)
    idOfFirstImage = Id 
}


function  allTogether(){
    if(check()){
        console.log('email working')
        emailInvalidError.classList.remove('show-message')
    }else{
        emailInvalidError.classList.add('show-message')
        return }
    if(saveEmail() === false){
    addingEmail();
    successMessage.classList.add('show-message')
    setTimeout(function() {successMessage.classList.remove('show-message')}, 3000)
   }
   addingImage();
   successMessage.classList.add('show-message')
   setTimeout(function() {successMessage.classList.remove('show-message')}, 3000)
   settingRandomIdUrl();
}


assignButton.addEventListener('click', allTogether)
window.onload = settingRandomIdUrl
refresh.addEventListener('click', settingRandomIdUrl)