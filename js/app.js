$(document).ready(function(){

const music = new Audio('0.mp3');

    const musicas = null;

    let masterPlay = $("#masterPlay")
    let wave = $("#wave")

    let index = 0;
    let poster_master_play = document.getElementById("poster_master_play");
    let download_bt = document.getElementById("download_bt");
    let titulo = document.getElementById("title");
    let titular = $('.titulo');
    let pic = $('.img');
    let bt_download = $('.bt_download');
    let ValorId = $('.IdValor');
    let fazFavor = $('.inputFavoritos');
    let fazBaixar = $('.inputBaixados');

    masterPlay.click(()=>{
     
        if(music.paused || music.currentTime <= 0){
            music.play();
            wave.addClass('active1')
            masterPlay.removeClass('bi-play-fill')
            masterPlay.addClass('bi-pause-fill')
            $('.wow').addClass('rotateOut')
        }
        else{
            music.pause()
            wave.removeClass('active1')
            masterPlay.removeClass('bi-pause-fill')
            masterPlay.addClass('bi-play-fill')
            $('.wow').removeClass('rotateOut')
        }
    })


  const makeAllPlayer = ()=>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
      element.classList.remove('bi-pause-circle-fill');
        element.classList.add('bi-play-circle-fill');
    })
  }

    const marcarFundo = () =>{
        Array.from($('.songItem')).forEach((el)=>{
           el.style.background = 'rgba(105, 105, 105, .0)'
        })
    }

    Array.from($('.playListPlay')).forEach((e)=>{
      e.addEventListener('click', (el)=>{
        var btFavorito = $(this).text();
        var IdFavorito = el.target.id;
        var inputFavoritos = fazFavor[IdFavorito -1].value;
        inputFavoritos++;
    
   $.ajax({
           url:"editar.php",
           method:"post",
           data:{btFavorito:btFavorito,IdFavorito:IdFavorito,inputFavoritos:inputFavoritos},
      
           success: function(dados){
            
              console.log(dados)
           }
       
       })







        index = el.target.id
     //   console.log(index)
        music.src = `audio/${index}.mp3`;
      //  poster_master_play.src = `img/${index}.jpg`;
        wave.addClass('active1')
        masterPlay.removeClass('bi-play-fill')
        masterPlay.addClass('bi-pause-fill')
        $('.wow').addClass('rotateOut')
        music.play()
/*
        let songTitlos = $('.songItem').filter((els)=>{

          return els.indexOf == index;

      })
      console.log(songTitlos);


      songTitlos.forEach(elss =>{
         let {songNome, poster} = elss;
          titulo.innerHTML = songNome;
          poster_master_play.src = poster;

      }) */

    //  titulo.innerHTML = titular[index -1].text();
  //  console.log(titular.attr('data-target'))

       for (let i = 0; i < titular.length; i++) {
         const filenome = index;
         let numeruid = filenome;
         let sonar = titular[index -1];
         let img = pic[index -1];
         let baixar = bt_download[index -1];
     //    var inputFavoritos = fazFavor[index -1].value;
        // console.log(baixar)

        if(sonar.id	==	numeruid)	{
         // console.log(img.src);
            titulo.innerHTML = sonar.innerHTML;
            poster_master_play.src = img.src;
            download_bt.download = sonar.innerText;
            download_bt.href = baixar.href;

        /*    inputFavoritos++;
            alert(inputFavoritos); */

        }else{
          console.log("Musica não encotrada");
        }

       }



      marcarFundo()
      Array.from($('.songItem'))[index - 1].style.background = 'rgba(105, 105, 105, .1)'

       // marcarAllplay();

       makeAllPlayer();
       el.target.classList.remove('bi-play-circle-fill')
       el.target.classList.add('bi-pause-circle-fill')



       /* $('#'+index).removeClass('bi-play-circle-fill');
        $('#'+index).addClass('bi-pause-circle-fill'); */

      })

    })

    let tempinicial = document.getElementById("currentStart")
    let tempfinal = document.getElementById("currentEnd")
    let seek = document.getElementById('seek')
    let bar2 = document.getElementById('bar2')
    let dot = document.querySelector('.dot');

      music.addEventListener('timeupdate', ()=>{
        let music_curr = music.currentTime
        let music_dur = music.duration

        let min1 = Math.floor(music_dur / 60)
        let sec1 = Math.floor(music_dur % 60)
        if(sec1 < 10){
          sec1 = `0${sec1}`
        }
        tempfinal.innerHTML = `${min1}:${sec1}`;


        let min2 = Math.floor(music_curr / 60)
        let sec2 = Math.floor(music_curr % 60)
        if(sec2 < 10){
          sec2 = `0${sec2}`
        }
        tempinicial.innerHTML = `${min2}:${sec2}`;

        let progressBar = parseInt((music_curr / music_dur) * 100)
        seek.value = progressBar;
        let seekbar = seek.value;
        bar2.style.width = `${seekbar}%`;
        dot.style.left = `${seekbar}%`;

        if(seekbar == 100){
          index++;
        if (index > Array.from(document.getElementsByClassName('songItem')).length) {
          index = 1
        }
        else if (index > 50) {

          return index = 0;
        }
        music.src = `audio/${index}.mp3`;
        //  poster_master_play.src = `img/${index}.jpg`;
          wave.addClass('active1')
          masterPlay.removeClass('bi-play-fill')
          masterPlay.addClass('bi-pause-fill')
          $('.wow').addClass('rotateOut')
          music.play()

       /*   let songTitlos = $('.songItem').filter((els)=>{
            return els.id == index
        })
        songTitlos.forEach(elss =>{
            let {songNome, poster} = elss;
            titulo.innerHTML = songNome;
            poster_master_play.src = poster;
        })
  */

       for (let i = 0; i < titular.length; i++) {
        const filenome = index;
        let numeruid = filenome;
        let sonar = titular[index -1];
        let img = pic[index -1];
        let baixar = bt_download[index -1];
       // console.log(sonar.id)

       if(sonar.id	==	numeruid)	{
        // console.log(img.src);
           titulo.innerHTML = sonar.innerHTML;
           poster_master_play.src = img.src;
           download_bt.download = sonar.innerText;
           download_bt.href = baixar.href;
       }else{
         console.log("Musica não encotrada");
       }

      }
        marcarFundo()
        Array.from($('.songItem'))[index - 1].style.background = 'rgba(105, 105, 105, .1)'

         // marcarAllplay();

         makeAllPlayer();
         el.target.classList.remove('bi-play-circle-fill')
         el.target.classList.add('bi-pause-circle-fill')

    }
      })



      seek.addEventListener('change', ()=>{
        music.currentTime = seek.value * music.duration / 100
      })

      let vol_icon = document.getElementById("vol_icon")
      let vol = document.getElementById("vol")
      let vol_bar = document.querySelector(".vol_bar")
      let vol_dot = document.getElementById("vol_dot")

      vol.addEventListener('change', ()=>{
        if(vol.value == 0){
          vol_icon.classList.remove("bi-volume-up-fill")
          vol_icon.classList.remove("bi-volume-down-fill")
          vol_icon.classList.add("bi-volume-off-fill")
        }
        if(vol.value > 0){
          vol_icon.classList.remove("bi-volume-up-fill")
          vol_icon.classList.add("bi-volume-down-fill")
          vol_icon.classList.remove("bi-volume-off-fill")
        }
        if(vol.value > 50){
          vol_icon.classList.add("bi-volume-up-fill")
          vol_icon.classList.remove("bi-volume-down-fill")
          vol_icon.classList.remove("bi-volume-off-fill")
        }
        let vol_a = vol.value;
        vol_bar.style.width = `${vol_a}%`
        vol_dot.style.left = `${vol_a}%`
        music.volume = vol_a / 100

      })

      let recuar = document.getElementById("recuar")
      let avancar = document.getElementById("avancar")

      recuar.addEventListener('click', ()=>{
        index -= 1;
     /*   if (index < 1) {
          index = Array.from(document.getElementsByClassName('songItem')).length
        } */
         if (index < 1) {

          return index = 51;
        }
        music.src = `audio/${index}.mp3`;
        //  poster_master_play.src = `img/${index}.jpg`;
          wave.addClass('active1')
          masterPlay.removeClass('bi-play-fill')
          masterPlay.addClass('bi-pause-fill')
          $('.wow').addClass('rotateOut')
          music.play()
  /*
          let songTitlos = $('.songItem').filter((els)=>{
            return els.id == index
        })

        songTitlos.forEach(elss =>{
            let {songNome, poster} = elss;
            titulo.innerHTML = songNome;
            poster_master_play.src = poster;
        })
  */

       for (let i = 0; i < titular.length; i++) {
        const filenome = index;
        let numeruid = filenome;
        let sonar = titular[index -1];
        let img = pic[index -1];
        let baixar = bt_download[index -1];
       // console.log(sonar.id)

       if(sonar.id	==	numeruid)	{
        // console.log(img.src);
           titulo.innerHTML = sonar.innerHTML;
           poster_master_play.src = img.src;
           download_bt.download = sonar.innerText;
           download_bt.href = baixar.href;
       }else{
         console.log("Musica não encotrada");
       }

      }

        marcarFundo()
        Array.from($('.songItem'))[index - 1].style.background = 'rgba(105, 105, 105, .1)'

         // marcarAllplay();

         makeAllPlayer();
         el.target.classList.remove('bi-play-circle-fill')
         el.target.classList.add('bi-pause-circle-fill')


      })

      avancar.addEventListener('click', ()=>{
        index++;
        if (index > Array.from(document.getElementsByClassName('songItem')).length) {
          index = 1
        }
        else if (index > 50) {

          return index = 0;
        }

        music.src = `audio/${index}.mp3`;
        //  poster_master_play.src = `img/${index}.jpg`;
          wave.addClass('active1')
          masterPlay.removeClass('bi-play-fill')
          masterPlay.addClass('bi-pause-fill')
          $('.wow').addClass('rotateOut')
          music.play()

       /*   let songTitlos = $('.songItem').filter((els)=>{
            return els.id == index
        })
        songTitlos.forEach(elss =>{
            let {songNome, poster} = elss;
            titulo.innerHTML = songNome;
            poster_master_play.src = poster;
        })
  */

       for (let i = 0; i < titular.length; i++) {
        const filenome = index;
        let numeruid = filenome;
        let sonar = titular[index -1];
        let img = pic[index -1];
        let baixar = bt_download[index -1];
       // console.log(sonar.id)

       if(sonar.id	==	numeruid)	{
        // console.log(img.src);
           titulo.innerHTML = sonar.innerHTML;
           poster_master_play.src = img.src;
            download_bt.download = sonar.innerText;
            download_bt.href = baixar.href;

       }else{
         console.log("Musica não encotrada");
       }

      }
        marcarFundo()
        Array.from($('.songItem'))[index - 1].style.background = 'rgba(105, 105, 105, .1)'

         // marcarAllplay();

         makeAllPlayer();
         el.target.classList.remove('bi-play-circle-fill')
         el.target.classList.add('bi-pause-circle-fill')


      })



    let btn_esquerda = $('#btn_esquerda');
    let btn_direita = $('#btn_direita');
  //  let div_pop = document.getElementsByClassName('pop_song')[0];
    let div_pop = $('.pop_song');
    let btn_esquerda1 = $('#btn_esquerda1');
    let btn_direita1 = $('#btn_direita1');
  //  let div_item = document.getElementsByClassName('item')[0];
    let div_item = $('.item');

    btn_direita.click(()=>{
      //  alert("ola mundo")
      for (let i = 0; i < div_pop.length; i++) {
        //const element = array[index];

        div_pop[i].scrollLeft += 130;
      }

    })
    btn_esquerda.click(()=>{
        //  alert("ola mundo")
        //  div_pop.scrollLeft -= 130;
          for (let i = 0; i < div_pop.length; i++) {
            //const element = array[index];
            div_pop[i].scrollLeft -= 130;
          }
      })
      btn_direita1.click(()=>{
        //  alert("ola mundo")
        for (let i = 0; i < div_item.length; i++) {
          //const element = array[index];
          div_item[i].scrollLeft += 125;
        }

      })
      btn_esquerda1.click(()=>{
          //  alert("ola mundo")
          for (let i = 0; i < div_item.length; i++) {
            //const element = array[index];
            div_item[i].scrollLeft -= 125;
          }

        })

        $(document).ready(function(){
          /*
          $(".poster_master_play").click(()=>{
           $("#poster_master_play").attr({
            src:"img/1.jpg",
            title:"Elvis Dance"
          })
            alert("Ola mundo")
          })
          */

        })


  /*
      let pesquisa = $("h5").text()

      let res = pesquisa.match(/Desconhecido/g)

      console.log(res)
*/
/*
musicas.find((lista)=>{
  // console.log(songs.songNome)
//  return	aluno.nome	===	"maria"
 if(lista.songNome.match(/z/ig)){
   console.log(lista)
 }
 else{
   console.log("Não achamos")
 }

 })

 */

  let pesq_resul = $('.result-pesq');



  /*
  $('.songItem').forEach( elm =>{
    const {id, songNome, poster} = elm;

    let cardi = document.createElement('a');
    cardi.classList.add('cardi');
    cardi.href = '#' +id;
    cardi.innerHTML = `
    <img src="${poster}" alt="">
    <div class="contnt mx-2">
      ${songNome}
    </div>
    `;
    pesq_resul.append(cardi);
  })  */

  let sonsTitulos = $('.songItem');

  for(var	i	=	0;	i	<	titular.length;	i++)	{
    index++;
    let id = index;
    let nome = titular[i].innerHTML;
    let pictu = pic[i].outerHTML;
   // console.log(pictu);


   let cardi = document.createElement('a');
   cardi.classList.add('cardi');
   cardi.href = "#" +id;
   cardi.innerHTML = `
   ${pictu}
   <div class="contnt mx-2">
     ${nome}
   </div>
   `;

    //  console.log(cardi.innerHTML)
   pesq_resul.append(cardi);
}


  //alert(pesq_resul);

 $(".search input").keyup(function(){
    let input_valor = $(this).val().toUpperCase();
    let items = $('.result-pesq a');

  //  alert(items);
  for(let i = 0; i < items.length; i++){
    let as = items[i].getElementsByClassName('contnt')[0];
    let text_valor = as.textContent || as.innerText;

    if(text_valor.toUpperCase().indexOf(input_valor) > -1){
       items[i].style.display = "flex";


      //console.log(items[i]);
    } else{
      items[i].style.display = "none";


    }

    if(input_valor == 0){
      pesq_resul.css("display", "none");
    } else{
      pesq_resul.css("display", "flex");
    }

    $(":input").focus(function(){
      $(this).next().fadeIn(1500);
    }).blur(function(){
      $(this).next().fadeOut(1500);
    })

   //  console.log(text_valor);
  }
});


