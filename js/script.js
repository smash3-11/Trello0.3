const empties = document.querySelectorAll('.empty')
let openModal = document.querySelector('.create')
let modal = document.querySelector('#modal')
let closeButton = document.querySelector('.close')
let taskForm = document.querySelector('#task-form')
let taskStatusSelect = document.querySelector('#task-status')
let newItem = document.querySelector('#new')
let saveEdit = document.querySelector('.save')
let executorsSelect = document.querySelector('#executors')

// add new executers
let ava = document.querySelector('#open_add_modal')
let cl = document.querySelector('#close')
let add_ava = document.querySelector('.im')
let show_add = document.querySelector("#add_modal")
let add_form = document.querySelector("#add-form")
let new_name = document.querySelector("#name")
let no_prof = document.querySelector("#profession")

// drag & delete box 
const delBox = document.querySelector('.del_box')
const del_lid = document.querySelector('.lid')
const delBas = document.querySelector('.basket')
const pal = document.querySelectorAll('.pal')

// multiSelect 
let box_sel = document.querySelector('.selected-items')


let todos = []

let temp_id
let temp = []
const team = [{
	id: Math.random(),
	name: 'John Doe',
	profession: 'Developer',
	icon: 'icon1.png'
},
{
	id: Math.random(),
	name: 'Jane Smith',
	profession: 'Designer',
	icon: 'icon2.png'
},
{
	id: Math.random(),
	name: 'Mike Johnson',
	profession: 'Project Manager',
	icon: 'icon3.png'
},
{
	id: Math.random(),
	name: 'Sarah Williams',
	profession: 'Marketing Specialist',
	icon: 'icon4.png'
},
{
	id: Math.random(),
	name: 'David Brown',
	profession: 'QA Engineer',
	icon: 'icon5.png'
},
{
	id: Math.random(),
	name: 'Emily Davis',
	profession: 'Data Analyst',
	icon: 'icon6.png'
},
{
	id: Math.random(),
	name: 'Michael Clark',
	profession: 'Business Analyst',
	icon: 'icon7.png'
},
{
	id: Math.random(),
	name: 'Olivia Taylor',
	profession: 'Content Writer',
	icon: 'icon8.png'
},
{
	id: Math.random(),
	name: 'Daniel Wilson',
	profession: 'UX/UI Designer',
	icon: 'icon9.png'
},
{
	id: Math.random(),
	name: 'Sophia Lee',
	profession: 'Product Manager',
	icon: 'icon10.png'
}
]

// team.forEach(user => {
// 	let opt = new Option(user.name, JSON.stringify(user))
// 	executorsSelect.append(opt)
// })

taskForm.onsubmit = function (elem) {
	elem.preventDefault()

	let task = {
		id: Math.random()
	}

	let fm = new FormData(taskForm)

	fm.forEach((value, key) => {
		task[key] = value
	})


	task.executors = selected

	todos.push(task)
	reload(todos)
	selected = []
}

let n, d, dl;

function reload(arr) {
	empties.forEach(el => el.innerHTML = "")

	for (let task of arr) {
		let div = document.createElement('div')
		let h3 = document.createElement('h3')
		let edit_sp = document.createElement('span')
		let p_des = document.createElement('p')
		let div_bottom = document.createElement('div')
		let p_dline = document.createElement('p')
		let span_dl = document.createElement('span')
		let img_dl = document.createElement('img')
		let p_who = document.createElement('p')

		div.classList.add('items')
		div.setAttribute('class', 'items')
		div.setAttribute('draggable', true)
		div.id = task.id

		div_bottom.classList.add('bottom_item')
		p_dline.classList.add('deadline')
		if (task.deadline === '') {
			img_dl = ''
		} else {
			img_dl.src = "icons/deadline.png"
		}

		span_dl.innerHTML = task.deadline
		h3.innerHTML = task.name
		p_des.innerHTML = task.description
		edit_sp.innerHTML = "⋮"
		edit_sp.classList.add('edit')

		for (let exec of task.executors) {

			let img_icon = document.createElement('img')
			img_icon.src = `icons/${exec.icon}`
			p_who.append(img_icon)
		}


		if (task.status === 'To_do') {
			empties[0].append(div)
		} else if (task.status === 'Doing') {
			empties[1].append(div)
		} else {
			empties[2].append(div)
		}

		div.append(edit_sp, h3, p_des, div_bottom)
		div_bottom.append(p_dline, p_who)
		p_dline.append(img_dl, span_dl)

		edit_sp.onclick = () => {

			const previousItem = document.querySelector('[data-editing="true"]')
			if (previousItem) {
				const itemId = +previousItem.id;
				todos = todos.filter((el) => el.id !== itemId)
				previousItem.remove()
			}
			div.setAttribute('data-editing', true)
			editModal(task)
		}
		
		div.ondragstart = function (event) {
			this.classList.add('is-dragging')
			div.classList.add('hold')
			setTimeout(() => (div.classList.add('invisible')), 0)

		}
		temp.push(div)
		modal.style.display = 'none'
	}
}

