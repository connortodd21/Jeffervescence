const app = {
  arr : [],
  init(selectors) {        
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document.querySelector(selectors.formSelector).addEventListener('submit', this.addFlick.bind(this))
  },

  addFlick(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }
    const listItem = this.renderListItem(flick)
    this.arr.push(flick.name)

    //promote button
    const button = document.createElement('button')
    button.setAttribute('id', 'promoteButton')
    button.classList.add('button', 'primary')
    button.innerText = 'Promote'
    listItem.appendChild(button)
    
    //remove button
    const button2 = document.createElement('button')
    button2.setAttribute('id', 'removeButton')
    button2.classList.add('button', 'alert')
    button2.innerText = 'Remove'
    listItem.appendChild(button2)
    //adding buttons to list
    this.list.appendChild(listItem)
    //move inside promoteFunction    
    document.getElementById('promoteButton').addEventListener('click', this.promoteFunc.bind(this))
    //move inside removeFunction
    document.getElementById('removeButton').addEventListener('click', this.removeFunc.bind(this))

    ++ this.max
  },

  promoteFunc(ev){
    console.log('inside promoteFunc')
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