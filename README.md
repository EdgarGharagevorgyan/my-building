1. Make UI => {
    1) Try Ant Design, Styled, Tailwind
    2) Use CSS (or Ant Design, or whatever fells right)
    3) Organize structure
    4) Make side bar
    5) Make table
    6) Make card
    7) Make it dynamic
}

2. Read => {
    1) React Router
    2) Local state
    3) Components should be **modular and reusable** ???
}

3. AI - Google => {
    1) Tools and Ideas
}

4. Entities => {
    1) Building
    2) Floor
    3) Apartment
    4) Partner
    5) Service
    6) User
    7) Family
}

5. Functionality => {
   1) Search
   2) Edit
   3) Save
   4) etc... 
}


Task ---> 1
    Decide and setup project on behalf of requirments` packages, minimal setup with react libs(router, store managemant, side effects management).
Task ---> 1.2
    Setup layout, all routes, all store chunks with empty pages and data and create (nav)side bar.
Task ---> 2
    Create building managment system with minimal requirements and minimal fields.
Task ---> 3
    Create dynamic table component on behalf of building case and then expend it as application grow.
Task ---> 4
    Create dynamic form component(for editing entities) on behalf of building case and then expend it as application grow.

✅ Task 6
Implement Floors and Apartments relationship under a building

Each building detail page should include a nested structure for floors

Each floor should display its apartments in a table

Make sure the relationships are preserved in mock data

✅ Task 7
Create the Family and User structure

Add pages to list Families and their assigned Apartments

Clicking on a Family should show all users (family members)

Allow filtering families by building or apartment

✅ Task 8
Implement Services and assign them to Buildings

Create the service management page

Each service must support linking to one or more buildings

Display assigned services in building detail view

✅ Task 9
Implement Partners and link them to Services

Create a table view for partners

Each service must show its assigned partner

Allow navigation from a service to its partner and vice versa

✅ Task 10
Refactor dynamic form and table components for reusability

Use a config-driven approach for form fields and table columns

Avoid duplication when adding new entity types

Make components accept a schema and render accordingly

✅ Task 11
Add CRUD functionality with modal forms

Use Ant Design Modal + Form for add/edit/delete actions

Implement form submission and update mock data state

Reuse the dynamic form component for all entities

✅ Task 12
Add filters and sorting to tables

Enable sorting by name, ID, etc.

Add filters (e.g., show services for a specific building)

Use Ant Design table props for this

✅ Task 13
Implement global state management using Context or Redux Toolkit

Store building, user, service, partner data globally

Avoid prop drilling through deeply nested components

Use selectors or hooks for reading/updating state

✅ Task 14
Add loading spinners and empty states

Show a loading spinner when switching routes or fetching data

Show helpful messages for empty tables (e.g., “No apartments found”)

✅ Task 15
Create a summary dashboard

Display counts: total buildings, families, services, partners

Include a few simple cards or graphs

Use mock stats if needed
