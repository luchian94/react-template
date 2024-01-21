import { NavLink } from 'react-router-dom';

import { BreadCrumbItem } from 'models/misc.ts';

export const BreadcrumbItemTemplate = (item: BreadCrumbItem) => {
  const classNames = `${item.active ? 'text-primary font-bold' : ''} ${item.className}`;

  if (item.url) {
    return (
      <NavLink to={item.url} className={classNames}>
        <span className={item.className}>{item.label}</span>
      </NavLink>
    );
  }

  return <span className={classNames}>{item.label}</span>;
};
