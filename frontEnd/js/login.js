


async function logIn(e) {

    e.preventDefault()

    let email = document.getElementById('email').value

    let password = document.getElementById('password').value

    const data = {email,password}

    let options = {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify(data)
    }

    try {
        const response = await fetch('/api/login', options);
   
        
        if (!response.ok) {
           
            const errorData = await response.text();
            console.log('Error response:', errorData);
            alert('Error logging in: no user found ');
            return;
        }
   
        
        const data = await response.json();
   
        if (response.status === 200) {
            alert(data.message);
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', email);
            window.location.href = "/";
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
   

    
}