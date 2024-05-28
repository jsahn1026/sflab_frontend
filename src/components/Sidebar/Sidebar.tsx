import { FaAngleDoubleLeft, FaAngleDoubleRight, FaList } from 'react-icons/fa';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';
import { Link, NavLink } from 'react-router-dom';
import './index.scss';

import Typography from '@mui/material/Typography';
import Account from 'components/Account/Account';
import { categories } from 'constants/categories';
import useSidebar from 'hooks/useSidebar';
import { useCallback, useState } from 'react';
import { MdHome, MdSettings } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { itemState } from 'store/setting';
import { splitState } from 'store/split';

const Sidebar = () => {
  const { collapsed, toggleCollapsed, toggled, setToggled } = useSidebar();
  const items = useRecoilValue(itemState);
  const splits = useRecoilValue(splitState);

  const [open, setOpen] = useState(items.length > 0);

  const [openCategory, setOpenCategory] = useState(false);

  const renderMenuItems = useCallback(() => {
    return items
      .map((item, i) => {
        const link = item.replace(/\//g, '-');
        return (
          <SubMenu key={`submenu_${i}`} title={item}>
            <MenuItem>
              <NavLink to={`/prices/${link}`} />
              <Typography>Prices</Typography>
            </MenuItem>
            <MenuItem>
              <NavLink to={`/fabrics/${link}`} />
              <Typography>Fabrics</Typography>
            </MenuItem>
            <MenuItem>
              <NavLink to={`/colors/${link}`} />
              <Typography>Colors</Typography>
            </MenuItem>
            <MenuItem>
              <NavLink to={`/products/${link}`} />
              <Typography>Products</Typography>
            </MenuItem>
          </SubMenu>
        );
      })
      .concat(
        splits.map((split, i) => (
          <SubMenu key={`split_submenu_${i}`} title={split.splitName}>
            <MenuItem>
              <NavLink to={`/split/${split.splitName}/all`} />
              <Typography>ALL</Typography>
            </MenuItem>
            <MenuItem>
              <NavLink to={`/split/${split.splitName}/prices`} />
              <Typography>Prices</Typography>
            </MenuItem>
            <MenuItem>
              <NavLink to={`/split/${split.splitName}/fabrics`} />
              <Typography>Fabrics</Typography>
            </MenuItem>
            <MenuItem>
              <NavLink to={`/split/${split.splitName}/colors`} />
              <Typography>Colors</Typography>
            </MenuItem>
            <MenuItem>
              <NavLink to={`/split/${split.splitName}/products`} />
              <Typography>Products</Typography>
            </MenuItem>
            {split.label.map((label, j) => {
              const splitName = split.splitName.replace(/\//g, '-');
              const labelName = label.labelName.replace(/\//g, '-');

              return (
                <SubMenu key={`split_submenu_${i}`} title={label.labelName}>
                  <MenuItem>
                    <NavLink to={`/split/prices/${splitName}/${labelName}`} />
                    <Typography>Prices</Typography>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to={`/split/fabrics/${splitName}/${labelName}`} />
                    <Typography>Fabrics</Typography>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to={`/split/colors/${splitName}/${labelName}`} />
                    <Typography>Colors</Typography>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to={`/split/products/${splitName}/${labelName}`} />
                    <Typography>Products</Typography>
                  </MenuItem>
                </SubMenu>
              );
            })}
          </SubMenu>
        ))
      );
  }, [items, splits]);
  const getNavLink = (name: string,third:boolean) => {
    const [mainCategory, subCategory] = name.split(' ');
    let path = '';
    let c = third ? "small_category" : "mid_category";
    switch (subCategory) {
      case 'Ratios':
        path = `/stats/${mainCategory}/${c}`;
        break;
      case 'Lengths':
        path = `/stats/${mainCategory}/length`;
        break;
      case 'Textures':
        path = `/stats/${mainCategory}/texture`;
        break;
      case 'Materials':
        path = `/fabrics/${mainCategory}`;
        break;
      case 'Prices':
        path = `/prices/${mainCategory}`;
        break;
      // 필요에 따라 더 많은 case를 추가할 수 있습니다.
      default:
        path = '';
    }
  
    return path;
  };
  const renderCategoriesItems = useCallback(() => {
    return categories.map((category, i) => (
      <SubMenu key={`category_submenu_${i}`} title={category.name}>
        {category.subcategories.map((subcategory, j) => {
          if (subcategory.thirdCategories.length === 0) {
            const subcategoryNavLink = getNavLink(subcategory.name,false);
            return (
              <MenuItem key={`subcategory_menuitem_${j}`}>
                {subcategoryNavLink ? (
                  <NavLink to={subcategoryNavLink}>{subcategory.name}</NavLink>
                ) : (
                  subcategory.name
                )}
              </MenuItem>
            );
          } else {
            
            return (
              <SubMenu key={`subcategory_submenu_${j}`} title={subcategory.name}>
                {subcategory.thirdCategories.map((thirdCategory, k) => {
                  const thirdCategoryNavLink = getNavLink(thirdCategory.name,true);
                  return (
                    <MenuItem key={`thirdcategory_menuitem_${k}`}>
                      {thirdCategoryNavLink ? (
                        <NavLink to={thirdCategoryNavLink}>{thirdCategory.name}</NavLink>
                      ) : (
                        thirdCategory.name
                      )}
                    </MenuItem>
                  );
                })}
              </SubMenu>
            );
          }
        })}
      </SubMenu>
    ));
  }, []);

  return (
    <ProSidebar
      collapsed={collapsed}
      breakPoint="md"
      toggled={toggled}
      onToggle={(toggled) => setToggled(toggled)}
    >
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={toggleCollapsed}
            ></MenuItem>
          ) : (
            <MenuItem suffix={<FaAngleDoubleLeft />} onClick={toggleCollapsed}>
              <Typography>FASHION BENCHMARK</Typography>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<MdHome />}>
            Home
            <NavLink to="/" />
          </MenuItem>
          <MenuItem icon={<MdSettings />}>
            Settings <Link to="/settings" />
          </MenuItem>
          <SubMenu
            title={'Categories'}
            icon={<FaList />}
            open={openCategory}
            onOpenChange={setOpenCategory}
          >
            {renderCategoriesItems()}
          </SubMenu>
          <SubMenu
            title={'Price Statistics'}
            icon={<FaList />}
          >
            <MenuItem>
              <NavLink to="/average_prices">{"Average Prices"}</NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/price_distributions">{"Price Distributions"}</NavLink>
            </MenuItem>
          </SubMenu>
          <SubMenu
            title={'Statistics'}
            icon={<FaList />}
            open={open}
            onOpenChange={setOpen}
          >
            {renderMenuItems()}
          </SubMenu>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <Account />
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
