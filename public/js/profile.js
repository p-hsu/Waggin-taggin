// CREATE NEW PUP PROFILE
const newPupProfileHandler = async (event) => {
    event.preventDefault();
    console.log('function called')
    const name = document.getElementById('new-name').value;
    const human = document.getElementById('new-human').value;
    const age = document.getElementById('new-age').value;
    const sex = document.getElementById('new-sex').value;
    const breed = document.getElementById('new-breed').value;
    const temperament = document.getElementById('new-temperament').value;
    const about_me= document.getElementById('new-about_me').value;
    const about_you = document.getElementById('new-about_you').value;
    if (name && human && age && sex && breed && temperament && about_me && about_you) {
      const response = await fetch(`/api/pets`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          human,
          age,
          sex,
          breed,
          temperament,
          about_me,
          about_you
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(`Uh oh, couldn't add your pet. Try again!`);
      }
    }
  };
  
// THIS IS BEYOND MVP IF WE WANT TO EDIT PUP PROFILES
//   const editButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//       const id = event.target.getAttribute('data-id');
//       const response = await fetch(`/api/posts/${id}`, {
//         method: 'PUT',
//       });
//       if (response.ok) {
//         document.location.replace('/editPost');
//       } else {
//         alert('Failed to update post');
//       }
//     }
//   };
  
// DELETE YOUR PET PROFILE
  // const delButtonHandler = async (event) => {
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');
  //     const response = await fetch(`/api/posts/${id}`, {
  //       method: 'DELETE',
  //     });
  //     if (response.ok) {
  //       document.location.replace('/profile');
  //     } else {
  //       alert('Failed to delete post');
  //     }
  //   }
  // };
  
document.querySelector('.new-pet-form').addEventListener('submit', newPupProfileHandler);
  
//   document
//     .querySelector('.post-list')
//     .addEventListener('click', editButtonHandler);
  
  // document
  //   .querySelector('.post-list')
  //   .addEventListener('click', delButtonHandler);



// EVENT DELEGATION FOR EACH PROFILE CARD
const petHandler = (event) => {
  // event delegation to determine delete vs edit btn
  if (event.target.hasAttribute('data-delete-id')) {
      deletePet(event);       
  } else if (event.target.hasAttribute('data-update-id')) {
      updatePet(event);
  }
};
// get pet.id to DELETE request by id
const deletePet = async (event) => {
    const id = event.target.getAttribute('data-delete-id');
    console.log(id);

    let confirmation = confirm('Are you sure you want to delete this pet profile?');

    if (confirmation === true) {
        const response = await fetch(`/api/pets/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};
    
// get post.id to go to edit-post view
const updatePet = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute('data-update-id');

  const name = document.getElementById('update-name').value;
  const human = document.getElementById('update-human').value;
  const age = document.getElementById('update-age').value;
  const sex = document.getElementById('update-sex').value;
  const breed = document.getElementById('update-breed').value;
  const temperament = document.getElementById('update-temperament').value;
  const about_me= document.getElementById('update-about_me').value;
  const about_you = document.getElementById('update-about_you').value;

  const response = await fetch(`/api/pets/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      name,
      human,
      age,
      sex,
      breed,
      temperament,
      about_me,
      about_you
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(response)
  
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(`Uh oh, couldn't edit your pet. Try again!`);
  }

}

document.querySelector('.pet-profile-card').addEventListener('click', petHandler)