$('.result-pesq a').click(()=>{

  
  pesq_resul.css("display", "none");
  $(":input").val("");
   $("#sidebar").hide();
          $("#mobile-main").removeClass("esconder")
          $("#pc-main").addClass("esconder")
          $('.focu').removeClass('active');
            $("#inicio").addClass("active");
            $("#tudo").removeClass("d-none");
            $("#favoritos").addClass("d-none");
            $("#mais-baixados").addClass("d-none");
              $('.focu').removeClass('active')
              .find('.bi-music-note-beamed').addClass("d-none")
              ;
              $("#inicio").addClass("active")
              .find('.bi-music-note-beamed').removeClass("d-none");
              $('.btn-favoritos').removeClass("active");
              $('.btn-baixados').removeClass("active");
              $(".btn-home").addClass("active");
              
              $("#dropdown-menu li a").removeClass("ativa");
          
})
/*
$('#cp:not(body)').click(()=>{


})
*/



/**EXEMPLO**/
/*
let	alunos	=	[
  {nome:'joão',	idade:15},
  {nome:'josé',	idade:18},
  {nome:'maria Paulo',	idade:20},
  {nome:'maria Jorge',	idade:30},
  {nome:'Capitão maria',	idade:29}
];


   alunos.find((aluno)=>{
       // console.log(songs.songNome)
     //  return	aluno.nome	===	"maria"
      if(aluno.nome.match(/maria/g)){
        console.log(aluno)
      }
      else{
        console.log("Não achamos")
      }

      })
*/

    /**MENU DO PC**/

