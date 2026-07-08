import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { useList } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";

import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreateButton } from "@/components/refine-ui/buttons/create";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ClassDetails, Subject, User } from "@/types/subject";

const ClassesList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("all");
    const [selectedTeacher, setSelectedTeacher] = useState("all");

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { query: subjectsQuery } = useList<Subject>({
        resource: "subjects",
        pagination: {
            pageSize: 100,
        },
    });

    const { query: teachersQuery } = useList<User>({
        resource: "users",
        filters: [{ field: "role", operator: "eq", value: "teacher" }],
        pagination: {
            pageSize: 100,
        },
    });

    const subjects = subjectsQuery?.data?.data ?? [];
    const teachers = teachersQuery?.data?.data ?? [];

    const subjectFilter =
        selectedSubject === "all"
            ? []
            : [
                  {
                      field: "subject",
                      operator: "eq" as const,
                      value: selectedSubject,
                  },
              ];

    const teacherFilter =
        selectedTeacher === "all"
            ? []
            : [
                  {
                      field: "teacher",
                      operator: "eq" as const,
                      value: selectedTeacher,
                  },
              ];

    const searchFilter = debouncedSearchQuery
        ? [
              {
                  field: "name",
                  operator: "contains" as const,
                  value: debouncedSearchQuery,
              },
          ]
        : [];

    const classTable = useTable<ClassDetails>({
        columns: useMemo<ColumnDef<ClassDetails>[]>(
            () => [
                {
                    id: "banner",
                    accessorKey: "bannerUrl",
                    size: 120,
                    header: () => <p className="column-title ml-2">Banner</p>,
                    cell: ({ getValue }) => {
                        const bannerUrl = getValue<string | undefined>();

                        return bannerUrl ? (
                            <img
                                src={bannerUrl}
                                alt="Class banner"
                                className="h-12 w-20 rounded-md object-cover"
                            />
                        ) : (
                            <div className="flex h-12 w-20 items-center justify-center rounded-md bg-muted text-[10px] text-muted-foreground">
                                No image
                            </div>
                        );
                    },
                },
                {
                    id: "name",
                    accessorKey: "name",
                    size: 220,
                    header: () => <p className="column-title">Class Name</p>,
                    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
                    filterFn: "includesString",
                },
                {
                    id: "status",
                    accessorKey: "status",
                    size: 120,
                    header: () => <p className="column-title">Status</p>,
                    cell: ({ getValue }) => {
                        const status = getValue<string>();

                        return (
                            <Badge variant={status === "active" ? "default" : "secondary"}>
                                {status}
                            </Badge>
                        );
                    },
                },
                {
                    id: "subject",
                    accessorKey: "subject.name",
                    size: 180,
                    header: () => <p className="column-title">Subject</p>,
                    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
                },
                {
                    id: "teacher",
                    accessorKey: "teacher.name",
                    size: 180,
                    header: () => <p className="column-title">Teacher</p>,
                    cell: ({ getValue }) => <span>{getValue<string>()}</span>,
                },
                {
                    id: "capacity",
                    accessorKey: "capacity",
                    size: 120,
                    header: () => <p className="column-title">Capacity</p>,
                    cell: ({ getValue }) => <span>{getValue<number>()}</span>,
                },
            ],
            []
        ),

        refineCoreProps: {
            resource: "classes",
            pagination: {
                pageSize: 10,
                mode: "server",
            },
            filters: {
                permanent: [...subjectFilter, ...teacherFilter, ...searchFilter],
            },
            sorters: {
                initial: [
                    {
                        field: "id",
                        order: "desc",
                    },
                ],
            },
        },
    });

    return (
        <ListView>
            <Breadcrumb />

            <h1 className="page-title">Classes</h1>

            <div className="intro-row">
                <p>Quick access to essential metrics and management tools.</p>

                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon" />

                        <Input
                            type="text"
                            placeholder="Search by class name..."
                            className="pl-14 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                            <SelectTrigger className="w-full sm:w-auto">
                                <SelectValue placeholder="All Subjects" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Subjects</SelectItem>

                                {subjects.map((subject) => (
                                    <SelectItem key={subject.id} value={subject.name}>
                                        {subject.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                            <SelectTrigger className="w-full sm:w-auto">
                                <SelectValue placeholder="All Teachers" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All Teachers</SelectItem>

                                {teachers.map((teacher) => (
                                    <SelectItem key={teacher.id} value={teacher.name}>
                                        {teacher.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <CreateButton resource="classes" />
                    </div>
                </div>
            </div>

            <DataTable table={classTable} />
        </ListView>
    );
};

export default ClassesList;
