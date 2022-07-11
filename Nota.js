var boton = document.getElementById("boton_1");
var resultado = document.getElementById("resultado");
boton.addEventListener("click",calcular);

var pro_1 = document.getElementById("ponderacion_1");
var pro_2 = document.getElementById("ponderacion_2");
var pro_3 = document.getElementById("ponderacion_3");
var pro_4 = document.getElementById("ponderacion_4")

var not_1= document.getElementById("nota_1");
var not_2= document.getElementById("nota_2");
var not_3= document.getElementById("nota_3");

var ref = document.getElementById("nota_referencia");
var b = document.getElementById("body");


ref.addEventListener("onchange",ref_input);
b.addEventListener("onload",ref_input);

function input_cero(x)
{
  if (x.value=="")
   {
    x.value= 0;
   }
}

function input_0_100(p)
{
  if(p.value>99)
  {
    p.value= 100;
  } else if(p.value<0)
    {
      p.value= 0;
    }
}

function input_0_7(n)
{
  if(n.value>7)
  {
    n.value= 7;
  } else if(n.value<0)
    {
      n.value= 0;
    }
}

function input_aprobar(m)
{
  if(m.value>6)
  {
    m.value= 6;
  } else if(m.value<4)
    {
      m.value= 4;
    }
}

function ref_input()
{
  n_ref = parseFloat(ref.value);
}

function calcular()
{
  ponderacion();

  p = p_4/100;
  porcentaje1 = parseFloat(n_1*(pro_1.value / 100));
  porcentaje2 = parseFloat(n_2*(pro_2.value / 100));
  porcentaje3 = parseFloat(n_3*(pro_3.value / 100));

if (cien<101)
{
  if (p_1!= 0 && p_2!= 0 && p_3!= 0)
  {
    n_4 =(n_ref-(porcentaje1+porcentaje2+porcentaje3))/p;
    final = (n_4).toFixed(1);
    resultado.innerHTML= final;
  }
  else if (p_1!= 0 && p_2!= 0 && p_3== 0)
  {
    n_4 =(n_ref-(porcentaje1+porcentaje2))/p;
    final = (n_4).toFixed(1);
    resultado.innerHTML= final;
  }
  else if (p_1== 0 && p_2!= 0 && p_3!= 0)
  {
    n_4 =(n_ref-(porcentaje2+porcentaje3))/p;
    final = (n_4).toFixed(1);
    resultado.innerHTML= final;
  }
  else if (p_1!= 0 && p_2== 0 && p_3!= 0)
  {
    n_4 =(n_ref-(porcentaje1+porcentaje3))/p;
    final = (n_4).toFixed(1);
    resultado.innerHTML= final;
  }
  else if (p_1!= 0 && p_2== 0 && p_3== 0)
  {
    n_4 =(n_ref-porcentaje1)/p;
    final = (n_4).toFixed(1);
    resultado.innerHTML= final;
  }
  else if (p_1== 0 && p_2!= 0 && p_3== 0)
  {
    n_4 =(n_ref-(porcentaje2))/p;
    final = (n_4).toFixed(1);
    resultado.innerHTML= final;
  }
  else if (p_1== 0 && p_2== 0 && p_3!= 0)
  {
    n_4 =(n_ref-(porcentaje3))/p;
    final = (n_4).toFixed(1);
    resultado.innerHTML= final;
  }
else
  {
    resultado.innerHTML= "";
    return
  }
}
}
function ponderacion()
{
  p_1 = parseInt(pro_1.value);
  p_2 = parseInt(pro_2.value);
  p_3 = parseInt(pro_3.value);
  p_4 = parseInt(pro_4.value);

  cien = p_1+ p_2+ p_3;

  n_1 = parseFloat(not_1.value);
  n_2 = parseFloat(not_2.value);
  n_3 = parseFloat(not_3.value);

  if (pro_4.value=="NaN")
      {
       pro_4.innerHTML = "";
      }
if (cien<101)
{
  if (p_1!= 0 && p_2!= 0 && p_3!= 0)
   {
     pro_4.innerHTML=(100-(p_1+p_2+p_3));
   }
   else if (p_1!= 0 && p_2!= 0 && p_3== 0)
    {
      pro_4.innerHTML=(100-(p_1+p_2));
    }
    else if (p_1!= 0 && p_2== 0 && p_3!= 0)
     {
       pro_4.innerHTML=(100-(p_1+p_3));
     }
    else if (p_1== 0 && p_2!= 0 && p_3!= 0)
     {
       pro_4.innerHTML=(100-(p_2+p_3));
     }
    else if (p_1!= 0 && p_2== 0 && p_3== 0)
     {
       pro_4.innerHTML=(100-(p_1));
     }
    else if (p_1== 0 && p_2!= 0 && p_3== 0)
      {
        pro_4.innerHTML=(100-(p_2));
      }
    else if (p_1== 0 && p_2== 0 && p_3!= 0)
       {
         pro_4.innerHTML=(100-(p_3));
       }
       else if (p_1== 0 && p_2== 0 && p_3== 0)
          {
            pro_4.innerHTML="";
          }
}
else
  {
    pro_4.innerHTML = "";
    alert("supera el 100%");
    return
  }
}
