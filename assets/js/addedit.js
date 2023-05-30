let id = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:8000";

let form = document.querySelector("form");
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let photo = document.querySelector("#photo");
let text=document.querySelector("#formText")
let submitBtn=document.querySelector("#submitBtn")

if (id) {
  async function fillInp() {
    let res = await axios(`${BASE_URL}/furnish/${id}`);
    let data = res.data;
    title.value=data.title
    description.value=data.description
  }
  fillInp()
  text.innerHTML="Edit Card"
  submitBtn.innerHTML="Edit Card"
}

async function editCard(){
    let obj={
        title:title.value,
        description:description.value,
        photo:photo.value ? `./assets/images/${photo.value.split('\\')[2]}` : "./assets/images/kitchen.png"
    }
    await axios.patch(`${BASE_URL}/furnish/${id}`,obj)
    let res=await axios(`${BASE_URL}/furnishfav`)
    let data=res.data
    let check=data.find(item=>item.id==id)
    if(check){
    await axios.patch(`${BASE_URL}/furnishfav/${id}`,obj)
    }
    window.location="index.html"
}

async function addCard(){
    let obj={
        title:title.value,
        description:description.value,
        photo:photo.value ? `./assets/images/${photo.value.split('\\')[2]}` : "./assets/images/kitchen.png"
    }
    await axios.post(`${BASE_URL}/furnish`,obj)
    window.location="index.html"
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(id){
        editCard()
    }else{
        addCard()
    }
})
