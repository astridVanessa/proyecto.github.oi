let input = document.getElementById('input');
let textarea = document.getElementById('textarea');
let b = document.getElementById('l');
let text = document.getElementById('t')
let lines, archivo, i, resultado;
let consolaTexto = '';
function redirigirConsola() {
  var log = console.log; 
  console.log = function() {
    for (var i = 0; i < arguments.length; i++) {
      consolaTexto += arguments[i] + '\n'; 
    }
    log.apply(console, arguments); 
  }
}

function mostrarConsolaEnTextarea() {
  document.getElementById('t').value = consolaTexto; 
}

redirigirConsola();

document.getElementById('btn').addEventListener('click', function() {
  mostrarConsolaEnTextarea();
});

      b.addEventListener('click', function() {
        text.value = ''; 
        textarea.value = '';
        console.clear(); 
      });
//Arreglo con tokens a validar

    const token = ['Q#', 'Q?','Q@','Q~','>>','QNEL','Q>>','%%','Regalado','Reservado','Tapado','Quieto','Acabado','Qmas','Qopc','Q<','Q>','Q#<','Q#>','Q+','<QC-Declaraciones:', '<QC-salida:','<QC-paso:','<QC-paso-porque-paso>', '<QC-paso-Fin>','<QC-Repite:','<QC-Repite-Fin', '<QC-Variar:','<QC-Variar-Fin','<QC-Chispudo>','<QC-Chispudo-Fin','<QC-camioneta','<QC-camioneta-Fin','QUETZAL','CENTAVO','CHOCA','PISTO','LEN','SinPisto','Qpistudo','tieneCasaca','vosPlatica','coperachaMucha','queChilero']

    const regex = /[a-zA-Z]\>/; // ER para validar el final de una cadena
    const regex2 = /^[a-zA-Z][a-zA-Z0-9]*(\"\>)+$/; //validar cadena de texto intermedia
    let generar = [];


input.addEventListener("change", () => {
    let archivos = input.files;
    if(archivos.length == 0) return;

    let archivo = archivos[0];
    let contenido = new FileReader();
    contenido.onload = (e) => {
        archivo = e.target.result;
        
        lines = archivo.split(/\r\n|\n/);
        textarea.value = lines.join("\n");
        console.log(lines);

        
        //ciclo para recorrer arreglo líneas        
        for(var a = 0; a<lines.length;a++){
            var b=a;
            let nuevoArreglo = lines[a].split(" ");     //Cada posicion del arreglo linea se vuelven un arreglo
            console.log("\n-----------------------Validando linea "+(b+1)+"-----------------------")
            console.log("VALIDANDO LINEA___"+(b+1)+": "+lines[a]);

            //recorrer la posicion del nuevo arreglo
            for(var i=0; i<nuevoArreglo.length;i++){
                //ciclo para recorrer y comparar con includes añadir coincidencias
                console.log("\tPosicion "+i+" de linea:  "+nuevoArreglo[i]);
                for(var j=0;j<token.length;j++){
                    //valida que el token se encuentre el la posicion del arreglo
                    let aa = token[j].includes(nuevoArreglo[i]);
                    if (aa==true)
                    console.log('\t\t Sintaxis correcta ✔️: '+token[j]);    
            }
                        let textoValida = regex.test(nuevoArreglo[i]);
                        let textoValida2 = regex2.test(nuevoArreglo[i]);
                        if(textoValida==true){
                            console.log("\t\tSintaxis correcta ✔️ "+nuevoArreglo[i]);
                            token.push(nuevoArreglo[i]);
                         } else if(textoValida2==true){
                            token.push(nuevoArreglo[i]);
                               console.log("\t\tSintaxis correcta ✔️ "+nuevoArreglo[i]);
                            }                      
            var idx = token.indexOf(nuevoArreglo[i]);
            if(idx < 0){
                     console.log("\t_______________________________________________________________");
                     console.log("\t***ERROR EN EJECUCIÓN ELEMENTO NO VALIDO***");
                     let numero= Math.floor(Math.random()*100)+1 ;
                     console.log("\t" +"❌"+nuevoArreglo[i]+" CODIGO  "+numero + " ERROR DE SINTAXIS ");
                     console.log("\t_______________________________________________________________");
                }
                  }           console.table(nuevoArreglo); 
    }
}
    
    contenido.onerror = (e) => alert(e.target.error.name);
    contenido.readAsText(archivo);
});