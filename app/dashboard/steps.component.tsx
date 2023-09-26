"use client";
import React, { Key, useState } from "react";

import { Tabs, Tab } from "@nextui-org/react";
import { FiCalendar, FiHome, FiUser } from "react-icons/fi";

export default function CustomNavigationBarComponent({
  pages,
  defaultKey,
}: {
  pages: any;
  defaultKey: string;
}) {
  const [key, setKey] = useState<Key>(defaultKey);

  return (
    <div className="flex flex-col h-full">
      {pages[key]}
      <CustomNavigationBar onChange={(i) => setKey(i)} defaultValue={key} />
    </div>
  );
}

const CustomNavigationBar = ({
  defaultValue,
  onChange,
}: {
  defaultValue: React.Key;
  onChange: (key: React.Key) => void;
}) => {
  return (
    <div className="flex w-full p-4 flex-shrink-0">
      <Tabs
        size="lg"
        className="m-auto"
        aria-label="Options"
        color="primary"
        defaultSelectedKey={defaultValue}
        onSelectionChange={onChange}
        onChange={(el) => console.log(el.target)}
      >
        <Tab
          key="home"
          title={
            <div className="flex items-center space-x-2 w-full h-full">
              <FiHome />
              <span>Home</span>
            </div>
          }
        />
        <Tab
          key="appointments"
          title={
            <div className="flex items-center space-x-2">
              <FiCalendar />
              <span>Agendamentos</span>
            </div>
          }
        />
        <Tab
          key="profile"
          title={
            <div className="flex items-center space-x-2">
              <FiUser />
              <span>Perfil</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
