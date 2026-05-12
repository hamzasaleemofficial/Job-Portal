import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";


const AppliedJobTable = () => {

  const {allAppliedJobs} = useSelector(state => state.job);
  return (
    <div>
      <Table>
        <TableCaption>List of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.createdAt.split('T')[0]}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge className = { item?.status === "pending" ? "bg-gray-500" : item?.status == "accepted" ? "bg-green-500" : "bg-red-500" }>{item?.status.toUpperCase()}</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable;