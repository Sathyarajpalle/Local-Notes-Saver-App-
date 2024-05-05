document.addEventListener('DOMContentLoaded', () => {
    const formnotevalue = document.getElementById("formnote");
 /*   const notetitlevalue = document.getElementById("notetitle");
    const notetextvalue = document.getElementById("notetext");
    const duedatevalue = document.getElementById("dueDate");*/
    const notelistvalue = document.getElementById("NoteList");
    let notes = JSON.parse(localStorage.getItem('Notes')) || [];

    function savenotes() {
        localStorage.setItem('Notes',JSON.stringify(notes));
    }
    function displaynotes(){
    notelistvalue.innerHTML = '';
    if(notes.length == 0){
       notelistvalue.innerHTML = '<p><em> Welcome!! No notes found<em></p>';
       return;
    } else {
        notes.forEach((note,index) => {

        const noteItem = document.createElement('div');
        noteItem.classList.add('card', 'mb-3');

         const notebody = document.createElement('div');
          notebody.classList.add('card-body');

        const notetitle = document.createElement('h5');
        notetitle.classList.add('card-title');
        notetitle.textContent = note.title;

        const notedate = document.createElement('h6');
        notedate.classList.add('card-subtitle', 'mb-2', 'fw-light');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        console.log(today);
        notedate.textContent = today;


        const notetext = document.createElement('p');
        notetext.classList.add('card-text');
        const lines = note.text.split('\n');
            lines.forEach(line => {
                const p = document.createElement('p');
                p.textContent = line;
                notetext.appendChild(p);
            });

        const buttonclass = document.createElement('div');
        buttonclass.classList.add('d-grid', 'gap-2', 'd-md-block','p-5');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn', 'btn-sm', 'btn-outline-primary');
        editButton.setAttribute('data-index', index);
        editButton.addEventListener('click', openEditModal);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-sm', 'btn-outline-danger', 'deletebutton');
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', deleteTask);
        noteItem.appendChild(notebody);
        noteItem.appendChild(notetitle);
        noteItem.appendChild(notedate);
        noteItem.appendChild(notetext);
        buttonclass.appendChild(editButton);
        buttonclass.appendChild(deleteButton);
        noteItem.appendChild(buttonclass);
        notelistvalue.appendChild(noteItem);
    });
    }
    }  

     function addnotes(title,text){
        notes.push({title,text});
        savenotes();
        displaynotes();
     }
     function deleteTask(event) {
        const index = event.target.getAttribute('data-index');
        notes.splice(index, 1);
        savenotes();
        displaynotes();
      }
      function editNotes(title, text, index) {
        notes[index].title = title;
        notes[index].text = text;
        savenotes();
        displaynotes();
        $('#editNotesModal').modal('hide');
      }
      function openEditModal(event) {
        const index = event.target.getAttribute('data-index');
        const note = notes[index];
        document.getElementById('editNotesTitle').value = note.title;
        document.getElementById('EditNotestext').value = note.text;
        document.getElementById('editNotesIndex').value = index;
        $('#editNotesModal').modal('show');
      }
    formnotevalue.addEventListener('submit', (e) =>{
        e.preventDefault();
        const title = document.getElementById("notetitle").value;
        const text = document.getElementById("notetext").value;
        /*const dueDate = document.getElementById("dueDate").value;*/
        addnotes(title,text);
        formnotevalue.reset();
    })
    document.getElementById('editNotesForm').addEventListener('submit', (e) =>{
        e.preventDefault();
        const title = document.getElementById('editNotesTitle').value;
        const text = document.getElementById('EditNotestext').value;
        const index = document.getElementById('editNotesIndex').value;
        editNotes(title, text, index);
      });
    
  displaynotes();  
});