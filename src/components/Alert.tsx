import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg">
      <CheckCircle className="h-5 w-5 mr-2" />
      <span>{message}</span>
    </div>
  );
};

export default Alert;