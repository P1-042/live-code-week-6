if (localStorage.getItem('access_token')) {
  $(document).ready(function () {
    $('.global').hide();
    $('.app-section').show();
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
      $('#input-title').val('');
      $('#input-price').val('')
      $('#input-ingredients').val('');
      $('#input-tag').val('');
    })
    .fail(function (err) {
      console.log(err)
    })
}

// FETCH FOOD
function fecthFood(){
  $.ajax({
    type: "GET",
    url:"http://localhost:3000/foods",
    headers:{
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(function(foods){
    foods.forEach(el=>{
      $('.list-section').append(`
      <div class="card">
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between mb-0">
              <div class="col-9">
                <h5 class="font-weight-bold">${el.} </h5>
                <p>Rp.${el.price}</p>
              </div>
              <div class="col-3 d-flex align-items-baseline">
                <i class="fas fa-tag text-grey mr-2"></i>
                <p class="text-grey">ikan</p>
                <button class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
              </div>
            </div>
            <div class="card-body border-bottom">
              1 kg ikan gurame, Jeruk nipis, Kecap manis pedas, 7 cabe merah, 7 bawang merah, 3 bawang putih, 3 kemiri,
              1 sdt ketumar, Jahe, Kunyit, 3 sdt gula, 3 sdt garam
            </div>
          </div>
        </div>
      `)
    })
  })
}