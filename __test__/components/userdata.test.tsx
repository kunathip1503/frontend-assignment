import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserData from "../../src/components/Userdata/userdata";

describe("UserData component", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        users: [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            company: {
              department: "Marketing",
            },
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            company: {
              department: "Sales",
            },
          },
        ],
      }),
    });
  });

  test('renders user data and displays "All Departments" option', async () => {
    render(<UserData />);
    await waitFor(() => {
      expect(screen.getByText("User Data")).toBeInTheDocument();
    });
    expect(screen.getByText("All Departments")).toBeInTheDocument();
  });
});