$(".btn-home").click(()=>{
  // alert("Ola Mudo")

  $('.btn-favoritos').removeClass("active");
  $('.btn-baixados').removeClass("active");
  $("#favoritos").addClass('d-none');
  $("#mais-baixados").addClass('d-none');
  $("#tudo").removeClass('d-none');
  $(".btn-home").addClass("active");

})
$(".btn-favoritos").click(()=>{
  // alert("Ola Mudo")
  $('.btn-home').removeClass("active");
  $('.btn-baixados').removeClass("active");
  $("#favoritos").removeClass('d-none');
  $("#mais-baixados").addClass('d-none');
  $("#tudo").addClass('d-none');
  $(".btn-favoritos").addClass("active");
})
$(".btn-baixados").click(()=>{
  // alert("Ola Mudo")
  $('.btn-favoritos').removeClass("active");
  $('.btn-home').removeClass("active");
  $("#favoritos").addClass('d-none');
  $("#mais-baixados").removeClass('d-none');
  $("#tudo").addClass('d-none');
  $(".btn-baixados").addClass("active");
})

$("#btn-atalento").on("click", ()=>{
  $("#btn-destaque").removeClass("ativando")
  $("#btn-atalento").addClass("ativando")
  $("#secao-destaque").addClass("d-none")
  $("#secao-talentos").removeClass("d-none")
  $(".musica_popular h4").text("Novos Talentos")

})
$("#btn-destaque").on("click", ()=>{
  $("#btn-destaque").addClass("ativando")
  $("#btn-atalento").removeClass("ativando")
  $("#secao-destaque").removeClass("d-none")
  $("#secao-talentos").addClass("d-none")
  $(".musica_popular h4").text("Mais Popular")
})

