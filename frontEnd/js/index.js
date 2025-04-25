

let username = document.getElementById('username')

async function loadHome() {
    try {
        const response = await fetch('/api/loadhome', {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
        });

        const data = await response.json();

        if (response.status === 200) {
            console.log(data);
            username.textContent = `Welcome ${data.user.username}`;
        }

        let email = localStorage.getItem('email');
        let options = {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ email })
        };

        const response2 = await fetch('/api/loadData', options);
        const data2 = await response2.json();

        console.log(data2.user.notes);

        // Render stored notes on the screen
        data2.user.notes.forEach(note => {
            renderNote(note.title, note.content);
        });

    } catch (error) {
        console.log(error);
        alert("Failed to load home data");
    }
}

loadHome()

//render function
function renderNote(titleText, contentText) {
    noteCount++;
    const note = document.createElement('div');
    note.className = 'note';
    note.style.backgroundColor = getRandomColor();
    const { x, y } = getNewNotePosition();
    note.style.left = `${x}px`;
    note.style.top = `${y}px`;
    note.style.zIndex = noteCount;

    const title = document.createElement('input');
    title.className = 'note-title';
    title.placeholder = 'Enter title';
    title.value = titleText || '';
    note.appendChild(title);

    const content = document.createElement('textarea');
    content.className = 'note-content';
    content.placeholder = 'Content';
    content.value = contentText || '';
    note.appendChild(content);

    document.body.appendChild(note);

    makeDraggable(note, title, content);
    setupTitleEdit(note, title, content);
}






async function saveNoteToDatabase( title, content) {

    let email = localStorage.getItem('email')

    const data = {
        title: title.trim() || null,
        content: content.trim() || null,
        email:email
    };

    console.log(`Saving note to database fsdfsdf:`, data);

    
    let options = {
        headers:{"Content-Type":"application/json"},
        method:"POST",
        body:JSON.stringify(data)
    }

    const response = await fetch('/api/savedata',options)

    const data1 = await response.json()

    console.log(data1)
}




function signout(){

    localStorage.removeItem('token')
    localStorage.removeItem('email')

    alert("Signing Out")

    window.location.href = "/login.html"
}
