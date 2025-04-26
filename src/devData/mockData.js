export const mockBuildings = [
  {
    id: 1,
    name: "Building A",
    address: "123 Main St",
    floors: [
      { id: 1, number: 1, apartments: [{ id: 1, number: 101 }, { id: 2, number: 102 }] },
      { id: 2, number: 2, apartments: [{ id: 3, number: 201 }, { id: 4, number: 202 }] },
    ],
    services: [{ id: 1, name: "Cleaning" }],
    createdAt: "2025-01-01",
    updatedAt: "2025-01-10",
  },
  {
    id: 2,
    name: "Building B",
    address: "456 Elm St",
    floors: [],
    services: [],
    createdAt: "2025-02-01",
    updatedAt: "2025-02-10",
  },
];

export const mockFamilies = [
  {
    id: 1,
    name: "Smiths",
    members: [
      { id: 1, fullName: "John Smith", age: 40, role: "Father" },
      { id: 2, fullName: "Jane Smith", age: 38, role: "Mother" },
    ],
    createdAt: "2025-01-05",
    updatedAt: "2025-01-15",
  },
];

export const mockServices = [
  { id: 1, name: "Cleaning", partner: { id: 1, companyName: "CleanCo", contactPerson: "Alice", phone: "123-456-7890" } },
  { id: 2, name: "Maintenance", partner: { id: 2, companyName: "FixIt", contactPerson: "Bob", phone: "987-654-3210" } },
];

export const mockPartners = [
  { id: 1, companyName: "CleanCo", contactPerson: "Alice", phone: "123-456-7890" },
  { id: 2, companyName: "FixIt", contactPerson: "Bob", phone: "987-654-3210" },
];