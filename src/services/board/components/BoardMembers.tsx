import { BoardMember } from "./BoardMember";
import { useGetBoardMembersQuery } from "../api/hooks/";
import { Spinner } from "@/shared/ui/shadcn/spinner";

interface IProps {
   workspaceId: string,
   boardId: string,
   close: () => void
}

export const BoardMembers = ({ workspaceId, boardId }: IProps) => {
   const { data: members, isLoading } = useGetBoardMembersQuery({ workspaceId, boardId })

   if (isLoading) return (
      <div className="py-2">
         <Spinner className="mx-auto size-5" />
      </div>
   )

   return (
      <div>
         {
            members?.map(member => (
               <BoardMember key={member.userId} workspaceId={workspaceId} boardId={boardId} member={member} />
            ))
         }
      </div>
   );
};
