// This is a JavaScript file
$(document).on('click','#cadastrar',function(){
  var parametros = {
    "titulo": $("#caixa1").val(),
    "autor": $("caixa2").val(),
    "anor": $("#caixa3").val(),
    "isbn": $("#caixa4").val()
  }
  $.ajax({
    type:"post",
    url:"https://cadastrodelivros-usagik.c9users.io/cadastra.php",
    data:parametros,
    success:function(data){
      var item = "";
      $.each(data.livros, function(i, dados){
        item += "<option value='"+dados.titulo +"'>"+dados.autor+"'>"+dados.ano+"'>"+dados.isbn+ "</option>";
      });
      $("#listarlivros").html(item);
      },
      //$("#nome").val(""),
      //$("#email").val(""),
      //navigator.notification.alert(data);
      //},
      error:function(data){
        navigator.notification.alert(data);
      }
  });
});

$(document).on("click","#setinha",function(){
  $(location).attr("href","listar.html");
});

function preencher(){
  $.ajax(
    {
      type:"post",
      url:"https://cadastrodelivros-usagik.c9users.io/listar.php",
      dataType:"json",
      success:function(data){
        var item="";
        $.each(data.livros, function(i, dados){
          item += "<option value='"+ dados.codigo +"'>"+dados.titulo+"'>"+dados.autor+"'>"+dados.ano+"'>"+dados.isbn+"</option>";
        });
        $("#listarlivros").html(item);
      },
      error:function(data){
        navigator.notification.alert(data);
      }
    }
  )
}

$(document).on('change','#listarlivros',function(){
  var codigo = $("option:selected",("#listarlivros")).val();
 $.ajax({
   type:"get",
   url:"https://cadastrodelivros-usagik.c9users.io/listar-um.php",
   data:"id="+codigo,
   dataType:"json",
   success:function(data){

       $("#caixaum").val(data.livros.titulo);
       $("#caixadois").val(data.livros.autor);
       $("#caixatres").val(data.livros.ano);
       $("#caixaquatro").val(data.livros.isbn);
   
   },
    error:function(data){
      navigator.notification.alert(data);
    }
 });    
 });

$(document).on("click","#excluir",function(){
  $.ajax({
    type:"get",
    url:"https://cadastrodelivros-usagik.c9users.io/deleta.php",
    data:"id="+$("#codigo").val(),
    success:function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    error:function(data){
      navigator.notifcation.alert(data);
    }
  });
});

$(document).on("click","#salvar",function(){
var paramentros = {
  "titulo": $("#caixaum").val,
  "autor": $("#caixadois").val(),
  "ano": $("#caixatres").val(),
  "isbn": $("#caixaquatro").val()
}

  $.ajax({
    type:"post",
    url:"https://cadastrodelivros-usagik.c9users.io/update.php",
    data:parametros,
    success:function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    error:function(data){
      navigator.notification.alert(data);
    }
  });
});

function desabilita(){
  $("#caixaum").prop("readonly",true);
  $("#caixadois").prop("readonly",true);
  $("#caixtres").prop("readonly",true);
  $("#caixaquatro").prop("readonly",true);
}

function habilita(){
  $("#caixaum").prop("readonly",false);
  $("#caixadois").prop("readonly",false);
  $("#caixatres").prop("readonly",false);
  $("#caixaquatro").prop("readonly",false);
}

$(document).on("click","#editar",function(){
   habilita();
});

//$(document).on("click","#cancelar",function(){
//   desabilita();
//});
