document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const message = document.getElementById('message').value;

    const formData = {
        studentName: studentName,
        studentEmail: studentEmail,
        message: message
    };

    // Send form data to a server endpoint
    fetch('https://webhookers-zapier.onrender.com/render/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Your inquiry has been submitted.');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting your inquiry.');
    });
});
