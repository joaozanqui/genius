
var sequencia=[];
var sequenciaClick=[];
var numClick=-1;

var piscando=true;
var comecou=false;
var level=0;

$(".play-btn").click(function(){ 
    escolheCor();
    comecou=true;
    setinhaMaozinha();
});

$(".btn").click(function() {
    if(piscando==false) {
        var audio = new Audio('sounds/'+this.id+'.mp3');
        audio.play();
        numClick++;
        switch(this.id) {
            case "green":   sequenciaClick[numClick]=1;
            break;
            case "red":     sequenciaClick[numClick]=2;
            break;
            case "yellow":  sequenciaClick[numClick]=3;
            break;
            case "blue":    sequenciaClick[numClick]=4;
            break;
        }
        checkResposta();
    }
    else if(comecou==false) {
        var audio = new Audio('sounds/'+this.id+'.mp3');
        audio.play();
    }
});

$("#restart").click(function() {
    location.reload();
});

function checkResposta() {
    if(sequencia[numClick]!=sequenciaClick[numClick])
        errou();
    else if(sequencia.length == sequenciaClick.length)
        escolheCor();
}

function escolheCor() {
    piscando=true;
    level++;
    $("h1").html("Nível " + level);
    var cor = Math.floor((Math.random()*4)+1);
    sequencia.push(cor);
    console.log("SEQUENCIA - " + sequencia);
    numClick=-1;
    piscar();
}

function piscar() {
    setinhaMaozinha();
    var tamanho = sequencia.length;
    for(var j=0; j<tamanho; j++) { 
            if(sequencia[j]==1) {
                setTimeout(function() {
                    $("#green").animate({opacity: 0}).animate({opacity: 1.0});
                    var audio = new Audio('sounds/green.mp3');
                    audio.play();
                }, j*1000+500);
            }
            else if(sequencia[j]==2) {
                setTimeout(function() {
                    $("#red").animate({opacity: 0}).animate({opacity: 1.0});
                    var audio = new Audio('sounds/red.mp3');
                    audio.play();
                }, j*1000+500);
            }
            else if(sequencia[j]==3) {
                setTimeout(function() {
                    $("#yellow").animate({opacity: 0}).animate({opacity: 1.0});
                    var audio = new Audio('sounds/yellow.mp3');
                    audio.play();
                }, j*1000+500);
            }
            else if(sequencia[j]==4) {
                setTimeout(function() {
                    $("#blue").animate({opacity: 0}).animate({opacity: 1.0});
                    var audio = new Audio('sounds/blue.mp3');
                    audio.play();
                }, j*1000+500);
            }
        }
        setTimeout(function() {
            piscando=false;
            setinhaMaozinha();
        }, tamanho*1000);
}

function setinhaMaozinha() {
    if(comecou==true && piscando==true) {
        $(".btn").removeClass("maozinha").addClass("setinha");
    }
    else {
        $(".btn").addClass("maozinha").removeClass("setinha");
    }
}

function errou() {
    var audio = new Audio('sounds/wrong.mp3');
        audio.play();
    $("body").toggleClass("errou");
    $("h1").after("<img id='burrinho' src='https://images.vexels.com/media/users/3/227401/isolated/preview/c8bd0f940d5e81bfdaaa4d996bbb04b4-golpe-de-burro-fofo.png' alt='burrinho'>");
    $("h1").after("<h1>ERROU SEU BURRO<br>KKKKKKKKKKKKKKK</h1>");
    $("h1").toggleClass("errou");
    $(".btn").toggle();
    $("#restart").toggleClass("restart-on").toggleClass("restart-off").toggleClass("play-btn").toggleClass("errou");
    setTimeout(function() {
        $("body").toggleClass("errou");
        $("h1").toggleClass("errou");
        $("#restart").toggleClass("errou");
    }, 250);
}

/* Copiar texto */
function copyPaste() {
    /* Get the text field */
  var copyText = "jpzanqui@hotmail.com";
  navigator.clipboard.writeText(copyText);

  $("#btn-copy").html("Copiado !");
}