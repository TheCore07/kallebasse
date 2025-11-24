import {Button} from "@/components/ui/button.tsx";
import {Plus, Book, } from "lucide-react";
import {useEffect, useState} from "react";
import {DataTable} from "@/pages/projects/data-table.tsx";
import { columns } from "@/pages/projects/columns.tsx";
import type {Project} from "@/types/Project.ts";
import {deleteProject, getProjects, updateProject} from "@/api/projects.ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

export default function Projects() {
    const [selected, setSelected] = useState<Project | null>(null);
    // const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [search, setSearch] = useState<string>("");


    const loadProjects = async () => {
        const res = await getProjects();
        const data = res.data;
        setProjects(data);
    }

    const handleDelete = async (_id: string) => {
        const res = await deleteProject(_id);

        if (res.status === 200 || res.status === 201) {
            await loadProjects()
        }
    }

    useEffect( () => {
        loadProjects();
    }, [])

    const openEdit = (p: Project) => {
        setSelected(p);
        setIsEditOpen(true);
    }

    const closeEdit = () => {
        setSelected(null)
        setIsEditOpen(false);
    }

    const tableColumns = columns(
        (project) => openEdit(project),
        (project) => handleDelete(project._id)
    );


    const filteredData = projects.filter((project) => {
        return (
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.description.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <>
            <Dialog open={isEditOpen} onOpenChange={closeEdit}>
                <DialogContent className="bg-gray-800 text-gray-100 border border-gray-700 rounded-xl">
                    {selected && (
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                await updateProject(selected);
                                await loadProjects();
                                closeEdit();
                            }}
                            className="grid gap-4"
                        >
                            <DialogHeader>
                                <DialogTitle>Projekt bearbeiten</DialogTitle>
                                <DialogDescription>Bearbeiten Sie dieses Projekt</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-3">
                                <Label>Titel</Label>
                                <Input
                                    id="title"
                                    value={selected.title}
                                    onChange={(e) =>
                                        setSelected({ ...selected, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className="grid gap-3">
                                <Label>Beschreibung</Label>
                                <Input
                                    id="description"
                                    value={selected.description}
                                    onChange={(e) =>
                                        setSelected({ ...selected, description: e.target.value })
                                    }
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg cursor-pointer">
                                    Abbrechen
                                </DialogClose>
                                <Button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 cursor-pointer"
                                >
                                    Speichern
                                </Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Page Layout */}
            <div className="flex flex-col h-full bg-gray-900 text-gray-100 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Book className="h-8 w-8 text-indigo-400" />
                        <h1 className="text-2xl font-semibold">Projects</h1>
                    </div>
                </div>

                {/* FILTER + TABLE */}
                <div className="bg-gray-800 border border-gray-700 p-4 rounded-xl shadow-lg space-y-4">
                    {/* Search Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Suchen..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <Button
                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 cursor-pointer"
                        >
                            <Plus className="h-5 w-5" />
                            Neu
                        </Button>
                    </div>

                    {/* DataTable */}
                    <DataTable columns={tableColumns} data={filteredData} />
                </div>
            </div>
        </>
    )
};