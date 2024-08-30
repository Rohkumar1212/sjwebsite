document.getElementById('myform').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        service: document.getElementById('service').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        year: document.getElementById('year').value,
        course: document.getElementById('course').value,
        roll_number: document.getElementById('roll_number').value,
        verification_type: document.getElementById('verification_type').value
    };

    fetch('http://192.168.1.13:5500/api/v1/verifyUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
        console.error('Error:', error);
        // Handle error here (e.g., show an error message)
    });
});