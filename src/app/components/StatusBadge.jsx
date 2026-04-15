import { useLanguage } from "../../i18n/LanguageContext";

export function StatusBadge({ status }) {
  const { t } = useLanguage();
  
  const config = {
    confirmed: {
      bg: "bg-[#DCFCE7]",
      text: "text-[#16A34A]",
      label: t('status.confirmed')
    },
    pending: {
      bg: "bg-[#FEF3C7]",
      text: "text-[#D97706]",
      label: t('status.pending')
    },
    completed: {
      bg: "bg-[#DBEAFE]",
      text: "text-[#2563EB]",
      label: t('status.completed')
    },
    cancelled: {
      bg: "bg-[#FEE2E2]",
      text: "text-[#DC2626]",
      label: t('status.cancelled')
    }
  };

  const { bg, text, label } = config[status] || config.pending;

  return (
    <span className={`px-3 py-1.5 rounded-lg font-semibold text-sm ${bg} ${text}`}>
      {label}
    </span>
  );
}
