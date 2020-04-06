if (localStorage.getItem('access_token')) {
  $(document).ready(function () {
    $('.global').hide();
    $('.app-section').show();
    fetchFood()
  })
} else {
  $(document).ready(function () {
    $('.global').hide();
    $('.login-section').show()
  })
}

// LOGIN
function login(e) {
  e.preventDefault();
  const email = $('#input-email').val();
  const password = $('#input-password').val();
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/login",
    data: { email, password }
  })
    .done(function (data) {
      fetchFood()
      localStorage.setItem('access_token', data.access_token)
      $('#input-email').val('');
      $('#input-password').val('');
      $('.global').hide();
      $('.app-section').show()
    })
    .fail(function (err) {
      console.log(err)
    })
}

// LOGOUT
function logout(e) {
  e.preventDefault();

  localStorage.removeItem('access_token');
  $('.global').hide();
  $('.login-section').show();
  Swal.fire(
    'Logged out!',
    'Successfully log out!',
    'success'
  )
}

// ADD FOOD
function addFood(e) {
  e.preventDefault();
  let dataFood = {}
  dataFood.title = $('#input-title').val();
  dataFood.price = $('#input-price').val()
  dataFood.ingredients = $('#input-ingredients').val();
  dataFood.tag = $('#input-tag').val();
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/foods",
    data: dataFood,
    headers: { access_token: localStorage.getItem('access_token') }
  })
    .done(function (food) {
      Swal.fire(
        'Food Added!',
        'You have successfully added the food!',
        'success'
      )
      $('#input-title').val('');
      $('#input-price').val('')
      $('#input-ingredients').val('');
      $('#input-tag').val('');
      fetchFood()
    })
    .fail(function (err) {
      console.log(err)
    })
}

// DELETE FOOD
function deleteFood(e){
  e.preventDefault();
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/foods/${e.target.value}`,
        headers:{
          access_token: localStorage.getItem('access_token')
        }
      })
      .done(function(){
        fetchFood()
      })
      .fail(function(err){
        console.log(err)
      })
    }
  })
  
}

// FETCH FOOD
function fetchFood(){
  $.ajax({
    type: "GET",
    url:"http://localhost:3000/foods",
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(function(foods){
    $('.list-section').html('')
    foods.forEach(el=>{
      $('.list-section').append(`
      <div class="card">
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between mb-0">
              <div class="col-9">
                <h5 class="font-weight-bold">${el.title} </h5>
                <p>Rp.${el.price}</p>
              </div>
              <div class="col-3 d-flex align-items-baseline">
                <i class="fas fa-tag text-grey mr-2"></i>
                <p class="text-grey">${el.tag}</p>
                <button onclick="deleteFood(event)" class="fas fa-trash text-danger ml-auto cursor-pointer" id="delete-button" value="${el.id}"></button>
              </div>
            </div>
            <div class="card-body border-bottom">
              ${el.ingredients}
            </div>
          </div>
        </div>
      `)
    })
  })
}