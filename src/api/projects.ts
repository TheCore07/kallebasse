import { api } from './axios';
import type {Project} from "@/types/Project.ts";

export async function getProjects() {
    return api.get('/projects');
}

export async function deleteProject(_id: string) {
    return api.delete(`/projects/delete/${_id}`);
}

export async function createProject(project: Project) {
    return api.post(`/projects/create`, project);
}

export async function updateProject(project: Project) {
    return api.put(`/projects/update`, project);
}