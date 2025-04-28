export const mockBuildings = [
  {
    id: 1,
    name: "Building A",
    address: "123 Main St",
    floors: [
      {
        id: 1,
        number: 1,
        apartments: [
          { id: 1, number: 101, family: 1, service: 1 },
          { id: 2, number: 102, family: null, service: null },
        ],
      },
      {
        id: 2,
        number: 2,
        apartments: [
          { id: 3, number: 201, family: null, service: 2 },
          { id: 4, number: 202, family: null, service: null },
        ],
      },
    ],
    services: [1], 
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
  {
    id: 2,
    name: "Johnson Family",
    members: [
      { id: 3, fullName: "Michael Johnson", age: 45, role: "Father" },
      { id: 4, fullName: "Sarah Johnson", age: 42, role: "Mother" },
    ],
    createdAt: "2025-02-01",
    updatedAt: "2025-02-20",
  },
];

export const mockServices = [
  {
    id: 1,
    name: "Cleaning",
    partner: { id: 1, companyName: "CleanCo", contactPerson: "Alice", phone: "123-456-7890" },
  },
  {
    id: 2,
    name: "Maintenance",
    partner: { id: 2, companyName: "FixIt", contactPerson: "Bob", phone: "987-654-3210" },
  },
];

export const mockPartners = [
  { id: 1, companyName: "CleanCo", contactPerson: "Alice", phone: "123-456-7890" },
  { id: 2, companyName: "FixIt", contactPerson: "Bob", phone: "987-654-3210" },
];
