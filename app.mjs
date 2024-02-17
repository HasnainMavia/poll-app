  // Check if localStorage has members data
  let members = JSON.parse(localStorage.getItem('members')) || [];

  // Function to render members list
  function renderMembers() {
    const membersList = document.getElementById('members-list');
    membersList.innerHTML = '';

    members.forEach((member, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'member-item';
      listItem.innerHTML = `
        <span onclick="voteForMember(${index})">${member.name}</span>
        <span class="delete-btn" onclick="deleteMember(${index})">Delete</span>
      `;
      membersList.appendChild(listItem);
    });
  }

  // Function to add a new member
  function addMember() {
    const memberNameInput = document.getElementById('memberName');
    const name = memberNameInput.value.trim();

    if (name === '') {
      alert('Please enter a valid member name.');
      return;
    }

    // Check if the member is already in the list
    if (members.some(member => member.name.toLowerCase() === name.toLowerCase())) {
      alert('Member already exists in the list.');
      return;
    }

    // Add the new member
    members.push({ name, votes: 0 });

    // Save to localStorage
    localStorage.setItem('members', JSON.stringify(members));

    // Render the updated members list
    renderMembers();

    // Clear the input
    memberNameInput.value = '';
  }

  // Function to delete a member
  function deleteMember(index) {
    if (confirm('Are you sure you want to delete this member?')) {
      // Remove the member at the specified index
      members.splice(index, 1);

      // Save to localStorage
      localStorage.setItem('members', JSON.stringify(members));

      // Render the updated members list
      renderMembers();
    }
  }

  // Function to vote for a member
  function voteForMember(index) {
   // Increment the votes for the selected member
    members[index].votes++;

    //Save to localStorage
    localStorage.setItem('members', JSON.stringify(members));

    // Render the updated members list
    renderMembers();
  }

  // Initial rendering
  renderMembers();