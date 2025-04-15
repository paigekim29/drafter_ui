interface RoundButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const RoundButton = ({ label, isActive, onClick }: RoundButtonProps) => (
  <button
    className={`px-3 py-1 rounded-full text-xs ${
      isActive ? 'bg-indigo-50 text-indigo-600 font-medium' : 'bg-gray-100 text-gray-600'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default RoundButton;
