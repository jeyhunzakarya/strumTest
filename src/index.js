/**
 * The entry point
 */

import { allMessages } from '../samples'
import App from './components/app'

let counter = 0

const loadImagesHelper =(parentDiv)=> {
  for (let i = 0 ; i<30; i++){
    const msg = allMessages[counter]
    let msgContainer = document.createElement("div");
    msgContainer.id = "img" + (counter)

    const pfp = document.createElement("img")
    pfp.src = `https://source.unsplash.com/random/800x800/?img=${counter}`
    pfp.style.height = '50px'
    pfp.style.width = "50px"
    pfp.style.float = "left"
    msgContainer.append(pfp)


    const author = document.createElement("h1")
    author.style="width: 200px;word-wrap: break-word;text-align : left ; position : relative; margin-left: 60px"
    const authorNode = document.createTextNode(msg.name);
    author.append(authorNode)
    msgContainer.append(author)

    
    
    const txt = document.createElement("p")
    txt.style="width: 800px;word-wrap: break-word;text-align : left"
    const textNode = document.createTextNode(msg.content);
    txt.append(textNode)
    msgContainer.append(txt)

    const imgWrapper = document.createElement("img")
    imgWrapper.src= `https://source.unsplash.com/random/800x800/?img=${counter}`
    imgWrapper.style.height = `${Math.random()*300}px`
    imgWrapper.style.width = "100px"
    imgWrapper.style.marginTop = "20px"
    msgContainer.append(imgWrapper)
    parentDiv.prepend(msgContainer)
    counter++
  }
}


const loadMessagesInitial = ()=>{
  let list = document.getElementById("childMessagesContainer");
  list.style.flexDirection = "column-reverse"
  loadImagesHelper(list)  
  let mainList = document.getElementById("messagesContainer");
  mainList.style.flexDirection = "column-reverse"
  mainList.scrollTop = mainList.scrollHeight
  }

const loadMessages = ()=>{
  let mainList = document.getElementById("messagesContainer");
  let list = document.getElementById("childMessagesContainer");
  const height = mainList.scrollTop
  var temp = $(list).height();
  loadImagesHelper(list)
  $(mainList).scrollTop($(list).height()-temp + height);
}

const loadNewestMsgs = ()=> {
  let list = document.getElementById("messagesContainer");
  list.innerHTML = ""
  counter = 0
  loadImagesHelper(list)
  list.scrollTop = list.scrollHeight
}

window.addEventListener('load', () => {
  const app = new App(document.getElementById('app'))
  app.render() 
  let list = document.getElementById("messagesContainer");
  let toBottom = document.createElement("button");
  toBottom.innerHTML = "↓ Newest messages"
  toBottom.onclick = ()=>{
    loadNewestMsgs()
  }


  toBottom.style.position = "absolute"
  toBottom.style.marginTop = "0px"
  toBottom.classList = "arrowDown"
  document.getElementById("msgBody").appendChild(toBottom)
  loadMessagesInitial()

  $(list).scroll(function() {
    if($(list).scrollTop() <3000) {
      loadMessages()
    }
  });
})