let cryto_data = new Cryptography();


function validateLogin(){
    console.log("on click");
   let req =  new XMLHttpRequest();
   req.onreadystatechange = function(){
       console.log(this.status);
       console.log(this.responseText);
   }
   req.open("POST", "../../../Kiosk Server/PHP Scripts/login_validator.php");
   req.send();
   
}





