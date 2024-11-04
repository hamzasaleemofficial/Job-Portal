import { Badge } from "./ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";


const AppliedJobTable = () => {
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
            [1,2].map((item,index) => (
              <TableRow key={index}>
                <TableCell>22-10-2024</TableCell>
                <TableCell>Devops Consultant</TableCell>
                <TableCell>MFGK</TableCell>
                <TableCell className="text-right"><Badge className="bg-green-500">Selected</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable;