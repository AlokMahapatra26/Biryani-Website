import axios from 'axios';


let addToCart = document.querySelectorAll('.add');
let cartCounter = document.querySelector('#cartCounter');
function updateCart(item){
    axios.post('/update-cart' , item).then(res => {
        cartCounter.innerText = res.data.totalQty
        
    }).catch(err => {
        alert(err);
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click' , (e)=>{
        
        let item = JSON.parse(btn.dataset.item)
        updateCart(item);
        
    })
})


