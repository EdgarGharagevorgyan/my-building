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
          { id: 2, number: 102, family: 2, service: 2 },
        ],
      },
      {
        id: 2,
        number: 2,
        apartments: [
          { id: 3, number: 201, family: null, service: 3 },
          { id: 4, number: 202, family: null, service: null },
        ],
      },
    ],
    services: [1, 2, 3],
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-10T12:00:00Z",
  },
  {
    id: 2,
    name: "Building B",
    address: "456 Elm St",
    floors: [],
    services: [],
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-02-10T12:00:00Z",
  },
];

export const mockFamilies = [
  {
    id: 1,
    name: "Smiths",
    members: [
      {
        id: 1,
        fullName: "John Smith",
        age: 40,
        role: "Father",
        createdAt: "2025-01-05T10:00:00Z",
        updatedAt: "2025-01-15T12:00:00Z",
      },
      {
        id: 2,
        fullName: "Jane Smith",
        age: 38,
        role: "Mother",
        createdAt: "2025-01-05T10:00:00Z",
        updatedAt: "2025-01-15T12:00:00Z",
      },
    ],
    createdAt: "2025-01-05T10:00:00Z",
    updatedAt: "2025-01-15T12:00:00Z",
  },
  {
    id: 2,
    name: "Johnson Family",
    members: [
      {
        id: 3,
        fullName: "Michael Johnson",
        age: 45,
        role: "Father",
        createdAt: "2025-02-01T10:00:00Z",
        updatedAt: "2025-02-20T12:00:00Z",
      },
      {
        id: 4,
        fullName: "Sarah Johnson",
        age: 42,
        role: "Mother",
        createdAt: "2025-02-01T10:00:00Z",
        updatedAt: "2025-02-20T12:00:00Z",
      },
    ],
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-02-20T12:00:00Z",
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
  {
    id: 3,
    name: "Security",
    partner: { id: 3, companyName: "SecureIt", contactPerson: "Charlie", phone: "555-555-5555" },
  },
  {
    id: 4,
    name: "Landscaping",
    partner: null,
  },
  {
    id: 5,
    name: "Pest Control",
    partner: { id: 4, companyName: "PestAway", contactPerson: "Diana", phone: "444-444-4444" },
  },
];

export const mockPartners = [
  { id: 1, companyName: "CleanCo", contactPerson: "Alice", phone: "123-456-7890" },
  { id: 2, companyName: "FixIt", contactPerson: "Bob", phone: "987-654-3210" },
  { id: 3, companyName: "SecureIt", contactPerson: "Charlie", phone: "555-555-5555" },
  { id: 4, companyName: "PestAway", contactPerson: "Diana", phone: "444-444-4444" },
  { id: 5, companyName: "EmptyCo", contactPerson: "", phone: "" },
];
