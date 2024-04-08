'use client'

import * as React from "react";
import ProjectTableView from "@/components/ProjectsTableView";
import IsDefaultColumn from "@/components/ProjectsTableView/columns/is-default";
import TitleColumn from "@/components/ProjectsTableView/columns/title";
import DescriptionColumn from "@/components/ProjectsTableView/columns/description";
import AliasColumn from "@/components/ProjectsTableView/columns/alias";

const TableView = ({data, error}) => {
  const columns = [
    TitleColumn('/projects'),
    AliasColumn(),
    DescriptionColumn(),
    IsDefaultColumn((id) => console.log({id})),
  ]

  return (
    <ProjectTableView data={data.rows} columns={columns} error={error}/>
  );
};

export default TableView;