$(".lista-album").on("click", ()=>{
 // alert("Ola mundo")
 $(".lista-nova").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-genero").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-album").addClass("lista-ativa")
 .find("span").removeClass("d-none");
 $(".aristas_popular h4").text("Os Melhores Artistas");
 $("#secao-album").removeClass("d-none")
 $("#secao-novas").addClass("d-none")
 $("#secao-hiphop").addClass("d-none")
 $("#secao-kizomba").addClass("d-none")
 $("#secao-naija").addClass("d-none")
 $("#secao-kuduro").addClass("d-none")
/* var parametros =  "hiphop=hiphop";
 let abrir = window.open("index.php?#"+parametros ,"_SELF"); */
 $(".generoso a").removeClass("ativa");
})
$(".lista-nova").on("click", ()=>{
 // alert("Ola mundo")
 $(".lista-nova").addClass("lista-ativa")
 .find("span").removeClass("d-none");
 $(".lista-album").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-genero").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".aristas_popular h4").text("Mais Recentes");
 $("#secao-album").addClass("d-none")
 $("#secao-hiphop").addClass("d-none")
 $("#secao-kizomba").addClass("d-none")
 $("#secao-naija").addClass("d-none")
 $("#secao-kuduro").addClass("d-none")
 $("#secao-novas").removeClass("d-none")
 $(".generoso a").removeClass("ativa");
})
$("a[href='#hiphop']").on("click", ()=>{
//  alert("Ola mundo")
 $(".lista-nova").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-album").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-genero").addClass("lista-ativa")
 .find("span").removeClass("d-none");
 $(".generoso a").removeClass("ativa");
  $("a[href='#hiphop']").addClass("ativa");
  $("a[href='#semba']").removeClass("ativa");
  $("a[href='#naija']").removeClass("ativa");
  $("a[href='#kuduro']").removeClass("ativa");
  $(".aristas_popular h4").text("O Melhor Do HipHop");
  $("#secao-album").addClass("d-none")
  $("#secao-hiphop").removeClass("d-none")
  $("#secao-novas").addClass("d-none")
  $("#secao-kizomba").addClass("d-none")
  $("#secao-naija").addClass("d-none")
  $("#secao-kuduro").addClass("d-none")
})
$("a[href='#kuduro']").on("click", ()=>{
//  alert("Ola mundo")
 $(".lista-nova").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-album").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-genero").addClass("lista-ativa")
 .find("span").removeClass("d-none");
 $(".generoso a").removeClass("ativa");
  $("a[href='#hiphop']").removeClass("ativa");
  $("a[href='#semba']").removeClass("ativa");
  $("a[href='#naija']").removeClass("ativa");
  $("a[href='#kuduro']").addClass("ativa");
  $(".aristas_popular h4").text("O Melhor Do Kuduro");
  $("#secao-album").addClass("d-none")
  $("#secao-hiphop").addClass("d-none")
  $("#secao-novas").addClass("d-none")
  $("#secao-kizomba").addClass("d-none")
  $("#secao-naija").addClass("d-none")
  $("#secao-kuduro").removeClass("d-none")
})

