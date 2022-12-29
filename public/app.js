

document.addEventListener("alpine:init", () => {
   Alpine.data("rest-api", () => ({
      todos: [], 
      editing: false, 
      editedTodo: {},
      newTodo: '',
      search: '',
      completedCount: 0,
      pendingCount: 0,
      inProcessCount: 0,
      showTodo: false,
     
     // Function to add a todo
     addTodo() {

     // Add the new todo to the array of todos
         this.todos.push({
            text: this.newTodo,
            createdAt: new Date(),
            deadline: '',
            assignedTo: '',
            category: '',
            state: 'pending'
         });

  
    // Update the view after the new todo has been added
    this.$nextTick(() => {
        // Select the todo list element
        const todoList = document.querySelector('.todo-list')
    
       // Create a new list item for the todo
       const todoItem = document.createElement('li')
       todoItem.innerHTML = 
         `
         <h3 class="todo-name font-bold text-2xl mb-2">${this.newTodo.name}</h3>
          <div class="todo-features flex mt-2">
            <div class="todo-feature mr-4">
              <span class="text-gray-700 font-medium">Assigned To:</span>
              <span class="text-gray-900 font-semibold">${this.newTodo.assignedTo}</span>
            </div>
            <div class="todo-feature">
              <span class="text-gray-700 font-medium">Category:</span>
              <span class="text-gray-900 font-semibold">${this.newTodo.category}</span>
            </div>
          </div>`
    
        // Append the new list item to the todo list
        todoList.appendChild(todoItem);

     });
      // Clear the input field
      this.newTodo = '';

      this.showTodo = true;
      // Update the count of todos by state
     this.countTodosByState();

   },


     // Function to edit a todo
     editTodo(todo) {

 	// Set the editing flag to true
         this.editing = true;
     
         // Set the editedTodo to the todo being edited
         this.editedTodo = todo;

         // Set the value of the input field to the text of the todo being edited
         this.newTodo = todo.text;
      },


      closeEditModal() {
 	 // Set the editing flag to false
          this.editing = false;
      },

      // Function to update a todo
      updateTodo() {
          // Update the text of the edited todo
         this.editedTodo.text = this.newTodo;
  
         // Clear the input field
          this.newTodo = '';

         // Set the editing flag to false
         this.editing = false;

         // Update the count of todos by state
          this.countTodosByState();
      },
  
     // Function to delete a todo
     deleteTodo(todo) {
      // Find the index of the todo in the array
       const index = this.todos.indexOf(todo);

       // Remove the todo from the array
        this.todos.splice(index, 1);

       // Update the count of todos by state
        this.countTodosByState();
     },

     // Function to search for todos
     searchTodos() {
       // Filter the todos array based on the search query
        this.todos = this.todos.filter(todo => todo.text.includes(this.search));
     },

     // Function to count the number of completed, pending and in process todos
     countTodosByState() {
      // Initialize the count of completed, pending and in process todos
       this.completedCount = 0;
       this.pendingCount = 0;
       this.inProcessCount = 0;

       // Iterate through the todos array and update the count of todos by state
       this.todos.forEach(todo => {
           if (todo.state === 'done') {
              this.completedCount++;
           } else if (todo.state === 'pending') {
              this.pendingCount++;
           } else {
              this.inProcessCount++;
           }
       });
    },
  }));
});
