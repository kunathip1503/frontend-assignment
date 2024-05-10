"use client";
import React, { useEffect, useState } from "react";
import "./userdata.css";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  company: { department: string };
  address: { address: string; city: string; state: string; postalCode: string };
  image: string;
}

interface GroupedUsers {
  [department: string]: User[];
}

const UserData = () => {
  const [groupedUsers, setGroupedUsers] = useState<GroupedUsers>({});
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched users:", data.users);
        const groupedData = groupByDepartment(data.users);
        setGroupedUsers(groupedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const groupByDepartment = (users: User[]): GroupedUsers => {
    return users.reduce((acc: GroupedUsers, user: User) => {
      const department = user.company.department;
      if (!acc[department]) {
        acc[department] = [];
      }
      acc[department].push(user);
      return acc;
    }, {});
  };

  const filterByDepartment = (department: string | null) => {
    setSelectedDepartment(department);
    setCurrentPage(1);
  };

  const filterBySearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const filteredUsers = selectedDepartment
    ? groupedUsers[selectedDepartment] || []
    : Object.values(groupedUsers).flat();

  const searchedUsers = filteredUsers.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(searchedUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-data">
      <h1>User Data</h1>
      <div className="filters">
        <select
          value={selectedDepartment || ""}
          onChange={(e) => filterByDepartment(e.target.value || null)}
        >
          <option value="">All Departments</option>
          {Object.keys(groupedUsers).map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => filterBySearch(e.target.value)}
        />
      </div>
      <div className="user-grid">
        {currentItems.map((user) => (
          <div key={user.id} className="user-card">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="user-image"
            />
            <div className="user-details">
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${user.address.address}, ${user.address.city}, ${user.address.state}, ${user.address.postalCode}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserData;