$("a[href='#semba']").on("click", ()=>{
//  alert("Ola mundo")
 $(".lista-nova").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-album").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-genero").addClass("lista-ativa")
 .find("span").removeClass("d-none");
 $(".generoso a").removeClass("ativa");
  $("a[href='#hiphop']").removeClass("ativa");
  $("a[href='#semba']").addClass("ativa");
  $("a[href='#naija']").removeClass("ativa");
  $("a[href='#kuduro']").removeClass("ativa");
  $(".aristas_popular h4").text("O Melhor Da Kizomba");
  $("#secao-album").addClass("d-none")
  $("#secao-hiphop").addClass("d-none")
  $("#secao-novas").addClass("d-none")
  $("#secao-kizomba").removeClass("d-none")
  $("#secao-naija").addClass("d-none")
  $("#secao-kuduro").addClass("d-none")
})

$("a[href='#naija']").on("click", ()=>{
//  alert("Ola mundo")
 $(".lista-nova").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-album").removeClass("lista-ativa")
 .find("span").addClass("d-none");
 $(".lista-genero").addClass("lista-ativa")
 .find("span").removeClass("d-none");
 $(".generoso a").removeClass("ativa");
  $("a[href='#hiphop']").removeClass("ativa");
  $("a[href='#semba']").removeClass("ativa");
  $("a[href='#kuduro']").removeClass("ativa");
  $("a[href='#naija']").addClass("ativa");
  $(".aristas_popular h4").text("O Melhor Da Kizomba");
  $("#secao-album").addClass("d-none")
  $("#secao-hiphop").addClass("d-none")
  $("#secao-novas").addClass("d-none")
  $("#secao-kizomba").addClass("d-none")
  $("#secao-naija").removeClass("d-none")
  $("#secao-kuduro").addClass("d-none")
})

