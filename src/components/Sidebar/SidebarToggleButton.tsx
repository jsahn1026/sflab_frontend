import useSidebar from 'hooks/useSidebar';
import { FaBars } from 'react-icons/fa';

const SidebarToggleButton = () => {
  const { toggle } = useSidebar();

  return (
    <div className="btn-toggle" onClick={toggle}>
      <FaBars />
    </div>
  );
};

export default SidebarToggleButton;
