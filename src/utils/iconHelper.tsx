import {
  AlignVerticalSpaceAround,
  ArrowDownAZ,
  ArrowDownWideNarrow,
  ArrowLeft,
  CodeXml,
  MessageCircleWarning,
  SlidersHorizontal,
  Sparkles,
  UserRound,
} from 'lucide-react';

export const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    CodeXml: <CodeXml className="w-5 h-5" />,
    ArrowDownWideNarrow: <ArrowDownWideNarrow className="w-5 h-5" />,
    ArrowDownAZ: <ArrowDownAZ className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    UserRound: <UserRound className="w-5 h-5" />,
    AlignVerticalSpaceAround: <AlignVerticalSpaceAround className="w-5 h-5" />,
    MessageCircleWarning: <MessageCircleWarning className="w-5 h-5" />,
    SlidersHorizontal: <SlidersHorizontal className="w-5 h-5" />,
    ArrowLeft: <ArrowLeft className="w-5 h-5" />,
  };

  return iconMap[iconName];
};
