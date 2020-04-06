$(document).ready(function(){
    console.log('ready')
      let token = localStorage.getItem('token')
      if(token){
        console.log('ada token')
        $(`#login`).hide()
        showlist()
        $(`#appage`).show()
      } else {
        console.log('no token')
          $(`#appage`).hide()
          // $(`#add`).hide()
          $(`#login`).show()
      }
  })

$(`#submitlogin`).submit(function(event){
    event.preventDefault();
    let email = $(`#email-login`).val()
    let password = $(`#password-login`).val()
    console.log(email, password)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/login',
        data: {
            email: email,
            password: password
        },
        success: function(result){
            console.log(result)
            localStorage.setItem('token', result.access_token)
            $(`#login`).hide()
            showlist()
            $(`#appage`).show()
        }, 
        error: function(err){
            console.log(err)
        }
    })
})

function showlist(){
    let token = localStorage.getItem('token')
    console.log(token, "dari showlist")
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/foods',
        headers: {
            token: token
        },
        success: function(result){
            console.log(result)
            $(`#login`).hide()
            $(`#appage`).show()
            for (let i=0; i<result.length; i++){
                $(`#list`).append(`
                <div id="card">
                    <div>Food name: ${result[i].title}</div>
                    <div>Price: ${result[i].price}</div>
                    <div>Ingredients: ${result[i].ingredients}</div>
                    <div>Tag: ${result[i].tag}</div>
                    <button type="button" id="delbtn" onclick="delfood(${result[i].id})">Delete</button>
                </div><br>
                `)
            }
        }, 
        error: function(err){
            console.log(err)
        }
    })
}

$(`#submitadd`).submit(function(event){
    event.preventDefault();
    let title = $(`#title-add`).val()
    let price = $(`#price-add`).val()
    let ingredients = $(`#ingredients-add`).val()
    let tag = $(`#tag-add`).val()
    console.log(title)
    let token = localStorage.getItem('token')
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/foods',
        headers: {
            token: token
        },
        data: {
            title: title,
            price: price,
            ingredients: ingredients,
            tag: tag
        },
        success: function(result){
            console.log(result)
            $(`#login`).hide()
            $(`#list`).empty()
            showlist()
            $(`#appage`).show()
        }, 
        error: function(err){
            console.log(err)
        }
    })
})

function delfood(id){
    let token = localStorage.getItem('token')
    console.log(token, "dari delfood")
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/foods/${id}`,
        headers: {
            token: token
        },
        success: function(result){
            console.log(result)
        },
        error: function(err){
            console.log(err)
        }
    })
}