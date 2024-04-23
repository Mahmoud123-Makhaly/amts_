'use client';

import React from 'react';

import { Link, usePathname } from '@navigation';
import { useTranslate } from '@app/hooks';

interface PathInfo {
  label: string;
  path: string;
}

const BreadCrumb = ({ paths }: { paths: Array<string> }) => {
  const t = useTranslate('COMP_BreadCrumb');
  const path=usePathname();
  
  const extractLabels = (paths: string[]): PathInfo[] => {
    return paths.reduce<PathInfo[]>((labelsAndPaths, path, index) => {
      const prevPath = paths.slice(0, index + 1);
      const label = path;
      const fullPath = prevPath.join('/');
      labelsAndPaths.push({ label, path: fullPath.replaceAll('//', '/') });
      return labelsAndPaths;
    }, []);
  };

  const pathsInfo = extractLabels(paths);
  return (

        <ol className="breadcrumb m-0 ">
          {pathsInfo.map((pathInfo, index) => (
            <React.Fragment key={index}>
              {index != 0 && <i className="fa-solid fa-angle-left text-muted  font-14 px-2 pt-1"></i>}
              <li className="breadcrumb-item">
                <Link href={pathInfo.path} className={`${pathsInfo.length !== index + 1 ? 'text-muted' : ''} font-14`}>
                  {pathInfo.path === '/' ? t('BREAD_MAIN') : pathInfo.label}
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ol>
  );
};

export default BreadCrumb;