//let mudaTexto = document.getElementById("floatingPhoto");

/**MENU DO CELULAR**/

$("#sidebar").hide();
$("#btn-menu").click(()=>{
  $("#sidebar").slideToggle().animate(
    {
      width: "100%"
    // marginLeft: "9%"
      //opacity: 1
    }
  );
})

$("#novidades").click(()=>{

  $("#mobile-main").addClass("esconder")
  $("#pc-main").removeClass("esconder")
  $("#sidebar").hide();
  $('.focu').removeClass('active')
  .find('.bi-music-note-beamed').addClass("d-none");
  $("#novidades").addClass("active")
  .find('.bi-music-note-beamed').removeClass("d-none")
  ;
  $(".aristas_popular h4").text("Mais Recentes");
  $("#secao-album").addClass("d-none")
  $("#secao-novas").removeClass("d-none")
  $("#secao-hiphop").addClass("d-none")
  $("#secao-kizomba").addClass("d-none")
  $("#secao-naija").addClass("d-none")
  $("#secao-kuduro").addClass("d-none")
  $("#dropdown-menu li a").removeClass("ativa");
})
$("#album-btn").click(()=>{
  $("#mobile-main").addClass("esconder")
  $("#pc-main").removeClass("esconder")
  $("#sidebar").hide();
  $('.focu').removeClass('active')
  .find('.bi-music-note-beamed').addClass("d-none");
  $("#album-btn").addClass("active")
  .find('.bi-music-note-beamed').removeClass("d-none")
  ;
  $(".aristas_popular h4").text("Os Melhores Artistas");
  $("#secao-album").removeClass("d-none")
  $("#secao-novas").addClass("d-none")
  $("#secao-hiphop").addClass("d-none")
  $("#secao-kizomba").addClass("d-none")
  $("#secao-naija").addClass("d-none")
  $("#secao-kuduro").addClass("d-none")
  $("#dropdown-menu li a").removeClass("ativa");

})
$("a[href='#rap']").click(()=>{
  $("#mobile-main").addClass("esconder")
  $("#pc-main").removeClass("esconder")
  $("#sidebar").hide();
  $('.focu').removeClass('active')
  .find('.bi-music-note-beamed').addClass("d-none");
  $("#genero-btn").addClass("active")
  .find('.bi-music-note-beamed').removeClass("d-none")
  ;
  $("#secao-album").addClass("d-none")
  $("#secao-novas").addClass("d-none")
  $("#secao-hiphop").removeClass("d-none")
  $("a[href='#rap']").addClass("ativa");
  $("a[href='#kizomba']").removeClass("ativa");
  $("a[href='#nai']").removeClass("ativa");
  $("a[href='#afro']").removeClass("ativa");
  $(".aristas_popular h4").text("O Melhor Do HipHop");
  $("#secao-kizomba").addClass("d-none")
  $("#secao-naija").addClass("d-none")
  $("#secao-kuduro").addClass("d-none")
})

