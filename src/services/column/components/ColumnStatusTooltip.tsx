import { useTranslation } from "react-i18next";
import { CustomTooltip } from "@/shared/ui/CustomTooltip";

export const ColumnStatusTooltip = () => {
   const { t } = useTranslation();

   return (
      <CustomTooltip>
         <p>
            {t("column.statusHelp1")}
         </p>
         <p>
            {t("column.statusHelp2")}
         </p>
         <p>
            {t("column.statusHelp3")}
         </p>
         <p>
            {t("column.statusHelp4")}
         </p>
         <p>
            {t("column.statusHelp5")}
         </p>
      </CustomTooltip>
   );
};