type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        rounded-xl
        bg-cyan-500
        px-8
        py-4
        text-lg
        font-semibold
        text-slate-900
        shadow-lg
        shadow-cyan-500/30
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-cyan-400
        hover:shadow-cyan-400/50
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}

export default Button;