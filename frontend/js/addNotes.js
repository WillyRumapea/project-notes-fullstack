const addNoteButton = document.getElementById("addNote");
const postNotes = document.getElementById("post-notes");

postNotes.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    title: postNotes.title.value,
    subject: postNotes.subject.value,
    note: postNotes.note.value,
    tags: postNotes.tags.value,
  };

  await fetch("http://localhost:3000/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  alert("data berhasil di inputkan!!");
});

const getAllNote = async () => {
  try {
    const res = await fetch("http://localhost:3000/notes");

    //! error handling
    if (!res.ok) {
      throw new Error("data tidak ditemukan");
    }
    //! error handling

    const data = await res.json();
    console.log(data);
  } catch (err) {}
};

// const getAllNoteById = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/notes/id?id=2");

//     //! error handling
//     if (!res.ok) {
//       throw new Error("data tidak ditemukan");
//     }
//     //! error handling

//     const data = await res.json();
//     console.log(data);
//   } catch (err) {}
// };

getAllNote();
// getAllNoteById();
