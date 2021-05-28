//I want to be able to link a picture/pictures to an email, this will involve gathering the input from the input section and the image selected and storing them as a varibable to be 
//called when needed, that is the way to make the image link with the email, I need a plugin that calls 3 images from a site and show them on the page, I need to make each image
//clickable, once clicked ill add a class called border selection to highlight the image has been selected, the variable with the email and image will be displayed at the bottom
//of the page, this project will consits heavily of JS AJAX and CSS. 
//Change the email warning to "new image saved to existing email" or something like that!
// add a function for when the assign button is clicked to create html elements to show a <p> with the email address on the left and images on the right
// in the html create one p tag with a class of something, make that a variable in JS use varible to set inner text in function to email.value (make a check button for this function) 

const email = document.querySelector("#email");
const assignButton = document.querySelector("#confirm")
let emailValidation = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
let emailsStored = []
const emailInvalidError = document.querySelector('.error-message-container');
const successMessage = document.querySelector('.success-message')
const successMessage2 = document.querySelector('.success-message2-container')
const firstImage = document.querySelector('#Image-1')
let idOfFirstImage = null
const refresh = document.querySelector('.refresh-btn')
let storedPairs = [{
    emailForThisImage: 'alice@hotmail.com',
    imageIds: [3, 28],
  },
  {
    emailForThisImage: 'bob@hotmail.com',
    imageIds: [12, 48, 99],
  },]
const checkButton = document.querySelector('#check')
const div = document.querySelector('.saved-img')
let emailName = document.querySelector('.email-name')

const check = function(){
    if(email.value.match(emailValidation)){
        return true
    }
    else{
        console.log('error with email')
        return false
    }
}

const addNewEmail = function(){
    const emailAndImage = {}
    emailAndImage.emailForThisImage = email.value;
    emailAndImage.imageIds = [idOfFirstImage];
    storedPairs.push(emailAndImage);
}

function addImageToEmail(emailAdress, imageId){
// look through the stored pairs and find the email adress in the stored pairs

    for (let x = 0; x < storedPairs.length; x++) {
        const pair = storedPairs[x];
        if (pair.emailForThisImage === emailAdress) {
          // once found add image id to that pair  
          pair.imageIds.push(imageId)
        }
    }
}

function emailsStoredContains(email) {
    for (let x = 0; x < storedPairs.length; x++) {
        const pair = storedPairs[x];
        if (pair.emailForThisImage === email) {
            return true
        }
    }
    return false
}

function tryToAssignEmail(){
    if(check()){
        console.log('email working')
        emailInvalidError.classList.remove('show-message')
    }else{
        emailInvalidError.classList.add('show-message')
        return 
    }
    const isEmailPresent = emailsStoredContains(email.value);
    if(isEmailPresent){
        console.log('email is already present')
        successMessage.classList.remove('show-message')
        addImageToEmail(email.value, idOfFirstImage)
        successMessage2.classList.add('show-message')
        
    }else{
        console.log('email has been added')
        successMessage.classList.add('show-message')
        addNewEmail();
    }
    email.value = '';
    
}

assignButton.addEventListener('click', tryToAssignEmail)

function generateRandomeImageId(){
    const randomNumber = Math.round(Math.random() *100) 
    return randomNumber
}

function settingRandomIdUrl(){
    const Id = generateRandomeImageId()
    firstImage.setAttribute('src', 'https://picsum.photos/id/'+ Id + '/300/300')
    console.log('this is the ID of the image' + Id)
    idOfFirstImage = Id 
}

window.onload = settingRandomIdUrl

refresh.onclick = settingRandomIdUrl

 

function createImagesForEmail(emailValue){
    for (let x = 0; x < storedPairs.length; x++) {
        const pair = storedPairs[x];
        if (pair.emailForThisImage === emailValue) {
            for (let i = 0; i < pair.imageIds.length; i++){
            //console.log(pair.imageIds[i])
            //console.log('https://picsum.photo/id/' + pair.imageIds[i] +'/150/150/')
            emailName.textContent = email.value
            let showImageSaved = document.createElement('img')
            div.append(showImageSaved)
            showImageSaved.setAttribute('src','https://picsum.photos/id/' + pair.imageIds[i] + '/150/150/' )
            
            }
        }
    }
 }

function clearData(allData){
    let generatedImages = document.querySelectorAll('.saved-img img')
    for(let i = 0; i < generatedImages.length; i++ ){
        generatedImages[i].remove()
    }
}

checkButton.addEventListener('click', function(){
    successMessage2.classList.remove('show-message')
    clearData()
    createImagesForEmail(email.value) 
})

