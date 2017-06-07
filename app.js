const app = {
  arr : [],
  idPromoteCounter : 0,
  idRemoveCounter : 0,
  idIncreaseCounter: 0,
  idDecreaseCounter: 0,
  
  init(selectors) {        
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document.querySelector(selectors.formSelector).addEventListener('submit', this.addFlick.bind(this))
  },

  addFlick(ev) {
    ev.preventDefault()
    this.idRemoveCounter++;
    this.idPromoteCounter++;
    this.idPromoteCounter++;
    this.idDecreaseCounter++;
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }
    const listItem = this.renderListItem(flick)
    this.arr.push(flick.name)

    //promote button
    var promoteButtonId = 'promoteButton' + this.idPromoteCounter
    const button = document.createElement('button')
    button.setAttribute('id', promoteButtonId)
    button.classList.add('button', 'primary')
    button.innerText = 'Promote'
    listItem.appendChild(button)
    
    //remove button
    var removeButtonId = 'removeButton' + this.idRemoveCounter
    const button2 = document.createElement('button')
    button2.setAttribute('id', removeButtonId)
    button2.classList.add('button', 'alert')
    button2.innerText = 'Remove'
    listItem.appendChild(button2)

    //increase button
    var increaseButtonID = 'increaseButton' + this.idIncreaseCounter
    const button3 = document.createElement('button')
    button3.setAttribute('id', increaseButtonID)
    button3.classList.add('button', 'success')
    button3.innerText = 'Increase'
    listItem.appendChild(button3)

    //decrease button
    var decreaseButtonID = 'decreaseButton' + this.idDecreaseCounter
    const button4 = document.createElement('button')
    button4.setAttribute('id', decreaseButtonID)
    button4.classList.add('button', 'warning')
    button4.innerText = 'Decrease'
    listItem.appendChild(button4)
    
    //adding buttons to list
    this.list.appendChild(listItem)
    
    //move inside promoteFunction    
    document.getElementById(promoteButtonId).addEventListener('click', this.promoteFunc.bind(this))
    
    //move inside removeFunction
    document.getElementById(removeButtonId).addEventListener('click', this.removeFunc.bind(this))

    ++ this.max
  },

  promoteFunc(ev){
    if(ev.target.parentNode.classList.contains('promoted')){
         ev.target.parentNode.classList.remove('promoted')
    }
    else{
        ev.target.parentNode.classList.add('promoted')
    }
  },

  removeFunc(ev){
    ev.target.parentNode.parentNode.removeChild(ev.target.parentNode)    
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