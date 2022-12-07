/**
 * The entry point
 */
import axios from 'axios'

import App from './components/app'
const baseUrl = 'http://localhost:3000/messages'  //use this for development
import "regenerator-runtime"
const getSingle = (id) => {
  const num = id%6 +1
  const allData = axios.get(baseUrl+`/${num}`)
  return allData
}

let counter = 0

let allMsgs = []

const loadImagesInitial = async()=>{
  let list = document.getElementById("myList");
  for (let i = 0 ; i<30; i++){
    await getSingle(counter)
        .then(response=>{
          let msg = response.data

          let msgContainer = document.createElement("div");
          msgContainer.id = "img" + (counter)

          const author = document.createElement("h1")
          author.style="width: 200px;word-wrap: break-word;text-align : left"
          const authorNode = document.createTextNode(msg.name);
          author.append(authorNode)
          msgContainer.append(author)
          
          const txt = document.createElement("p")
          txt.style="width: 800px;word-wrap: break-word;text-align : left"
          const textNode = document.createTextNode(msg.content);
          txt.append(textNode)
          msgContainer.append(txt)

          const imgWrapper = document.createElement("img")
          imgWrapper.src = msg.image
          imgWrapper.style.height = "100px"
          imgWrapper.style.width = "100px"
          imgWrapper.style.marginTop = "20px"
          msgContainer.append(imgWrapper)

          list.prepend(msgContainer)
          allMsgs.push(msg)  
        })
        .then(_=>list.scrollTop = list.scrollHeight)
        counter++
  }
}

const loadImages =async ()=>{
  let list = document.getElementById("myList");
  const elem = list.childNodes[0] 
  for (let i = 0 ; i<30; i++){
    await getSingle(counter)
        .then(response=>{
          let msg = response.data

          let msgContainer = document.createElement("div");
          msgContainer.id = "img" + (counter)

          const author = document.createElement("h1")
          author.style="width: 200px;word-wrap: break-word;text-align : left"
          const authorNode = document.createTextNode(msg.name);
          author.append(authorNode)
          msgContainer.append(author)

          const txt = document.createElement("p")
          txt.style="width: 800px;word-wrap: break-word;text-align : left"
          const textNode = document.createTextNode(msg.content);
          txt.append(textNode)
          msgContainer.append(txt)

          const imgWrapper = document.createElement("img")
          imgWrapper.src = msg.image
          imgWrapper.style.height = "100px"
          imgWrapper.style.width = "100px"
          imgWrapper.style.marginTop = "20px"
          msgContainer.append(imgWrapper)

          list.prepend(msgContainer)
          allMsgs.push(msg)  

        })
  counter++
  }
  elem.scrollIntoView()
}

window.addEventListener('load', () => {
  const app = new App(document.getElementById('app'))
  app.render() 
  let list = document.getElementById("myList");
  let toBottom = document.createElement("button");
  toBottom.innerHTML = "Newest messages"
  toBottom.onclick = ()=>{
    list.scrollTo(0,list.scrollHeight)
  }
  toBottom.style.position = "absolute"
  toBottom.style.marginTop = "0px"
  document.getElementById("msgBody").appendChild(toBottom)
  loadImagesInitial()
  list.addEventListener('scroll',()=>{
    if(list.scrollTop ==0){
      loadImages()
    }
  })
})