$("a[href='#kizomba']").click(()=>{
$("#mobile-main").addClass("esconder")
$("#pc-main").removeClass("esconder")
$("#sidebar").hide();
$('.focu').removeClass('active')
.find('.bi-music-note-beamed').addClass("d-none");
$("#genero-btn").addClass("active")
.find('.bi-music-note-beamed').removeClass("d-none")
;
$("#secao-album").addClass("d-none")
$("#secao-novas").addClass("d-none")
$("#secao-hiphop").addClass("d-none")
$("a[href='#kizomba']").addClass("ativa");
$("a[href='#nai']").removeClass("ativa");
$("a[href='#rap']").removeClass("ativa");
$("a[href='#afro']").removeClass("ativa");
$(".aristas_popular h4").text("As Melhores Kizombas");
$("#secao-kizomba").removeClass("d-none")
$("#secao-naija").addClass("d-none")
$("#secao-kuduro").addClass("d-none")

})

$("a[href='#nai']").click(()=>{
$("#mobile-main").addClass("esconder")
$("#pc-main").removeClass("esconder")
$("#sidebar").hide();
$('.focu').removeClass('active')
.find('.bi-music-note-beamed').addClass("d-none");
$("#genero-btn").addClass("active")
.find('.bi-music-note-beamed').removeClass("d-none")
;
$("#secao-album").addClass("d-none")
$("#secao-novas").addClass("d-none")
$("#secao-hiphop").addClass("d-none")
$("a[href='#nai']").addClass("ativa");
$("a[href='#rap']").removeClass("ativa");
$("a[href='#kizomba']").removeClass("ativa");
$("a[href='#afro']").removeClass("ativa");
$(".aristas_popular h4").text("O Melhor Do Naija");
$("#secao-kizomba").addClass("d-none")
$("#secao-naija").removeClass("d-none")
$("#secao-kuduro").addClass("d-none")

})
$("a[href='#afro']").click(()=>{
$("#mobile-main").addClass("esconder")
$("#pc-main").removeClass("esconder")
$("#sidebar").hide();
$('.focu').removeClass('active')
.find('.bi-music-note-beamed').addClass("d-none");
$("#genero-btn").addClass("active")
.find('.bi-music-note-beamed').removeClass("d-none")
;
$("#secao-album").addClass("d-none")
$("#secao-novas").addClass("d-none")
$("#secao-hiphop").addClass("d-none")
$("a[href='#nai']").removeClass("ativa");
$("a[href='#rap']").removeClass("ativa");
$("a[href='#kizomba']").removeClass("ativa");
$("a[href='#afro']").addClass("ativa");
$(".aristas_popular h4").text("O Melhor Do Kuduro");
$("#secao-kizomba").addClass("d-none")
$("#secao-naija").addClass("d-none")
$("#secao-kuduro").removeClass("d-none")

})

