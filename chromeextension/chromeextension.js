let myLeads = []

// // turn the myleads string into an array
// myLeads = JSON.parse(myLeads)
// // push a new value to the array
// myLeads.push("www.lead2.com")
// // turn the array into a string again
// myLeads = JSON.stringify(myLeads)
// //console.log the string using typeof to verify that its a string
// console.log(typeof myLeads)

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteAll = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click" ,function() {
    chrome.tabs.query({active: true,currentWindow: true}, function(tabs) {
         myLeads.push(tabs[0].url)
         localStorage.setItem("myLeads", JSON.stringify(myLeads))
         render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length;i++) {
        // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"     // innerHTML use the properties of html in javascript
        // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a>"
        listItems += ` 
        <li>
            <a target = '_blank' href ='${leads[i]}'>
                ${leads[i]}
            </a>
        </li> 
        `
        
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click" , function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
}) 

deleteAll.addEventListener("dblclick" , function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

