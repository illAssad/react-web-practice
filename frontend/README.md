# Frontend
### Functional Requirements
- Sidebar for navigation { Clients, Settings }
- Client List View
  - Filter by contains "something"
  - Sort By
- Client Details
  - Client id is passed with a route parameter
- Form for adding/editing a client
  - Re-usable for both!
  - Form validation
  - Triggers an update

### Non-functional requirements
- Router
- State management (redux vs. context)
- Single Page app (no refreshes on nav)
- Responsive UI
- Pretty-ish
    
### Game plan
1. Create types
2. Create store -> Selectors -> Reducers
3. API lib -> Mocked for now
4. Create routes /clients + /client/:id + client/edit/:id
5. Layouts (high level)
6. Pages
7. Reusable Components
8. Hooks
### File Structure
```text
/src
   /components      # Reusable UI components
   /ui              # Generic UI elements (buttons, inputs)
   /clients         # Client-specific components
   /layouts         # Layout components
   /pages           # Route components
   /services        # API and other services
   /hooks           # Custom hooks
   /store           # Redux/state management
   /utils           # Helper functions
   /contexts        # React contexts 
   /types           # Object interface and types
   
```



# Backend
### Functional Requirements
1. Must auth -> user must submit an auth token in header (use middleware)
2. GET /users/ -> pagination
3. GET /user/:id -> or 404
4. PUT /user/:id -> Edit, or 404
5. POST /user/ -> Validate info, or 40x
6. 

# MongoDB

