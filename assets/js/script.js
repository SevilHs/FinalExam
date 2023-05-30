const BASE_URL="http://localhost:8000"

let row=document.querySelector('.cards-row')
let search=document.querySelector('#search')
let sort=document.querySelector('#sort')
let load=document.querySelector('#loadMoreBtn')

let allData=[]
let filtered=[]
let defaultArr=[]
let num=4

async function getAllData(){
    row.innerHTML=''
    let res=await axios(`${BASE_URL}/furnish`)
    let data=res.data
    allData=data
    filtered= filtered.length || search.value ?filtered : data
    filtered.slice(0,num).forEach(element => {
        row.innerHTML+=`
        <span class="col col-12 col-md-3 furnish-card-div">
        <div class="furnish-card furnish-card-1">
          <div class="img-div img-div-1">
            <img src="${element.photo}" alt="handshake-img" />
          </div>
          <h5>${element.title}</h5>    
          <p>${element.description}</p>
          <div class="actions">
              <a href="addedit.html?id=${element.id}" class="fa-regular fa-pen-to-square"></a>
              <i class="fa-solid fa-trash-can" onclick=deleteCard(${element.id},this)></i>
              <i class="fa-regular fa-heart" onclick=addFav(${element.id})></i>
          </div>
        </div>
      </span>
        `
    });
}

getAllData()

async function deleteCard(id,btn){
    let res=await axios(`${BASE_URL}/furnishfav`)
    let data=res.data
    let check=data.find(item=>item.id==id)
    if(check){
    await axios.delete(`${BASE_URL}/furnishfav/${id}`)
    }
    await axios.delete(`${BASE_URL}/furnish/${id}`)
    btn.closest('span').remove()
}

async function addFav(id){
    let res=await axios(`${BASE_URL}/furnish/${id}`)
    let data=res.data
    let res2=await axios(`${BASE_URL}/furnishfav`)
    let data2=res2.data
    let check=data2.find(item=>item.id==id)
    if(!check){
    await axios.post(`${BASE_URL}/furnishfav`,data)
    }else{
        alert('nonono!')
    }
}

search.addEventListener('input',(e)=>{
    e.preventDefault()
    filtered=allData.slice(0,num).filter(item=>{
        return item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    })
    defaultArr=filtered
    getAllData()
})

load.addEventListener('click',()=>{
    num=num+4
    filtered=allData.slice(0,num).filter(item=>{
        return item.title.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())
    })
    defaultArr=filtered
    getAllData()
    if(allData.length<=num){
        load.disabled=true
        load.style.opacity=0.3
    }
})

sort.addEventListener('click',(e)=>{
    e.preventDefault()
    if(sort.innerHTML=="Ascending"){
        sort.innerHTML="Descending"
        filtered=filtered.slice(0,num).sort((a,b)=>a.title.localeCompare(b.title))
    }else if(sort.innerHTML=="Descending"){
        sort.innerHTML="Default"
        filtered=filtered.slice(0,num).sort((a,b)=>b.title.localeCompare(a.title))
    }else{
        sort.innerHTML="Ascending"
        filtered=defaultArr
    }
    getAllData()
})
