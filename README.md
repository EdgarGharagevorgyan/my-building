#  Building Management System 

##  Phase 1: Project Setup & Core Structure

###  Task 1: Project Setup
- [ ] Initialize React project
- [ ] Install essential packages
- [ ] Setup base folder structure

###  Task 1.2: Base Layout
- [ ] Create `MainLayout` with:
  - Sidebar navigation
  - Optional header
  - Main content area
- [ ] Set up routing for:
  - Buildings
  - Floors
  - Apartments
  - Families
  - Users
  - Services
  - Partners
- [ ] Create Redux slices with initial state (mock data or empty)

---

##  Phase 2: Core Entity Implementation

###  Task 2: Building Management
- [ ] Create Building entity with minimal schema (id, name, address)
- [ ] Create Building list table using AntD

###  Task 3: Dynamic Table Component
- [ ] Create a reusable `DynamicTable` component
- [ ] Props: `columns`, `data`, `onEdit`, `onDelete`, `filters`, `sortable`

###  Task 4: Dynamic Form Component
- [ ] Create a reusable `DynamicForm` component
- [ ] Props: `formConfig`, `initialValues`, `onSubmit`, `mode`
- [ ] Use AntD Form + Modal

---

##  Phase 3: Relationships & Additional Entities

###  Task 6: Floors & Apartments
- [ ] In Building Detail Page:
  - [ ] Show Floors nested
  - [ ] Each floor contains Apartments in a table
- [ ] Maintain proper mock relationships

###  Task 7: Families & Users
- [ ] Create Family List page
- [ ] Filter families by Building or Apartment
- [ ] On Family click, show related Users (family members)

###  Task 8: Services
- [ ] Service list and detail pages
- [ ] Each Service links to one or more Buildings
- [ ] Show assigned services in Building Detail

###  Task 9: Partners
- [ ] Partner list page
- [ ] Each Service has assigned Partner(s)
- [ ] Enable navigation between Partner <-> Service

---

##  Phase 4: Reusability & UX Enhancements

###  Task 10: Refactor Dynamic Components
- [ ] Convert `DynamicForm` & `DynamicTable` to config-driven components
- [ ] Avoid duplication across entity UIs

###  Task 11: CRUD Functionality
- [ ] Reuse dynamic form for Create/Edit (Modal + Form)
- [ ] Add delete with confirmation
- [ ] Update global mock state after actions

###  Task 12: Filters & Sorting
- [ ] Add filtering by fields (e.g., filter services by building)
- [ ] Add AntD sorting (name, id, etc.)

###  Task 13: Global State Management
- [ ] Move all entity state to Redux or Context API
- [ ] Use hooks like `useSelector`, `useDispatch` or custom context hooks

---

##  Phase 5: Polishing & Final Touches

###  Task 14: Loading & Empty States
- [ ] Show spinner when loading data or switching routes
- [ ] Add helpful empty state messages

###  Task 15: Dashboard
- [ ] Create Summary Dashboard Page
- [ ] Cards or charts for:
  - Total Buildings
  - Floors
  - Families
  - Services
  - Partners
- [ ] Use mock data and simple UI components (AntD Cards, recharts, etc.)

---

##  Learning & Notes

###  React Knowledge
- [ ] Understand React Router DOM (nested routes)
- [ ] Understand Redux Toolkit or Context API
- [ ] Learn how to structure modular & reusable components

###  Tools & Design
- [ ] Explore Ant Design features
- [ ] Use Tailwind or Styled Components (if preferred)
- [ ] Optimize UI for flexibility and reuse

---

##  Entities List

- Building
- Floor
- Apartment
- Family
- User
- Service
- Partner

---

##  Functionality Checklist

- [ ] Search
- [ ] Edit
- [ ] Save
- [ ] Delete
- [ ] Filter
- [ ] Sort
