// Cria um menu de hambúrguer para responsividade no mobile
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
});

// Abre uma nova guia do Gmail com destinatário, assunto e mensagem
function abrirGmail() {
    var destinatario = "natanferreiira27@gmail.com";
    var mensagem = document.getElementById("mensagem").value;
    var assunto = document.getElementById("assunto").value;

    const url = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(destinatario) + 
                "&su=" + encodeURIComponent(assunto) + 
                "&body=" + encodeURIComponent(mensagem);

    window.open(url, "_blank"); // Abre a URL em nova aba

    // Mostra toast de sucesso
    $.toast({
        heading: "Guia aberta!",
        text: "Uma guia foi aberta para o envio do email",
        showHideTransition: "fade",
        icon: "success",
        bgColor: "#000000",
        hideAfter: 15000,
        loaderBg: "#3b2ba1"
    });
}