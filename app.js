const app = {
  arr : [],
  
  idPromoteCounter : 0,         //counter for changing button ID later
  idRemoveCounter : 0,          //counter for changing button ID later
  idIncreaseCounter: 0,         //counter for changing button ID later
  idDecreaseCounter: 0,         //counter for changing button ID later

  listItem: '',
  
  init(selectors) {        
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document.querySelector(selectors.formSelector).addEventListener('submit', this.addFlickViaForm.bind(this))
    
    //document.querySelector(selectors.listSelector).flickName.focus()
    this.load();
},

//load items from local storage
load(){
    //get JSON string from local storage
    const flicksJSON = localStorage.getItem('flick')

    //turn flicksJSON into array
    const flicksArray = JSON.parse(flicksJSON)
     if (flicksArray) {
      flicksArray
        .reverse()
        .map(this.addFlick.bind(this))
    }
    
  },





addFlick(flick){
    listItem = this.renderListItem(flick)
    this.list
      .insertBefore(listItem, this.list.firstChild)
    
    ++ this.max
    this.arr.unshift(flick)
    this.save()

    //decrease button
    const decreaseButton = document.createElement('button')
    decreaseButton.classList.add('button', 'warning')
    decreaseButton.innerText = 'Decrease'
    listItem.appendChild(decreaseButton)

    //increase button
    const increaseButton = document.createElement('button')
    increaseButton.classList.add('button', 'success')
    increaseButton.innerText = 'Increase'
    listItem.appendChild(increaseButton)

    //remove button
    const removeButton = document.createElement('button')
    removeButton.classList.add('button', 'alert')
    removeButton.innerText = 'Remove'
    listItem.appendChild(removeButton)
   
    //promote button
    const promoteButton = document.createElement('button')
    promoteButton.classList.add('button', 'primary')
    promoteButton.innerText = 'Promote'
    listItem.appendChild(promoteButton)
    
    //adding buttons to list
    this.list.appendChild(listItem)
    
    //move inside promoteFunction    
    promoteButton.addEventListener('click', this.promoteFunc.bind(this))
    
    //move inside removeFunction
    removeButton.addEventListener('click', this.removeFunc.bind(this))

    //move inside increase function
    increaseButton.addEventListener('click', this.increaseFunc.bind(this))

    //move inside decrease function
    decreaseButton.addEventListener('click', this.decreaseFunc.bind(this))

    //add to list
    this.list.insertBefore(listItem, this.list.firstChild)
    
}, 



    
  addFlickViaForm(ev) {
    ev.preventDefault()
    //counters for different button ID's to differentiate later on
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
    //const listItem = this.renderListItem(flick)
    //add to front of arrays
    this.addFlick(flick)
    this.save();

    
    
     
    f.reset();
  },

  

  increaseFunc(ev){
    const keyA = ev.target.parentNode.parentNode
    const keyB = keyA.dataset.key
    const num = this.arr.indexOf(keyB)

    if(num>=this.arr.length -1){
        return;
    }

    //  if(ev.target.parentNode === this.list.lastChild){
    //     //disable
    //     document.getElementById(increaseButtonID).classList.add('disabled')
    //     return;
    // }
    // else{
    //     document.getElementById(increaseButtonID).classList.remove('disabled')
    // }


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
    
    //remove from array
    for(let i = 0; i<this.arr.length; i++){
        const currendId = this.arr[i].id.toString() 
        if(currendId === listItem.dataset.id){
            this.flick.splice(i,1)
            break;
        }
    }
    this.save()

    



  },
  
  //add to local storage
  save(){
      localStorage.setItem('flick', JSON.stringify(this.arr))
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