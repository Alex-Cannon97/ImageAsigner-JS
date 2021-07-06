const email = document.querySelector("#email");
const assignButton = document.querySelector("#confirm")
let emailValidation = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const storedEmails = []
const containingDiv = document.querySelector('.saved-img')
const firstImage = document.querySelector('#Image-1')
let ID 


const check = function(){
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
    let emailImageDiv = document.createElement('div')
    let emailDisplay = document.createElement('h3')
    emailDisplay.textContent = email.value
    emailImageDiv.append(emailDisplay)
    containingDiv.append(emailImageDiv)
}

const addingImage = function(){
    let onPage = Array.prototype.slice.call(document.querySelector('.saved-img > div'))
    for(let x = 0; x <= storedEmails.length; x++){
        let emailSaved = onPage[x].querySelector('h3').innerHTML;
        if(email === emailSaved){
            let showImageSaved = document.createElement('img')
            onPage[x].append(showImageSaved)
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


const allTogether = function(){
    check();
    if(saveEmail() === false){
    addingEmail();
   }
   addingImage();
   settingRandomIdUrl();
}


assignButton.addEventListener('click', allTogether())