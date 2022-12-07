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
        <div id = "msgBody">
        <div id="messagesContainer" style="overflow-y : scroll; height:550px"></div>
        </div>
        </section>
        `
    }
}