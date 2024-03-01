document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("message");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      successMessage.textContent = "";
  
      if (firstName === "") {
        successMessage.textContent = "First name is required.";
        return;
      }
  
      if (lastName === "") {
        successMessage.textContent = "Last name is required.";
        return;
      }
  
      if (email === "") {
        successMessage.textContent = "Email is required.";
        return;
      } else if (!isValidEmail(email)) {
        successMessage.textContent = "Invalid email address.";
        return;
      }
  
      if (username === "") {
        successMessage.textContent = "Username is required.";
        return;
      }
  
      if (password === "") {
        successMessage.textContent = "Password is required.";
        return;
      }
  
      if (confirmPassword === "") {
        successMessage.textContent = "Please confirm your password.";
        return;
      } else if (password !== confirmPassword) {
        successMessage.textContent = "Passwords do not match.";
        return;
      }
  
      fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
          confirmPassword
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        successMessage.textContent = data.message;
      })
      .catch(error => {
        console.error('Error:', error);
        successMessage.textContent = "An error occurred while submitting the form.";
      });
    });
  
    function isValidEmail(email) {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    }
});
