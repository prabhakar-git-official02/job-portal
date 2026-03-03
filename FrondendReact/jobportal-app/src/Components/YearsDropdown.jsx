import { Select } from "@mui/material";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function YearsDropDown({ startYear, endYear, setYear,initialName }) {
  const [selectedYear, setSelectedYear] = useState(null);
  const years = [];

  for (let y = endYear; y >= startYear; y--) {
    years.push(y);
  }

  const handleSelect = (year) => {
    setSelectedYear(year);
    setYear(year);
  };

  return (
    <>
    
    <DropdownButton
      id="dropdown-basic-button-sm"
      title={selectedYear || initialName}
      drop="up"  
      menuVariant="dark" 
      style={{ minWidth: '120px' }} 
    >
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        
        {years.map((year) => (
          <>
          <Dropdown.Item key={year} onClick={() => handleSelect(year)}>
            {year}
          </Dropdown.Item>
          </>
        ))}
      </div>
    </DropdownButton>
    <style>
      {`
/* Button */
#dropdown-basic-button-sm {
  background-color: #1f2937; /* dark slate */
  border: none;
  border-radius: 8px;
  font-weight: 500;
  color: #fff;
}

#dropdown-basic-button:hover,
#dropdown-basic-button:focus {
  background-color: #374151;
  color: #fff;
  box-shadow: none;
}

/* Dropdown menu */
.dropdown-menu {
  background-color: #111827;
  border-radius: 10px;
  border: 1px solid #1f2937;
  padding: 6px 0;
}

/* Dropdown item */
.dropdown-item {
  color: #d1d5db;
  padding: 8px 16px;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: #2563eb;
  color: #fff;
}

/* Active item */
.dropdown-item:active {
  background-color: #1d4ed8;
  color: #fff;
}

/* Scroll support */
.dropdown-menu > div {
  max-height: 200px;
  overflow-y: auto;
}

/* Scrollbar */
.dropdown-menu > div::-webkit-scrollbar {
  width: 5px;
}

.dropdown-menu > div::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 10px;
}


      `}
    </style>
    </>
  );
}

export default YearsDropDown;

