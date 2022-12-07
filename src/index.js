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
    // pfp.src = msg.image
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
    // imgWrapper.src = msg.image
    console.log(counter);    
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
  let list = document.getElementById("messagesContainer");
  loadImagesHelper(list)  
  list.scrollTop = list.scrollHeight
  }

const loadMessages = ()=>{
  let list = document.getElementById("messagesContainer");
  const elem = list.childNodes[0]
  loadImagesHelper(list)
  list.scrollTop = list.scrollHeight
  elem.scrollIntoView()
}

window.addEventListener('load', () => {
  const app = new App(document.getElementById('app'))
  app.render() 
  let list = document.getElementById("messagesContainer");
  let toBottom = document.createElement("button");
  toBottom.innerHTML = "↓ Newest messages"
  toBottom.onclick = ()=>{
    list.scrollTo(0,list.scrollHeight)
  }
  toBottom.style.position = "absolute"
  toBottom.style.marginTop = "0px"
  toBottom.classList = "arrowDown"
  document.getElementById("msgBody").appendChild(toBottom)
  loadMessagesInitial()
  list.addEventListener('scroll',()=>{
    if(list.scrollTop ==0){
      loadMessages()
    }
  })
})