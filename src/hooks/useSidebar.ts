import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { sidebarCollapsedState, sidebarToggleState } from 'store/ui';

export default function useSidebar() {
  const [collapsed, setCollapsed] = useRecoilState(sidebarCollapsedState);
  const [toggled, setToggled] = useRecoilState(sidebarToggleState);

  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed, setCollapsed]);

  const toggle = useCallback(() => {
    setToggled(!toggled);
  }, [toggled, setToggled]);

  return useMemo(
    () => ({
      collapsed,
      toggleCollapsed,
      toggled,
      toggle,
      setToggled,
    }),
    [collapsed, toggleCollapsed, toggle, toggled, setToggled]
  );
}
