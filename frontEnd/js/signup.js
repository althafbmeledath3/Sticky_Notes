



async function signup(e){

    console.log("Hello")
    e.preventDefault()

    const username = document.getElementById('username').value

    if(!username){

        alert("Username Cannot be Empty")
        return
    }

    const email = document.getElementById('email').value

    //email regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const password = document.getElementById('password').value

    const cpassword = document.getElementById('cpassword').value

    if(password!=cpassword){

        alert("Password do not match")
        return
    }

    //password regular expression
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!passwordRegex.test(password)) {
        alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");

        return;
    }

    let data = {username,email,password}

    let options = {

        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify(data)
    }

    try{

        let response = await fetch('/api/signup',options)
        
        let data1 = await response.json()
        
        if(response.status===201){
            
            localStorage.setItem('token',data1.token)
            localStorage.setItem('email',email)
            alert(data1.message)
            window.location.href = "/"
        }

        else{

            alert(data1.message)
            window.location.href = "login.html"
        }
    }

    catch(error){

        console.log(error)

     
    }

}