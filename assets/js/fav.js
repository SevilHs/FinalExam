const BASE_URL="http://localhost:8000"

let row= document.querySelector('.fav-row')

async function getFavData(){
    row.innerHTML=''
    let res=await axios(`${BASE_URL}/furnishfav`)
    let data=res.data
    data.forEach(element => {
        row.innerHTML+=`
        <span class="col col-12 col-md-3 furnish-card-div">
        <div class="furnish-card furnish-card-1">
          <div class="img-div img-div-1">
            <img src="${element.photo}" alt="handshake-img" />
          </div>
          <h5>${element.title}</h5>    
          <p>${element.description}</p>
          <div class="actions">
              <i class="fa-solid fa-trash-can" onclick=deleteCard(${element.id},this)></i>
          </div>
        </div>
      </span> 
        `
    });
}

getFavData()

async function deleteCard(id,btn){
    await axios.delete(`${BASE_URL}/furnishfav/${id}`)
    btn.closest('span').remove()
}