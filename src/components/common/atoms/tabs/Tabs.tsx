import React, { ReactNode } from 'react';
import { TabView, TabPanel, TabViewProps, TabPanelProps, TabPanelHeaderTemplateOptions } from 'primereact/tabview';
// import './TabViewDemo.css';
interface Itabs extends TabPanelProps {
  tabs: Array<{
    header?: string | ReactNode;
    headerTemplate?: React.ReactNode | ((options: TabPanelHeaderTemplateOptions) => React.ReactNode);
    content?: ReactNode;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  }>;
  vertical?: boolean;
  className?: 'pills' | 'mountains' | 'frameless' | 'blocks';
  align?: 'start' | 'end' | 'center' | 'between';
}

const Tabs = ({ tabs, headerClassName, headerStyle, headerTemplate, className = 'pills', align = 'center' }: Itabs) => {
  return (
    <TabView className={`${className} ${align}`}>
      {tabs.map((tab, index) => {
        return (
          <TabPanel
            key={index}
            header={tab.header}
            headerClassName={headerClassName}
            headerStyle={headerStyle}
            headerTemplate={headerTemplate}
            leftIcon={tab.leftIcon}
            rightIcon={tab.rightIcon}
          >
            {tab.content}
          </TabPanel>
        );
      })}
    </TabView>
  );
};

export default Tabs;
