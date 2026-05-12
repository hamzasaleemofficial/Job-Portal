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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByTtitle } = useSelector((state) => state.job);
  const [filterJob, setFilterJob] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByTtitle) {
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJobByTtitle.toLowerCase());
      });
    setFilterJob(filteredJob);
  }, [allAdminJobs, searchJobByTtitle]);

  return (
    <div>
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ttitle</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Locantion</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob.length >= 0 &&
            filterJob.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.role}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      {/* <div className="flex items-center gap-2 w-fit  cursor-pointer">
                        <Edit2 className="w-4" />
                        <span
                          onClick={() =>
                            navigate(
                              `/admin/companies/companysetup/${job?._id}`
                            )
                          }
                        >
                          Edit
                        </span>
                      </div> */}
                      <div className="flex items-center w-fit cursor-pointer gap-2 mt-2">
                        <Eye className="w-4" />
                        <span
                          onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        >
                          Applications
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

export default AdminJobsTable;
