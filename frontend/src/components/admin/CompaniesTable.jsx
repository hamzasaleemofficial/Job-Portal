import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { allCompanies, searchCompanyByText } = useSelector(
    (state) => state.company
  );
  const [filterCompany, setFilterCompany] = useState(allCompanies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      allCompanies.length >= 0 &&
      allCompanies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [allCompanies, searchCompanyByText]);

  return (
    <div>
      <Table>
        <TableCaption>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCompanies.length >= 0 && filterCompany.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.website}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div className="flex items-center gap-2 w-fit  cursor-pointer">
                      <span
                        onClick={() =>
                          navigate(
                            `/admin/companies/companysetup/${company?._id}`
                          )
                        }
                        className="w-4 cursor-pointer"
                      >
                        Edit
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
