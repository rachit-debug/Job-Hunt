import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByName } = useSelector(
    (store) => store.company
  );
  const [filterCompany,SetFilterCompany] = useState(companies)
  const navigate = useNavigate()

  useEffect(()=>{
    const filteredCompany = companies.filter((company) => {
      if (!searchCompanyByName) {
        return true;
      }

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByName.toLowerCase());
    });

    SetFilterCompany(filteredCompany)

  },[companies,searchCompanyByName])


  return (
    <div>
      <Table>
        <TableCaption>
          A List of your recent registered companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>

              <TableCell>{company.name}</TableCell>

              <TableCell>
                {company.createdAt?.split("T")[0]}
              </TableCell>

              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger >
                    <MoreHorizontal />
                  </PopoverTrigger>

                  <PopoverContent className="w-32">
                    <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={()=>{navigate(`/admin/companies/${company._id}`)}}>
                      <Edit2 className="w-4" />
                      <span>Edit</span>
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
