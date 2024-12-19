document.getElementById("activarRuleta").addEventListener("click", () => {
    if (noms.length === 0) {
      alert("Primer carrega els noms!");
      return;
    }
  
    const spinSound = document.getElementById("spinSound");
    spinSound.play();
  
    const gires = Math.floor(Math.random() * 5000) + 5000; 
    const angleFinal = Math.random() * 2 * Math.PI;
  
    let angleActual = 0;
    let start = null;
  
    function animar(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
  
      angleActual = ((progress / 3000) * gires + angleFinal) % (2 * Math.PI);

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angleActual);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      dibuixarRuleta();
      ctx.restore();
  
      if (progress < 3000) {
        requestAnimationFrame(animar);
      } else {

        let segment = Math.floor(((2 * Math.PI - angleActual) % (2 * Math.PI)) / ((2 * Math.PI) / noms.length));
        let nomSeleccionat = noms[segment];
        document.getElementById("nom-seleccionat").textContent = `Nom seleccionat: ${nomSeleccionat}`;
      }
    }
  
    requestAnimationFrame(animar);
  });
  