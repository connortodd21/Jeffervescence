const app = {
  arr : [],
  idPromoteCounter : 0,
  idRemoveCounter : 0,
  
  init(selectors) {        
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document.querySelector(selectors.formSelector).addEventListener('submit', this.addFlick.bind(this))
  },

  addFlick(ev) {
    ev.preventDefault()
    this.idRemoveCounter++;
    this.idPromoteCounter++;
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
    console.log('inside removeFunc')
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