$("#inicio").click(()=>{
$("#sidebar").hide();
$("#mobile-main").removeClass("esconder")
$("#pc-main").addClass("esconder");
$("#tudo").removeClass("d-none");
$("#favoritos").addClass("d-none");
$("#mais-baixados").addClass("d-none");
  $('.focu').removeClass('active')
  .find('.bi-music-note-beamed').addClass("d-none")
  ;
  $("#inicio").addClass("active")
  .find('.bi-music-note-beamed').removeClass("d-none");
  $("#dropdown-menu li a").removeClass("ativa");
 

})
$("#baixa-btn").click(()=>{
$("#sidebar").hide();
$("#mobile-main").removeClass("esconder")
$("#pc-main").addClass("esconder");
$("#tudo").addClass("d-none");
$("#favoritos").addClass("d-none");
$("#mais-baixados").removeClass("d-none");
$('.focu').removeClass('active')
.find('.bi-music-note-beamed').addClass("d-none")
;
$("#baixa-btn").addClass("active")
.find('.bi-music-note-beamed').removeClass("d-none");
$("#dropdown-menu li a").removeClass("ativa");

})
$("#favor-btn").click(()=>{
$("#sidebar").hide();
$("#mobile-main").removeClass("esconder")
$("#pc-main").addClass("esconder");
$("#tudo").addClass("d-none");
$("#favoritos").removeClass("d-none");
$("#mais-baixados").addClass("d-none");
$('.focu').removeClass('active')
.find('.bi-music-note-beamed').addClass("d-none")
;
$("#favor-btn").addClass("active")
.find('.bi-music-note-beamed').removeClass("d-none");
$("#dropdown-menu li a").removeClass("ativa");

})


/**VOU ME LEMBRAR DISSO**/
$("#usu-novo").on("click", (event)=>{
  event.preventDefault();
 // alert("Ola mundo");
    $("#login-usu").addClass("d-none");
    $("#novo-usu").removeClass("d-none");
  //  alert(mudaTexto);
})
$("#usu-login").on("click", (event)=>{
  event.preventDefault();
 // alert("Ola mundo");
    $("#login-usu").removeClass("d-none");
    $("#novo-usu").addClass("d-none");
  //  alert(mudaTexto);
})

let mudaTexto = document.getElementById("floatingPhoto");

Array.from($('.bt_download')).forEach((e)=>{
  e.addEventListener('click', (el)=>{
    var btBaixar = $(this).text();
    var IdBaixar = e.id;
    var inputBaixados = fazBaixar[IdBaixar -1].value;
    inputBaixados++;
  //  alert(inputBaixados);

    $.ajax({
            url:"editar.php",
            method:"post",
            data:{btBaixar:btBaixar,IdBaixar:IdBaixar,inputBaixados:inputBaixados},
         //   dataType: "json",
            success: function(dados){
               // $("#assistiu").html(dados.assistiu).text();
             //  alert(dados)
               console.log("Sucesso")
            }
           //
        })

  })
})

});
