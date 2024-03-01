document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const errorMessage = document.getElementById("error-message");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const firstName = document.getElementById("firstName").value.trim();
      const lastName = document.getElementById("lastName").value.trim();
      const email = document.getElementById("email").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
    
  
      if (firstName === "") {
        errorMessage.textContent = "First name is required.";
        return;
      }
  
      if (lastName === "") {
        errorMessage.textContent = "Last name is required.";
        return;
      }
  
      if (email === "") {
        errorMessage.textContent = "Email is required.";
        return;
      } else if (!isValidEmail(email)) {
        errorMessage.textContent = "Invalid email address.";
        return;
      }
  
      if (username === "") {
        errorMessage.textContent = "Username is required.";
        return;
      }
  
      if (password === "") {
        errorMessage.textContent = "Password is required.";
        return;
      }
  
      if (confirmPassword === "") {
        errorMessage.textContent = "Please confirm your password.";
        return;
      } else if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
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
        
      })
      .catch(error => {
        console.error('Error:', error);
        
      });
    });
  
    function isValidEmail(email) {
      const emailRegex = /\S+@\S+\.\S+/;
      return emailRegex.test(email);
    }
  });
  