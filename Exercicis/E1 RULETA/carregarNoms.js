let noms = [];
let canvas = document.getElementById("ruletaCanvas");
let ctx = canvas.getContext("2d");

window.onload = () => {
  fetch("noms.txt")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al cargar noms.txt: ' + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      noms = data.split("\n").filter((nom) => nom.trim() !== "");
      console.log(noms);  
      dibuixarRuleta();
    })
    .catch((error) => {
      console.error("Error carregant noms:", error);
      alert("No s'han pogut carregar els noms.");
    });
};


function dibuixarRuleta() {
    if (noms.length === 0) return;
  
    let totalNoms = noms.length;
    let anglePerSegment = (2 * Math.PI) / totalNoms;
    let radi = canvas.width / 2;
  
    noms.forEach((nom, i) => {
      let angleInici = i * anglePerSegment;
      let angleFinal = angleInici + anglePerSegment;
  
      ctx.beginPath();
      ctx.moveTo(radi, radi);
      ctx.arc(radi, radi, radi, angleInici, angleFinal);
  
      ctx.fillStyle = i % 2 === 0 ? "#1E3A8A" : "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#000"; 
      ctx.stroke();

      ctx.save();
      ctx.translate(radi, radi);
      ctx.rotate(angleInici + anglePerSegment / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = i % 2 === 0 ? "#FFFFFF" : "#1E3A8A"; 
      ctx.font = "18px Arial";
      ctx.fillText(nom, radi - 10, 5);
      ctx.restore();
    });
  };
  
