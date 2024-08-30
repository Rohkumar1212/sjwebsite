function submitForm(e) {
  e.preventDefault();
 
 var myform =    document.getElementById("myform");  
  var formData = new FormData(myform);
  fetch("http://192.168.1.13:5500/api/v1/contactUs", {
    method: "POST",
    body: formData,
  })
    .then(response => {
    if (!response.ok) {
      throw new Error('network returns error');
    }
    return response.json();
  })
    .then((resp) => {    
      alert(resp.message); 
      document.getElementById("myform").reset();        
    })
    .catch((error) => {
      // Handle error
      console.log("error ", error);
    });
}

var myform = document.getElementById("myform");

myform.addEventListener("submit", submitForm);