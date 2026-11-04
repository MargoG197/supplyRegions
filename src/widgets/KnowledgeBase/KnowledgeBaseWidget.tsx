import { ActionCard } from "@/shared/ui/ActionCard";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/paths";


export const KnowledgeBaseWidget = () => {

  const navigate = useNavigate();

  const handleGoTo = () => {
    navigate(PATHS.KNOWLEDGE_BASE);
  };
  return (
      <ActionCard label="База знаний" onClick={handleGoTo}/>
  );
};
