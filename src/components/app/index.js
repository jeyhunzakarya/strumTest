import * as css from './index.css'
require("babel-core/register");
require("babel-polyfill");
export default class App {
    constructor (elem) {
      if (!elem) return
      this.elem = elem
    }

    render () {
        if (this.elem) this.elem.innerHTML = `
        <section data-component="app">
        <h1>App Component</h1> 
        <div id = "msgBody">
        <ul id="myList" style="overflow-y : scroll; height:400px"></ul>
        </div>
        </section>
        `
    }
}