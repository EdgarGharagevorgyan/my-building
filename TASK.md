### 🏗️ React Application Task: Building Management System

#### 📚 Project Description
Create a **React app** to manage **residential buildings**. The app should include entities like Buildings, Floors, Apartments, Families, Users, Services, and Partners. Each should be displayed in a table format on a separate page with proper routing.

---

### 🧱 Entities & Relationships

1. **Building**
    - `id`
    - `name`
    - `address`
    - `floors`: list of Floor objects
    - `services`: list of Service objects'
    - `createdAt`: when building was created
    - `updatedAt`: when building was updated

2. **Floor**
    - `id`
    - `number` (e.g., 1, 2, 3)
    - `apartments`: list of Apartment objects

3. **Apartment**
    - `id`
    - `number` (e.g., 101, 102)
    - `family`: Family object

4. **Family**
    - `id`
    - `name` (e.g., Smiths)
    - `members`: list of User objects
    - `createdAt`: when family was created
    - `updatedAt`: when family was updated

5. **User**
    - `id`
    - `fullName`
    - `age`
    - `role` (e.g., father, mother, child)
    - `createdAt`: when user was created
    - `updatedAt`: when user was updated

6. **Service**
    - `id`
    - `name` (e.g., Cleaning, Maintenance)
    - `partner`: Partner object

7. **Partner**
    - `id`
    - `companyName`
    - `contactPerson`
    - `phone`

---

### 📄 Pages (React Router Required)

| Page             | Path             | Description                                                          |
|------------------|------------------|----------------------------------------------------------------------|
| Buildings        | `/buildings`     | List all buildings with table                                        |
| Building Details | `/buildings/:id` | Show building info, floors, apartments                               |
| Families         | `/families`      | List all families with table                                         |
| Family Details   | `/families/:id`  | Show members (users) of the family show data with card               |
| User             | `/user/:id`      | Show exact user with card                                            |
| Services         | `/services`      | List all services and their assigned partners with table             |
| Partners         | `/partners`      | List of all service providers with table                             |
| Dashboard        | `/dashboard`     | dashboard summary page with counts of buildings, services, families  |

---

### 📋 Requirements

- Use **React Router** for routing
- Display data in **Ant Design tables** (or any UI library) optional use preferred one.
- Use mock data stored in local state
- Components should be **modular and reusable**
- Include **navigation bar** for switching between pages
- Each Page data must be editable we can delete add or update data in this pages.
- Filter or sort tables
---