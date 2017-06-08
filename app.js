const app = {
  arr : [],
  
  idPromoteCounter : 0,         //counter for changing button ID later
  idRemoveCounter : 0,          //counter for changing button ID later
  idIncreaseCounter: 0,         //counter for changing button ID later
  idDecreaseCounter: 0,         //counter for changing button ID later
  
  init(selectors) {        
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document.querySelector(selectors.formSelector).addEventListener('submit', this.addFlick.bind(this))
    
    //document.querySelector(selectors.listSelector).flickName.focus()
},

  addFlick(ev) {
    ev.preventDefault()
    //counters for different button ID's to differentiate
    this.idRemoveCounter++;
    this.idPromoteCounter++;
    this.idIncreaseCounter++;
    this.idDecreaseCounter++;
    //flick obj
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }
    const listItem = this.renderListItem(flick)
    //add to front of array
    this.arr.unshift(flick.name)

    //add to local storage
    localStorage.setItem('flick', JSON.stringify(this.flick))
    
    
     //decrease button
    var decreaseButtonID = 'decreaseButton' + this.idDecreaseCounter
    const button4 = document.createElement('button')
    button4.setAttribute('id', decreaseButtonID)
    button4.classList.add('button', 'warning')
    button4.innerText = 'Decrease'
    listItem.appendChild(button4)

    //increase button
    var increaseButtonID = 'increaseButton' + this.idIncreaseCounter
    const button3 = document.createElement('button')
    button3.setAttribute('id', increaseButtonID)
    button3.classList.add('button', 'success')
    button3.innerText = 'Increase'
    listItem.appendChild(button3)

    //remove button
    var removeButtonId = 'removeButton' + this.idRemoveCounter
    const button2 = document.createElement('button')
    button2.setAttribute('id', removeButtonId)
    button2.classList.add('button', 'alert')
    button2.innerText = 'Remove'
    listItem.appendChild(button2)
   
    //promote button
    var promoteButtonId = 'promoteButton' + this.idPromoteCounter
    const button = document.createElement('button')
    button.setAttribute('id', promoteButtonId)
    button.classList.add('button', 'primary')
    button.innerText = 'Promote'
    listItem.appendChild(button)
    
    //adding buttons to list
    this.list.appendChild(listItem)
    
    //move inside promoteFunction    
    document.getElementById(promoteButtonId).addEventListener('click', this.promoteFunc.bind(this))
    
    //move inside removeFunction
    document.getElementById(removeButtonId).addEventListener('click', this.removeFunc.bind(this))

    //move inside increase function
    document.getElementById(increaseButtonID).addEventListener('click', this.increaseFunc.bind(this))

    //move inside decrease function
    document.getElementById(decreaseButtonID).addEventListener('click', this.decreaseFunc.bind(this))

    //add to list
    this.list.insertBefore(listItem, this.list.firstChild)
    ++ this.max
    f.reset();
  },

  increaseFunc(ev){
    const keyA = ev.target.parentNode.parentNode
    const keyB = keyA.dataset.key
    const num = this.arr.indexOf(keyB)

    if(num>=this.arr.length -1){
        return;
    }
    //switching elements in the array
    const temp = this.arr[num + 1]
    this.arr[num] = temp
    this.arr[num + 1] = keyB



    this.list.insertBefore(ev.target.parentNode, ev.target.parentNode.previousSibling)
  },
  
  decreaseFunc(ev){

    const keyA = ev.target.parentNode.parentNode
    const keyB = keyA.dataset.key
    const num = this.arr.indexOf(keyB)

    if(this.arr[0] == keyA){
        return;
    }
    //switching elements in the array
    const temp = this.arr[num - 1]
    this.arr[num] = temp
    this.arr[num - 1] = keyB

    this.list.insertBefore(ev.target.parentNode, ev.target.parentNode.nextSibling.nextSibling)
  },

  promoteFunc(ev){
    //adding promoted class to the li to differentiate in css
    if(ev.target.parentNode.classList.contains('promoted')){
        //remove promoted class
         ev.target.parentNode.classList.remove('promoted')
    }
    else{
        //add promoted class
        ev.target.parentNode.classList.add('promoted')
    }
  },

  removeFunc(ev){


    //remove from list on page
    ev.target.parentNode.parentNode.removeChild(ev.target.parentNode)   
    localStorage.setItem('flick', JSON.stringify(this.flick)) 

    // //remove from array
    // for(let i = 0; i<this.flick.length; i++){
    //     const currendId = this.flick[i].id.toString() 
    //     if(currendId === listItem.dataset.id){
    //         this.flick.splice(i,1)
    //         break;
    //     }
    // }



  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    return item
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list'
})