for (let empty of empties) {
	empty.ondragover = (event) => {
		event.preventDefault()
	}

	empty.ondrop = function (event) {
		event.preventDefault()
		let item = document.querySelector('.is-dragging')
		let finded = todos.find(el => {
			if (el.id === +item.id) {
				return item
			}
		})
		finded.status = this.id

		this.append(item)
		item.classList.remove('is-dragging')
		item.className = "items"
	}
}

function editModal(task) {
    modal.style.display = 'block'

    const pred = document.querySelector('[data-editing="true"]')

    if (pred) {
        const itemId = +pred.id
        todos = todos.filter((el) => el.id !== itemId)
        pred.remove()
    }

    n = document.querySelector('#task-name').value = task.name
    d = document.querySelector('#task-description').value = task.description
    dl = document.querySelector('#task-deadline').value = task.deadline

    newItem.style.display = 'none'
    saveEdit.style.display = 'inline-block'
    
    temp_id = task.id
}

function saveChanges() {
    const task = todos.find(item => item.id === temp_id)

    task.name = n.value
    task.description = d.value
    task.deadline = dl.value

    temp_id = null

    reload(todos)
}

// DRAG for DELETE items 
delBox.ondragover = (event) => {
	event.preventDefault()
	delBox.classList.add('enlarge')
	if (delBox.classList.contains('enlarge')) {
		delBas.style.border = '2px solid red'
		pal.forEach((el) => {
			el.style.backgroundColor = 'red'
		})
		del_lid.style.backgroundColor = 'red'
		del_lid.style.setProperty('--lid-color', 'red')
	}

}

delBox.ondragleave = (event) => {
	delBox.classList.remove('enlarge')
	delBas.style.border = '2px solid white'
	pal.forEach((el) => {
		el.style.backgroundColor = 'white'
	})
	del_lid.style.backgroundColor = 'white'
	del_lid.style.setProperty('--lid-color', 'white')
}
delBox.ondrop = function (event) {
	event.preventDefault()
	const items = document.querySelector('.is-dragging')
	const itemId = +items.id

	todos = todos.filter((el) => el.id !== itemId)
	items.remove()
	items.classList.add('anim')
	delBox.classList.remove('enlarge')
	delBas.style.border = '2px solid white'
	pal.forEach((el) => {
		el.style.backgroundColor = 'white'
	})
	del_lid.style.backgroundColor = 'white'
	del_lid.style.setProperty('--lid-color', 'white')
}


openModal.onclick = () => {
	modal.style.display = 'block'

	realadSelected(selected)
}
ava.onclick = () => {
	show_add.style.display = "block"
}
saveEdit.onclick = () => {
    saveChanges()
    modal.style.display = 'none'
}

closeButton.onclick = () => {
	modal.style.display = 'none'
}
cl.onclick = () => {
	show_add.style.display = "none"
}


// ADD NEW EXECUTE
add_form.onsubmit = function (event) {
	event.preventDefault()

	let name = document.querySelector("#name").value
	let profession = document.querySelector("#profession").value
	let selectedIcon = document.querySelector(".icon.selected-icon")

	if (!selectedIcon) {
		// add_ava.innerHTML = 'Выбирете аватарку :(без этого незя)'
		add_ava.style.opacity = '1'
		return
	}
	add_ava.style.opacity = '0'

	const icon = selectedIcon.dataset.icon

	const teamMember = {
		id: Math.random(),
		name: name,
		profession: profession,
		icon: icon
	}
	team.push(teamMember)

	new_name.value = ""
	no_prof.selectedIndex = 0
	selectedIcon.classList.remove("selected-icon")

	show_add.style.display = "none"

	// console.log(teamMember);
	console.log(team);

	let opt = new Option(teamMember.name, JSON.stringify(teamMember))
	multiInp.add(opt)

	// selected.push(teamMember)
	// realadSelected(selected)
}

const icons = document.querySelectorAll(".icon")

for (const icon of icons) {
	icon.onclick = () => {
		const selectedIcon = document.querySelector(".icon.selected-icon")
		if (selectedIcon) {
			selectedIcon.classList.remove("selected-icon")
		}
		icon.classList.add("selected-icon")
	}
}

// MULTISELECT
let multiInp = document.querySelector(".multiSelect select")
let selctedCont = document.querySelector(".multiSelect .selected-items")
let selected = []

team.forEach(item => {
	let opt = new Option(item.name, JSON.stringify(item))

	multiInp.append(opt)
	// console.log(item);
})

multiInp.onchange = (e) => {
	let item = JSON.parse(e.target.value)

	if (!selected.find(el => el.id === item.id)) {
		selected.push(item)
	} else {
		selected = selected.filter(el => el.id !== item.id)
	}

	multiInp.value = ""
	realadSelected(selected)
}


function realadSelected(arr) {
	selctedCont.innerHTML = ""

	for (let item of arr) {
		selctedCont.innerHTML += `
			<div class="selected" id="${item.id}" >
				<img src="icons/${item.icon}" alt="" />
				<span>${item.name}</span>
				<button class="del-btn">x</button>
			</div>
		`
	}
	const delBtns = document.querySelectorAll('.del-btn')

	delBtns.forEach(btn => {
		btn.onclick = () => {
			let id = +btn.parentElement.id
			selected = selected.filter(el => el.id !== id)
			realadSelected(selected)
		}
	})
}